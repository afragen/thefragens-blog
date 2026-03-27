---
title: 'Automatic Plugin &amp; Theme Updating From GitHub – Part 3'
pubDate: '2014-12-16'
categories: ['code', 'git-updater', 'wordpress-2']
tags: ['github', 'plugins', 'themes', 'wp-plugin']
coverImage: "images.jpeg"
description: 'I''ve been doing a lot of tweaking to [GitHub Updat'
---

I've been doing a lot of tweaking to [GitHub Updater](https://github.com/afragen/github-updater). The plugin now runs on the front-end and only for privileged users. This allows for a couple of things.

- It makes less overhead for the non-admin user.
- Second it allows for update services to do their thing.

I've tested with several update services and [iThemes Sync](https://ithemes.com/sync/) works great out of the box. I've been told MainWP works and ManageWP works. ManageWP does not yet have support for child themes but I've been told it's in the works. I've been told mixed things with InfiniteWP and I'm unable to test well against it. 

Classes are autoloaded using `spl_autoload_register` and I'm now using [Parsedown](https://github.com/erusev/parsedown) to render the change logs. Additionally, efficiency gains are achieved by only parsing remote file headers and saving those headers to transients. I've also added 2 new headers ( `Requires PHP` and `Requires WP` ) to set the minimum requirements of both PHP and WordPress for your plugins or themes. If the minimum requirements aren't met on the user's system then your plugin or theme will show an update. One of the biggest changes is a Settings Page. No longer are GitHub Access Tokens or Bitbucket passwords required to be stored within the repository. They can be added after plugin or theme installation. This should help with security.

#### Update Bitbucket Private Repositories

One of the most glaring bugs was my inability to update Bitbucket private repositories. Somewhere along the path to add Settings API functionality or more precisely improving HTTP Authentication headers only for the proper plugins or themes, it seems that Bitbucket private repositories now update correctly.

#### Gitlab??

If anyone's interested in working on a Gitlab module please ping me.
