---
layout: post
title:  "Amstrad CPC: My ROM box"
tags: [ 8bit,  amstrad, cpc, ROMs, cpm, retro]
location: London, England
excerpt: "ROM-box, now there's a term you don't hear much anymore."
description: "My CPC ROM box, what it is and what it does." 
comments: true
share: true
thumbnail: "rom-box.png"
date: 2022-08-28
---

# ROMs to the left of me, ROMs to the right, here I am

ROM-box, now there's a term you don't hear much anymore. I used an Amstrad CPC-464 as a daily driver for my job as a games programmer. One of my most abiding memories of that time was my heavy use of ROM based applications. 

When the CPC was my main work machine, loading apps from tape was appallingly slow. Working with an assembler / editor loaded from a c-15 tape with game files stored on 10 other C-15 cassettes made me a very unhappy chappie. An external FD-1 disc drive when it finally released would help a lot, but still I wanted: 

<div class="dbImg  centeredImg" data-src="../memes/more-power.png" alt="MORE POWER" ></div>
<div class="dbCaption"> MORE POWER.</div>

Pre-internet, pre-google, I went to the only search engine I had: WH Smiths the news agent. I bought a copy of Amstrad Action. 

<div class="dbImg zoom50  centeredImg" data-src="cpc/amstrad-action-001.png" alt="MORE POWER" ></div>


Inside amstrad action, on page 25 I found this advert:

<div class="dbImg  centeredImg" data-src="cpc/maxam-rom-advert.png" alt="MORE POWER" ></div>
<div class="dbCaption"> They're advertising heaven</div>

The cartridge approach didn't appeal to me as it was fairly obvious from the get go that I'd want more ROMs as time went by. So I kept digging and found the following add on page 93 of issue one.

<div class="dbImg  centeredImg" data-src="cpc/rom-box-advert.png" alt="MORE POWER" ></div>
<div class="dbCaption">A sideways ROM advert from Honeysoft</div>


> Dave from the present here: You won't believe the amount of time I spent thumbing through the PDFs of Amstrad Action when researching this. More power?, more nostalgia really.

Back to the past.

Obviously I'm hooked on getting these, lets tally up what I'm spending:

|--|--|
|item                                  | price  |
|-------------------------------------:|-------:|
| 4 socket sideways ROM expansion card | £18.95 |
| ARNOR MAXAM Assembler                | £39.95 |
| **total**                            | £58.90 |

At this time I was using a green screen CPC-464 (with a MP-1 TV adaptor for color testing). That £58.90 represented a significant investment for me, 30% of the purchase price of the CPC. But I was a PRO and this was going to make me faster...

To be fair, it did.

An instantly available text editor and Z80 assembler, even before I had a floppy drive I felt privileged.

## More ROMs

As my needs changed I added more and more ROMS to the mix, I was running a business as a developer and I needed to invoice companies, file my taxes, write complaint letters to Amstrad about how late my order of a FD-1 was, etc

|---|---|
|ROM|Description|
|---|---|
| Utopia  | A somewhat esoteric collection of utilities for extending BASIC, handling discs, tapes and ROMS.  |
| Parados | An AMSDOS replacement / upgrade that supports a number of extra floppy disk formats included double sided discs on external drives.  |
| Protext  | A word processor  |
| Prospell  | A generic spell checker which was also integrated with Protext   |

At some point a new ROM box was required as I exceeded the limit of 4 ROMs, I can't remember which one I used, it was a kit from Everyday Electronics magazine (soldering required). 

The final total is

|--|--|
|item                                  | price  |
|-------------------------------------:|-------:|
| 4 socket sideways ROM expansion card | £18.95 |
| MAXAM Assembler (Arnor)              | £39.95 |
| Utopia  (Arnor)                      | £29.95 |
| Parados  (Quantum)                   | £14.99 |
| Protext  (Arnor)                     | £39.95 |
| Prospell  (Arnor)                    | £29.95 |
| **total**                            | £173.74 |

At £173 that's 87% of the purchase cost of the CPC-464. I'm surprised I didn't get a Christmas card from Arnor every year.


## Back to the future

