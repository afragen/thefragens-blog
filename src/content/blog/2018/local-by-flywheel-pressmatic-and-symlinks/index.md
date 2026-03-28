---
title: 'Local by Flywheel (Pressmatic) and Symlinks'
pubDate: '2018-06-06'
categories: ['code']
heroImage: './images/LbF-logo.png'
description: 'A walkthrough of using symlinks with Local by Flywheel to mirror a local git repository into the wp-content plugins or themes folder, with a bash script to automate recreating the symlinks after the Volumes addon sets up shared folders so IDE editing and version control work together seamlessly.'
---

I've changed development environments a couple of times. I started out using DesktopServer, a wonderful app. Gradually I grew disappointed with their update schedule and v4.0 ever on the horizon. One of the things I didn't like was my inability to choose the PHP version I was developing in. I know there must be a way but it wasn't obvious.

Feeling like I needed a challenge, I set out to learn how to use Vagrant and VVV cause all the cool kids were using it. Once I got it up and running it worked well. There were a number of quirky things that I needed to figure out for my workflow.

From my initial time with DesktopServer I was using GitHub and local git on my MacBook Air, using Tower, for version control. Currently I’m using GitKraken, but that’s another post. I kept all my local repos synced on GitHub. When using DesktopServer I would create a symlink to the `/wp-content/plugins` or `/wp-content/themes` folder of the local environment from my local repo.

This didn't quite work in VVV as symlinks don't work in Vagrant. Vagrant requires creating a _synced folder_ which is similar, but not the same. I was able to create a [Customfile](https://gist.github.com/afragen/549cc092a1f61c2a8d7c), custom config file, for my VVV installation that would create synced folders at each `vagrant up`. This synced folder appeared on the desktop as an empty folder but in the site it ran perfectly. The problem was that in my IDE, PhpStorm, there was nothing in the folder to edit. I found that removing this synced folder and replacing it with an actual symlink made everything work in both my IDE and on the site. Perfect, I was back to my usual workflow.

The issue I had was that every time I did a `vagrant up` or a `vagrant reprovision`, Vagrant would destroy my synced folder and I would have to run the Customfile again to recreate it. As many know, Vagrant isn't a speed demon during a `vagrant up` and the additional code of creating multiple synced folders was considerable. Add to that the extra step of creating the symlinks each time, then I was set.

When Pressmatic came on the scene I was already considering dipping my hand into Docker, but was slightly intimidated. Pressmatic made all of that so much simpler. Pressmatic was purchase by Flywheel, rebranded and released as a free tool, [Local by Flywheel](https://local.getflywheel.com/). OK so the name is kinda blah and the really cool Pressmatic logo is no more, but it works great! Local soon developed an add-on that created shared/synced volumes which pretty much was the same result as my Customfile in VVV. The only problem was I couldn't find any simple way to re-create my experience of switching to a symlink. Part of the problem was that I was very dissatisfied with amount of time required at provisioning in Vagrant and the thought of having to do this multiple times a day was daunting.

I changed my workflow to use an small app that synced folders in the background. It worked, but was clearly a kludge. Out of curiousity I created a synced folder using the [Local by Flywheel Volumes Addon](https://github.com/getflywheel/local-addon-volumes) and then changed this folder to a symlink. Instantly I was back in business when using my IDE. The best part was that the symlink persisted through the Local Machine restarts and re-provisioning the individual sites.

Since then I've created a [bash script](https://gist.github.com/afragen/748e4780b6057d4c41cf9e466557042a) to automatically create the symlinks after the Volumes have been added. I can now effectly re-create my normal workflow and even better as in Docker, synced folders seem to be persistent.

I’m sure my understanding of synced folders was probably incorrect and they were persistent all along. I just didn’t _see_ it at the time.

As of this writing both Local by Flywheel and the Volumes addon have been updated several times. The current versions are completely compatible and functional.

This setup may not be for everyone, but I’ve found it allows me to develop locally and continue to use git for version control.
