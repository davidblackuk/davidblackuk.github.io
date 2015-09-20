---
layout: post
title:  It all started with a floppy disk part 2
tags: [ retro, msdos ]
location: London, England
excerpt: This nostalgia's not what it used to be (part 2) - Installing Turbo C++
comments: true
share: true
---

For a very long time the kings of the compiler on the MSDOS platform were Borland. Borland provided compilers for Pascal, C, C++ and even (at least I think I remember this) Prolog.

Borland's compilers were quicker than the competition, the resultant code was faster and the IDEs were better. Though no one used to Visual studio, Eclipse or even X-Code would never believe the term IDE was applicable. But applicable it was, the development environment had an editor, compiler and debugger built in. At the time, *that* was simply awesome.

I'm going to need a compiler to let me have a look at my ray tracer that I wrote for my dissertation and since I wrote the project in Turbo C++ lets have a look at the install process for that on MSDOS.

I copied the two floppy disks onto the hard drive into a folder named `install` to make the process a little quicker.

<div class="dbImg centeredImg dos" data-src="2012-07-21-2/001.png" ></div>


We start the install process by typing `install` to launch `install.exe`. It's worth remembering that you had to at least glance at the install guide before installing a DOS application since there were no `msi`'s then and no standardised `setup.exe`

<div class="dbImg centeredImg dos" data-src="2012-07-21-2/002.png" ></div>


So all looking very good so far, copyright and vendor information and then comes the bomb shell. You will need about 7.5 megabytes of available disk space. 7.5 megabytes!, for and IDE a compiler and runtime? Ridiculous :-)

I think the system requirements of Visual studio 2010 Ultimate is 3GB of disk space, or about 3072MB. Do you think Visual Studio 2010 is 410 times better? 

We pick our `c:\` drive to install from:

<div class="dbImg centeredImg dos" data-src="2012-07-21-2/003.png" ></div>


and we specify the install folder that we copied the diskettes to:

<div class="dbImg centeredImg dos" data-src="2012-07-21-2/004.png" ></div>

I know it's a whole 7.5 MB of space on disk but what the heck we'll have the lot please.

<div class="dbImg centeredImg dos" data-src="2012-07-21-2/005.png" ></div>

Now we get the file copying action. It took about 2 minutes to install. The first version of Visual Studio .NET I ever installed to about two hours.

<div class="dbImg centeredImg dos" data-src="2012-07-21-2/006.png" ></div>

The next bit is different. DOS installer didn't have a registry to muck about with so we are directed to edit out config.sys file to increase the maximum number of files that can be open at once and to add our `tc.exe` to the `path` environment vairable so we can execute it. 

<div class="dbImg centeredImg dos" data-src="2012-07-21-2/007.png" ></div>

Finally we get a reminder of how to access the Turbo C++ feature tour.

<div class="dbImg centeredImg dos" data-src="2012-07-21-2/008.png" ></div>



and when we run the beast we see:

<div class="dbImg centeredImg dos" data-src="2012-07-21-2/012.png" ></div>



Playing with the IDE for a while is a real exercise in nostalgia, you can have multiple  windows open, move and resize them using key strokes, build, run and debug all mouse free. Yes you can use a computer without a mouse or a touch screen. Try it :-)




