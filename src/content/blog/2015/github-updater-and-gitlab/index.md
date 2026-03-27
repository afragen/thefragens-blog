---
title: 'GitHub Updater & GitLab'
pubDate: '2015-05-24'
categories: ['code', 'git-updater', 'wordpress-2']
tags: ['github', 'githubupdater', 'gitlab', 'wordpress', 'wp-plugin']
coverImage: "images.png"
description: '## GitLab Support  I''ve finally been able to add s'
---

## GitLab Support

I've finally been able to add support for [GitLab](https://gitlab.com) in the [GitHub Updater v4.5.0](https://github.com/afragen/github-updater). Additionally, support for GitLab CE and GitLab Enterprise are also included. All that's required is an additional header with the base URI for the GitLab server. As an example, `GitLab CE: https://gitlab.example.com` or `GitLab Enterprise: https://gitlab.example.com`.

## Extras for GitHub

Support for GitHub Enterprise is also included using a similar header, `GitHub Enterprise: https://github.example.com`.  
Support for updating from GitHub assets is also included if an asset exists for a tagged release. It will be preferentially used for the update. Using an asset's URI for the remote installation of a plugin or theme will also function as expected.

## Under the Hood

A bit of refactoring has been done as well. An `abstract class API` has been created to simplify the structure of all the git server API classes. Additionally a `class Messages` has been created to hold admin notices.  
The `class Base` has been refactored to hold information regarding the added APIs in static arrays for use throughout the codebase.  
I hope everyone likes the changes and updates. As always, if there are problems or improvements, please [create an issue on GitHub](https://github.com/afragen/github-updater/issues).  
Thanks.
