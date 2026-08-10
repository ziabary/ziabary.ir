---
title: Installing TBS6980 and TBS6981 cards on Linux
slug: install-tbs6980-tbs6981-linux
lang: en
date: 2011-02-23
faDate: February 23, 2011
category: Linux & Hardware
excerpt: A restored field guide to compiling the vendor driver, linking the correct architecture-specific objects, raising the DVB adapter limit, installing firmware and verifying multiple TBS6980/TBS6981 DVB-S/S2 cards.
readTime: 5 min read
related:
  - install-dgtechnics-smart-hdtv-linux
  - software-raid-opensuse
external: "https://web.archive.org/web/20130120064544id_/http://blog.mohammadzadeh.info/index.php/step-by-step-guide-to"
source: Internet Archive
---

<div class="archive-note"><strong>Archive note.</strong> This guide was written for 2011-era Linux kernels and the vendor driver package available at that time. It is restored because it became a practical reference for users of these cards. Treat package names, source layout and kernel limits as historical unless you have verified them against a current driver.</div>

TBS6980 and TBS6981 were among the more capable DVB-S/S2 PCI Express cards available at the time, with vendor support for Linux. This note records the installation process I used for systems carrying several cards—up to ten physical cards, or twenty DVB adapters.

## Prepare the build environment

Install the kernel source that matches the running kernel together with `gcc`, `make`, `rar`, `tar` and `gzip`. Download the Linux driver and firmware package from the TBS support site, then work in an empty directory:

```bash
mkdir TBS6980
cd TBS6980
unrar e /path/to/driver/linux-s2api-tbs6980-<version>.rar
tar xjvf linux-s2api-tbs6980_1.tar.bz2
cd linux-s2api-tbs6980_1/v4l
```

The package contained prebuilt control and frontend objects for more than one CPU architecture. The generic filenames expected by the build therefore had to point at the correct objects.

For a 32-bit x86 system:

```bash
ln -s tbs6980ctrl.o.x86 tbs6980ctrl.o
ln -s tbs6981ctrl.o.x86 tbs6981ctrl.o
ln -s tbs6980fe_driver.o.x86 tbs6980fe_driver.o
ln -s tbs6981fe_driver.o.x86 tbs6981fe_driver.o
```

For x86-64/AMD64:

```bash
ln -s tbs6980ctrl.o.x86_64 tbs6980ctrl.o
ln -s tbs6981ctrl.o.x86_64 tbs6981ctrl.o
ln -s tbs6980fe_driver.o.x86_64 tbs6980fe_driver.o
ln -s tbs6981fe_driver.o.x86_64 tbs6981fe_driver.o
```

## Systems with more than four cards

The driver tree inherited an adapter limit that was too low for a dense receiver system. Before compiling, I changed `DVB_MAX_ADAPTERS` to `16` in `dvbdev.h`, and `CONFIG_DVB_MAX_ADAPTERS` to `64` in `config-compat.h`.

These values belonged to that source tree, not to an abstract Linux rule. A modern kernel or driver may expose the limit elsewhere—or may not need this modification at all.

## Compile, install and verify

Return to the source root, compile and install:

```bash
cd ..
make
sudo make install
```

Copy the firmware supplied with the driver to the firmware directory:

```bash
sudo cp /path/to/driver/v4l-cx23885-<version>.fw /lib/firmware/
```

After rebooting, inspect the adapter directories:

```bash
ls /dev/dvb
```

Each dual-tuner card should contribute two adapters. If the expected devices are missing, check the kernel log before repeating the installation: a missing firmware file, an object built for the wrong architecture, or a mismatch between kernel headers and the running kernel is more informative than simply rebuilding the same tree.

