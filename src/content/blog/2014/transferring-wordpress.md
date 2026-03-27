---
title: 'Transferring WordPress'
pubDate: '2014-04-27'
categories: ['computer', 'web-hosting', 'dreamhost']
description: ''
---

So the benefit of having many domains to play with is that I get to test things out before I put them on a _live_ site. I was able to successfully transfer a multisite WordPress installation to @Dreamhost. Here's what I did.

1. Use 1-click installer to create base site @Dreamhost.
2. Make site a multisite installation.
3. Use SFTP to copy existing plugins/themes.
4. Use [WP Migrate DB Pro](https://deliciousbrains.com/wp-migrate-db-pro/) to push existing database to new database.
5. Create mirrored subdomain in @Dreamhost panel for subdomains.
6. Remember to check **Remove WWW** from the main domain.

Shout out to @Dreamhost support for pushing me in the right direction. Next up, tackling IMAP email transfer.
