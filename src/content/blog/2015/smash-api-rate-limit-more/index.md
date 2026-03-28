---
title: 'Smash API Rate Limit &#038; More'
pubDate: '2015-04-05'
categories: ['code', 'git-updater', 'wordpress']
heroImage: './images/GitHub_Updater_logo-e1425494828563.png'
description: ''
---

So [GitHub Updater](https://github.com/afragen/github-updater) just received a couple of new features in version 4.3.0. At the suggestion of @mlteal, there is now a setting to add a [personal GitHub Access Token](https://github.com/settings/applications). You must at least select `public_repos`. What this does is blast away the limit of 60 API calls per hour and raises it to 5000 API calls per hours. If you need more than than I've got nothing more for ya. :smiley: At the suggestion of our friends at [Pods](http://pods.io) I've added the ability to switch between branches of a plugin. You must ensure that all branches have the appropriate headers otherwise you may find yourself unable to update. :frowning: @szepeviktor has been driving me to fix a number of things including now having _View details_ available on the plugins page.
