---
title: 'Fail2ban Problems and Solutions'
pubDate: '2010-12-01'
categories: ['code', 'apple']
description: 'A fix for a Fail2ban issue on OS X where multiple bans sharing the same ipfw rule number get cleared prematurely, solved by generating a random rule number via a shell variable, with custom jails and filters available as a downloadable bundle.'
---

If you use [Fail2ban](http://www.fail2ban.org/wiki/index.php/Main_Page) then you are probably aware of the fact that you must add a rule number to the ipfw deny rule for `actionban` in `ipfw.conf`. 

If you don't add a rule number then there is no way for fail2ban to delete the rule after it expires. The problem lies in that you can easily set a different rule number for each filter but if the filter adds many rules within it's ban time then when that first `actionunban` gets triggered all rules with the same number are removed, even if there full ban time has not transpired. I was looking for an elegant solution to this and finally figured out how to do it myself. What I've done is in the `ipfw.conf` file I've added a variable that will create a random number between 10000 and 12000 to use as the rule number. The code is pretty simple.

> `echo $((RANDOM%2000+10000))`

There needs to be an extra `%` in there for it to work. I think it has something to do with python. So far it seems to be working pretty good here. While it is possible that I could get a duplicate rule number, it's unlikely. I've modified my installation of Fail2ban significantly; but only by adding filters, jails, etc. [Here's a bundled version of all of my modifications.](http://pub.thefragens.com/install_fail2ban_mods.tar.gz) [Here are instructions for using my modifications.](https://thefragens.com/2010/11/fail2ban-and-os-x-server-part-deux/) 

So far everything seems to be working great. I've had to add a few items to `ignoreregex` so I don't ban people using their iPhones on 3G or at home from certain dynamic IP cable providers. What I've done is a `host` lookup on the IP that's banned and if I find it's a local ISP, like Verizon or Time Warner Cable, I add part of their host lookup to the `ignoreregex` list. So far it seems to be doing the trick.