In the middle of COVID lockdown one, like many others I started searching around for things to do. In the attic I had a CPC-6128, with a broken monitor and liquid drive belts. Once I got that machine working (not the monitor, I'm not HV approved) I started thinking what to do with it; when the expression ROM-box floated across my mind. So I decided to recreate my old set up and have a play.

<div class="dbImg zoom50 centeredImg" data-src="cpc/rom-box.png" alt="My ROM box populated with ROMS." ></div>

<div class="dbCaption">
My populated Rombo Redux v4.
</div>

The ROM box is the *Rombo Redux v4*, I bought it on *sell my retro* (more on which in a bit). It cost £40 and while that's more than the original Honey soft device, it is an 8 bay beast. Though to be fair the lower 8 ROMS have some restrictions. 

Other than just hosting ROMS, the *Rombo Redux V4* also comes with 
- a reset switch for the CPC (Red)
- an LED power light (Blue)
- A bank select jumper (Green)
- A set of ROM enable DIP switched (Yellow)
- A 3D printed case (without lid, but it protects the PCB from shorting)

<div class="dbImg zoom75 centeredImg" data-src="cpc/rom-box-bits.png" alt="My ROM box populated with ROMS." ></div>


The CPC 464 didn't come with a reset key, the only way to reset it was to power cycle the wall socket, or yank the power cable in and out. So the addition of a reset switch is a very welcome one.  

The CPC family of computers supported up to 16 ROMs. The bank selection jumper allows you to map your ROM box for ROMS 0..7 or 8..15. THe PCB has very detailed silkscreens showing what slot the ROMS will be in, e.g. ROM 2/10.

The DIP switches allow the user to specify what ROMS are enabled or not. I currently have all populated ROMs enabled, but there are times when ROMs might clash, or when a application is trying to use the small number of memory addresses these ROMs use. The board has a downstream edge connector so you should be able to daisy-chain two of these for 16 ROMS, though I haven't tried this.

You might think you could just remove the ROM box when not needed, but as the vendor warned me, the connector on the ribbon cable now has a death like grip on the CPC. I would be fearful of detaching the CPC edge connector pads if I tried it.

Along with the ROM box I ordered the Utopia, Parados, Prospell and Protext ROMS. Maxam I ordered separately form another supplier. When they were all socketed I was in heaven, except: except, Noooo...


<div class="dbImg zoom50 centeredImg" data-src="cpc/rom-box-triggered.png" alt="One of my labels was upside down, argggh." ></div>

<div class="dbCaption">
Feel a little triggered yet?
</div>

I mean you'd think there would be an ANSI or ECMA standard for labels on ROMs but no, not for the important stuff like that, just for the unimportant stuff like programming languages and safety critical systems. 

A quick look at the previous image of  my ROM box shows that I do however own a label printer. Problem solved. Trigger mitigated. Phew.

So once installed your Amstrad boot screen goes from this proletarian screen

<div class="dbImg  centeredImg" data-src="cpc/boot-no-roms.png" alt="Boot screen no ROMs." ></div>


to the super elitist version


<div class="dbImg  centeredImg" data-src="cpc/boot-with-roms.png" alt="A boot screen with ROMS." ></div>

and all is good. In fact if we get ahead of our selves a little and use the Utopia ROMs `|help` command we can see more

<div class="dbImg  centeredImg" data-src="cpc/utopia-help.png" alt="A ROM list from utopia."></div>

this indeed is *my Utopia*!


## Sources

I bought the Rombo Redux v4 from [sell my retro.com][1] but before you click that link *please* read on. The seller was the user
`TheEqualizor` I can't say enough good things about this guy, he answered all my questions quickly and accurately. The box is made to order and arrived very promptly.

"Sell my Retro" however is a different matter. It may be a coincidence that after I payed for this item, over several days, I received alerts from PayPal about attempted accesses to my account. MFA for the win, but I think the site was compromised. 

However I have tracked down a [youtube video][2] by the seller of the Retro Redux and it has contact details, so you can approach him yourself. Note: the Rombo Redux in that video is not the same as the model I purchased.

I bought MAXAM from an [eBay seller][3] before I bought the Rombo Redux, it may have been more expensive than it needed to be, but, it came with a printed manual.

So what did my little experiment cost:

|item                                  | price  |
|-------------------------------------:|-------:|
| Rombo Redux v4                       | £40.00 |
| MAXAM Assembler (Arnor)<sup>1</sup>  | £14.00 |
| Utopia  (Arnor)                      | £4.00  |
| Parados  (Quantum)                   | £4.00  |
| Protext  (Arnor)                     | £4.00  |
| Prospell  (Arnor)                    | £4.00  |
|-------------------------------------:|-------:|
| **total**                            | £70:00 |

<sup>1</sup>Maxam price includes P&P and that was the price I paid then. The price has since gone up.

## Wrap up

I achieved my goal of recreating my setup from 1985. I have had a blast playing around with the ROMs and reminiscing.

Modern day pricing was cheaper though, \*cough\*, I'm not sure of the 'authenticity' of the ROMS :-)

ROMS are great, they extend the capabilities of your Amstrad computer with instant access functionality. Amazingly they were mainly forwards compatible in the vanilla CPC line (the Rombo Redux is not compatible with the CPC plus series). Mine worked in my CPC 464 and 6128.

If I look for downsides, I can only think of two:
- Sometimes they didn't play well together (rare)
- You bought them at a certain version number and updating them wasn't easy or even possible.

I  think part of the allure of ROMs were that they where fairly niche. Those of us that used them felt like we were power users, and we're all snobs at heart aren't we!


That's it for this blog. I'm following up this article with a detailed description of each of the ROMs that are in the box and I'll tweet when each article is published. Could be a bit of a wait though, these articles take a long time to put together. 

[1]: https://www.sellmyretro.com/offer/details/rombo-redux-deluxe-61511
[2]: https://www.youtube.com/watch?v=k0q76PNmoiU&ab_channel=TheEqualizor
[3]: https://www.ebay.co.uk/itm/233463843334

