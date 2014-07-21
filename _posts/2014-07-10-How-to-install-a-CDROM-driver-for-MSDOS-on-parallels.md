---
layout: post
title:  How to install a CDROM driver for MSDOS on parallels
tags: [ retro, msdos, parallels]
location: London, England
excerpt: In which we learn that things were much less simple in the 'Good old days', when everything 'Just worked'
comments: true
share: true
---

If you have an interest in retro-computing, there are certain things you need to learn. If you're old enough to have used these systems originally then these are things that you need to remember. The first thing to bare in mind is just how primitive PCs were in the early days.

Just because your brand new, _slim_, sexy Compaq Deskpro PC comes with a CDROM drive,

<img src="../../images/2014-07-10-How-to-install-a-CDROM-driver-for-MSDOS-on-parallels/deskPro.png" alt="Picture od a big fat old Compaq desktop computer." class="dosShot screenShot" />

doesn't mean that it'll actually work with your operating system. Oh no, having it working is an optional extra!

Before Apple courted controversy by taking the CDROM out of their computers, Microsoft tried to make their adoption as difficult as possible by not including a standard driver in MSDOS 6. Well actually..., that's a total load of baloney, the truth was that at that time there were no standards for CDROM, so Microsoft did the sensible thing, they provided the infrastructure and left it to the manufacturers to implement the drivers.

Your CDROM kit used to come with a CDROM, screws, an IDE cable and a driver disk. While our parallels virtual machine comes with the CDROM fitted, we need to find the drivers disk and install it (There's no virtual machine extensions for DOS that I know of). To install the CDROM driver

+ 	Download the driver  [diskette image][ds]
+ 	Mount the diskette image in parallels
	+ 	Devices > Floppy disk > Mount image
	+ 	navigate to the .img file you just downloaded and select

Once the driver diskette image is mounted go back to MSDOS, change directory to the `A:` drive and install the driver using the setup batch file.

	CD A:\
	SETUP.BAT

_Note:_ You must run the SETUP.BAT file the SETUP.EXE file is for a windows install. 

That's it you can now mount an ISO in Parallels and access it via D:. I'll cover how to make an ISO from an OSX folder  in another post. 

Install 
[ds]: http://www.gnsdata.webs.com/private/drivers/cdrom.img

