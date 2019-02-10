---
layout: post
title:  "Omni 128HQ Desktop #1 - Overview"
tags: [ 8bit,  spectrum, hardware, omni]
location: London, England
excerpt: I've bought a modern hardware implementation of the ZX Spectrum, the OMNI 128HQ from retro radionics
description: I've created a tool to calculate the memory usage and t-states used by z80 code. You might want to use it.
comments: true
share: true
date: 2019-01-19
---
# Intro

While software emulators are fun, they're not the real thing. One thing I missed was the visceral feel of the dead flesh keyboard!

I have a couple of reconditioned spectrums, most with composite video conversions. However loading games was always an issue. I had just decided to buy a DIVMMC from [TF8b][2] to allow me to load speccy games from an SD card, when I came across the *Omni 128HQ Desktop* from [RetroRadionics][1]. While the Omni was twice the price, it does come with an entire new spectrum attached!

Let's be clear, the Omni took a long time to arrive. A very long time. However considering it's hand assembled in China, you shouldn't be too surprised. Once I received the shipping notice (elevated heart rate of happiness time), I noticed the shipping time was *two months* (Dry mouth of disappointment time). But it did arrive and yes it was worth the wait.

<div class="dbImg zoom80 centeredImg" data-src="omni-128-desktop/omni_top.png" alt="Picture of the Omni 128HQ Desktop from above." ></div>

<div class="dbCaption">
Omni 128HQ Desktop is almost indistinguishable from the original; top-down. Just a
few buttons peeking out.
</div>

## What's in the box?

The Omni comes in the box with an RGB to SCART lead, a modern power supply and of course the  Omni 128HQ Desktop device itself.

<div class="dbImg zoom80 centeredImg" data-src="omni-128-desktop/boxcontent.png" alt="Picture of the Omni 128HQ Desktop box content including device, power supply and scart cable." ></div>

<div class="dbCaption">
This is what's in the box on delivery
</div>

That's everything you need to load games from tape. In other words, SD card not included!

## Omni Specifications

The Omni is based on the Harlequin Board designed and open sourced by [SuperFo][3]. It offers:

+ 128K ram
+ Integrated divMMC double SD card interface
+ Two 9 pin Joystick ports
+ RGB out
+ Composite out
+ HDMI out <sup>1</sup>
+ Power button
+ Reset switch button
+ Battery operation <sup>2</sup>

Let's get those pesky footnotes out of the way first:

<sup>1</sup> There is an HDMI port, but it doesn't work at the moment, may need a daughter board to
work in the future, may never work. Brutal, but true. Don't buy this to use via HDMI, you
 will be disappointed. Or use a converter.

<sup>2</sup> There are empty slots for batteries in the desktop edition, these are really there for the laptop version. These do work on the Desktop Omni, but there  are concerns that the power brick, supplied with the the Omni Desktop may not be able to power them and may get really *hot*. The screen for the laptop comes with a beefier power supply to charge the batteries (apparently). I don't know I don't own the screen, *yet*.

Those two caveats aside this really is a great toy.

### 128k ram

So the amount of RAM available is not exactly a headline grabbing amount in today's world. But it does hint that the Omni is capable of emulating more than just the 48K Spectrum. In fact the Omni can operate as a:

+ ZX81 <sup>3</sup>
+ Jupiter Ace <sup>3</sup>
+ Spectrum 48k
+ Spectrum 128 (Toast Rack) - AY-3-8912 sound chip
+ Spectrum +2e - AY-3-8912 sound chip

<sup>3</sup> No support for divMMC in these modes.

## A tour around the Omni

Let's take a look around the Omni and see the available ports and switches

### The right side

The right side of the Omni is the busiest in terms of ports and switches. There's a lot going on here!

<div class="dbImg zoom80 centeredImg" data-src="omni-128-desktop/omni_right.png" alt="Picture of the Omni 128HQ Desktop from the right." ></div>

<div class="dbCaption">
Omni 128HQ Desktop ports and switches.
</div>

#### Integrated divMMC double SD card interface

