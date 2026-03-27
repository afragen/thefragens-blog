---
title: 'Don''t Send iCal Replies'
pubDate: '2010-04-14'
categories: ['applescript', 'code', 'computer', 'mac-osx']
description: ''
---

I came across a [great hint in Mac OS X Hints](http://www.macosxhints.com/article.php?story=20100408114405109) today. It seems that there's an easy way to interrupt the process of sending an email reply when accepting iCal invites. As I tend to play around with iCal invites a lot (adding and deleting the same event ad nauseum) -- I love this. 

I wrote up a [modified script](http://pub.thefragens.com/iCal_Reply_Ask.zip) like in the example and bundled it with a shell script, to install and uninstall the modification. You have to run this shell script using `sudo` from the CLI (Command Line Interface aka Terminal.app). 

The zip file contains the shell script, the modified Mail.scpt AppleScript, and the original Mail.scpt AppleScript. 

- To install run `sudo /path/to/iCal_Reply_Send.sh install` 
- To uninstall run `sudo /path/to/iCal_Reply_Send.sh revert` 
- To check usage and status, run `/path/to/iCal_Reply_Send.sh` 

If you don't like messing with the CLI then there's a great little shareware app, [iCal Reply Checker](http://www.nhoj.co.uk/icalreplychecker/) that does it all, and more. It seems that neither method interferes with the code signing of iCal as the script in question is not code signed. 

**Update** It appears that if you're using an Exchange account in Mail.app that this script is being bypassed and this hint won't work for you. :-(
