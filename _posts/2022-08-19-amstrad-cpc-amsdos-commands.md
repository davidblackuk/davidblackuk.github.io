---
layout: post
title:  "Amstrad CPC: AMSDOS, disk commands"
tags: [ 8bit, ROMs, amstrad, cpc, amsdos, cpm, retro]
location: London, England
excerpt: "I have recently been playing around with an Amstrad CPC 6128 and had forgotten all i knew about AMSDOS"
description: "I have recently been playing around with an Amstrad CPC 6128 and had forgotten all i knew about AMSDOS" 
comments: true
share: true
thumbnail: "amsdos.png"
date: 2022-08-19
---

# Getting around to it

I pulled an old CPC 6128 out of the loft recently, by recently I mean during lock down 1, over a year ago. So having had it sit on the shelf in my home-office for a year, I decided to start playing with it, after a re-cap and of course the inevitable disc drive belt replacement.

<div class="dbImg zoom50 centeredImg" data-src="cpc/cpc-128-replacement-belt.png" alt="Picture of a replacement belt in a bag." ></div>

<div class="dbCaption">
The replacement belt, source url in the photo.
</div>

That year between pulling the CPC out of the attic and actually getting around to doing something about it, is a good example of why I called this blog "Over taken by events". The fact that the last post on this site was a year ago also, is equally indicative!

When I first had a plugged in and working system, via a hodgepodge of adaptors, I inserted a disc, typed `cat`, got a directory listing then typed `run"custard` to start the game, I thought I'd bossed it, What a memory!

<div class="dbImg zoom200 centeredImg" data-src="cpc/cpc-custard-pie-factory.png" alt="Picture of a replacement belt in a bag." ></div>

<div class="dbCaption">
Ahh, my first CPC game published by Tynesoft.
</div>

However I pretty quickly realized I couldn't remember any of the other disc commands. This post is the culmination of my head scratching around this which, I hope, might save you time if you're getting back into the CPC.

The CPC had two distinct ways of accessing a floppy disc, AMSDOS: which was the native CPC disc access method, used to run CPC programs; and CPM, used to run business apps and Zork. CPM is beyond the scope of this article but I will cover it in a later post.

## Beginnings

The Amstrad CPC 464, the original Amstrad Color Personal Computer didn't come with floppy support at all, it had a built in cassette deck. To add support external floppies you plugged in and expansion card, the snappily named DDI-1. This contained a 765 disc drive controller and a ROM that extended Locomotive BASIC with AMSDOS.The CPC 664, 6128 and the 6128plus all had the AMSDOS ROM built into the mainboard.

The tape oriented nature of the original CPC means that AMSDOS has a number of commands that deal with backwards and forwards compatibility. You can, for example disable the disc system completely and revert to all I/O being performed to tape again. On later CPCs with built in disc drives, tape based games and apps became rarer and for me at least, these commands were less frequently used.

The commands that you use to access and control discs are a mixture of built in BASIC commands and external commands in the ROM. 

Internal basic commands e.g. `cat` are typed as is:

    cat

External commands, e.g. `dir` are prefixed with a vertical bar:

    ¦dir

Commands are not case sensitive. You can find the `¦` symbol by pressing shift on the '@' key.

Some commands take one or more parameters, these are separate from one another by a comma, *but more importantly* and frustratingly also from the command (this looks strange to modern eyes)

    ¦ERA,"Hello.bas"
    ¦REN,"hello2.bas","hello.bas"

You do get used to it.

## Internal commands

These commands operate on either the disc or the cassette depending on the current mode (covered in the next section)

|command| overview   |
|----------------|---|
|CAT             | Catalogue (list) the files on the current device |
|LOAD            | Load a file into memory |
|RUN            | Load a basic file and run it |
|SAVE            | Save data to a file|
|CHAIN           | Load a basic file into memory replacing any existing program |
|CHAIN MERGE     | Load a basic file into memory merging it with any existing program|
|OPENIN          | Opens a file for reading via stream #9 |
|OPENOUT         | Opens a file for writing via stream #9 |
|CLOSEIN         | Closes the current input stream |
|CLOSEOUT        | Closes the current output stream |

This isn't a locomotive BASIC post so I'll skip the detail on most of these. The most commonly used command is `cat` which lists the files on the current device, `load` whick loads basic files and `run`, which executes basic programs.

