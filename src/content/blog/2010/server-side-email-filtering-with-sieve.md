---
title: 'Server-Side Email Filtering With Sieve'
pubDate: '2010-05-14'
categories: ['code', 'apple']
description: 'A step-by-step guide to enabling server-side email filtering with Sieve on Mac OS X Server, covering the Sieve service setup, installation of the avelsieve SquirrelMail plugin, and a fix for an authentication bug in its PHP library.'
---

Another post for the peripheral brain. When I first set up my own server lo these years ago, I never really thought about email message filtering. After all, I had rules in Mail.app that would send my incoming message to wherever I wanted them. Besides, I was much more concerned with eliminating spam. 

Well, that was then and spam seems under control. I was prompted to look at server-side message filtering mostly to help out my mother, who seems determined to have every single store, travel and other consumer site that will happily take your email address and send you messages daily -- or more often, have a more controllable experience on her iPhone. When we originally set up her iPhone she told me she didn't want to use it for email. Silly me, I listened and set her up with a POP account. Well now she wants email. What's a good son to do. :wink: I changed her POP account to IMAP, copied over all her messages to her new IMAP folders and thought I'd need to solve her impending problem of 100 or so messages every other day choking her inbox. 

After a bit of Googling I found [Sieve](http://sieve.info). I'd actually heard of it before but never really thought about it. The [Apple Discussion Forum](http://www.netmojo.ca/2007/12/01/setting-up-sieve-and-vacation-messages-on-mac-os-x-server/) had a nice start and pointed me on to [sources](http://www.netmojo.ca/2007/12/01/setting-up-sieve-and-vacation-messages-on-mac-os-x-server/) I used to [set it up](http://www.afp548.com/article.php?story=20080106215609968). Here are the salient points. From the terminal...

1. Add the following lines to `/etc/services`
    
    ```bash
    sudo pico /etc/services
    ```
    
    Insert the following lines.
    
    ```bash
    callbook 2000/udp # callbook
    callbook 2000/tcp # callbook
    + sieve 2000/udp # sieve mail filtering
    + sieve 2000/tcp # sieve mail filtering
    ```
    
    You can check to see if it's running by running
    
    ```bash
    netstat -an | grep 2000
    ```
    
    with results
    
    ```bash
    tcp4 0 0 *.2000 *.* LISTEN
    tcp6 0 0 *.2000 *.* LISTEN
    ```
    
2. Create `/usr/sieve`
    
    ```bash
    sudo mkdir /usr/sieve
    sudo chown _cyrus:mail /usr/sieve
    ```
    
3. Restart mail services
    
    ```bash
    sudo serveradmin stop mail
    [ some stuff ]
    sudo serveradmin start mail
    [ some stuff ]
    ```
    
4. Since I'm using OS X Server and SquirrelMail is already running, next was installing and configuring [avelsieve](http://email.uoa.gr/avelsieve/wiki/Download).

I really did try installing the latest development version -- 1.9.9 alpha. That should have been a clue. After spending way too much time with it I installed the stable version - avelsieve 1.0.1. Once copied into `/usr/share/squirrelmail/plugins` run `sudo perl /etc/squirrelmail/config/conf.pl` and activate the plugin. Then it's back to the terminal. These instructions are from [AFP548](http://www.afp548.com/article.php?story=20080106215609968).

```bash
    cd /usr/share/squirrelmail/plugins/avelsieve
    sudo cp config-sample.php config.php
```

Now set the correct authentication matching SquirrelMail. Edit `/etc/squirrelmail/plugins/avelsieve/config.php` and change:

```bash
$preferred_mech = "PLAIN";
```

to

```bash
$preferred_mech = "CRAM-MD5";
```

You should be running SquirrelMail with CRAM-MD5 authentication anyway. Finally, edit the `/etc/squirrelmail/plugins/avelsieve/lib/sieve-php.lib.php` file. Find the line:

```bash
fputs($this-&gt;fp, "PUTSCRIPT "$scriptname" {$len+}rn");
```

and change it to :

```bash
fputs($this-&gt;fp, "PUTSCRIPT "$scriptname"".' {'."$len+".'}'."rn");
```

This fixes an error in the script allowing you to save your changes to the filters. Now go login to webmail and click on the `Filter` link to start creating your Sieve filters.
