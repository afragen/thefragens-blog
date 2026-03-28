---
title: 'Setting up Snow Leopard iCal Server'
pubDate: '2010-08-11'
categories: ['apple', 'code']
description: 'Quick notes on configuring Snow Leopard iCal Server with the correct Wiki Server settings to get group calendars working, including the exact CalDAV URL formats for both macOS iCal and iOS clients.'
---

After scouring through the official documentation, and finding that lacking, Google has found the answers. Make sure _Wiki Server_ is set to **127.0.0.1** and that _Use SSL_ is checked. Here's how I was finally able to get my groups into iCal SL/Lion client (**no SSL**)

> `userName`  
> `password`  
> `server.com/principals/__uids__/wiki-groupName/` (no http://)

To get this group calendar into iOS add the following as a CalDAV calendar.

> `username`  
> `password`  
> `server.com/principals/wikis/groupname/` (no http://)