<div class="dbImg zoom200 centeredImg" data-src="cpc/custard-loading.png" alt="Screenshot of a file being loaded" ></div>

<div class="dbCaption">
Listing and running a program from disc
</div>

## External commands

AMSDOS contains the following following external commands

| command         | description                                                  |
|-----------------|-----------------------------------------------------------|
| `¦A`            | Select disc A as the current disc                         |
| `¦B`            | Select disc B as the current disc                         |
| `¦CPM`          | Clear all memory and boot CPM from disc A                 |
| `¦DIR`          | Show a listing of the current directory                   |
| `¦DISC`         | Swap to disc mode for both input and output               |
| `¦DISC.IN`      | Swap to disc mode for input, leaving output as it was     |
| `¦DISC.OUT`     | Swap to disc mode for output, leaving input as it was     |
| `¦DRIVE`        | Swap drive                                                |
| `¦ERA`          | Erase a file                                              |
| `¦REN`          | Rename a file                                             |
| `¦TAPE`         | Swap to tape mode for both input and output               |
| `¦TAPE.IN`      | Swap to tape mode for input, leaving output as it was     |
| `¦TAPE.OUT`     | Swap to tape mode for output, leaving input as it was     |
| `¦USER`         | Set the current user                                      |

### Setting the disc mode

The CPC uses chanel / stream #9 in BASIC to read and write files. On an AMSDOS enabled CPC this stream is routed to either disc or tape and can have a different route for both input and output.

The `¦DISC` command sets both the input and output media to disc. It is the equivalent of executing the two commands:

    ¦DISC.IN 
    ¦DISC.OUT
 
which set the input and output media separately.

The `¦TAPE` command sets both the input and output media to tape. It is the equivalent of executing the two commands:

    ¦TAPE.IN 
    ¦TAPE.OUT
 
 As an example of the use of these commands we can copy a file from tape to disk as follows

<div class="dbImg zoom200 centeredImg" data-src="cpc/disc-tap-mode.png" alt="Screen shot of file copying from tape to disc." ></div>

<div class="dbCaption">
Copying from tape to disc with a typo!
</div>

### Working with drives drives

AMSDOS and the CPC support two drives `A` and `B`. Notionally the chipset that controls the floppy drives can handle up to four devices, but I have never seen a setup for more than a pair of drives that didn't require a hardware mod.

To swap to the `B` drive we can use either of the following commands:

    ¦B
    ¦DRIVE,"B"

To swap back to the `A` drive we can similarly use:

    ¦A
    ¦DRIVE,"A"

trying to swap to a drive that is has no disk in it, leads to the message

    Drive B: disc missing

    Retry, Ignore or Cancel

And as in most disc commands, Retry and Ignore are wholely useless and Cancel is the only one to choose.

### Listing files

To get a list of files on the disc we can use either the internal `cat` command or the external `¦DIR` command. 

`CAT` returns the list of files on the currently selected device in the order that it encounters them, *and* also shows the file size.

`¦DIR` returns the list of files on the disc but in alphabetical order, however it does not report the size of files. `¦DIR` does however always show disc content even when BASIC is in tape mode and supports:
+ wildcards 
+ multi-users 
+ showing the content of a drive even if it isn't the currently selected one

Both commands display the free space on the disc in kilobytes

<div class="dbImg zoom200 centeredImg" data-src="cpc/cat-vs-dir.png" alt="Screen shot of cat and dir commands." ></div>

<div class="dbCaption">
cat vs dir.
</div>

To use wildcards, `¦DIR` can  be invoked as follows:

<div class="dbImg zoom200 centeredImg" data-src="cpc/dir-wildcards.png" alt="Screen shot of cat and dir commands." ></div>

<div class="dbCaption">
|dir with wild cards.
</div>

To view the content of a non-selected drive:

<div class="dbImg zoom200 centeredImg" data-src="cpc/dir-b.png" alt="Screen shot of a directory for an alternative drive." ></div>

<div class="dbCaption">
Listing of the contents of drive B when drive A is the current drive.
</div>


### Deleting files

The erase command `¦ERA` is used to delete files, presumably erase was chose as the keyword because `delete` is already present Locomotive BASIC.

`¦ERA` like `¦DIR` can operate on multiple files via wildcards and delete files on alternative drives

