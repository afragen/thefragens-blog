---
title: 'Securing Email'
pubDate: '2007-11-20'
categories: ['apple']
description: 'A brief account of getting SSL working for IMAP, POP, and SMTP on a Leopard Server Mac mini after two frustrating days, resolved by following Panther-era instructions from Joel Rennich with only a minor workaround for the serial file.'
---

I think I've finally accomplished it. It being getting my mail server to use SSL for IMAP/POP/SMTP. I'm running Leopard Server on an Intel Mac mini and I've been screwing around with Keychain Access > Certificate Assistant for the past 2 days. Don't waste your time. Joel Rennich has some [excellent instructions on getting everything up and running][ssl]. The instructions were written with Panther in mind but it worked almost perfectly. The almost is that I couldn't write the "01" to the demoCA/serial file so I opened it up in pico and added the value from there. [ssl]: http://www.afp548.com/Articles/Panther/sslinfo.html
