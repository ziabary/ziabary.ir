---
title: Apache “No space left on device” and mod_jk_log_lock
slug: apache-mod-jk-log-lock
lang: en
date: 2013-01-04
faDate: January 4, 2013
category: Linux & Servers
excerpt: A troubleshooting record in which Apache reported a full device despite ample disk space; the actual limit was an accumulation of System V semaphore locks left behind by failed restarts.
readTime: 5 min read
related:
  - software-raid-opensuse
  - install-dgtechnics-smart-hdtv-linux
external: "https://web.archive.org/web/20130127092329id_/http://blog.mohammadzadeh.info/index.php/apache-no-space-left-on"
source: Internet Archive
---

<div class="archive-note"><strong>Archive note.</strong> This incident involved an older Apache/mod_jk installation and a SysV init script. Do not automate semaphore deletion on a modern or shared host without identifying ownership and understanding the effect on running processes.</div>

Google Webmaster Tools warned me that the blog was unreachable. Apache had stopped; restarting it restored the site, but only for a few hours. A minute-by-minute monitoring script could detect the outage, yet eventually even the script could not bring the service back.

The Apache log contained the useful clue:

```text
[crit] (28)No space left on device: mod_jk: could not create jk_log_lock
Configuration Failed
```

The phrase “No space left on device” suggested a filesystem problem, but `df` showed only 27 percent of the main filesystem in use. The error was about a finite kernel resource, not disk blocks.

## Check semaphore usage

System V semaphores can be inspected with:

```bash
ipcs -s
```

The server had accumulated more than 250 semaphore sets owned by the Apache user. Failed or incomplete restarts were not releasing them, and mod_jk could no longer create its lock. Removing a confirmed orphaned semaphore with `ipcrm -s <SEMAPHORE_ID>` allowed Apache to start.

The monitoring script was then changed to stop Apache, identify its stale semaphore IDs, remove them and start the service again:

```bash
#!/bin/sh

if ! /etc/init.d/httpd status | grep -q running; then
  /etc/init.d/httpd stop
  SemIDs=$(ipcs -s | awk '$3 == "apache" { print $2 }')
  for ID in $SemIDs; do
    ipcrm -s "$ID"
  done
  /etc/init.d/httpd start
fi
```

That restored service on this particular host, but it treated the symptom. The next questions should be why clean shutdown was failing, whether mod_jk and Apache were current, and whether the host's semaphore limits and process lifecycle were configured correctly.

The incident is a useful reminder that Unix error text often describes the exhausted interface, not the physical resource we first associate with the words. Before deleting files in response to `ENOSPC`, inspect inodes, shared memory and IPC limits as well as filesystem capacity.

