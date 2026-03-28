---
title: 'Dovecot Permissions'
pubDate: '2010-08-07'
categories: ['apple', 'code']
description: ''
---

Well, I finally bit the bullet and installed OS X Snow Leopard Server. Most of what I absolutely **need** to get working is mail services. One of the peculiarities of Dovecot is that each users mail folder is owned by that user. I think in Cyrus they were all owned by *mail* or *_cyrus*. Anyway, I found that a couple of my files didn't have the correct permissions and I found out by trying to open in webmail. It gave me errors I'd never seen before. Where I found better errors was in mailaccess.log where I saw a _dovecot_ service with a _failed: Permission denied_ error. I managed to find where the files lived and as I have quite a few mail users I didn't want to go through individually so I figured out a script to do it. 

> `sudo ls -lA /var/spool/imap/dovecot/mail | grep -v total | awk {'printf $3": /var/spool/imap/dovecot/mail/"$9"n"'} | xargs -n2 -p sudo chown -R` 

The script will ask if you want to proceed with the _chown_ command for each user. If you find your logs reporting permissions issues with a specific account or your webmail users have errors opening mailboxes, then the following script when provided with the offending GeneratedUID will reset the permissions similar to the above. Simply replace the GUID in the script with the one listed in your logs. 

> ` dscl /LDAPv3/127.0.0.1 -list /Users GeneratedUID | grep GUID | awk {'printf $1": /var/spool/imap/dovecot/mail/"$2"n"'} | xargs -n2 -p sudo chown -R`
