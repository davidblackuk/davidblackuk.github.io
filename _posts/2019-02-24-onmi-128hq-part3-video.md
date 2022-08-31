---
layout: post
title:  "Omni 128HQ Desktop #3 - Video"
tags: [ 8bit,  spectrum, hardware, omni, retro]
location: London, England
excerpt: "First of all let me address the elephant in the room: HDMI. While there is a port on the Omni for HDMI, currently it is inoperative. I bought the Omni because of HDMI and was very unhappy to discover that it wasn't implemented."
description: "In this post we head off into the unchartered waters of video output for the Omni 128HQ Desktop. Which is, surprisingly tricky." 
comments: true
share: true
thumbnail: "omni-3.png"
date: 2019-02-24
---
# Intro

This is part three of a series covering my Omni 128HQ Desktop from [retro-radionics][1]. The Omni 128HQ is a modern Sinclair Spectrum recreation with many special features. So far in this series I have covered: [An overview / review of the Omni device][101] and [a guide to configuring the Omni via DIP switches][102].

In this post we head off into the unchartered waters of video output, which is, surprisingly tricky.

First of all let me address the elephant in the room: HDMI. While there is a port on the Omni for HDMI, currently it is inoperative. I bought the Omni because of HDMI and was very unhappy to discover that it wasn't implemented.

There has been talk of firmware updates and of a daughter board being developed, but so far there is no official word on a release timeframe. It is very likely, because HDMI is a licensed standard, that when the feature is enabled, there will be a cost. If HDMI does require a daughter board there will also be an additional three to four months delay for manufacturing and shipping.

In the spirt of not being too salty about HDMI, let's look at the available options to view your omni on a TV or monitor. Unfortunately everyone of them currently comes at a cost.

## SCART direct to TV

When I first connected my Omni to my living room TV I was amazed at how sharp, bright and colourful it was. However it soon became apparent that it was _too_ bright.

Here's a bit of Spectrum basic to show bright and normal colours side-by-side.

<div class="dbImg  centeredImg" data-src="omni-128-desktop/bright_code.png" alt="Code to descriminate bright pixels from non-bright pixels" ></div>

<div class="dbCaption">
A bit of basic to show how bright the omni is
</div>

When we run this on a real ZX Spectrum we get the result shown below on the left. When we run the same code on the omni, we get the results one the right. 

<div class="dbImg  centeredImg" data-src="omni-128-desktop/bright_fail.png" alt="Results of running the code on a real speccy" ></div>

<div class="dbCaption">
My eyes, they burn!
</div>

This is a known issue with the current revision of the Omni Desktop. The board as shipped has zero Ohm resistors in positions R19, R20 and R21. These should be 68 Ohms.

<div class="dbImg  centeredImg" data-src="omni-128-desktop/bright_resistors.png" alt="Results of running the code on a real Speccy" ></div>

<div class="dbCaption">
My eyes, they burn!
</div>

If soldering surface mount resistors is not your cup of tea, and it absolutely isn't mine, you have two choices if you want SCART to your TV. 

+ Open up the provided SCART cable and solder in three non-surface mount resistors inline in the R/G/B wires (a task I would be confident in doing)
+ By a SEGA Megadrive RGB to SCART adaptor, or even a custom OMNI one

For TV output I went with the pre-made  [OMNI 128 HQ High Quality RGB SCART TV Lead Video Cable][2], which cost £12 and worked like a dream on my TV.

<div class="dbImg  centeredImg" data-src="omni-128-desktop/rcs.png" alt="Results of running the code on a real Speccy" ></div>

<div class="dbCaption">
<a href = "https://retrocomputershack.com/">Have a hunt around the retro computer shack, lots of cool adaptors for many platforms.</a>
</div>


## HDMI

Let's face it, HDMI is what I want, so my thoughts turned to RGB to HDMI conversion. Like every thing else related to video on the Omni this proved to be a challenge, however none of it was the Omni's fault.

### Making a mistake

