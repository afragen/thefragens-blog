---
title: 'Setting up WordPress local docker environment for Apple Silicon'
pubDate: '2022-09-05'
categories: ['code', 'apple', 'wordpress']
description: 'A step-by-step checklist for standing up the official wordpress-develop Docker environment on Apple Silicon, covering Homebrew, git, Docker, nvm, npm, docker-compose overrides, and shortcut commands for initializing, cleaning up, running PHPUnit tests, and applying Trac patches.'
---

[WordPress Local Environment](https://make.wordpress.org/core/2019/08/05/wordpress-local-environment/)

Don't forget to save any new path commands into **.zshrc** so the terminal session persists.

1. Open the Terminal app

3. Install [homebrew](https://brew.sh)

5. You might be asked if you want to install the Xcode Command Line Tools, confirm.

7. Install **git** by typing `brew install git`

9. Install Docker on [Apple Silicon](https://docs.docker.com/desktop/mac/apple-silicon/)

11. Install **node** via `brew install node@20`, your preference.
     - I install **node** via **nvm**, but it's not necessary
     
     - Install Node by using **nvm** ( I use **node 20.x** at the moment )
         - Open a terminal session
         
         - `brew install nvm`
         
         - Run `nvm install 20`
         
         - Run `nvm use 20`
         
         - Run `nvm alias default 20`, so every shell session uses this version of node by default

13. Install **npm** via `brew install npm@10`
     - Switch to _npm v10.x_ via `npm install npm@10 -g`
     
     - Make sure you copy path commands to your **.zshrc** file

15. Clone the GitHub repository with the **wordpress-develop** environment.
     - Open a terminal session
     
     ```bash
     cd ~
     git clone https://github.com/WordPress/wordpress-develop.git
     cd ./wordpress-develop
     ```

17. Open the Docker app in your computer and ignore the welcome screen that tells you to create a container

19. Install `docker-compose.override.yml` using `curl -o ./docker-compose.override.yml https://gist.githubusercontent.com/afragen/a10d0475b71bfb79745df52ed3300924/raw/docker-compose.override.yml`

21. Install `custom-php-config.ini` using `curl -o ../custom-php-config.ini https://gist.githubusercontent.com/afragen/a10d0475b71bfb79745df52ed3300924/raw/custom-php-config.ini`

23. Now type these commands in the terminal

     ```bash
     npm install
     npm run build:dev
     npm run env:start
     npm run env:install
     ```

25. You should be able to access the development version of WordPress at [localhost:8889](http://localhost:8889/). You can access it with username **admin** and password **password**

27. Additional commands  
     ```js
     npm run env:stop
     npm run env:reset
     ```

## Shortcuts

### Initialize

- Open a terminal session

- `cd ./wordpress-develop`

- Open Docker.app

- `rm -rf node_modules && npm install && npm run build:dev && npm run env:start && npm run env:install`

May need to re-run `npm run env:install` if it stalls or errors at end. This is because MySQL may not be ready yet.

### Cleanup

- `npm run env:stop && npm run env:reset && rm -rf node_modules`

- Quit Docker Desktop when done.

### Run individual tests

- `npm run test:php -- --filter Tests_Admin_IncludesWpUpgrader`

- `npm run test:php -- --group admin`

Testing patches

- `npm run grunt patch:#####` where `#####` is the trac ticket number

- `npm run grunt patch:https://github.com/WordPress/wordpress-develop/pull/###` where `###` is the PR on GitHub

Don't commit `package-lock.json` with your PR to core or you will have issues.
