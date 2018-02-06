---
layout: post
title:  Spectrum development then and now Part II
tags: [ 8bit, spectrum, z80]
location: London, England
excerpt: Spectrum development in 2018
comments: true
share: true
---


Two years ago I wrote about [Fireman Fred][1] a ZX-Spectrum game I wrote in 1984 (worst game ever?). That got me to thinking about the development workflow back in the '80s and how it might be [done in 2015][2]. That post is worth reading still, for mac users now and for people curious about how development worked back in the '80s. At the time of writing the previous post I put together a tool chain based on sublime text and a command line assembler on OSX.

The two year hiatus between then and now had a lot to do with a round of redundancies and a new job. I was just too busy to write anything outside of work.

So spinning on two years and being absent a Mac, I started looking into PC options for spectrum development. Embarrassingly for a mac user they started at just much better and ended up way, way better. 

I'm not going to go trough the alternatives, just the system that I found. And by system I mean a single IDE for spectrum games built in Visual Studio 2017. That system is the snappily named
_ZX Spectrum IDE with Visual Studio 2017 integration_. It is written by GitHub user [Dotneteer][4] (Istvan Novak) and is located on [GitHub][3]. I'll be calling it SpecNetIde from now on as my fingers get tired.

SpecNetIde has two main thrusts to its implementation: code discovery and development. 

Code discovery includes tools to allow you to reverse engineer existing applications, disassemble code, annotate the disassembly, inspect memory etc. SpecNet IDE even comes with a completely annotated BASIC rom disassembly. So if you're looking to work out how classic titles work, create pokes,  then this is the tool for you. 

The second aspect of the SpecNetIde is application development. The IDE comes with a z80 assembler, dockable IDE windows for the emulator, debugger (yeah!), memory map, z80 registers, compiler output and the list goes on. In fact I can't cover all the feature in one post, so I won't, just the ones that excite me.

Before I continue there is one caveat that need mentioning. SpecNetIde is in its early days and the following needs to be born in mind. 

*   There are a couple of [hoops that need to be jumped through][5] to run it (installing the VS extensions SDK and running the SpecNetIDE from source). 
*   There are some bugs but as I said it's early days.

However those two points aside I really recommend having a go. I've been following this project for a while now (and even tried a couple of cheeky little commits myself) and its
become really, really good. And if you do spot issues or have feature requests, Istvan is ridiculously quick at turning things around.

## Integrated development

I doesn't come much more integrated than this...

<div class="dbImg zoom80 centeredImg" data-src="spectrum-development-then-and-now-partII/ide01.png" title="SpecNetIde screenshot with lots of docked windows." ></div>

Of course being visual studio that's not how you'll run it. The windows can be undocked and placed on separate monitors and usually that's what I do.

The current features that excite me are:

*   Visual studio syntax colouring
*   Masses of menu options in the solution explorer to, compile, run debug etc
*   Error list support (double click and error to jump to it)
*   Task list support (add TODOs into visual studios task pane via code comments, and double click to navigate to the file)
*   Assembly output is in Visual studio's output pane

The features I wish were present are: Navigate to a symbol definition from the editor (F12 support) and a shortcut key to execute the project (F5 / control-F5). Perhaps I'll get off my backside and implement them.

### Assembling

You can't run it, if you can't write it. SpecNet IDE has a good assembler that has been getting better with each iteration. Again if you find issues, report them on GitHub, they will get fixed. The assembler has full support for:

*   All z80 instructions including the _secret_ ones.
*   Pseudo instruction support for operations like `org`, `defs`, etc
*   Basic macro support for #if (never used it, but it's there)

Personally, the only feature that is currently missing, is macro definition syntax (defm / rept n etc). But I can just unroll my loops.


### Debugging

In my previous  post on Mac based development I used the term integrated, but the environment was far from it. The workflow had a separate editor (sublime), build tool (make), assembler (z8asm) and execution / debug environment (zxsp). And when debugging there was no symbol support it was done at the disassembly level.

SpecNetIde is a true, one stop shop when it comes to spectrum development. Here we see the IDE stopped at a breakpoint

<div class="dbImg zoom80 centeredImg" data-src="spectrum-development-then-and-now-partII/ide02.png" title="SpecNetIde screenshot of the ide paused at a breakpoint." ></div>

this is freakin awesome. From this point I can:

*   Single step into / over the next instruction
*   Examine the register
*   View the call stack and memory (not shown in that screen shot)
*   Continue execution as normal

Doesn't sound like a lot? Oh boy are you too spoiled by modern technology!

### Exporting

Well if you can write your game in an integrated development environment, assemble it, debug it and play it. It isn't much use if that's the end of the process. Thankfully SpecNetIde offers options to export your current application in `.tzx` and `.tap` formats.

<div class="dbImg zoom80 centeredImg" data-src="spectrum-development-then-and-now-partII/ide03.png" title="Screenshot of the SpecNetIde export options." ></div>

From there it's a short hop to another emulator or a physical device via an SD card.


### Wrap up

I hope this post has given you a feel for SpecNetIde and its functionality. SpecNetIde has excited me into recommencing a project that I definitely 
didn't start; to rewrite _Fireman Fred_ using better techniques. Absolutely not doing that. Nope, no way.

Give the video a play. The animations smooth, back buffered and not XOR based. Definitely better than the original (for something that doesn't exist).

<video class="centeredImg" src="../images/spectrum-development-then-and-now-partII/fred001.mp4" poster="../images/spectrum-development-then-and-now-partII/fred-poster.png" width="320" height="240" controls preload></video>


And finally... To make this clip I needed to export from SpecNetIde to Fuse and that's the thing about SpecNetIde, I didn't know that option to export existed until I needed it. Went looking for it and there it was.



[1]: {{ site.baseurl }}{% post_url 2015-09-18-Tell-us-about-the-war-granddad %}
[2]: {{ site.baseurl }}{% post_url 2015-10-15-Spectrum-development-then-and-now %}
[3]: https://github.com/Dotneteer/spectnetide
[4]: https://github.com/Dotneteer
[5]: https://github.com/Dotneteer/spectnetide/blob/master/Documentation/GettingStarted/GetSpectNetIde.md

