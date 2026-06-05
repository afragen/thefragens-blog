---
title: "Git Updater and OAuth"
pubDate: '2026-06-05'
description: "OAuth Integration Summary - Git Updater"
categories: ['git-updater']
draft: true
---

Architecture: Git Updater delegates OAuth flows to an external connector service at https://git-updater.com rather than implementing OAuth directly. The WordPress plugin acts as a client, communicating with the connector via REST endpoints. Special thanks to my friend [Carl Alexander](https://carlalexander.ca) for the connector.

Supported Providers: GitHub, GitLab, Bitbucket, Gitea

#### Core Components

  - src/Git_Updater/OAuth/OAuth_Connect.php - Central OAuth class handling connect/disconnect/callback/refresh flows
  - src/Git_Updater/Traits/Basic_Auth_Loader.php - Injects auth headers and proactively refreshes tokens before API calls
  - src/Git_Updater/API/API.php - Reactive token refresh on 401/403 errors
  - src/Git_Updater/API/GitHub_API.php - Settings UI with OAuth connect button

#### Authentication Flow

  1. Connect: Generates CSRF state token → redirects to connector → connector handles OAuth dance → callback exchanges code for tokens
  2. Token Storage: Stored in WordPress site options under {provider}_access_token, {provider}_refresh_token, etc. An
  {provider}_is_oauth_token string sentinel distinguishes OAuth from PATs
  3. Proactive Refresh: Checked before API calls in Basic_Auth_Loader::add_auth_header()
  4. Reactive Refresh: Triggered on 401/403 responses in API::api()
  5. Disconnect: Removes all provider tokens from options

#### Security Features

  - CSRF protection with single-use state tokens (10-min TTL)
  - manage_options capability checks
  - Input sanitization on all $_GET/$_POST
  - wp_safe_redirect() for post-action redirects

#### Gitea-Specific

Requires additional gitea_server and gitea_client_id options passed to the connector

#### Test Coverage

Comprehensive suite in tests/test-oauth-connect.php (50+ tests) plus related tests in test-api.php, test-basic-auth-loader.php, and test-github-api.php

The design keeps client secrets on the connector service, never exposing them to the WordPress site.