My first attempt at getting HDMI conversion to work was to buy the [AMANKA SCART To HDMI Converter 1080P SCART to HDMI Adapter][3] for £17. **Do not buy this**. 

<div class="dbImg zoom50 centeredImg" data-src="omni-128-desktop/rgb-to-scart.png" alt="Picture of my rgb to scart converter i prurchased from Amazon." ></div>

<div class="dbCaption">
A cheap and cheerful RGB to SCART converter.
</div>

What it appears to do, is only process the composite signal. I guess it's a fair reflection of what the spectrum would have looked like on a TV (i.e. fuzzy and out of focus!)

The following clip shows the output of the Omni running through this converter. It's worth noting how *fuzzy* the miner willy characters are at the bottom of the screen. However being composite, the bright mode issue is not present and this was captured using the standard SCART cable provided with the Omni.

<video class="centeredImg" src="../images/omni-128-desktop/capture_composite.mp4"  width="640" height="360" controls preload></video>

### Correcting the mistake(ish)

So Plan A failed, there must be a Plan B, correct? And there was. As usual the answer was to throw (slightly) more money at the problem!

Plan B was the snappily named [New SCART+HDMI To HDMI HD Video Converter Box 720P 1080P 3.5mm Coaxial Audio Out][4]. 

<div class="dbImg zoom50 centeredImg" data-src="omni-128-desktop/rgb_converter.png" alt="Code to descriminate bright pixels from non-bright pixels" ></div>

<div class="dbCaption">
A better class of converter
</div>


This was a little more expensive at £20 than the AMANKA, but much better quality. Would I recommend this? The answer is yes, with a caveat (read about the power adapter later).

<video class="centeredImg" src="../images/omni-128-desktop/capture_rgb.mp4"  width="640" height="360" controls preload></video>

This capture shows the crisp output from the new SCART to HDMI converter. The miner willies marching at the bottom of the screen are finely detailed. All in all a night and day different from the previous composite solution. The  bright mode issue is still present, but that's because I didn't use the correct SCART cable to record the capture.

#### But...

It's never easy is it? The second SCART to HDMI adaptor I ordered was from eBay (hence the cheap price I guess). What it shipped with was the wrong power adaptor. The terminal connector did not fit the unit as supplied.

A couple of exchanges with their support people, which was painless and polite, got me a refund sufficient  to buy a matching power supply on amazon UK.

So as I mentioned with that Caveat in mind I would recommend this adaptor. Perhaps you could enquire up front and make sure they do dispatch the correct adapter!

## Conclusions

The Omni 128k Desktop is not without issues when it comes to video all of these  are, or will be, fixable by throwing money at them. It's a pity that the board does not come  with built in HDMI. It's a bigger pity that the 68 ohm resisters missing from the board mandate the purchase of a separate cable.

To achieve HDMI output from the Omni I had to buy an HDMI converter for £20 and a RGB to SCART cable for £12, if you add this to the base price for the Omni we are now looking at north of £120 to get a functional, Omni. Worth it? Hell yes, but for the love of God, can get the HDMI output on the board working.

Next up: my LCD screen has arrived, Stay tuned... 


[1]: https://retroradionics.co.uk/
[2]: https://www.ebay.co.uk/itm/OMNI-128-HQ-High-Quality-RGB-Scart-TV-Lead-Video-Cable/253568142226
[3]: https://www.amazon.co.uk/gp/product/B0784JCCXS/ref=ppx_yo_dt_b_asin_title_o05__o00_s00?ie=UTF8&psc=1
[4]: https://www.ebay.co.uk/itm/New-SCART-HDMI-To-HDMI-HD-Video-Converter-Box-720P-1080P-3-5mm-Coaxial-Audio-Out/292855206364?ssPageName=STRK%3AMEBIDX%3AIT&var=591628881354&_trksid=p2057872.m2749.l2649
[101]: {{ site.baseurl }}{% post_url 2019-01-26-onmi-128hq-part1-overview %}
[102]: {{ site.baseurl }}{% post_url 2019-01-27-onmi-128hq-part2-switches %}
