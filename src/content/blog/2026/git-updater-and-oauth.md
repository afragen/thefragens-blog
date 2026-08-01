---
title: "Git Updater and OAuth"
pubDate: '2026-07-21'
description: "Git Updater delegates OAuth flows to an external connector service, keeping client secrets off the WordPress site while providing seamless token-based authentication for GitHub, GitLab, Bitbucket, and Gitea."
categories: ['git-updater']
---

I've been wanting to bring OAuth to Git Updater for several years now. Honestly it's only because of AI and specifically [CommandCode](https://commandcode.ai) that it and many of the coming new features and improvements are happening.

Git Updater takes a different approach to OAuth. Instead of implementing the full OAuth flow directly inside the WordPress plugin, it delegates that work to an external connector service at [https://git-updater.com](https://git-updater.com). The plugin acts as a client, communicating with the connector through REST endpoints. A huge thanks to my friend [Carl Alexander](https://carlalexander.ca) for building the connector.

Git Updater supports OAuth authentication with GitHub, GitLab, Bitbucket, and Gitea. The OAuth token is read-only by design.

### The Key Pieces

The OAuth system is built around a handful of core components. `OAuth_Connect.php` is the central class that orchestrates the connect, disconnect, callback, and token refresh flows. `Basic_Auth_Loader.php` handles injecting auth headers into API requests and proactively refreshing tokens before they expire. When a request still fails, `API.php` catches 401 or 403 errors and triggers a reactive token refresh. Finally, the appropriate API Add-On provides the settings UI where users click the OAuth connect button.

### How the Flow Works

If a user currently has a saved personal access token updating to a OAuth token is not available until they have first disconnected/unsaved their personal access token.

When a user connects a provider, Git Updater generates a CSRF state token and redirects them to the connector service. The connector handles the actual OAuth dance, then sends the user back with an authorization code. The plugin exchanges that code for access and refresh tokens, which get stored in WordPress site options. A special `{provider}_is_oauth_token` sentinel value distinguishes OAuth tokens from personal access tokens.

To keep things smooth, the plugin refreshes tokens proactively before making API calls. If that still fails, it catches the error and retries. Disconnecting simply removes all stored tokens for that provider.

In testing, it seems that the GitHub OAuth token has an 8 hour expiration, while OAuth tokens for Bitbucket and GitLab have a 2 hours expiration. Not to worry as token refresh is automatic.

If token refresh fails it could be that your login to the specific git host has timed out and you will need to disconnect and re-connect to generate a new token. This may happen after several weeks. I try to capture this type of failure and automatically remove the stale token leaving the Connect OAuth provider button displayed. There should also be an admin notice.

GitHub may require a toggling of the settings on GitHub.com for the _Save_ button to activate.

:::caution
After several weeks, you may need to manually re-connect your OAuth connection as token refresh expires after a period of time. Hopefully you should see an admin notice about this with the OAuth showing the Connect button.
:::

### Security

Security is baked in throughout the flow. CSRF protection uses single-use state tokens with a 10-minute time-to-live. Only users with `manage_options` capability can initiate connections. All `$_GET` and `$_POST` input is sanitized, and the plugin uses `wp_safe_redirect()` for any post-action redirects.

### Gitea Notes

Gitea requires a couple of extra options. You'll need to provide both `gitea_server` and `gitea_client_id` to the connector for the OAuth flow to work correctly. This is because Gitea is only self-hosted.

### Test Coverage

The OAuth system is well tested with over 50 tests.

The whole design keeps client secrets on the connector service, never exposing them to the WordPress site.
