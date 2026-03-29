---
title: 'False Positive'
pubDate: '2010-05-05'
categories: ['apple', 'code']
description: 'A command-line workflow for reviewing and releasing SpamAssassin-quarantined email on OS X Server using TextExpander snippets to automate copying, unzipping, previewing, and releasing messages, making the entire process manageable from an iPhone or iPad.'
---

Just a personal reminder to keep in the memory bank. When running OS X Server and SpamAssassin, if you have spam set up to be quarantined it gets stored in `/var/virusmails`. A method of viewing and releasing quarantined mail mostly from the command line follows. First, to do anything with the quarantined message you need to know it's `mail-file`. That's usually something like `spam-kFLGPbnGHO3a.gz`. Using [TextExpander's snippets](http://www.smileonmymac.com/TextExpander/touch/index.html) and the clipboard I have the following snippets. 

To view the quarantined message I copy the quarantined file to `/Users/Shared/` and then unzip it, read it into a new mail message to me. If it looks OK then I release it. I delete the file from `/Users/Shared/` when I'm done. To send it myself I have the following snippet. The snippet begins by copying the `mail-file` to the clipboard. If you don't have TextExpander just replace all instances of `%clipboard` with the `mail-file`. 

```bash
sudo cp /var/virusmails/%clipboard /Users/Shared/;gunzip /Users/Shared/%clipboard;/usr/bin/mail -s "%clipboard" me@example.com < /Users/Shared/`echo %clipboard | sed 's/.gz//g'`;rm /Users/Shared/`echo %clipboard | sed 's/.gz//g'` [/code] If I want to release the file from quarantine and send it to `notjunkmail`. 
```

```bash
sudo amavisd-release %clipboard ; sudo amavisd-release %clipboard "" notjunkmail [/code] I did have to do a few things to get `amavisd-release` working. First, it was looking for `amavisd.sock` in the `/var/amavis/home` directory and it's really located in the `/var/amavis` directory. It was simple to create a new directory and then create a symlink to the `amavisd.sock` file.
``` 

```bash
sudo mkdir /var/amavis/home; sudo ln -s /var/amavis/amavisd.sock /var/amavis/home
``` 

Now, using only the command line and a mail app, I can check on quarantined email and release it. All this just so I can make sure that I can do this task from an iPhone or iPad. 😉 FWIW, I have [amavis-blocked (by Uwe S. Fuerst) a log file parser for amavisd-new 2.x, written in Perl](http://www.phi.net/amavis-blocked.tar.gz) set up to send me logs each night at 23:59. That's where I get the `mail-file` from.
