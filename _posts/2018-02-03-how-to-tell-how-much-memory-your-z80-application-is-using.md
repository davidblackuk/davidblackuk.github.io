---
layout: post
title:  How much memory is my z80 program using?
tags: [ 8bit, z80, spectrum]
location: London, England
excerpt: Some assemblers make finding how much memory you are using easy, some not so much...
description: How to tell how much memory your ZX Spectrum game is using. 
comments: true
share: true
---

Programing z80 applications is an exercise in minimalism. Maintaining a tight control on the amount of memory you use and more importantly knowing how much memory is left, is vital. Some assemblers make this process easy, others, less so.

There is a pseudo-symbol `$` supported on most if not all assemblers. `$` evaluates to the current memory location of the instruction being output. You can assign the value of `$` to a symbol at any point.

Here's a cut down version of Fred's main file, with a very much truncated list of includes!

{% highlight csharp %}
.org #8000

start:
    ld hl, 0                ; start level is 0
    call start_game         ; run the game loop
    ; ...
#include "./src/constants.z80asm"
; lots of other includes...
#include "./src/back_buffer.z80asm"

z_total_bytes: .equ $-start

{% endhighlight %}

The last line assigns the difference between the current code gen location and the start of the application to the symbl `z_total_bytes`.

Now, if you assembler supports the output of the symbol file at the end of the process (and it should,) then when you look at the symbol table, you will see
the total number of bytes used.

In my case

| VALUE  | SYMBOL  |
|---|:--|
| 0007  | WHITE          |
| A0BD  | XLOOP          |
| 0006  | YELLOW         |
| A0BA  | YLOOP          |
| 41F8  | Z_TOTAL_BYTES  |

And showing me that I'm using `41f8` bytes of data or 16888 in decimal money. So with all my game graphics loaded and may be a tenth of the logic implemented I have a hair under half the available memory left. Which puts me in a pretty good position. I have not even started cheating yet and stuffing data into the screen buffer :-)

### Modern tooling

If like myself you are a user of the Visual Studio ZX Spectrum IDE by Istvan Novak ([Git Hub][1] repo) , then this process is made _much_ easier. In visual studio navigate to
the menu item

`ZX Spectrum IDE > Z80 Assembler output`

This will pop open a window within the IDE, that in addition to the symbols list, has a summary tab that shows the total amount of memory used.

<div class="dbImg zoom80 centeredImg" data-src="z80/how-to-tell-how-much-memory-your-z80-application-is-using.png" title="SpecNet IDE Assembler output window" ></div>

As usual SpecNet IDE is proving to be my IDE of choice for spectrum development. Which you can read about here.


[1]: https://github.com/Dotneteer/spectnetide


