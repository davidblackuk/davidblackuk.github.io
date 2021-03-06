---
layout: post
title:  "Omni 128HQ Desktop #2 - Configuration"
tags: [ 8bit,  spectrum, hardware, omni]
location: London, England
excerpt: In this post I'm going to discuss how to configure the Omni 128HQ Desktop via DIP switches.
description: The Omni 128HQ from Retro-Radionics allows you to emulate 48K, 128K Spectrums, ZX81 and other formats. The Omni is configured via DIP switches, in this article we discuss the available options. 
comments: true
share: true
date: 2019-01-27
---
# Intro

In [part one of this series][4] I outlined the functionality of the Omni 128HQ Desktop from [retro-radionics][1], In this post I'm going to discuss how to configure the Omni via DIP switches.

The DIP (Dual Inline Package, should you care) switches are located on the right hand side of the Omni. The defaults that came with my Omni are shown below.

<div class="dbImg zoom100 centeredImg" data-src="omni-128-desktop/omni_switches.png" alt="Picture of the default configuration settings for the DIP switches." ></div>

<div class="dbCaption">
Out of the box settings for <em>my</em> Omni.
</div>

The switches are divided into sections by function. The following diagram shows the default switch configuration that my Omni shipped with.

<table class="omni-dip">
    <tr>
    <td class="h"><div class="i"></div></td> <td class="h"><div class="i"></div></td><td class="h"><div class="i"></div></td><td class="d"><div class="i"></div></td>
    <td class="d"><div class="o"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td>
    </tr>
    <tr>
    <td class="h"><div class="o"></div></td> <td class="h"><div class="o"></div></td><td class="h"><div class="o"></div></td><td class="d"><div class="o"></div></td>
    <td class="d"><div class="i"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td>
    </tr>
    <tr>
    <td class="h">1</td><td class="h">2</td><td class="h">3</td><td class="d">4</td><td class="d">5</td><td class="r">6</td><td class="r">7</td><td class="r">8</td>
    </tr>
</table>

Switches are either on (up position) or off (down position), in the preceding example all switches are on except switch 5.

There are three banks of switches:

+ 1, 2, 3: Hardware settings (purple area)
+ 4, 5: divMMC configuration (cyan area)
+ 6, 7, 8: Rom Selection (green area)

Not all switches in all combinations necessarily have meaning.

The switches themselves are very small and you will need to use a tool to set them. The perfect tool for the job is the humble cocktail stick. Don't use sharp objects as they may damage the switches.

<div class="dbImg zoom50 centeredImg" data-src="omni-128-desktop/picks.png" alt="Picture of some cocktail sticks." ></div>

<div class="dbCaption">
A £1 investment will get you a lifetime supply of DIP switch manipulation tools (unless you decide to put blocks of cheese and cocktail onions on them).
</div>

## Official documentation

