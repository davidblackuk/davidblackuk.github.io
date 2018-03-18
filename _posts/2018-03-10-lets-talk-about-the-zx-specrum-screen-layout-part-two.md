---
layout: post
title:  "The ZX-Spectrum screen layout: Part II"
tags: [ 8bit, z80, spectrum]
location: London, England
excerpt: Some computers have easy to understand screen layouts, the Spectrum? Not so much!
comments: true
share: true
date: 2018-03-10
---
# Pixel layout

In [part one of this article][1] I discussed the attribute map, how attributes work and how they are addressed in memory. In this post we move on to the pixel layout of the screen.
Apologies for the small amount of repetition here if you read the original post.

The original 48K Spectrum had a character resolution of 32 columns by 24 rows, implemented using a pixel resolution of 256 by 192 pixels. Each pixel could be individually manipulated, this was a major departure from previous ZX computers which (by default) only allowed the screen to be manipulated at the character level.

<table>
    <thead>
        <tr><th>Start</th> <th>End</th> <th>Length</th> <th>Description</th></tr>
    </thead>
    <tbody>
        <tr> <td> #FF58 </td> <td> #FFFF </td> <td> 168    </td> <td> Reserved </td> </tr>
        <tr> <td> #5CCB </td> <td> #FF57 </td> <td> 41,612 </td> <td> Free memory </td> </tr>
        <tr> <td> #5CC0 </td> <td> #5CCA </td> <td> 11     </td> <td> Reserved </td> </tr>
        <tr> <td> #5C00 </td> <td> #5CBF </td> <td> 192    </td> <td> System variables </td> </tr>
        <tr> <td> #5B00 </td> <td> #5BFF </td> <td> 256    </td> <td> Printer buffer </td> </tr>
        <tr> <td> #5800 </td> <td> #5AFF </td> <td> 768    </td> <td> Attributes   </td> </tr>
        <tr> <td> #4000 </td> <td> #57FF </td> <td> 6,144  </td> <td> <span class="memory-slot">Pixel data</span>  </td> </tr>
        <tr> <td> #0000 </td> <td> #3FFF </td> <td> 16,384 </td> <td> Basic ROM </td> </tr>
    </tbody>
</table>

The spectrum's screen memory started in memory immediately after the spectrum rom, at address #4000 (16384d). Our 256x192 pixels are stored 8 pixels to the byte in 6,144 byes of memory (32 bytes by 192 rows).

Each of the 32 bytes in a row represented 8 pixels on the screen with the most significant bit (7) being the left most bit and the least significant bit (0) being the rightmost pixel. So the byte values 24, 60, 126, 219, 255, 90, 129, 68 stacked on top of one another might just give you a  space invader.

| 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | dec  |
|---|---|---|---|---|---|---|---|---|
|   |   |   |&#9673;|&#9673;|   |   |   | 24   |
|   |   |&#9673;|&#9673;|&#9673;|&#9673;|   |   | 60   |
|   |&#9673;|&#9673;|&#9673;|&#9673;|&#9673;|&#9673;|   | 126  |
|&#9673;|&#9673;|   |&#9673;|&#9673;|   |&#9673;|&#9673;| 219  |
|&#9673;|&#9673;|&#9673;|&#9673;|&#9673;|&#9673;|&#9673;|&#9673;| 255  |
|   |&#9673;|   |&#9673;|&#9673;|   |&#9673;|   | 90   |
|&#9673;|   |   |   |   |   |   |&#9673;| 129  |
|   |&#9673;|   |   |   |   |&#9673;|   | 68   |

However the expression 'Stacked on to of one another' does raise an interesting point. Unlike the spectrum's attributes, the pixels are not stored in a linear manner. Intuitively, the pixels for row 0 would be stored in the first 32 bytes of screen memory, then the pixels for row 1 would be in the next 32 bytes. However that's simply not the case.

Let's write a little speccy basic program to poke each address in the screen map in a linear manner and see what gives.

<div class="dbImg zoom100 centeredImg" data-src="2018-03-10-lets-talk-about-the-zx-specrum-screen-layout-part-two/listing01.png" title="Sinclair basic program listing in the emulator." ></div>

Which produces the following results:

<video class="centeredImg" src="../images/2018-03-10-lets-talk-about-the-zx-specrum-screen-layout-part-two/screen-lines.mp4"  width="320" height="240" controls preload></video>

So definitely not linear then...

As you can see the spectrum screen memory is divided into three sections (or banks), each of which represents 8 character rows. The first row of 32 bytes of screen memory is indeed the first row of pixels, though it's best to think of it as the first row of pixels for the first character row in the bank.

The second physical row of pixels in screen memory represents the first row of pixels for the second character row.

The next 6 groups of 32 bytes of physical memory in the screen buffer are the first row of pixels for character rows 3, 4, 5, 6, 7 and 8.

After that the next blocks of 32 bytes represent the second row of pixels for character 1. Then characters 2, 3, 4, 5, 5 ,6 ,7 and 8.

We proceeded character row, by character row, until the first bank of pixels is filled. This bank of pixels is 8 * 8 * 32 bytes in length (2,048 bytes) from #4000 to #47FF.

The second bank of memory starts at #4800 with the first pixel row for character row 9, then the first row for character row 10 etc. This bank stretches from #4800 to 4FFF.

The third and final bank representing the pixel memory for screen character rows 17 through 24 is represented by the memory in address range #5000 to #57FF.

Got that? Excellent! If you take nothing else away from this post, hopefully, you have an understanding of how unintuitive the screen was for early programmers on the spectrum. It caused a lot of head scratching (perhaps the start of my bald head).

## Why, oh why, oh why?

There are two reasons that this screen layout made sense to Sinclair:

### Think of the poor hardware

The rendering of the screen to video was performed by an Uncommitted Logic Array (ULA), rather than a dedicated graphics chip. A ULA is a programmable chip similar to modern PLCs, but the programming was done in hardware at the foundry. It's utility to Sinclair was that it removed the need for a lots of discrete chips on the Spectrum's PCB. It's all about the money, money; when you are trying to build a sub £100 computer in 1982.

The ULA however was no speed daemon. So the screen memory layout was designed to make it easy for the hardware to access and render it, not the programmer to write to it.

### Character addressing

The second reason for the memory layout is, that on the whole, Spectrum BASIC is character based (I know there is a draw and plot command, but still...)

If you are at the start of a character location on the screen (in any bank) and have the address in the 16 bit register HL, then the second pixel row of the character is at offset #100 from HL, the third at offset #200, then #300, #400, #500, #600 and finally #700.

Now adding #100 to HL is the same as performing `inc h` and that's a really quick way of stepping down a screen row for a character when rendering it. This only works when dealing with addresses of character cells and won't work if rendering 8 lines of character data starting anywhere on screen.

But this implementation detail will have helped keep the size of the Spectrum ROM down.

In [part three][2] of this post we'll start examining the assembly language to address the screen in a sane manner.


[1]: {{ site.baseurl }}{% post_url 2018-03-03-lets-talk-about-the-zx-specrum-screen-layout %}

[2]: {{ site.baseurl }}{% post_url 2018-03-18-lets-talk-about-the-zx-specrum-screen-layout-part-three %}


