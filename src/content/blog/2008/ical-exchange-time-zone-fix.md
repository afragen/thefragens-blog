---
title: 'iCal - Exchange Time Zone Fix'
pubDate: '2008-04-17'
categories: ['applescript', 'code', 'mac-osx']
description: ''
---

As any Mac user who deals with Microsoft Exchange invites will tell you _Exchange screws up the time zone information_. What this means is that you will likely miss your meetings. Not a good thing. [Justin Hartman](http://justinhartman.com/2008/03/31/apple-ical-microsoft-exchange-fix-for-leopard/) has recently given you his solution to this problem. I haven't tested it but in looking at it I'm certain it works just fine. I say this because he's fixing the problem is a similar manner. It's just that he's using a combination of shell scripts and AppleScripts. I've got it down to a single AppleScript. There is one `property` at the head of the script that needs to be fixed depending upon the location of your Exchange server. What you need to do is copy in the correct property from what iCal expects to see as time zone information. 

You can find this information by selecting the time zone drop down menu in the upper right corner of your iCal window and select `Other...`. Once there find the location of your Exchange server and see what the resultant time zone information looks like in iCal. In my case, I live in California and my time zone is `US/Pacific` or `America/Los_Angeles` but the Exchange server in question lives in Dallas. So I set the property to `US/Central`. **Note**: The `ical_TZID` property cannot have any spaces. Replace all spaces with underscores "`_`". In iCal `America/Los_Angeles` will look like `America/Los Angeles` in the iCal dropdown menu. I think I've built in the enough logic to grab any twisted time zone information out of the Exchange invite that Exchange can produce. If I'm wrong let me know. Save the script and either set it up to run from a mail rule or as I do call it from the System AppleScript menu. You will need to save the script in `~/Library/Scripts/Applications/Mail/` folder. Create this folder if it doesn't exist. The script was not entirely my creation and [credit also goes to others](http://www.macosxhints.com/article.php?story=20060821073102694). I'm quite certain any errors are likely mine. ;-) If it works for you let me know. If it doesn't work let me know that too and I'll see if it can be fixed. You will likely need a different copy of the script for each Exchange server that send you invites. **Update** - 5 August 2008 To set the script up to run automatically you will need to create a new Mail rule as follows.

1. Mail -> Preferences -> Rules -> Add Rule
2. Description "Fix Exchange Invites"
3. If "any" of the following conditions are met:
    - "Content-Class" "Contains" "urn:content-classes:calendarmessage" Note that the Content-Class header is not in the default list of headers on which you can set a rule action, but you can add it. This hint originally [here](http://www.macosxhints.com/article.php?story=20060821073102694).
    - "Any Attachment Name" "ends with" ".ics"
4. Perform the following actions:
    - "Run AppleScript" "~/Library/Scripts/Applications/Mail/MailExchange2iCal-TZ-fix.scpt"
5. Click "OK" and then "Apply"

**Update** - 11 August 2008 I found a glaring problem that I believe I've fixed. Apparently if the invite is only sent as an attachment the previous version of the script wouldn't parse out the .ics attachment. This new version will. Please download it. **Update** - 18 August 2008 I re-wrote the script making it better and more versatile. [Please go to it's new post home.](https://thefragens.com/2008/08/ical-exchange-time-zone-fix-chapter-2/)
