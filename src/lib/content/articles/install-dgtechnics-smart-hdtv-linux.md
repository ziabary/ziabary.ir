---
title: Installing DGTechnics Smart HDTV/FM on Linux
slug: install-dgtechnics-smart-hdtv-linux
lang: en
date: 2011-02-06
faDate: February 6, 2011
category: Linux & Hardware
excerpt: A restored installation record for a low-cost TM6010-based USB capture device, covering the experimental Video4Linux driver, XC3028 firmware extraction, kernel diagnostics and a working MPlayer capture command.
readTime: 8 min read
related:
  - install-tbs6980-tbs6981-linux
  - apache-mod-jk-log-lock
external: "https://web.archive.org/web/20130424020836id_/http://blog.mohammadzadeh.info/index.php/how-to-install-dgtechnics-smart"
source: Internet Archive
---

<div class="archive-note"><strong>Archive note.</strong> This article documents a successful installation in 2011, when TM6010 support was experimental. The Mercurial repository, firmware locations, build menu and device commands may no longer match a current Linux system. The diagnostic method remains useful; verify every external download before using it.</div>

DGTechnics Smart HDTV/FM was one of the cheapest capture devices in the market. It used Trident's TM6010 chipset, which was not supported by the standard driver stack I had installed. After several attempts I got capture working under Linux, in practice more reliably than the bundled Windows setup.

The starting point was the experimental TM5600/TM6000/TM6010 support in Video4Linux.

## Build the experimental driver

Install the compiler, `make`, kernel source and kernel development packages through the distribution package manager. The original setup also needed Mercurial because the Video4Linux tree was hosted in an `hg` repository:

```bash
hg clone http://linuxtv.org/hg/v4l-dvb
cd v4l-dvb
make menuconfig
```

In the configuration menu, enable staging drivers, open **Media devices in staging**, and select the **TV Master TM5600/6000/6010** driver. Save the configuration, then build and install:

```bash
make
sudo make install
```

## Supply the XC3028 firmware

The card used an XC3028 tuner. Its kernel module was built in the previous step, but the device still needed firmware. At the time, a compatible image could be extracted from the Hauppauge HVR driver package:

```bash
unzip -j HVR-12x0-14x0-17x0_1_25_25271_WHQL.zip Driver85/hcw85bda.sys
wget www.kernel.org/doc/Documentation/video4linux/extract_xc3028.pl
perl extract_xc3028.pl
sudo mv xc3028-v27.fw /lib/firmware/
```

Do not assume those old HTTP locations are trustworthy today. If you are restoring similar hardware, prefer firmware distributed by your Linux distribution or another verifiable source.

## Watch the kernel before loading the card

The important part of the exercise was not only installing files; it was observing each transition. In one terminal I watched new kernel messages, then connected the USB receiver. The device announced itself with vendor ID `6000`, product ID `0002`, product name `TVBOX` and manufacturer `Trident`.

I then loaded the module:

```bash
sudo modprobe tm6000
```

The useful lines in the log were the ones that confirmed a generic TM6010 board, detected the XC2028/XC3028 tuner, requested `xc3028-v27.fw`, loaded the firmware and finally registered a video device. In my case the driver reported `open called (dev=video1)`, corresponding to `/dev/video1`.

If that sequence stops before the video device appears, the last successful line narrows the problem considerably: USB detection, board identification, tuner detection and firmware loading are separate stages.

## Test composite capture

I used MPlayer because it could select the input, television norm and pixel format explicitly. This command opened the composite input as PAL-BG and requested UYVY output:

```bash
mplayer tv:// -tv "device=/dev/video1:noaudio:norm=PAL-BG:input=1:outfmt=uyvy"
```

Once the device was placed in capture mode, VLC, OpenCV, MATLAB or another Video4Linux client could read it. The first initialization sometimes took about ten seconds, so an empty first frame was not by itself evidence of failure.

The broader lesson was simple: with unsupported hardware, a successful installation is a chain of observable states. Treating the whole chain as one opaque “driver problem” makes it much harder to locate the actual failure.

