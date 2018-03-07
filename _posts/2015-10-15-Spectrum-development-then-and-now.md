---
layout: post
title:  "Spectrum development then and now: Part I"
tags: [ 8bit, spectrum, z80]
location: London, England
excerpt: How quick can you develop speccy app using a modern OS
comments: true
share: true
---


The other month I wrote about Fireman Fred a ZX-Spectrum game I wrote in 1984. This got me to thinking about the development workflow back then. I also started wondering just how much better it might be today.

I definitely wasn't thinking about rewriting Fred. Definitely not. No.

## Development environment then
In 1984 the ultimate development environment for a Sinclair ZX Spectrum was a Tandy TRS-80 model 3 and a custom hardware bridge that allowed binaries assembled on the trash 80 to be loaded into the spectrum memory. Reputedly this is how Mathew Smith wrote manic miner and Jet Set Willy, it had floppy disks and everything!

<div class="dbImg zoom60 centeredImg" data-src="2015-10-05/trs-80-III.jpg" title="Image Copyright: Bilby - Own work. Licensed under CC BY 3.0 via Commons" ></div>

[Image Copyright: Bilby - Own work. Licensed under CC BY 3.0 via Commons][1]
{: style="color:gray; font-size: 80%; text-align: center;"}


Anybody like myself who had to save up for two years to buy a Spectrum wasn't going to be able to go that route. So we went with using the spectrum to assemble, cassette tapes to store code and a 15 inch portable tv as a monitor.

<div class="dbImg speccy centeredImg" data-src="2015-10-05/spec-with-cassette.jpg" title="Image of spectrum" ></div>

The tv was black and white too. I had to go downstairs after everyone else was asleep and test it on the colour TV in the living room.


### IDE
Don't laugh :-) There was an IDE of sorts. It was  *Oxford Computer Publishing's*, Full Screen Editor Assembler. 

<div class="dbImg zoom80 centeredImg" data-src="2015-10-05/ocp.jpg" title="Box art for OCP Assembler" ></div>

[Image Source: World of spectrum][2]
{: style="color:gray; font-size: 80%; text-align: center;"}

There was an integrated editor and assembler. Memory was tight on the spectrum so that influenced the workflow.

### Workflow
The program was written in modules, each module was saved to its own C15 Cassette tape. So one module might be the sprite library, another the level data etc. There were in total about 7 tapes IIRC.

Editing assembly modules consisted of loading the tape into the assembler , editing and then saving back (always remembering to rewind).

To build the program you put the dev environment into assemble mode, then you loaded the tapes in order one after another. Get the order wrong and start again.

Once the last tape was loaded you inserted the output tape and wrote the game to that. Then you rewound the output tape, reset the specie and loaded the game. Then you tested it, reset the spectrum, loaded the assembler and off you went round the loop again.

Apart of course when you make a disastrous mistake: like rewinding the last module tape, forgetting to eject it overwriting your entire last module with the game. Loosing potentially weeks of work (did that, the scars still linger).

Backups were made of course at the backup of last resort was a printout from my old trusty Epson RX80FT. It got used a lot.

The entire assembly process from start to execution of the game could easily be 10 to 15 minutes. I really did measure twice back then.


## Development environment now

My current development machine is a quad core i7 4790K Hackintosh with 32GB RAM and an NVIDIA GTX980 (well alright 2 of em) and of course three monitors. Thinking about it, the chair I'm sitting on cost more than my Spectrum did.

### IDE

I had a lot of fun sorting out a development environment for Spectrum gaming on OS X. Obviously an integrated development environment was going to be a bit of a stretch, but by combining  a few different packages I was able to achieve it.

First we start with the editor, for this I chose Sublime Text. When looking for a Syntax highlighting package for Z80 assembly language and Sublime, I found the [Z80 Asm plugin for Sublime Text 2][3] project on GitHub. In addition to syntax highlighting the plug in offers tons of features like snippets and goto symbol etc. 

The Z80 Asm plugin recommends the use of other supporting sofware, however I went with my own tooling. Günter Woigk works on the [Zasm Z80 Assembler][4] and the [zxsp Spectrum emulator][4]. These tools are awesome.

To glue the whole thing together I create a make file in the root of my project:

	
	zasm = ~/Downloads/zasm-4.0.12-osx10.9/zasm

	main:	
		$(zasm) -u fred.asm
		open fred.tap

Now when I press `command-b` in sublime it builds and runs the app.


<div class="dbImg zoom60 centeredImg" data-src="2015-10-05/sublime.png" title="Speccy IDE" ></div>

### Workflow

This is the modern digital workflow. Edit in Sublime, hit command-b test in `zxsp.` The interesting thing is the time it takes: End-to-end from starting to assemble, to Fred loaded and running, is less than a second! Zxsp has a debugger where you can create break points, inspect registers and single step. Where was this in 1984?


## Silly stats and why it wasn't there in '84

OK, this is just a bit of fun but:

In 1984 a cheap 32K Ram pack for the spectrum cost $60.80, so my 32GB of ram would have cost me: $63,761,699 and I didn't have that much money at hand (and that's 1984 money).

<div class="dbImg zoom80 centeredImg" data-src="2015-10-05/cheetah.jpg" title="Advert for RAM" ></div>

My GTX 980 has a peak shader arithmetic rate of 5 tera flops each. According to [Wikipedia][5] In 1984 a giga flop cost $18,750,000 so my 5 tera flops come in at the low, low price of  $93,750,000,000 and I have two of em.

Now multiply those figures by 2.3 and you've got the prices as they would be today. Future me would have been rich back then :-)


_Update:_ I've written a follow up to this article describing a [new pc based approach to Spectrum development in 2018][6].



[1]: https://commons.wikimedia.org/wiki/File:TRS-80_Model_3_01.jpg#/media/File:TRS-80_Model_3_01.jpg
[2]: http://www.worldofspectrum.org/infoseekid.cgi?id=0008187
[3]: https://github.com/psbhlw/sublime-text-z80asm
[4]: http://k1.spdns.de
[5]: https://en.wikipedia.org/wiki/FLOPS
[6]: {{ site.baseurl }}{% post_url 2018-02-04-Spectrum-development-then-and-now-part2 %}