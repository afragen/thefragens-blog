---
title: 'WordPress Automatic Updates'
pubDate: '2010-06-18'
categories: ['osx-server', 'computer', 'wordpress']
description: ''
---

I think I finally have the automatic updates feature of WordPress working. Previously, when asked for my login info for the FTP connection I would get some vague connection error. It's a permissions issue. Some permissions for files/folders need to be set for web server user, in my case Apache2, or `_www` on OS X Server. The answer mostly comes from looking for [why WordPress asks for connection information](http://www.chrisabernethy.com/why-wordpress-asks-connection-info/). Be sure to read the comments. Definitely add the following to `wp-config.php`.

> `define('FS_METHOD', 'direct');`

So far, my solution seems to be something like the following, from the wordpress directory.

> `sudo chown -R _www ./wp-content*`  
> `sudo chown _www ./wp-admin/update*`

It seems to work, however, the information about what should be happening with the update seems to be in an endless loop. I let it run for a bit and when I check to see if the plugin or theme is updated it seems to have the newer version, but I've no real way to check or to know how long to let the process run. Very confusing. When I encounter more updates I'll see if this really does work. BTW, updated to WordPress 3.0 for all the new goodness. 

**Update**  
This works fine for plugins and themes but not for the actual WP updates. Also, I just let it run until the browser doesn't seem to be loading the page any longer and the updates are done. Something's clearly not working as expected with this and OS X Server but I don't know what it is. 

**Update 2**  
[Thanks epor for the missing piece.](http://wordpress.org/support/topic/unable-to-add-or-update-themesplugins-wp-292-on-mac-os-x-server?replies=20#post-1929021)
