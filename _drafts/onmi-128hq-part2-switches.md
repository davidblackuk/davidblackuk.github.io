---
layout: post
title:  "Omni 128HQ #2 - Configuration"
tags: [ 8bit,  spectrum, hardware, omni]
location: London, England
excerpt: 
description: The Omni desktop from retro radionics is configured via DIP switches, in this article we discuss the available options. 
comments: true
share: true
date: 2019-01-26
---
# Intro

In part one of this series I outlined the functionality of the Omni 128HQ Desktop from [retro-radionics][1], In this post I'm going to discuss how to configure the Omni via DIP switches.

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








## hardware switches

The first switch bank (purple) has three switches (1, 2, 3) that control the hardware configuration. 

| switch | description |
| ------ | ----------- |
| 1 | On enables  divMMC system support, off disables it. |
| 2 | On enables the divMMC rom to be written, off means read-only |
| 3 | On enables Kempston joystick support |

Several of the ROMs that are supported require divMMC support to be disabled as they access the upper memory.

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
        <td> 10 - Enable  esxDOS 0.8.5 support </td>
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
        <td> 11 - Enable  esxDOS 0.8.6 support (currently only the beta version supported) </td>
    </tr>

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
        <td> 000 -  Boots into the Retroleum test ROM <sup>1</sup>. This can test various configurations, physical memory, graphics etc. Always a good port of call when you are worried you may have hardware issues.</td>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td></tr>
                <tr><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td></tr>
                <tr><td class="r">6</td><td class="r">7</td><td class="r">8</td></tr>
            </table>
        </td>
        <td> 001 - Runs the Jupiter ACE emulator <sup>1</sup>  </td>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td></tr>
                <tr><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td></tr>
                <tr><td class="r">6</td><td class="r">7</td><td class="r">8</td></tr>
            </table>
        </td>
        <td> 010 - Runs the ZX81 Emulator <sup>1</sup>  </td>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td></tr>
                <tr><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td></tr>
                <tr><td class="r">6</td><td class="r">7</td><td class="r">8</td></tr>
            </table>
        </td>
        <td> 011 - Boots with the Spectrum 128k basic rom  </td>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td></tr>
                <tr><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td></tr>
                <tr><td class="r">6</td><td class="r">7</td><td class="r">8</td></tr>
            </table>
        </td>
        <td> 100 - Runs the  SE Basic 3.2 ROM </td>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td></tr>
                <tr><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td></tr>
                <tr><td class="r">6</td><td class="r">7</td><td class="r">8</td></tr>
            </table>
        </td>
        <td> 101 - Runs the Spectrum +2e BASIC </td>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="o"></div></td></tr>
                <tr><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="i"></div></td></tr>
                <tr><td class="r">6</td><td class="r">7</td><td class="r">8</td></tr>
            </table>
        </td>
        <td> 110 - Emulates the classic 48k Spectrum basic </td>
    </tr>
    <tr>
        <td>
            <table class="omni-dip">
                <tr><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td><td class="r"><div class="i"></div></td></tr>
                <tr><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td><td class="r"><div class="o"></div></td></tr>
                <tr><td class="r">6</td><td class="r">7</td><td class="r">8</td></tr>
            </table>
        </td>
        <td> 111 -  Runs 128K spectrum basic (Derby basic)</td>
    </tr>
</table>

<sup>1</sup> divMMC support must be disabled to support these modes.

[1]: https://retroradionics.co.uk/
