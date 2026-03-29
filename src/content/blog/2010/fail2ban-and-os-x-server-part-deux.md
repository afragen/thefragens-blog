---
title: 'Fail2ban and OS X Server, Part Deux'
pubDate: '2010-11-04'
categories: ['code', 'apple']
description: 'An overview of custom Fail2ban modifications for Snow Leopard Server adding jails for SMTP, POP, IMAP, VNC, and invalid web requests, distributed as a downloadable tarball with an installation script and LaunchDaemon plists to keep Fail2ban running reliably.'
---

As some of you might know I run my own installation of OS X Server. I've since updated it to Snow Leopard Server and I think I've got most of it running well. As I check my server logs frequently I find that there are all sorts of script kiddies attempting to log in to my server in various ways. The traditional method was to simply try an ssh session with a username and password combination. 

Unfortunately now I see more attempts to log in via VNC or in attempts to _check_ or _send_ email. It's amazing to see 10 - 15 login attempts in a second. There's a real motivating force to stop that kind of attention my poor little server is getting. 

As I've written before, I've found the [Fail2ban](http://www.fail2ban.org/wiki/index.php/Main_Page) scripts to to be a perfect solution. I have had to make a number of additions and _improvements_ along the way and now I thought I'd share. I've created a couple of new jails and improved upon a couple of the distribution jails so they work better with Snow Leopard. [I've packaged up all my modifications.](http://pub.thefragens.com/install_fail2ban_mods.tar.gz) 

Here's how to install them for yourself. [Download](http://pub.thefragens.com/install_fail2ban_mods.tar.gz) the modifications tarbell. Then you'll need to issue the following commands from Terminal.

```bash
sudo tar xzf install_fail2ban_mods.tar.gz
```

This will create a folder containing all the modifications. At this point you can manually put all the files in the proper folders or you can use my installation script. The installation script, `install_fail2ban_mod.sh` shouldn't delete anything. I only use the `cp` command. If you already have a `jail.local` file that is backed up. You may also need to modify the `jail.local` file that I have. Additionally, I've found that sometimes the fail2ban server might have hung or its process has stopped. I've also written a script and a couple of plists for `/Library/LaunchDaemons/` that periodically check to make sure fail2ban continues to hum along. 

You'll have to load these plists manually or simply restart. The jails that I've added check for SMTP, POP, IMAP, VNC and non-existant web pages. These, in addition to monitoring SSH, seem to cover most of it. Please remember that some of these filters are somewhat specific to Snow Leopard so they check against a Dovecot mail server. So far my only problem has been when a user has changed their password but not correctly transferred these changes to Mail.app. What happens is fail2ban sees them as a break-in attempt and bans their IP for 10 minutes or so. I'm sure it can be frustrating. Sorry, I'm doing my best to fix it for you. By all means, let me know how you've improved Fail2ban for your server.
