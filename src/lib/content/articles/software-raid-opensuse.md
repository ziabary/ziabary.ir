---
title: Making a software RAID array persistent on openSUSE
slug: software-raid-opensuse
lang: en
date: 2011-09-29
faDate: September 29, 2011
category: Linux & Servers
excerpt: A compact historical recipe for creating an mdadm array, recording its identity in mdadm.conf, formatting it, enabling assembly at boot and mounting it consistently through fstab.
readTime: 3 min read
related:
  - apache-mod-jk-log-lock
  - install-tbs6980-tbs6981-linux
external: "https://web.archive.org/web/20121109230827id_/http://blog.mohammadzadeh.info/index.php/how-to-make-raid-permanent"
source: Internet Archive
---

<div class="archive-note"><strong>Archive note.</strong> These commands reflect an older openSUSE installation. Device names, service names and configuration paths vary by distribution and release. Creating or formatting an array destroys data if the target disks are wrong; verify every device before acting.</div>

Creating a Linux software RAID array manually with `mdadm` was only the first step. The system also needed enough information to assemble the same array during boot and mount it at a stable path.

The original example created a RAID 0 array from two disks:

```bash
mdadm --create --verbose /dev/md0 --level=0 --raid-devices=2 /dev/sdb /dev/sdc
```

RAID 0 provides capacity and throughput, not redundancy. A failure of either member destroys the array, so it is inappropriate wherever “RAID” is being used as a synonym for protection.

After creation, record the detected array metadata in the distribution's `mdadm.conf` location. On the system used for this note:

```bash
mdadm --examine --scan --config=mdadm.conf > /etc/mdadm/mdadm.conf
```

Format the assembled device—not either member disk—with the selected filesystem. I used XFS for the large data volume in question. Then enable the distribution's mdadm service in the relevant runlevels and add a persistent mount to `/etc/fstab`:

```fstab
/dev/md0  /data  xfs  defaults  1  2
```

Before relying on the setup, reboot during a maintenance window and verify all three stages independently: the array is assembled, the filesystem is recognised, and the mount is present. Also check that a degraded array produces an alert. Persistence without monitoring merely makes a silent failure survive a reboot.

