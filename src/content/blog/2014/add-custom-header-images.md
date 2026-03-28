---
title: 'Add Custom Header Images'
pubDate: '2014-05-17'
categories: ['code', 'wordpress']
description: ''
---

After using this plugin for quite a while I decided to refactor it and submit it to the WordPress Plugin repo. I figured maybe someone else might find it useful. 

What the plugin does is add all images that have been uploaded to a page titled **The Headers** to the header image array and allows for the selection of any of them or a randomized selection via the **Customize > Header Image** menu on the front end of the site. 

First the plugin removes any of the default header images, if present, and then adds all the images that have been uploaded to **The Headers** page as the new header images. If you don't have a page named **The Headers** then the plugin will not activate. **The Headers** may be a private page. The idea for the plugin came from the article written by [Julio Biason](http://juliobiason.net/2011/10/25/twentyeleven-with-easy-rotating-header-images/) who was inspired by [wpti.ps](http://wpti.ps/?p=107).
