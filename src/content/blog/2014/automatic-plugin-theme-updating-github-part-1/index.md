---
title: 'Automatic Plugin &amp; Theme Updating From GitHub – Part 1'
pubDate: '2014-08-01'
categories: ['code', 'git-updater', 'wordpress-2']
tags: ['github', 'plugins', 'themes']
coverImage: "github.jpeg"
description: 'About 10 months ago I decided to [scratch an itch]'
---

About 10 months ago I decided to [scratch an itch](https://github.com/afragen/github-updater). I was running 3 or 4 different WordPress websites, including this one. I was also playing around customizing these sites by creating some one-off plugins and child themes. At the time I was doing a lot of cowboy coding on my own domains. Mostly because I didn't know better. 

Developing in localhost has been an amazing boost in productivity. I have to mention this because this is not my day job. In fact, my day job keeps me incredibly busy and usually I end up coding at night and in off hours. For those that don't know, I'm a trauma/acute care surgeon. Currently I'm also the Chief of Staff of one of our local hospitals. 

It's not like I already didn't have enough free time. So I was creating a number of simple plugins that I really didn't think were either good enough or appropriate for the WP.org repository. As such, when I wanted to use them on different sites I would FTP them up after writing them and then I'd have to do it all again after updating them. I decided it was time to figure out how to hook into WordPress' automatic updating. At the time, the most popularly used method was Joey Kudish's [WordPress GitHub Plugin Updater](https://github.com/jkudish/WordPress-GitHub-Plugin-Updater). 

As I was looking into the code the first thing I felt myself wanting to do was to make the code into a plugin so I didn't have to put so much extra code into the plugins to be updated. Later I found another couple of projects that did either plugin or theme updating. Initially I was able to modify one, [Codepress' GitHub Plugin Updater](https://github.com/codepress/github-plugin-updater), enough so that I not only had a working plugin updater, but I had managed to parse the GitHub URI of the plugin's repo to the point that no other settings were needed inside of the plugin that's being updated other than a single header line. 

Around that time Kudish's project wasn't getting a lot of updates and in one issue that [Gary Jones](http://twitter.com/GaryJ) had created, I referred him to my project. Now you have to know, I had no idea at the time who Gary was. Boy do I now. Gary forked my project and the next thing I noticed were several pull requests that made the code look so much better and work so much more efficiently. Gary was incredible. He gave invaluable feedback without telling me how silly it was do things the way I was and made me think about WordPress Coding Guidelines, at least a little bit. 

At this point plugin updating was fairly solid and next up for me was updating for themes. There were 2 projects that did theme updating, one from [UCF's Theme Updater](https://github.com/UCF/Theme-Updater), and one from [Seth Carstens](http://twitter.com/scarstens), part of his [Whitelabel Framework](https://github.com/WordPress-Phoenix/whitelabel-framework/blob/master/inc/admin/updater-plugin.php), which improved upon UCF's work. Currently theme updating is working as well as it is in a very large part due to Seth's help. Originally I had created 2 plugins one for updating plugins and the other for updating themes. After both were functioning, I decided to combine them into a single plugin that I call [GitHub Updater](https://github.com/afragen/github-updater). Along the way Paul Clark provided immense help and support by showing me both why and how I should do things one way instead of another. Paul even created his own version, [Git Plugin Updates](https://github.com/pdclark/git-plugin-updates). 

What I've hoped I've created in GitHub Updater is a plugin that not only scratches my itch, but also makes plugin and theme development and updating simpler for many other developers within the WordPress community. Next up, Automatic Plugin & Theme Updating from GitHub - Part 2.
