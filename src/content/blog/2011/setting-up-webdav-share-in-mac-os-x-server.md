---
title: 'Setting up WebDAV Share in Mac OS X Server'
pubDate: '2011-03-11'
categories: ['osx-server']
description: ''
---

As I attempt to transition from a laptop to an iPad, with no specific reason other than the iPad is sooooo kewl; I need to create my own online storage. Yes I have a [Dropbox](http://www.dropbox.com) account, but I don't control Dropbox. Here's what I did, YMMV.

1. From Server Admin, make new Web > Realm and set appropriate ACLs.
2. Create a folder in location/volume where data for Share is physically located.
3. Change permissions of folder to `_www:admin` (that's what works for me)
4. Create a symlink to the share folder in the folder where your web server looks to for the domain's data.

I know there's probably a bit of information missing and if I showed images of the actual steps it might make things a bit clearer but I'm a little paranoid about my server and I don't want to risk opening it up to further attack. All this needs to be done before OS X will allow a `"Connect to Server..."` and mount your WebDAV share.
