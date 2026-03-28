---
title: 'Snow Leopard Sieve Rules'
pubDate: '2010-08-07'
categories: ['apple', 'code']
description: 'A guide to manually editing Sieve email filter rules on Mac OS X Snow Leopard Server using terminal commands to locate and modify user-specific sieve script files, including a workaround requiring HTTPS for wiki settings changes to take effect.'
---

How to edit _sieve_ rules in Snow Leopard by hand. This is not really recommended especially because it seems that SL server does not utilize all the sieve rules and the ones that it does utilize are in a slightly different format than exists in [Sieve documentation][1]. 

A couple of sources later and a couple of quick lines of code helps to figure out what file to edit. 

> `u="username"; dscl /Search read Users/$u GeneratedUID | awk {'printf "/Library/EmailRules/sievescripts/"$2".sieven"'} | xargs -n1 -p sudo cat` 
> > `u="username"; dscl /Search read Users/$u GeneratedUID | awk {'printf "/Library/EmailRules/sievescripts/"$2".sieven"'} | xargs -n1 -p sudo pico` 

Edit the command to make _u_ equal to the _username_ of the person and you can look at and edit the sieve files. I also don't know why but I get the following error. 

> Received SIGHUP or SIGTERM All you have to do is simply copy the command and it will work. Not sure why it doesn't work the first time. I'm quite certain if you go ahead and try to re-edit using the GUI your files might get screwed up. YMMV. Some say running the following command helps. Also, see **Update** below. Again, YMMV. 
> `sudo /usr/bin/wiki_sieve_manager` Finally a real solution to the above. Simply make sure you use the URL **https://yourdomain.com/settings/username/emailrules/**. Even if the website is not set up to use port 443 in Server Admin it seems you must use **https**. 

**Update** I discovered another secret. In order for the new rules to transfer you will need to add a new rule via the wiki, or at least go to the wiki and press the add rule button. This way the new rule is copied over to `/var/spool/imap/dovecot/sieve-scripts/%u`. [1]: http://tools.ietf.org/html/rfc3028
