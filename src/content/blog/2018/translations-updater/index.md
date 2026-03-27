---
title: 'Translations Updater'
pubDate: '2018-10-09'
categories: ['code', 'wordpress']
heroImage: './images/93A1DB01-27D4-422E-AE7A-5C69755DE8A5.png'
description: ''
---

As part of the [GitHub Updater](https://github.com/afragen/github-updater) I introduced a process for independent language pack updating. The normal process is to include translation files, as part of your plugins, in a `/languages` directory inside of your plugin and load them via `load_plugin_textdomain()`. This also works for themes.

## Decoupled Language Packs

If your plugin is in the dot org plugin directory you benefit from translations that are done by the community on GlotPress. If your particular WordPress installation is localized and the plugin has a translation file for that locale, the translation file will be automatically added and none of the other unused translation files will be added.

These translations take precedence over those included in your plugin as of WordPress 4.6. If there are updates for the translation file, they will be added via the normal dashboard update process.

This allows for a decoupled language pack updating experience where the plugin doesn’t need to include additional files that can contribute significantly to the overall plugin size; but can benefit from maintaining the translations independently from the main plugin.

## Get Your Own Decoupled Language Packs

The language pack updating method I created in GitHub Updater works in the same manner as in the dot org plugin directory. The developer maintains a separate repository that contains the language packs and the Translations Updater code independently installs the needed translation files. This allows for a more efficient method of distribution of language packs and allows the main plugin and translations to be developed and maintained separately.

## composer require

Recently I have converted the [Translations Updater](https://github.com/afragen/translations-updater) to a Composer library. In this way it can be installed in any plugin or theme via `composer require afragen/translations-updater:dev-master` and decoupled language pack updating can be used. This does require a separate, public repository that contains the translations files.

I have created a [Language Pack Maker](https://github.com/afragen/language-pack-maker) library that will create the language packs from a folder of translation MO/PO files and create a `language-pack.json` file that contains the data regarding the current state of all the language packs.

## Real World Example

I maintain the [translations for GitHub Updater](https://github.com/afragen/github-updater-translations) using this method. What I do is maintain the public repository of translations and take PRs for updated or new translations. These PRs are only for the MO/PO files. I would then update the repository locally where I would _run_ the Language Pack Maker and then push the new language packs and language-pack.json to the public repository.

As always, ask questions. I’m happy to explain in more detail as needed.

**Update:** The latest version of the Language Pack Maker only requires PO files. It will create MO files and JSON (JavaScript translation files) as appropriate.
