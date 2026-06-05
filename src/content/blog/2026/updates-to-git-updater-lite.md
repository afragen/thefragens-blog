---
title: "Updates to Git Updater Lite"
pubDate: '2026-06-05'
description: "Git Updater Lite Integration Summary"
categories: ['git-updater']
draft: true
---

Purpose: Git Updater Lite is a standalone client library (distributed via Composer) that enables plugin/theme developers to receive automatic updates from a remote server running the full Git Updater plugin.

#### Architecture: Server/Client Model

**GIT UPDATER (Server)**               
  - Full WP plugin                     
  - Runs on distribution site          
  - Stores all necessary credentials   
  - Has auth tokens for repos          

**GIT UPDATER LITE (Client)**
  - Embedded library (single PHP file) via Composer
  - Runs inside customer plugins/themes
  - No stored credentials
  - Queries server for updates

#### Core Components

Client Side (in /Users/afragen/Documents/github/git-updater-lite/):

- Lite.php (530 lines) - Complete client library

Server Side (in Git Updater plugin):

- src/Git_Updater/REST/REST_API.php - REST endpoints (update-api, download-token, download proxy)
- src/Git_Updater/Lite_Domains.php - Domain validation settings
- src/Git_Updater/Additions/Settings.php - uses_lite checkbox for marking packages

#### Integration Flow

1. Embedding: Developer adds `composer require afragen/git-updater-lite:^3` and Update URI: https://server.com header
2. Update Detection: Client queries GET `/wp-json/git-updater/v1/update-api/?slug=<slug>`
3. Two-Step Download (v3.0):
  - Server returns token URL instead of direct download link
  - Client fetches 60-second signed download URL
  - Client downloads package using fresh signed URL

#### Security Model

- Server stores all access tokens (GitHub/GitLab/Bitbucket/Gitea)
- Proxy download streams packages without exposing tokens
- HMAC-SHA256 signed URLs with 60-second TTL
- Optional domain validation via Lite_Domains class, for private packages
- auth_header is never returned to Lite clients and never exposed via REST endpoints

#### Configuration

Server-Side Settings:

- Additions Tab: "Uses Git Updater Lite" checkbox per package
- Lite Client Domains Tab: Authorized base domains per slug (supports subdomain matching) limits updates to only those domains listed
- Filter Hooks: git_updater_lite_api_url, git_updater_lite_transient_timeout, git_updater_lite_authorized_domains

Client-Side: Only requires Update URI header in plugin/theme

The design ensures upstream access tokens never reach client sites while providing seamless automatic updates.
