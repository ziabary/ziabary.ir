---
title: Running NuPIC 1.7.1 on openSUSE with Python 2.6
slug: install-nupic-opensuse
lang: en
date: 2011-02-04
faDate: February 4, 2011
category: Artificial Intelligence
excerpt: "A historical installation note from an early NuPIC project: working around binaries linked to Python 2.5 on 32-bit and 64-bit openSUSE systems that already used Python 2.6."
readTime: 4 min read
related:
  - htm-papers-and-books
  - accessing-legacy-numenta-content
external: "https://web.archive.org/web/20121108012028id_/http://blog.mohammadzadeh.info/index.php/install-nupic-v1-7-1"
source: Internet Archive
---

<div class="archive-note"><strong>Archive note.</strong> NuPIC 1.7.1 and Python 2.x are obsolete. The library-symlink workaround below is preserved as part of my early work with Hierarchical Temporal Memory, not recommended for a current or security-sensitive system.</div>

Early NuPIC binaries were linked against Python 2.5.4. During a project on a 64-bit openSUSE system, the installed Python was 2.6.2 and downgrading the distribution's interpreter was not a sensible option. I tested a compatibility workaround by exposing the available Python libraries under the names expected by NuPIC.

After installing NuPIC according to Numenta's then-current Linux instructions, I created the following symbolic links.

For the 64-bit libraries:

```bash
cd /usr/lib64/
sudo ln -s libpython2.6.so libpython2.5.so.1.0
sudo ln -s libpython2.5.so.1.0 libpython2.5.so.1
sudo ln -s libpython2.5.so.1 libpython2.5.so
```

For the standard library path:

```bash
cd /usr/lib/
sudo ln -s libpython2.6.so.1.0 libpython2.5.so.1.0
sudo ln -s libpython2.5.so.1.0 libpython2.5.so.1
sudo ln -s libpython2.5.so.1 libpython2.5.so
```

I also linked the interpreter directory and NuPIC's own library directory:

```bash
cd /usr/local/lib/
sudo ln -s python2.6 python2.5

cd "$HOME/nta/lib"
ln -s python2.5 python2.6
```

The minimal import test was:

```python
import nupic.network
```

I tested the setup on openSUSE 11.2 and 11.3, on both 32-bit and 64-bit installations, and ran several NuPIC examples including the Vision Toolkit without an error attributable to the Python version.

This was a pragmatic compatibility hack, not a general claim that two interpreter ABIs are interchangeable. A symlink cannot repair a real ABI mismatch. On a modern system the sound approach would be an isolated, reproducible environment containing the exact historical runtime—or, preferably, a maintained version of the software.
