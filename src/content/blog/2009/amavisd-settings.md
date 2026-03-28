---
title: 'Amavisd settings'
pubDate: '2009-03-16'
categories: ['apple', 'code']
description: 'Spam with malformed MIME boundaries was bypassing SpamAssassin on an OS X Server mail setup and reaching recipients unscored, and changing the Amavisd final_bad_header_destiny setting from D_PASS to D_REJECT is proposed as the fix.'
---

I run my own mail server on OS X Server. For the most part I have my [SpamAssassin](http://spamassassin.apache.org/) settings tweaked pretty well. Unfortunately, there is some spam that seems to have malformed or incomplete MIME boundaries and these messages don't seem to be getting passed off from Amavisd to SpamAssassin. As such, they seem to be getting through to the recipient with a null value for the spam score. After a little Googling I found [Amavisd critical settings](http://www200.pair.com/mecham/spam/amavisd-settings.html) and I think the `$final_bad_header_destiny` is the key. The default setting is set to `D_PASS`. I've changed mine to `D_REJECT` now I'll see what the logs say and see how much non-spam gets caught. Obviously, if enough good stuff doesn't get through then I'll have to think of something else. But the obvoious question remains, _Why doesn't SpamAssassin score these messages?_
