---
title: 'Installing Gitea on a Raspberry Pi'
pubDate: '2018-08-13'
categories: ['code', 'gitea']
heroImage: './images/image.png'
description: ''
---

While adding an integration for Gitea to [GitHub Updater](https://github.com/afragen/github-updater) I stumbled upon the fact that many were installing Gitea on a Raspberry Pi. Now the Raspberry Pi has developed a cult-like following and the Internet is full of innumerable use cases.

[Gitea](https://gitea.io) is a very performant self-hosted git server written in [Go](https://golang.com). While working on GitHub Updater’s Gitea integration, I was looking for a way to continue to be able to test in the long term. The Gitea access I had during the development was gone and so I was looking for a solution. A Google search showed that many had successfully installed Gitea on a Raspberry Pi.

As of this writing the Raspberry Pi 3B+ is the latest model. It is quite capable for a _credit card_ sized computer. The 3B+ comes complete with WiFi, HDMI, Ethernet, 4 USB ports, and a micro SD card reader all built in.

There are many posts and YouTube videos providing instruction on setting up a Raspberry Pi just to get the point where you can start.

tl;dr, it’s really simple.

However, that’s where the simple stopped. I found a couple of web pages that gave instructions on how to install Gitea and Go on the Raspberry Pi, but most were lacking in some way.

To that end I offer my own fork, [Installing Gitea on a Raspberry Pi 3](https://gist.github.com/afragen/e34e4b902a71a5550e04cb1ba7e0d711).

This version adds instructions that I have followed several times from the beginning to end and come out with a working Gitea server. Within the instructions are instructions on updating both Go and Gitea once the installation is complete.

I offer no warranties and make no claims other than _it worked for me_.
