---
title: 'GitHub Updater and Gitea'
pubDate: '2018-07-25'
categories: ['code', 'computer', 'git-updater', 'wordpress-2']
tags: ['gitea', 'githubupdater']
heroImage: "images/gitea_logo.png"
description: 'Gitea is the new kid on the block'
---

[Gitea](https://gogitea.io) is the new kid on the block for creating a self-hosted git server. Gitea is written in [Go](https://golang.com) and is highly performant with very low overhead. In fact, Gitea is so efficient you can run it on a Raspberry Pi. There’s another post coming about that. ;)

As with most integrations of new git servers into GitHub Updater it all starts with an [issue and a user willing to help](https://github.com/afragen/github-updater/issues/640). In this case, the user was [Marco Berchart](https://github.com/marbetschar).

Over the years, I’ve continued to refactor GitHub Updater to become more OOP based and adding Gitea support definitely shows that this was the way to go. Adding support for Gitea was far and away the simplest integration yet. Much of this has to do with API closely following the GitHub API.

Marco was kind enough to start by creating  a PR and we were able to work on a branch until it was complete and able to be merged. There is a demo site at [https://try.gitea.io](https://try.gitea.io) where a test account can be created. There is no guarantee any sort of persistence and don’t expect your data, or possibly even your user, to be around long term. Marco was able to provide an account on his Gitea instance for me to test. I couldn’t have finished the integration with this access.

Since then I have figured out [how to install Gitea on a Raspberry Pi](https://gist.github.com/afragen/e34e4b902a71a5550e04cb1ba7e0d711). I've actually done the process several times and even updated both Go and Gitea. It makes testing much easier for me and it makes setting up your own local git server for less than $100 simple.
