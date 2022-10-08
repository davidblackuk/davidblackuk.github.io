---
layout: post
title:  "Calculate the memory and t-states that Z80 code takes"
tags: [ 8bit, z80, spectrum, retro]
location: London, England
excerpt: I've been writing quite a bit of code of late (and certainly no blog posts). I've been focusing on getting my display update code as efficient as I can. As part of this process I wanted to examine my code as see what the space / time trade off is in terms of memory consumption and  number of processor cycles used.
description: I've created a tool to calculate the memory size and t-states used by z80 code. You might want to use it.
comments: true
share: true
date: 2018-11-17
---
# So ...

I've been writing quite a bit of code of late (and certainly no blog posts). I've been focusing on getting my display update code as efficient as possible. So I wanted to examine my code to see what the space/time trade-off was in terms of memory consumption and  number of processor cycles used.

I talked a little about space/time trade-offs in an [earlier post on calculating screen positions][3], in that post I manually calculated the t-states using a document I found online.

When I was writing [production Z80 code][1] my old assembler (OCP's Full screen editor assembler) used to be able to output the information that I needed as part of the assembly process.  A quick look at my current tooling shows it doesn't give me the functionality I need.

## Of course then ...

I went to work and wrote an [online z80 t-state analyser][2].

I have included as many of the undocumented Z80 instructions that I am aware of and have run it against several large online code bases (manic miner etc) and it handles them without issues.

<div class="dbImg centeredImg zoom50" data-src="t-stating.png" ></div>

It's easy to use, paste in your z80 assembly code and it'll automatically process it. [Give it a go][2] and let me know if it's  of any use (If you see any red lines, please let me know as that's an unrecognised instruction).

I'm looking to extend the app to produce syntax highlighted code with t-states for use in blogs and articles. if you think that's a decent idea, or have features you'd like to see then contact me via twitter or discord.

[1]: {{ site.baseurl }}{% post_url 2015-10-15-Spectrum-development-then-and-now %}
[2]: ../tstates
[3]: {{ site.baseurl }}{% post_url 2018-03-18-lets-talk-about-the-zx-specrum-screen-layout-part-three %}
