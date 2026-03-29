---
title: 'GitHub Updater and Background Updates'
pubDate: '2018-06-18'
categories: ['git-updater']
description: 'GitHub Updater now offloads its remote API calls to WP-Cron so update data is fetched in the background, dramatically reducing dashboard wait times while providing status indicators so users know processing is still in progress.'
---

[GitHub Updater](https://github.com/afragen/github-updater) is a WordPress plugin that seeks to emulate the wp-admin dashboard updating experience for plugins and themes hosted on other git hosts. Among the most popular git hosts to use for _social coding_, or simply provide an external version control system, are GitHub, Bitbucket, GitLab, and Gitea. In order to provide an identical in-app experience GitHub Updater needs to make 5-6 API calls to the get all the data required. There are ways, and hooks, to bypass some of these API calls and therefore speed up the process, but this can result in a lesser experience.

A solution presented itself in WP-Cron. By using WP-Cron I have been able to drastically reduce the time required to bring the site back to a usable condition while GitHub Updater does its API checks in the background.

Naturally there is a hook to bypass this system as troubleshooting when WP-Cron is active can be difficult.

Using a background process does mean that there may be times when the user might try to access an update or branch switching and it may not yet be available. I’ve tried to make as many indicators as I can to let the user know that nothing is broken and that they are simply waiting on WP-Cron to finish.

The overall result is a much faster response time and much less potential wait while the GitHub Updater cache is updating or being refreshed.

As always there is more information in the [wiki](https://github.com/afragen/github-updater/wiki/Background-Processing).
