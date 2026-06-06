---
title: "Git Updater Lite version 3"
pubDate: '2026-06-05'
description: "Git Updater Lite is a Composer-distributed client library that lets plugin and theme developers receive automatic updates from a Git Updater server without exposing access tokens. Updates use HMAC-SHA256 signed URLs with a two-step download process for secure token-free delivery."
categories: ['git-updater']
draft: true
---

Git Updater Lite is a standalone client library that lets plugin and theme developers receive automatic updates from a server running the full Git Updater plugin. It's distributed via Composer as a single PHP file that gets embedded directly into the developer's plugin or theme (package).

### How It Works

The system follows a simple server/client model. On the server side, you have the full Git Updater plugin running on your distribution site. It stores all the credentials and auth tokens for your repos. Additionally it stores the API data for the client package. On the client side, Git Updater Lite is a lightweight library that lives inside your plugin or theme. It has no stored credentials of its own, it just queries your server for updates.

### The Core Pieces

The client side is a single file, `Lite.php`, which contains the complete client library. On the server side, there are three key components. `REST_API.php` handles the REST endpoints for update checks, download tokens, and the download proxy. `Lite_Domains.php` manages domain validation settings, and `Additions/Settings.php` provides the "Uses Git Updater Lite" checkbox for marking packages. This is where the developer registers their plugin or theme with Git Updater, indicating that it uses the Lite client for updates and where Git Updater gets the API data for the package.

### Getting Started

Integration is straightforward. A developer adds `composer require afragen/git-updater-lite:^3` and sets an `Update URI` header pointing to their server. When WordPress checks for updates, the client queries the server's REST API to see if a new version is available.

### The Download Process

Starting with version 3.0, downloads use a two-step process. Instead of handing over a direct download link, the server returns a token URL. The client then fetches a fresh, 60-second signed download URL and uses that to grab the package. This means access tokens never leave the server.

### Security

Security is a first-class concern here. The server stores all access tokens for GitHub, GitLab, Bitbucket, and Gitea. When streaming packages through the proxy, tokens are never exposed. Downloads use HMAC-SHA256 signed URLs with a short 60-second TTL. For private packages, you can optionally enable domain validation through the `Lite_Domains` class to restrict which domains can receive updates. The `auth_header` and token credentials are never returned to Lite clients or exposed via REST endpoints.

### Configuration

On the server, you'll find a "Uses Git Updater Lite" checkbox in the Additions tab for each package. There's also a Lite Client Domains tab where you can list authorized base domains per slug, with support for subdomain matching. A few filter hooks are available for customizing the API URL, transient timeout, and authorized domains.

On the client side, all you need is the Update URI header in your plugin or theme. The library handles everything else.
