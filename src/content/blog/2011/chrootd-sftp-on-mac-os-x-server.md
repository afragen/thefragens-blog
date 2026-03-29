---
title: 'chroot''d SFTP on Mac OS X server'
pubDate: '2011-12-16'
categories: ['code', 'apple']
description: 'A detailed walkthrough for setting up a chroot jail for SFTP on Mac OS X Server, covering sshd_config changes, directory ownership rules, using bindfs via Homebrew to mount folders into the jail, and an extra step required after upgrading to Mountain Lion Server.'
---

So here you are finding that you need to grant someone else SFTP access to your server. There are lots of reasons to do this, in my case it's because I needed to grant access to someone's web designer. We initially worked it out by him emailing me files and me SFTP'ing them up to the server in the correct location. Now he needs direct access to fix some things and I want to give him only what he needs without compromising security. Enter the chroot jail. After lots of googling and some encouragement from the Mac OS X Server email list, I've got it working. Here's how it works. 
 
First, you should create the new user in Workgroup Admin and either assign them access privileges for SSH via Server Admin or assign them to a group that has SSH access privileges. Further discussion is below.  
From the Terminal, start off right.  

```bash
sudo cp /etc/sshd_config /etc/sshd_config.bkup
sudo chown root /
sudo chmod 755 /
sudo mkdir -p /chroot/user/scratchpad
sudo chown -R root /chroot
sudo chown user /chroot/user/scratchpad
sudo chmod -R 755 /chroot
```

Every additional new user added will then be something along the lines of the following.  

```bash
sudo mkdir -p /chroot/user2/scratchpad
sudo chown root /chroot/user2
sudo chown user2 /chroot/user2/scratchpad
sudo chmod -R 755 /chroot/user2
```

Every folder in the path to the chroot jail must be owned by `root`. I don't think it matters what group the folder is in. What I did above was to

1. backup `/etc/sshd_config`

3. change ownership of the root directory to `root`

5. change permissions of the root directory to 755

7. create a chroot folder

9. create a user folder inside the chroot folder

11. create a folder inside the user folder that user can modify

13. set ownership and permissions

Now to edit `/etc/sshd_config` to the following.  

```bash
#Subsystem sftp /usr/libexec/sftp-server
Subsystem sftp internal-sftp
Match User user
X11Forwarding no
AllowTcpForwarding no
ForceCommand internal-sftp
ChrootDirectory /chroot/user
```

This creates a chroot jail. When the user logs in will drop them into the folder `/chroot/user`, in that folder is a folder they can add things to `/chroot/user/scratchpad`.  
If you want to create a Group in Workgroup Admin for 'Chroot Users' then add the new users that you created in Workgroup Admin to the Group; you won't have to keep editing the `/etc/sshd_config` file. Instead of the above, add the following. Make sure you add the 'Chroot Users' group to the SSH access ACL in Server Admin.  

```bash
#Subsystem sftp /usr/libexec/sftp-server
Subsystem sftp internal-sftp
Match Group chrootusers
X11Forwarding no
AllowTcpForwarding no
ForceCommand internal-sftp
ChrootDirectory /chroot/%u
```

If you have more than one chroot group just repeat the `Match Group` setup again.  
To test whether the above is working, issue the following from the terminal.  

```bash
$ sftp user@domain.com
Password:
sftp>
```

Getting in is one thing. Now you have to mount the folder you want to use. Unfortunately you can't use a symlink inside of a chroot jail. This is where [Homebrew](http://brew.sh) is your best friend. I don't know why I've never seen fit to install this before. After installation just issue the following commands.  

```bash
brew install bindfs
```

You might have to restart. Now with an empty folder created in `/chroot/user` you can `mount --bind` to a folder outside of the chroot jail. For example  

```bash
sudo /usr/local/bin/bindfs -u user /Library/Server/Web/Sites/Server/Documents/mysite/yourfolder /chroot/user/scratchpad
```

So far this seems to work here.  
**Update for Mountain Lion Server**  
As I've updated my server from Snow Leopard to Mountain Lion, there's one extra step.  
From Workgroup Manager, you will need to create a home folder. Nothing really has to go into it, but it needs to be present. My settings are as follows.  
`Mac OS X Server/Share Point URL:`_afp://myserver.example.com/Users_  
`Path to Home Folder`_username_  
`Full Path`_/Network/Servers/myserver.example.com/Users/username_  
After setting this up the first time it seems to auto-populate for every other user. You'll have to go to the Home tab, select it and Save.
