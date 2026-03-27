---
title: 'WP Core Development with Local Lightning'
pubDate: '2019-07-27'
categories: ['code', 'wordpress', 'development']
description: ''
---

Firstly, this is only meant as a _how I do it_. I'm using MacOS.

## core.git.wordpress.org

It is based on using `git://core.git.wordpress.org/`. This would be similar to WP core development on a regular install using the [WordPress Beta Tester](https://wordpress.org/plugins/wordpress-beta-tester/) plugin set for _bleeding edge nightlies_.

- Create a new site in Local Lightning.

- From Local Lightning **Open Site Shell**

- You should `cd` into `/app`.

- Move the `wp-config.php` and delete `/public`.

- Then clone core.git.wordpress.org to `/public`.

```
cd ..
mv ./public/wp-config.php .
rm -rf ./public
git clone git://core.git.wordpress.org/ public
```

Create symlink of `wp-config.php` into `/public`

```
ln -sv $PWD/wp-config.php $PWD/public/wp-config.php
```

The following can be used to keep your clone less cluttered. Add `./app/public/.gitignore` with the following data.

https://gist.github.com/afragen/43dfff563e942353d866c81904498cb2

Add the above from my [gist](https://gist.github.com/afragen/43dfff563e942353d866c81904498cb2) to the `/app` directory with the following command.

```
curl -o ./public/.gitignore https://gist.githubusercontent.com/afragen/43dfff563e942353d866c81904498cb2/raw/.gitignore
```

Add `[setup-phpunit.sh](https://github.com/afragen/setup-phpunit/blob/master/setup-phpunit.sh)` script for testing.

```
curl -o setup-phpunit.sh https://raw.githubusercontent.com/afragen/setup-phpunit/master/setup-phpunit.sh
```

I’ve written a [script](https://gist.github.com/afragen/977d765414189d5f5fae42215fe92a27) to aid in applying patches or changesets from core.trac.wordpress.org. It is added to the commands as well.

```
curl -o apply-trac-patch.sh https://gist.githubusercontent.com/afragen/977d765414189d5f5fae42215fe92a27/raw/apply-trac-patch.sh
```

Run `setup-phpunit.sh` script.

### Update trunk via `git pull` from `/app/public` using **Open Site Shell**

Below are the list of sequential commands after **Open Site Shell**

https://gist.github.com/afragen/e1aa3ffccf1a73618ee6e756bd95d297#file-core-git-wp-sh

Someway to automate this setup in a _one-click_ install or an _advanced_ setting on the install would be tremendous. see [https://localbyflywheel.com/community/t/feature-request-add-simple-install-of-a-wp-core-dev-environment/12985/3](https://localbyflywheel.com/community/t/feature-request-add-simple-install-of-a-wp-core-dev-environment/12985/3)

## develop.git.wordpress.org

A separate _one-click install_ using `git://develop.git.wordpress.org/` would also be great but that will require installing `npm` and setting the database to display `/build` as the home URL endpoint.

As above you will need to create a new site in Local Lightning and then **Open Site Shell** from Local Lightning.

To make this function, before running the commands you must ensure that your local environment has `wget` and `npm` installed. If you're on a Mac I highly recommend using [Homebrew](https://brew.sh) and `brew install wget`. Installing `npm` using Homebrew can be done but isn't necessarily the recommended method.

I have to give lots of credit to Sal Ferrarello for his post [WordPress Core Development on Local by Flywheel](https://salferrarello.com/wordpress-core-development-local-by-flywheel/) and to Kees Meijer for his script [setup-phpunit.sh](https://gist.github.com/keesiemeijer/a888f3d9609478b310c2d952644891ba)

I had to modify the `setup-phpunit.sh` script to work with Local Lightning. It is heavily biased towards using MacOS. I'm hoping I can get a little help making it more universal. My version is on [GitHub](https://github.com/afragen/setup-phpunit/blob/lightning/setup-phpunit.sh)

Here's the sequential commands I've adapted from Sal's post to use the `git://develop.git.wordpress.org` repository.

https://gist.github.com/afragen/e1aa3ffccf1a73618ee6e756bd95d297#file-develop-git-wp-sh

**_Update for Apple Silicon_**:

Use `nvm` to install node version 16.x. Node v16.x will build on Apple Silicon. The following uses the command line. I have nvm installed via the `zsh-nvm` plugin for oh-my-zsh!

- `nvm install 16`, allow a few minutes to build.

- `nvm use 16`

- `nvm alias default 16`, sets node v16.x as default for each new shell session.

This will automatically install and use the correct version of npm.

I have outlined all of the above in a [Trac ticket comment](https://core.trac.wordpress.org/ticket/52356#comment:4).

The preceding bases your WordPress installation on `develop.git.wordpess.org`. You will open your site from a URL similar to [mylocalsite.local/build/](http://mylocalsite.local/build/) and the dashboard is [mylocalsite.local/build/wp-admin/](http://mylocalsite.local/wp-admin/build/).

## One-click Install

For a one-click install you can use the following commands.

```
# Setup environment from core.git.wordpress.org
sh -c "$(curl -fsSL https://gist.github.com/afragen/e1aa3ffccf1a73618ee6e756bd95d297/raw/core-git-wp.sh)";cd .

# Setup environment from develop.git.wordpress.org
sh -c "$(curl -fsSL https://gist.github.com/afragen/e1aa3ffccf1a73618ee6e756bd95d297/raw/develop-git-wp.sh)";cd .
```
