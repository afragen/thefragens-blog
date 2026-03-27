---
title: 'Private Bitbucket Repositories'
pubDate: '2014-12-20'
categories: ['code', 'git-updater', 'wordpress', 'bitbucket', 'plugin', 'themes', 'wp-plugin']
heroImage: './images/images1.jpeg'
description: ''
---

A new update to [GitHub Updater](https://github.com/afragen/github-updater) reorganizes the Settings page. Now the individual user enters their Bitbucket username and password. They **must** have at least `Read` privileges for each private Bitbucket repository. The next section of the Settings page has a checkbox for identifying private Bitbucket repositories. This setup should allow developers to add clients as `Read-only` users to their private repositories and have the client able to update as the repository updates. This should be a substantial security improvement as it no longer exposes the developer's Bitbucket password to the client. As always, please create an issue if there are any problems or if you have any ideas for improvement of GitHub Updater.
