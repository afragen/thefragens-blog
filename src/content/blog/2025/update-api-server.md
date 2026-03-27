---
title: 'Update API Server'
pubDate: '2025-01-01'
categories: ['git-updater', 'wordpress-2']
tags: ['git-updater', 'wordpress']
description: 'In the post on [Git Updater Lite](https://thefrage'
---

In the post on [Git Updater Lite](https://thefragens.com/git-updater-lite/) I referred to Git Updater as the update server. I believe this to be somewhat inaccurate as what Git Updater is serving corresponds to an update API response. Perhaps a better description of what Git Updater's role here is as an Update API Server.

Git Updater does not act as the update server. Updates come directly from the associated git host, ie GitHub.

With the coming release of Git Updater v12.9.0, Git Updater will be able to server an Update API response for a plugin that is integrated and installed on the same site or a plugin that is _virtually_ integrated with Git Updater via the [Additions](https://git-updater.com/knowledge-base/git-updater-additions/) tab. The same applies to themes.

With a virtual integration via the Additions tab, the plugin doesn't need to have direct integration with Git Updater. It doesn't even need to be installed on the site. It only needs 4 pieces of data: the repository URI, the repository slug, the primary branch, and whether or not there is an associated release asset for the repository.

For instance, the [Gutenberg - Nightly](https://github.com/bph/gutenberg) plugin put together by the Gutenberg Team and Birgit Pauli-Haack ([Gutenberg Times](https://gutenbergtimes.com)).

- **slug** - gutenberg/gutenberg.php

- **URL** - https://github.com/bph/gutenberg

- **primary branch** - trunk

- **release asset** - true

`[https://test.thefragens.net/wp-json/git-updater/v1/update-api/?slug=gutenberg](https://test.thefragens.net/wp-json/git-updater/v1/update-api/?slug=gutenberg)`

There is an associated REST endpoint that flushes the repository specific cache from the Update API Server and can be used in a GitHub repository webhook that runs on a release. This would cause the Update API response to regenerate with the latest data from GitHub.

`https://test.thefragens.net/wp-json/git-updater/v1/flush-repo-cache/?slug=gutenberg`

Git Updater Lite lightly caches the Update API response and only regenerates it at similar times as Core does for plugin update checks.
