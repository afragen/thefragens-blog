---
title: 'iCal - Exchange Time Zone Fix - Part 2'
pubDate: '2008-08-12'
categories: ['applescript', 'code', 'mac-osx']
tags: ['applescript', 'code', 'mac-osx']
description: 'I''ve come across a problem with the original MailE'
---

I've come across a problem with the original MailExchange2iCal-TZ-fix script. It seems if the .ics invite was only listed as an attachment or in base64 encoding then the script would fail. I've subsequently revised the script to handle this and to more gracefully ask into which calendar you want the event imported. I've also fixed the script so that it runs successfully from a rule. **Note**: The `ical_TZID` property cannot have any spaces. Replace all spaces with underscores "`_`". In iCal `America/Los_Angeles` will look like `America/Los Angeles` in the iCal dropdown menu. Let me know if there are any problems. As always you can [download the MailExchange2iCal-TZ-fix script here](http://pub.thefragens.com/iCal-Invite-Fix.scpt).
