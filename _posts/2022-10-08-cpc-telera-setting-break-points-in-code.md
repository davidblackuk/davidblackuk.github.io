---
layout: post
title:  "CPC Telera, setting breakpoints in code"
tags: [ 8bit,  amstrad, cpc, programming, retro, cpctelera]
location: London, England
excerpt: "He then ran the app via the WinApe emulator and it switched to the debugger at the point where the `WinwApe_Brk` command was. What magic is this? I thought."
description: How to set breakpoints in code in CPCtelera and have WinApe stop automatically during execution..
comments: true
share: true
thumbnail: "cpc-telera-breakpoints.png"

date: 2022-10-08
---


# I'm at breaking point!

I've started experimenting with the awesome CPCtelera, which is a fast, low level, CPC games library / engine. You can write games in CPCtelera in a mixture as assembly language or C. 

It was the C programming aspect of CPCtelera that first attracted me to it. I've always wondered how slow (or not) games written in C would be for a retro system. 
 
There are a lot of YouTube videos that describe CPCtelera and how to use it on the [Profesor Retroman][1] youtube channel. The videos are in spanish so I mostly watch them using auto translated sub titles.

Today I found a very recent stream and while watching it with the sound off (there were no sub titles), I saw the Prof, add the following line of code to his C source:

{% highlight C %}
WinwApe_Brk
{% endhighlight %}

He then ran the app via the WinApe emulator and it switched to the debugger at the point where the `WinwApe_Brk` command was. What magic is this? I thought. There was no reference to this being unusual or new in the stream and the only includes he had were `cpctelera.h` and `utils.h`. I ransacked the CPCtelera source code but couldn't find the macro, so I guess it was in the utils include file. Harrumph, not a file I had.

But there was a clue, in the tool tip as as he hovered over the macro it showed a partial representation of the macros definition, enough for me to reverse engineer what was going on (after a little googling).

<div class="dbImg  centeredImg" data-src="cpc/cpc-telera-video screenshot.png" title="WinApe degugger" ></div>


WinApe supports a custom OpCode to break the program at a specific point, that Opcode is `0xED 0xFF`. By default this OpCode is disabled, to enable it start WinApe and open the debugger (F7 on PC). This shows the debugger window, just make sure you check the option _'Break Instructions'_ at the bottom of the window.

<div class="dbImg  centeredImg" data-src="cpc/win-ape-debugger.png" title="WinApe degugger" ></div>


Now we need to add the breakpoint from C code. To do this we create a macro that emits the opcode for the WinApe breakpoint command. Here it is

{% highlight C %}
#define WinwApe_Brk __asm__(".dw #0xFFED");
{% endhighlight %}

{% highlight C %}
{% endhighlight %}

The bytes are swapped because they are stored little endian in a dword value.

We run WinApe using the CPCtelera command `cpct_winape -as`, this starts the app running in WinAp paused at the start address of the game. We press run, play through to the code that contains the breakpoint
and the emulator breaks. The final result is _satisfying_, this for me is game changing.


<div class="dbImg  centeredImg" data-src="cpc/win-ape-breakpoint.png" title="WinApe degugger" ></div>

Not my idea, but i had to share.


Ill be creating more CPCtelera posts as i gain more experience with it. So look out for those.

---


[1]: https://www.youtube.com/c/ProfesorRetroMan