<div class="dbImg zoom200 centeredImg" data-src="cpc/era.png" alt="Screen shot of erasing files." ></div>

<div class="dbCaption">
Erasing files on drive A while drive B is selected. Rad!
</div>

### Multi user access

If you read through this post a thousand times one thing you won't find is any commands to create or change directories, they don't exist in AMSDOS. 

If multiple people are using the same computer and disc, how do we segregate the files for different users? The answer to this is via the `¦USER` command. AMSDOS supports up to 16 users, identified by a number 0 to 15.

You may have noticed this when listing files, if you look at the preceding screenshots the  `¦DIR` command outputs and a header `Drive A: user 0`, showing that by default we operate as user 0 and see the files for that user.

<div class="dbImg zoom200 centeredImg" data-src="cpc/user.png" alt="Snippet of the user line" ></div>

<div class="dbCaption">
User 0 is the default user
</div>

If we perform a directory listing on drive A as user 0, then swap to user 10 and do the same, then we will see no files. The disk free space is still that same of course as there is no magic disc space pixie.

<div class="dbImg zoom200 centeredImg" data-src="cpc/user-10.png" alt="User 10 has no files" ></div>


we can create a file as user 10 and save it, the file will then show up when listing files as user 10, but not user 0.


<div class="dbImg zoom200 centeredImg" data-src="cpc/user-10-new-file.png" alt="Snippet of the user line" ></div>

<div class="dbCaption">
User 0 is the default user
</div>

Finally when acting as user 10 you can view any other users content by prefixing a filename, or wild card with the desired user number and a colon.


<div class="dbImg zoom200 centeredImg" data-src="cpc/user-10-see-user-0-file.png" alt="Cross user dir" ></div>

<div class="dbCaption">
User 10 taking a sneak peek at user 0's files
</div>

Similarly you can specify the specify the user number for run save and load commands too.

What can't do however combine a drive letter and a user as far as I can tell. If you are user 10 on drive A, then you are user 10 on drive B. If you want to see user 0's files on another drive, swap to it.

### Renaming files

The rename command changes file names, it is also used to assign files to different users.

to rename a file use the `|ren` command and specify the new name, then the original name

    |REN,"NEWNAME.BAS","ORIGINAL.BAS"

which will result in the file having the new name.

<div class="dbImg zoom200 centeredImg" data-src="cpc/rename.png" alt="Renaming a file" ></div>


`|ERA` can also be used to move files between numbered users on the disc.

    |REN,"0:NEWNAME.BAS","10:ORIGINAL.BAS"


The file `original.bas` owned by user `10`, is being renamed to `newname.bas` owned by user `0`. I'm showing it this way to highlight the name can change as well as the user, in practice the name  stays the same.

So to move `hello.bas` from user 10 to user 0, we do:

<div class="dbImg zoom200 centeredImg" data-src="cpc/rename-change-user.png" alt="moving a file between users" ></div>

if you omit the user number for the destination file name it defaults to the current user. So in our previous example I logged in as user 0, the following two commands are identical

    |REN,"0:NEWNAME.BAS","10:ORIGINAL.BAS"
    |REN,"NEWNAME.BAS","10:ORIGINAL.BAS"

### The CP/M command

With a CP/M boot disc in drive A, running the `¦CPM` command clears memory and boots in to CP/M. The CPC-464 came with CP/M version 2.2, the CPC-6128 came with both version 2.2 and the newer CP/M Plus edition.

<div class="dbImg zoom200 centeredImg" data-src="cpc/cpm-plus.png" alt="Screen shot CP/M plus." ></div>

<div class="dbCaption">
CPC booted into CP/M plus
</div>



## Wrap up

Looking at AMSDOS in retrospect, it's a quirky beast, however that's looking through a lens  that's nearly 30 years wide. Across DOS and Unix, we've become used to directories and modern command syntax. However, working as a jobbing games programmer on the CPC series of computers for several years, AMSDOS just felt modern and dare I say it: cool?

I've really enjoyed playing around with AMSDOS and re-learning forgotten skills, its helped me reengage with the CPC and kick started a minor collecting mania for ROMS that extend it (more of which in a later post).


This concludes my quick (or long and rambling) run through the capabilities of AMSDOS and how to manipulate files. Hope it's been of help. 