Situated to the left of the image above are the two SD card slots for the divMMC.
This was one of the major deciding factors for me. The divMMC allows you to load  games and applications from SD Card media. It supports both standard and mini SD cards. One thing to be aware of is that the divMMC and associated firmware is a little sensitive about what cards they support. I went with a [4GB Kingston card][4] (that's not an affiliate link!).

There are two operating systems that the hardware supports: ESXDOS; a DOS like operating system and UNODOS; a more Unix like operating system. I will cover the installation and operation of these two systems in a future post.

Both of these systems are configured by setting DIP switches and both are accessed by pressing the red, NMI (non maskable interrupt) switch on the right side of the Omni.

#### Switches

So, so, many switches, too many to detail in this post, but these switches are used to:

+ Configure the version of ZX Spectrum being run
+ Set the amount of available memory
+ Test the ZX Omni hardware
+ Update the ZX Omni Firmware

#### Two 9 pin Joystick ports

Situated at the right hand side of the image above are the two 9 pin Joystick ports.
One port is for Kempston style joysticks (and therefore Sega Megadrive controllers should work) and one is for Sinclair/Atari style joysticks (*not Amstrad ones, they don't work*)

### The back side

The back side of the Omni is similar to the original spectrum with a couple of nice additions.

<div class="dbImg zoom80 centeredImg" data-src="omni-128-desktop/omni_back.png" alt="Picture of the Omni 128HQ Desktop from the right." ></div>

<div class="dbCaption">
Omni 128HQ Desktop rear view.
</div>

#### Power, expansion and cassette

At the far left of the back side of the Omni is the blue on/off switch for the device. This was a feature sorely missed from the original 48K Spectrum and a welcome addition.

The power supply input is situated below the on/off switch. The provided power supply is rated as 9V at 3.0A it has a quality feel about it.

The expansion bus is situated to the right of the power socket. Comparing the Omni to an original spectrum shows that the circuit board is thinner by a significant amount. I'm not sure if the thinner board will  grip older addons with thicker edge connectors. Actually I'd think long and hard before connecting anything to this!

To the right of the expansion slot is the mic and ear connectors for the cassette system. This is one of the few areas where the Omni differs from the Spectrum in branding, these ports are not marked.

The Mic and ear connectors also differ from the spectrum in function, the ear connector is stereo out for the  AY-3-8912 sound chip and the mic connector functions as both the input and output for the cassette.

#### RGB, Composite and HDMI out

At the right hand side of the back of the Omni are the HDMI and RGB out. I've mentioned previously the issues with the Omni and HDMI and I'm not going to rehash that.

The provided  SCART cable that comes with the Omni when attached to the RGB input of a modern TV is pin sharp, but the colour calibration is incorrect. This should have been the best quality output I have seen on a Spectrum when attached to a real TV, but normal and bright colours are the same. Pity.

### The left side

<div class="dbImg zoom80 centeredImg" data-src="omni-128-desktop/omni_left.png" alt="Picture of the Omni 128HQ Desktop from the left." ></div>

<div class="dbCaption">
Omni 128HQ left view. Nothing to see here, please move on
</div>

There's not a lot going on here. One solitary reset button. However like the power switch on the rear, the reset switch is another feature missing from the Spectrum and a welcome addition here.

## Wrapping up

The retro computing scene has seen a plethora of hardware projects in the last year or so. The _Spectrum next_ group appears to be grinding along but with very little hardware available. The _Spectrum Vega_ team appears to be spending more time in court than they did in development. The Omni desktop project by comparison appears to be a solid offering.

The Omni 128HQ Desktop is a great piece of kit. There are a few snags with it at the moment but there are work arounds for some of them (more on that in another post) and others will be remedied by firmware updates or  daughter boards.

Go on, treat yourself (just be prepared to wait a little while for delivery).

[1]: https://retroradionics.co.uk/
[2]: https://www.thefuturewas8bit.com/
[3]: http://trastero.speccy.org/cosas/JL/Superfo-Harlequin-128K/128K-i.html
[4]: https://www.amazon.co.uk/gp/product/B00MZ5T98M/ref=ppx_yo_dt_b_asin_title_o02__o00_s00?ie=UTF8&psc=1
