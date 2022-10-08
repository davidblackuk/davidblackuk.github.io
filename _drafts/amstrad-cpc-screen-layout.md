---
layout: post
title:  "The Amstrad CPC screen layout Part I"
tags: [ 8bit,  amstrad, cpc, programming, retro]
location: London, England
excerpt: "ROM-box, now there's a term you don't hear much anymore."
description: Part one of a series of articles covering the Amstrad CPC screen layout.
comments: true
share: true
date: 2022-09-10
---

# The basics

The Amstrad CPC line of computers shared a set of common screen modes, with differing resolutions and number of colours. What made the CPCs some what unique was that the different modes had different shaped pixels.

There are three 'official' graphics modes and a couple of available, if not supported, ones. In this post we will focus on the modes available to BASIC.

In all graphics modes vertical resolution is 200 rows, the horizontal resolution varies by mode.

|----|----------|--|
|Mode|resolution| description |
|----|----------|--|
| 0 | 160x200   | 16 colours with 2 pixels per byte of screen RAM|
| 1 | 320x200   | 4 colours with two pixels per byte |
| 2 | 640x200   | 2 colours (monochrome) with 8 pixels per byte |

Here is a mode zero game in all it's multicoloured wonder, a mode in which pixels are rectangular rather than square!

<div class="dbImg   centeredImg" data-src="cpc/mode-0-game.png" alt="Screenshot of a colourful mode 0 game" ></div>

Mode one games offered squarer pixels and if handled with care, looked awesome.

<div class="dbImg   centeredImg" data-src="cpc/mode-1-game.png" alt="Screenshot of 4 colour mode 1 game" ></div>

Mode two games were rare, can't think why...

<div class="dbImg   centeredImg" data-src="cpc/mode-2-game.png" alt="Screenshot of 4 colour mode 1 game" ></div>

## Pens, inks and colours

## Memory layout

The default screen memory starts at address `0xC000`, is 16000 (0x3E80) bytes in size. The remaining memory from `0xFE80` up to `0XFFFF` is 'spare' memory. When hardware scrolling is in use, the start address may vary and the `spare` bytes come into play but that is beyond the scope of this post.

In all modes there are 200 rows of data with 80 (0x50)  bytes of pixel data per row. You would expect the screen layout to be stored in descending rows, e.g row one: 0xC000 to 0xC04f, row two: 0xC050 to 0XC9f, however you'd be wrong. 

For reasons of hardware efficiency the screen layout is stored interleaved.  If you think of the screen has having a height of 25 characters, 8 bits high, then 0xC000 is row one of character one and 0xC050 is row one of character two. Successive memory addresses fill the first row of each character cell until we hit 0xC800 which is row two of character cell one. 

A nice slow basic program might explain it better:

<div class="dbImg  zoom70 centeredImg" data-src="cpc/fill-screen-slow.gif" alt="Screenshot of 4 colour mode 1 game" ></div>

While it would be great just to add 0x50 to a screen address to find the row below, a little bit of maths and some bit twiddling makes it reasonable. If you think this is strange, have a look at the [spectrum memory layout][1], it did something similar to the CPC but managed to make it more complex.

## Pixel layout

Depending on the graphics mode each byte in memory can contain eight, four or two pixels. Each pixel's colour is determined by the pen number stored in those bytes. The actual rendered colour for each pen number varies by mode. I'm going to describe the format for pixels by descending mode number as that builds up to mode zero, which is a doozy.

### Mode two

In mode two, each byte of screen memory contains data for 8 pixels and each pixel can be set to pen zero or one by setting the applicable bit off (zero) or on (one). 

|-|-|-|-|-|-|-|-|-|
| bit|7|6|5|4|3|2|1|0|
| pixel|0|1|2|3|4|5|6|7|




[1]: {{ site.baseurl }}{% post_url 2018-03-10-lets-talk-about-the-zx-specrum-screen-layout-part-two %}

