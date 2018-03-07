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

In part one of this article I discussed the attribute map, how attributes work and how they are addressed in memory. In this post we move on to the pixel layout of the screen. 
Apologies for the small amount of repetition here if you read the original post.

The original 48K Spectrum had a character resolution of 32 columns by 24 rows, implemented using a pixel resolution of 256 by 192 pixels. Each pixel could be individually manipulated, this was a major departure from previous ZX computers which (by default) only allowed the screen to be manipulated at the character level.


<table>
    <thead>
        <tr><th>Start</th> <th>End</th> <th>Length</th> <th>Description</th></tr>
    </thead>
    <tbody>
        <tr> <td> $FF58 </td> <td> $FFFF </td> <td> 168    </td> <td> Reserved </td> </tr>
        <tr> <td> $5CCB </td> <td> $FF57 </td> <td> 41,612 </td> <td> Free memory </td> </tr>
        <tr> <td> $5CC0 </td> <td> $5CCA </td> <td> 11     </td> <td> Reserved </td> </tr>
        <tr> <td> $5C00 </td> <td> $5CBF </td> <td> 192    </td> <td> System variables </td> </tr>
        <tr> <td> $5B00 </td> <td> $5BFF </td> <td> 256    </td> <td> Printer buffer </td> </tr>
        <tr> <td> $5800 </td> <td> $5AFF </td> <td> 768    </td> <td> Attributes   </td> </tr>
        <tr> <td> $4000 </td> <td> $57FF </td> <td> 6,144  </td> <td> <span class="memory-slot">Pixel data</span>  </td> </tr>
        <tr> <td> $0000 </td> <td> $3FFF </td> <td> 16,384 </td> <td> Basic ROM </td> </tr>
    </tbody>
</table>

The spectrum's screen memory started in memory immediately after the spectrum rom, at address $4000 (16384d). Our 256x192 pixels are stored 8 pixels to the byte in 6,144 byes of memory (32 bytes by 192 rows).

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