The official FAQ for the Omni is available on the [ZX omni Facebook page][3] (You'll have to apply for membership, I don't think it'll be refused!) 

The DIP Switch settings outlined there formed the basis of this text, but I found that the implementation of the Omni differs from the description posted there.


## Hardware switches

The first switch bank (purple) has three switches (1, 2, 3) that control the hardware configuration.

| switch | description |
| ------ | ----------- |
| 1 | On enables divMMC system support, off disables it. |
| 2 | On allows the divMMC firmware to be flashed, off means read-only |
| 3 | On enables Kempston joystick support |

Several of the ROMs that are supported require divMMC support to be disabled as they conflict.

## divMMC switches

The second (cyan) bank of switches specify the of firmware supported by divMMC. There are two switches and so 4 options.

<table>
    <tr>
        <th>Switches</th><th>Description</th>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr>
                    <td class="d"><div class="o"></div></td>
                    <td class="d"><div class="o"></div></td>
                </tr>
                <tr>
                    <td class="d"><div class="i"></div></td>
                    <td class="d"><div class="i"></div></td>
                </tr>
                <tr>
                    <td class="d">4</td>
                    <td class="d">5</td>
                </tr>
            </table>
        </td>
        <td> 00 - Enable UnoDOS 3 support </td>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr>
                    <td class="d"><div class="o"></div></td>
                    <td class="d"><div class="i"></div></td>
                </tr>
                <tr>
                    <td class="d"><div class="i"></div></td>
                    <td class="d"><div class="o"></div></td>
                </tr>
                <tr>
                    <td class="d">4</td>
                    <td class="d">5</td>
                </tr>
            </table>
        </td>
        <td> 01 - Enable UnoDOS 3 support </td>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr>
                    <td class="d"><div class="i"></div></td>
                    <td class="d"><div class="o"></div></td>
                </tr>
                <tr>
                    <td class="d"><div class="o"></div></td>
                    <td class="d"><div class="i"></div></td>
                </tr>
                <tr>
                    <td class="d">4</td>
                    <td class="d">5</td>
                </tr>
            </table>
        </td>
        <td> 10 - Enable  esxDOS 0.8.6 support. This is one area where my switches a flat out different to the ones mentioned in the FAQ, the FAQ has the two divMMC switch settings the wrong way round for my setup.. </td>
    </tr>

<tr>
        <td>
            <table class="omni-dip">
                <tr>
                    <td class="d"><div class="i"></div></td>
                    <td class="d"><div class="i"></div></td>
                </tr>
                <tr>
                    <td class="d"><div class="o"></div></td>
                    <td class="d"><div class="o"></div></td>
                </tr>
                <tr>
                    <td class="d">4</td>
                    <td class="d">5</td>
                </tr>
            </table>
        </td>
        <td> 11 - Enable  esxDOS 0.8.5 support see above

</table>

I expect the meanings of these switches to change over time as different versions of firmware are released.

## ROM selection switches

The final bank of  three switches (green) configure what ROM is being used for the emulation. Three switches give us 8 combinations, all of which are used.

<table>
    <tr>
        <th>Switches</th><th>Description</th>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td></tr>
                <tr><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td></tr>
                <tr><td class="r">6</td><td class="r">7</td><td class="r">8</td></tr>
            </table>
        </td>
        <td> 000 -  Boots into the Retroleum (1.3.4) test ROM <sup>1</sup>. This can test various configurations, physical memory, graphics etc. </td>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td></tr>
                <tr><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td></tr>
                <tr><td class="r">6</td><td class="r">7</td><td class="r">8</td></tr>
            </table>
        </td>
        <td> 001 - This is documented as running the Jupiter ACE emulator. But on my revision this runs a set of diagnostics from the <a href="https://github.com/brendanalford/zx-diagnostics/wiki">ZX Spectrum Diagnostics project</a> when divMMC is disabled. However when divMMC is enabled this jumps straight into the divMMC interface without the need to press the NMI button (Not too sure this is a supported config). </td>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td></tr>
                <tr><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td></tr>
                <tr><td class="r">6</td><td class="r">7</td><td class="r">8</td></tr>
            </table>
        </td>
        <td> 010 - Runs the ZX81+ Emulator<sup>1</sup> 3.09 by <a href="http://www.fruitcake.plus.com/"> Paul Farrow</a>. Available RAM is configurable up to a whopping 32k!
        </td>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td></tr>
                <tr><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td></tr>
                <tr><td class="r">6</td><td class="r">7</td><td class="r">8</td></tr>
            </table>
        </td>
        <td> 011 - Boots the 1985 128K basic ROM<sup>1</sup>.</td>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td></tr>
                <tr><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td></tr>
                <tr><td class="r">6</td><td class="r">7</td><td class="r">8</td></tr>
            </table>
        </td>
        <td> 100 - Runs the  SE Basic 3.2 ROM by Nine tiles networks ltd. This mode supports ULA Plus mode for 260 colours! Documentation available at: <a href="http://www.worldofspectrum.org/infoseekid.cgi?id=0027510">World of Spectrum</a> .
        </td>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td></tr>
                <tr><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td></tr>
                <tr><td class="r">6</td><td class="r">7</td><td class="r">8</td></tr>
            </table>
        </td>
        <td> 101 - Runs the Amstrad +2e BASIC, with 128K available. When divMMC is on, USR0 mode zero is available. USR0 mode allows applications to access all of the hardware functionality of the device (sound cards etc). Try this mode if a hardware demo isn't working for you.   </td>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td></tr>
                <tr><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td></tr>
                <tr><td class="r">6</td><td class="r">7</td><td class="r">8</td></tr>
            </table>
        </td>
        <td> 110 - Emulates the classic 48k Spectrum basic from 1882. The best mode for compatibility with <em>ahem...</em> your saved games. </td>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td></tr>
                <tr><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td></tr>
                <tr><td class="r">6</td><td class="r">7</td><td class="r">8</td></tr>
            </table>
        </td>
        <td> 111 -  This mode runs the 1986, 128K spectrum ROM<sup>1</sup> with ULA plus mode. The boot menu gives access to the 128K basic, 48K basic, a tape test and calculator.
        </td>
    </tr>
</table>

<sup>1</sup> divMMC support must be disabled to support these modes.

## Wrapping it up

There is a lot of flexibility in the design of the Omni, accessible via the configuration switches.

The derby BASIC ROM lets me experience functionality that was  unavailable to me during my time using the Spectrum as a daily driver. The divMMC support allows me to try games I never had a chance to play. Finally the AY-3-8912 sound chip support brings a whole experience to gaming.

In the near term the Omni is here to serve two purposes for me:

+ To test my own code, created on a PC, accessed via divMMC
+ To let me experience Spectrum games once again on hardware that feels real.

So my DIP switch settings for the near future are going to be:

<table class="omni-dip">
    <tr>
    <td class="h"><div class="i"></div></td> <td class="h"><div class="o"></div></td><td class="h"><div class="i"></div></td><td class="d"><div class="i"></div></td>
    <td class="d"><div class="i"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td>
    </tr>
    <tr>
    <td class="h"><div class="o"></div></td> <td class="h"><div class="i"></div></td><td class="h"><div class="o"></div></td><td class="d"><div class="o"></div></td>
    <td class="d"><div class="o"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td>
    </tr>
    <tr>
    <td class="h">1</td><td class="h">2</td><td class="h">3</td><td class="d">4</td><td class="d">5</td><td class="r">6</td><td class="r">7</td><td class="r">8</td>
    </tr>
</table>

So i'll have: divMMC, hold the firmware update, Kempston joystick, heavy on the divMMC 8.6 support and a vanilla 48K Spectrum for dessert.

[1]: https://retroradionics.co.uk/
[2]: https://github.com/brendanalford/zx-diagnostics/wiki
[3]: https://www.facebook.com/groups/519934131721262/files/
[4]: {{ site.baseurl }}{% post_url 2019-01-26-onmi-128hq-part1-overview %}


