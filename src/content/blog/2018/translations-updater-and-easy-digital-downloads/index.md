---
title: 'Translations Updater and Easy Digital Downloads'
pubDate: '2018-10-17'
categories: ['code', 'wordpress']
heroImage: './images/edd-sitting.png'
description: ''
---

My [Translations Updater](https://github.com/afragen/translations-updater) Composer library also works for any plugins or themes that are using [EDD Software Licensing](https://easydigitaldownloads.com/downloads/software-licensing/). I have recently written about the basic purpose and function of the [Translations Updater library](https://thefragens.com/translations-updater/).

## EDD Software Licensing Integration

As of EDD Software Licensing v3.6, there are a couple of action hooks in the plugin/theme updater samples that allow for this integration. As part of the setup for using EDD SL, you need to create a new EDD SL updater class with a configuration array customized to your plugin.

This array is contains data regarding the specific plugin or theme that uses EDD Software Licensing. Integration with the Translations Updater library only requires the addition of 2 elements to the configuration array and a slightly different command that runs the translations updater.

The additional array elements are a designation to where the translations repository is hosted, GitHub, Bitbucket, GitLab, or Gitea, and the URI to the repository.

```
‘git’ => ‘bitbucket’,
‘languages’ => ‘https://bitbucket.org/afragen/test-language-pack,
```

[Specific instructions](https://github.com/afragen/translations-updater#edd-software-licensing-usage) are in the GitHub repository.
