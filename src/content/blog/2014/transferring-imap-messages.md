---
title: 'Transferring IMAP Messages'
pubDate: '2014-05-26'
categories: ['osx-server', 'web-hosting']
tags: ['dreamhost', 'imap']
description: 'Well I''m on to my final phase in transferring from'
---

Well I'm on to my final phase in transferring from my own server to @DreamHost. Actually, transferring mail and not loosing messages jacked up my anxiety level significantly. I've done a lot of testing and found that [imapsync](http://imapsync.lamiral.info) works great. After tweaking the command, I came up with the following. 

```
perl imapsync --host1 localhost --user1 myserveruser --password1 MASKED --host2 x.x.x.x --user2 user@dreamhostdomain.com --password2 MASKED --authmech2 PLAIN --authmech1 CRAM-MD5 --usecache --delete2 --expunge2 --delete2folders --pidfilelocking
``` 

This command will use caching and delete messages/folders on the destination that don't correspond to the origination. Doing it this way I could test as much as I wanted. It also helps to have an extra domain to test with. So I added the domain to use DreamHost's DNS and hosting, set the nameservers to DreamHost and waited for propagation to complete. I had a small glitch in moving the mail accounts over from one domain to another in DreamHost but @DreamHostCare help is awesome. Once that got straightened out I just ran the above command for all users and sent out the new information for their email clients. So far it's worked entirely as expected. This was my first test as I have another domain to transfer that has more users. Hopefully now all I have to do is get used to DreamHost's spam filtering. `x.x.x.x` is the IP of my mail server on DreamHost.
