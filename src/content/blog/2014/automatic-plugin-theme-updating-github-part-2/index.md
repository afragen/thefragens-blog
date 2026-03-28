---
title: 'Automatic Plugin &amp; Theme Updating From GitHub – Part 2'
pubDate: '2014-08-21'
categories: ['code', 'git-updater', 'wordpress']
heroImage: './images/github2.jpeg'
description: ''
---

In Part 1, I tried to describe some of the why and a little of the how I've gotten to this point with [GitHub Updater](https://github.com/afragen/github-updater). In this point I'll try to go into a bit about how the plugin works. 

The basic premise and design of GitHub Updater is to be very lightweight to both the developer and the end user. For the developer, inclusion of only one or two lines of code in the plugin or theme header will allow it to get automatic updates via GitHub Updater. All the end user needs to do is install and activate (or network activate) the GitHub Updater plugin. 

GitHub Updater is even smart enough to allow for plugins to be hosted on WP.org and get updates from WP.org as long as the branch header is `master`. If the developer wants to update from GitHub all they need to do is change the branch header to something other than `master`. I use this for development by designating `GitHub Branch: develop` on my development site. Please refer to the README for a better explanation. When the branch is `master` and there are tagged releases, these tagged released are preferentially used for updates. When the branch is something other than `master`, tagged versions are ignored and the specified branch is used during the update. 

In the plugin's evolution I think I'm using some better OOP practices. As such, as I search though all the plugins and themes in the user's installation I parse out those that don't have the requisite header. When I find a plugin or theme that has the appropriate header, either `GitHub Plugin URI`, `GitHub Theme URI`, `Bitbucket Plugin URI`, or `Bitbucket Theme URI` what happens is that the URI is parsed and data from the local plugin is placed into a class object. As you've no doubt just noticed the GitHub Updater does also works with [Bitbucket](https://bitbucket.org) hosted code too. 

After gathering the local data, the plugin reaches out to GitHub via the GitHub API to get the remote info. At this point there is lots of transient setting and getting so the GitHub API doesn't get hit too frequently. This is necessary because GitHub's API only allows 60 unauthenticated requests per hour. More than 60 requests per hour yields a 403 error. Bitbucket's API doesn't seem to have this limitation, but the results are cached nonetheless. Each API class, so far just GitHub and Bitbucket, is written as an extender class. Doing it this way should allow for adding additional API classes for additional git repos in a more logical fashion. Think Gitlab. 

A `CHANGES.md` file is also parsed, if present, to add into the View Details screen. At this time parsing a standard `readme.txt` isn't done, but it's certainly something on the horizon. I've also created a pseudo-rating based upon the number of stars, forks and issues the repo has. The updating is hooked into WordPress' core methods, as is renaming of the downloaded plugin/theme update. So far so good and GitHub Updater just works in WordPress 4.0beta. I'm sure there's probably another post, Automatic Plugin & Theme Updating from GitHub - Part 3, coming.
