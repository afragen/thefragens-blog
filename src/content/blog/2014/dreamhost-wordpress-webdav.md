---
title: 'Dreamhost, WordPress and WebDAV'
pubDate: '2014-05-03'
categories: ['computer', 'web-hosting']
tags: ['dreamhost']
description: 'So next on my list was figuring out how to create '
---

So next on my list was figuring out how to create a nested group of password protected directories with different users accessing various sub-directories. It's much simpler than it sounds. The only caveat was that the main domain is running WordPress. As such I had to [tweak the .htaccess file](http://wiki.dreamhost.com/Password-protecting_directories). Fortunately the instructions were simple. Then I created a series of nested WebDAV directories in the Dreamhost Panel and assigned user accounts as needed. Every user needing WebDAV access got it for the primary WebDAV directory and then each sub-directory had only the user accounts as needed. Surprisingly this worked great. I may need to get an SSL certificate for the domain if I want to have the WebDAV encrypted but that should be very doable.
