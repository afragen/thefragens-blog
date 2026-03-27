---
title: 'Importing Mail Message Attachments Into Aperture'
pubDate: '2008-11-11'
categories: ['applescript', 'code', 'mac-osx']
tags: ['applescript', 'code', 'mac-osx']
description: 'So I''ve just gotten my new Unibody MacBook and Ape'
---

So I've just gotten my new Unibody MacBook and Aperture. Immediately I find myself wanting for a _Quick Look > Add to Aperture_ just like there is for iPhoto. Unfortunately it's nowhere to be found. Fortunately Aperture is scriptable. Version 1.0 of [SaveAttachments2Aperture](http://pub.thefragens.com/SaveAttachments2Aperture.scpt) is now available. It's currently very simple with little error checking. It works multiple attachments per message and imports all attachments of a selected message into a new Aperture project. It could be used in a Mail rule though I prefer to select it manually from the Script menu. I have it saved in `~/Library/Scripts/Applications/Mail/`. A thanks goes out to [Automating Aperture](http://homepage.mac.com/jlarson7/index.html) where I got some of the Aperture scripting. Comments welcome. **Update** Now at version 1.1. I added some simple logic to only import certain file types. You might need to add to this list. If I'm missing some let me know, especially with Raw images. v1.2 - add a bunch of the _usual_ camera raw file types
