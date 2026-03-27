---
title: 'GitHub Updater - the Path to 8'
pubDate: '2018-06-27'
categories: ['code', 'git-updater', 'wordpress-2']
description: 'In July it will have been 5 years since the first '
---

In July it will have been 5 years since the first commit to GitHub Updater. In its 5 year span it has grown significantly in its evolution from a single file plugin to the complex integrated object oriented plugin that exists today.

Version 8 will see a bump in the requirement to at least PHP 5.6. Yes, it does work in PHP 7.2 but as PHP 5.6 is the lowest version of PHP still supported, I thought this was a nice minimum requirement. When PHP 5.6 becomes EOL’d I will transition up to PHP 7. I can only hope that at some point WordPress follows suit. I have learned that what this also means is that the bootstrap file needs to be compliant with a lower PHP version or the file will white screen the user’s site.

Version 8 has also seen a more modular architecture to the core of the plugin. What this means is that I’ve added a number of hooks to now allow me to keep most of the specific code siloed into its own classes. This has especially been beneficial to the Settings and Install functions.

In the Settings, this can result in a slight cosmetic difference as the APIs are hit and the server specific subtabs display. I’ve added a number of icons, tooltips, and notices to let the user know what’s happening and that no it’s not broken.

In case I haven’t mentioned it before, GitHub Updater also works with WP-CLI and can be used with a webhook for a _continuous integration_ type of updating.

There’s already been a bump to version 8.1.1. The new feature is automatic renaming of the GitHub Updater plugin upon activation. If the plugin is renamed the activation fails as the _activated_ plugin no longer exists. It has been renamed. ;)

As always, the best source of current information about GitHub Updater is the [wiki](https://github.com/afragen/github-updater/wiki).

Here’s the [changelog](https://github.com/afragen/github-updater/blob/develop/CHANGES.md).
