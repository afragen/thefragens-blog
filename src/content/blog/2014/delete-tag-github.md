---
title: 'Delete a Tag From GitHub'
pubDate: '2014-04-20'
categories: ['code']
description: 'A quick tip showing how to delete a remote tag from GitHub with a single terminal command, motivated by not wanting to create version tags for minor CSS tweaks to personal child themes.'
---

So I decided that I really didn't need to tag releases of child themes that only I am using. Probably not best case usage but I got tired of pushing tags for minor CSS changes. So I opened the terminal and `cd` to the appropriate local git directory that has a remote on GitHub. Then it's a simple command. `git push --delete origin tagname` Where `tagname` is the tag version number.
