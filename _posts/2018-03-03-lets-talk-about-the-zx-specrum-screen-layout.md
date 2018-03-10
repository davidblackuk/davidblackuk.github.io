---
layout: post
title:  "The ZX-Spectrum screen layout: Part I"
tags: [ 8bit, z80, spectrum]
location: London, England
excerpt: How colours values were specified on the Sinclair ZX Spectrum.
comments: true
share: true
---
# Attributes

The original 48K Spectrum had a character resolution of 32 columns by 24 rows, implemented using a pixel resolution of 256 by 192 pixels. Each pixel could be individually manipulated, this was a major departure from previous ZX computers which (by default) only allowed the screen to be manipulated at the character level.

While visibility could be controlled on a pixel-by-pixel basis, colour was set in 8 by 8 pixel squares at the character level with all pixels in a particular character cell sharing the same foreground and background colours. The nature of the attribute level colour setting is what produces attribute clashes (which we'll cover later) and what gave many spectrum games their distinctive looks.

The 48K ZX Spectrum memory map is shown below, $xxxx denotes a hexadecimal number, lengths are decimal

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
        <tr> <td> $5800 </td> <td> $5AFF </td> <td> 768    </td> <td>  <span class="memory-slot">Attributes</span>   </td> </tr>
        <tr> <td> $4000 </td> <td> $57FF </td> <td> 6,144  </td> <td> Pixel data  </td> </tr>
        <tr> <td> $0000 </td> <td> $3FFF </td> <td> 16,384 </td> <td> Basic ROM </td> </tr>
    </tbody>
</table>

The spectrum's screen memory starts in memory immediately after the spectrum rom, at address $4000 (16384d). Our 256x192 pixels are stored 8 pixels to the byte in 6,144 byes of memory (32 bytes by 192 rows). The colour attributes were stored immediately after the pixel data from address  $5800 (22,628) in 768 bytes (32 x 24 character of data).

## Addressing attributes

Addressing attributes is as easy as you would expect, starting at $5800 there are 32 attributes per screen row and 24 rows.

|       | 0| 1| 2| 3| 4| 5| 6| 7| 8| 9| A| B| C| D| E| F| ...|1F|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| $5800 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | |  |
| $5820 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | |  |
| $5840 |  |  |  | X|  |  |  |  |  |  |  |  |  |  |  |  | |  |
| $5860 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | |  |
| ...   |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | |  |
| $5EAO |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | |  |

To set the attributes for character (3, 2) assuming (0,0) is at the top left of the screen you write to address `$5800 + ((2*32)+ 3)` or
$5843 (and X marks the spot).

## Attribute values

Each block of 8x8 pixels has a single byte of attribute data packed as follows

| 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|---|---|---|---|---|---|---|---|
| F | B | P<sub>2</sub> | P<sub>2</sub> | P<sub>1</sub> | I<sub>0</sub> | I<sub>1</sub> | I<sub>0</sub> |

* Bit 7 if set indicates the colour flashes between the fore and back colours.
* Bit 6 if set indicates the  colours are rendered bright.
* Bits 5 to 3 contain the paper (background) colour 0..7
* Bits 2 to 0 contain the ink (foreground) colour 0..7

The flash attribute alternates a cell between its foreground and background colours on a timer, it is of limited use in games.

The bright attribute makes the foreground and background colours, err..., brighter. The bright attribute nearly doubles the effective number of colours the spectrum could display. I say nearly because bright black is still black.

The colour value 0..7 is the index into the colour table, the colour values at those indexes and their bright equivalents are<sup>*</sup>:

| Decimal | Binary | Colour | Normal | Bright |
|---|---|---| --- |---|
| 0 | 000 | Black   | <span class="spec-color spec-color-0-n"></span> | <span class="spec-color spec-color-0-b"></span> |
| 1 | 001 | Blue    | <span class="spec-color spec-color-1-n"></span> | <span class="spec-color spec-color-2-b"></span> |
| 2 | 010 | Red     | <span class="spec-color spec-color-2-n"></span> | <span class="spec-color spec-color-3-b"></span> |
| 3 | 011 | Magenta | <span class="spec-color spec-color-3-n"></span> | <span class="spec-color spec-color-4-b"></span> |
| 4 | 100 | Green   | <span class="spec-color spec-color-4-n"></span> | <span class="spec-color spec-color-5-b"></span> |
| 5 | 101 | Cyan    | <span class="spec-color spec-color-5-n"></span> | <span class="spec-color spec-color-6-b"></span> |
| 6 | 110 | Yellow  | <span class="spec-color spec-color-6-n"></span> | <span class="spec-color spec-color-7-b"></span> |
| 7 | 111 | White   | <span class="spec-color spec-color-7-n"></span> | <span class="spec-color spec-color-8-b"></span> |



### Putting it all together

Here is an example to how attributes work. I know we're assembly language gurus here, but well do this with a little speccy basic.

I want to demonstrate attribute values, bright and normal colours and  blacks stubborn refusal to change no matter what. We are going to set the background colour of four characters to green, the foreground of the first two to black and the second pair to red. Finally alternate between normal and bright colours between each cell.

This gives us the following four values, note since the paper is bits 5 to 3 we take the value 4 for green (100b) and shift it left 3 places to get 32 (100000b) and set those bits. 

| Flash| Bright | Paper | Ink | Value | Decimal | Description
| 0 | 1 | 100 | 000 | 01100000 | 96 | Bright - black on green  |
| 0 | 0 | 100 | 000 | 00100000 | 32 | Normal - black on green |
| 0 | 1 | 100 | 010 | 01100010 | 98 | Bright - red on green |
| 0 | 0 | 100 | 010 | 00100010 | 34 | Normal - red on green |

We print a word at the top left of the screen and then colour it by setting the attributes directly (address of the top left attribute is 22528.)

<div class="dbImg zoom80 centeredImg" data-src="2018-03-03-lets-talk-about-the-zx-specrum-screen-layout/listing01.png" title="Sinclair basic program listing in the emulator." ></div>

Which give us:

<div class="dbImg zoom80 centeredImg" data-src="2018-03-03-lets-talk-about-the-zx-specrum-screen-layout/result01.png" title="The word poke on the spectrum screen with the attributes set as described previouslu" ></div>

An a pretty clear demonstration of how attributes work, you can see the green background vary in colour when bright and also that while the black colour remains the same the red foreground colour does change intensity when marked as bright.

Which means there are thirty one possible colours on a spectrum screen fifteen colours that can be normal or bright and black.

### Some assembly language constants and code for attributes

The shift operator `<<` is used to move a value like red (010) to its paper equivalent pRed (010000). The rest of the constants values should be apparent from the rest of this post.


{% highlight csharp %}

screen_width_pixels:    .equ 256
screen_height_pixels:   .equ 192
screen_width_chars:     .equ 32
screen_height_chars:    .equ 24

screen_start:           .equ #4000
screen_size:            .equ screen_width_chars * screen_height_pixels
attr_start:             .equ #5800
attributes_length:      .equ screen_width_chars * screen_height_chars

black:                  .equ %000000
blue:                   .equ %000001
red:                    .equ %000010
magenta:                .equ %000011
green:                  .equ %000100
cyan:                   .equ %000101
yellow:                 .equ %000110
white:                  .equ %000111

pBlack:                 .equ black << 3
pBlue:                  .equ blue  << 3
pRed:                   .equ red  << 3
pMagenta:               .equ magenta  << 3
pGreen:                 .equ green  << 3
pCyan:                  .equ cyan  << 3
pYellow:                .equ yellow  << 3
pWhite:                 .equ white  << 3
            
bright:                 .equ %1000000

{% endhighlight %}


The `cls_attributes` sub-routine is used to set all attributes for the screen to the same value

{% highlight csharp %}
; 
; IN  - A contains the attribute value to initialize the screen to
; OUT - Trashes HL, DE, BC
;
 cls_attributes:        
        ld hl, attr_start               ; start at attribute start
        ld de, attr_start + 1           ; copy to next address in attributes
        ld bc, attributes_length - 1    ; 'loop' attribute size minus 1 times
        ld (hl), a                      ; initialize the first attribute
        ldir                            ; fill the attributes
        ret
{% endhighlight %}

Using the `cls_attributes` method is as simple as:

{% highlight csharp %}
        ld a, pBlue | yellow | bright
        call cls_attributes
{% endhighlight %}

which sets the whole screen to have a blue background and yellow text, both of which are bright.

In [part two][1] we'll address the pixel layout of the screen.

---

<sup>*</sup>These colours are approximations based on <em>science</em>, or  a close approximation to science. Which is to say guess work :-)

[1]: {{ site.baseurl }}{% post_url 2018-03-10-lets-talk-about-the-zx-specrum-screen-layout-part-two %}
