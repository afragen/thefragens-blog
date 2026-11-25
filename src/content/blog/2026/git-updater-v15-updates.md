---
title: "Git Updater v15 Updates"
pubDate: '2026-11-25'
description: "Package management is easier, private package sharing is safer, updates are more reliable, and the admin gets a noticeable speed boost."
categories: ['git-updater']
---

The next Git Updater release is a big one. Package management is easier, private package sharing is safer, updates are more reliable, and the admin gets a noticeable speed boost.

Here's what's changing.

## Adding and editing packages got easier

Managing packages on the **Additions** tab is now much friendlier.

You can **Quick Edit** a package right in the list. No more deleting and recreating it just to change a setting. Adding a new package has moved to its own page, so the list stays focused on what you already have. Thanks @helgatheviking

We also made the Additions data more resilient. A damaged or hand-edited entry might have been to be able to crash the Additions tab, the Plugins and Themes screens, and the REST API. Now those bad rows are simply skipped and cleaned up the next time you save.

## A safer way to share private packages

The old **Lite Client Domains** list is gone. It asked sites to identify themselves, which meant anyone could claim to be an approved domain. It was convenient, but it wasn't actually protection.

In its place, every site gets its own key automatically. When that site asks for a private package, it shows up on the new **Lite Clients** tab as pending. You approve it once on the Update API server, and it keeps working until you revoke it. Each site is managed separately, and the server only stores a hash of each key.

The best part: public packages need no keys, no approvals, and no configuration. They work exactly as they always have.

> **Using private packages?** This release requires `git-updater-lite` 3.2.0 or newer. Older sites can use the small provisioning shim described in `docs/private-package-rollout.md`. Either way, approve each site once on the **Lite Clients** tab. I do encourage using the most recent version of Git Updater Lite.

## Updates that just work

A handful of long-standing annoyances are fixed:

- **OAuth now works on multisite.** The callback, Disconnect, and Remove Token links pointed to a page WordPress doesn't ship, so they returned 404s.
- **Update links no longer go stale.** A short-lived download link could be stored by a page cache and served long after it expired, causing failed downloads.
- **Webhook updates use fresh data.** Newly pushed tags and release assets are now picked up immediately instead of relying on older cached information.
- **The "please be patient" notice clears.** It could previously stay stuck on healthy sites that simply didn't have a readme, changelog, assets, or tags.
- **Temporary errors don't stick.** A passing 401 or 404 no longer leaves a repo flagged as waiting forever.
- **Your branch stays selected** through cache flushes and upgrades.

## Faster where it counts

Repository data now lives in a dedicated cache table, and common lookups fetch only the fields they need instead of the entire record (previously about 30 KB per read). Repeated reads are cached in memory, and values that haven't changed are no longer rewritten to the database on every request.

You'll notice it most on busy sites and in the admin, where the difference adds up quickly.

## Security, quietly tightened

This release closes several gaps worth fixing:

- Settings, remote installs, and API key resets now require the right permissions and a valid nonce. The key reset also requires a POST request.
- Remote installs and downloads are limited to approved hosts, and stored access tokens are only sent to hosts authorized for that provider.
- Remote changelog and readme content is cleaned before it's cached.
- Fixed a first-request authentication bypass, a URL injection via crafted branch names, and a cross-site request forgery path in remote installs.

None of these change how normal, public updates work.

## Ready for the future

The plugin is now clean on PHP 8.5 and 8.6, with deprecation warnings fixed and a CI check that catches new ones early.

The Add-On list itself is now a responsive card grid: two cards per row on medium screens, three on wide ones, and a clean single column on phones.

## What you need to do

- **Public packages:** nothing. Updates continue as before.
- **Private packages:** update `git-updater-lite` to 3.2.0 or newer (or use the provisioning shim), then approve each site once on the **Lite Clients** tab.
- **Multisite with OAuth:** no action needed; the links now work.

That's the release: easier management, safer private sharing, fewer surprises, and a faster admin.
