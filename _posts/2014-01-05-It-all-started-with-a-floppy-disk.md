---
layout: post
title:  It all started with a floppy disk
tags: [retro, msdos ]
location: London, England
excerpt: This nostalgia's not what it used to be (part 1) - Installing MSDOS 6.2.2
comments: true
share: true
---

It's really strange that something can be in plain sight for many years and yet be invisible to you.

There's a couple of boxes of floppy disks that have sat on a shelf above my desk for about the last 15 years. Somewhere round about 12 years ago I stopped using them. Shortly after that they were in my line of sight but effectively invisible.

Just the other day (and don't ask me why) I 'saw' them for the first time in years and had a quick shufty<sup>1</sup> through them. Cue instant nostalgia...

One of the first things I came across in that little box of tricks was the disk containing my old M.Sc. dissertation on Ray Tracing (more of which in a later post). Just deciding to have a quick look at the paper wasn't enough of course, because who actually has a computer with a floppy drive on it any more, I sure didn't.

The answer was a USB floppy drive, the next problem was that Windows 7 resolutely refused to recognise the device! OS X of course had no such problem. Strange that Apple removed the presence of floppies from their product lines long before PC manufacturers did (~1998) but still allow you to use them today. Strange or just sensible?

Anyhow. On the disk with the dissertation were the source file for the ray tracer and in the same box of disks as the code were some MSDOS 6.2.2 disks and those for turbo C++ 1.01. So, well, you have to don't you :-)

Installing Dos 6.2.2
--------------------

I must have done this hundreds of times back in the day. So often in fact that I barely even 'saw' what I was looking at on the screen either (more selective blindness). When you do this for the first time in over ten years there is an almost visceral pleasure that can be derived just from hearing the mundane sound of a disk drive spinning up.

Oh and it takes way longer than I remember to install.

I'm doing my install on parallels for OS X and from the original media. The machine has the following spec

	* 32MB Video memory
	* 32MB RAM
	* 2GB Harddrive

It would have been beyond my wildest dreams to be able to afford a PC with that spec in 1994. That makes me a virtual rich man now (and unfortunately only virtually).

The disk is in and whirring and clanking (Oh yeah) and we have our first install screen. All, please note younglings, in glorious text mode.



<div class="dbImg centeredImg dos" data-src="2012-07-21/001.png" ></div>


Now for some directions and warnings. I do love the line 'If you have not backed up your files recently, you might want to do so before installing MS-DOS'. Just you might want to? Wow, now-a-days that would have a link to a page of disclaimers from Microsoft the size of a small telephone directory.

<div class="dbImg centeredImg dos" data-src="2012-07-21/002.png" ></div>


But we *must*, we _need_ to continue so we hit enter.

<div class="dbImg centeredImg dos" data-src="2012-07-21/003.png" ></div>

It's format or bust at this point so let's get on with the killin. The installer has blasted the partition table so we need a reboot.

<div class="dbImg centeredImg dos" data-src="2012-07-21/004.png" ></div>

And now we watch the drive format. Slowly. Very slowly. Very, Very slowly. I can't remember when quick format was introduced, but I'm glad it was.

<div class="dbImg centeredImg dos" data-src="2012-07-21/005.png" ></div>

Decision time, are we citizens of the US of A? Well no in this case so we:

<div class="dbImg centeredImg dos" data-src="2012-07-21/006.png" ></div>


select the country we are in

<div class="dbImg centeredImg dos" data-src="2012-07-21/007.png" ></div>

and the keyboard we use.

<div class="dbImg centeredImg dos" data-src="2012-07-21/008.png" ></div>

where Microsoft should shove it

<div class="dbImg centeredImg dos" data-src="2012-07-21/009.png" ></div>

then load disk

<div class="dbImg centeredImg dos" data-src="2012-07-21/010.png" ></div>

after disk (well three in total)

<div class="dbImg centeredImg dos" data-src="2012-07-21/011.png" ></div>


Nearly there 

<div class="dbImg centeredImg dos" data-src="2012-07-21/012.png" ></div>


We remove disk three, press enter

<div class="dbImg centeredImg dos" data-src="2012-07-21/013.png" ></div>


And... She lives!

<div class="dbImg centeredImg dos" data-src="2012-07-21/014.png" ></div>


Gosh HIMEM, gotta remember about that, didn't we have to optimise it or some such? It's gonna be fun remembering.

* * *

<sup>1</sup> Shufty = Look for anyone who doesn't have British slang English as a first language

