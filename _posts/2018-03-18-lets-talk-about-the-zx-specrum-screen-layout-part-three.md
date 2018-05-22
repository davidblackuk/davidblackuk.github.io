---
layout: post
title:  "The ZX-Spectrum screen layout: Part III"
tags: [ 8bit, z80, spectrum]
location: London, England
excerpt: Addressing the Spectrum screen programmatically
description: The Spectrum screen layout is complex, let's talk pixel address calculation...
comments: true
share: true
date: 2018-03-11
---
# The code

In previous posts I've discussed the Spectrum's [attribute map][1], and [screen layout][2]. Give those posts a read over if you've not done so already, it'll help you understand what I'm about to cover.

In this post I'm going to describe two ways to to find the pixel address of a screen location. Both of these solutions address the same problem: Given a pixel y address (0..191) in register `B` and a character x address (0..31) in  register `C`, calculate the screen address that represents those coordinates and return it in `HL`. It's assumed the subroutine will trash all registers.

The two approaches to solving this problem, are calculating the address programmatically and using a look up table. Once we've covered the implementations, we'll talk about the relative performance and trade-offs in storage, time and complexity.

## Calculating a screen address

The Spectrum's screen memory starts at #4000 so the most significant three bits of our address will always be `010`. The 5 least significant bits will always be the `X` (column) address. The 8 bits from 5 - 12 represent the pixel `Y`, but not in the way you might imagine.


<table>
<thead>
    <tr>
        <th>15</th><th>14</th><th>13</th><th>12</th><th>11</th><th>10</th><th>9</th><th>8</th><th>7</th><th>6</th><th>5 </th><th>4</th><th>3</th><th>2</th><th>1</th><th>0</th>
    </tr>
</thead>

<tbody>
    <tr>
        <td> 0 </td><td> 1 </td><td>0 </td> <td>Y<sub>7</sub> </td><td>Y<sub>6</sub></td>
        <td>Y<sub>2</sub></td><td>Y<sub>1</sub></td><td>Y<sub>0</sub></td>
        <td>Y<sub>5</sub></td><td>Y<sub>4</sub></td><td>Y<sub>3</sub></td>
        <td> X<sub>4</sub> </td><td> X<sub>3</sub> </td><td> X<sub>2</sub> </td><td> X<sub>1</sub> </td><td> X<sub>0</sub> </td>
    </tr>
</tbody>
</table>

The first two bits of the y address (Y<sub>0</sub> ) and Y<sub>1</sub>) have been picked up and dropped into the middle of the other 6 bits of the address. This is part of the reason why the spectrum screen address calculation is a strange beast. 

However putting the first two bits of the screen Y coordinate into the first two bits of the upper byte of the address, is why adding #100 to the address of a character moves down one character row on the screen.

The subroutine to calculate the address from the coordinates as set out above, is:

<table class="t-state">
<thead>
<tr>
    <th>Instruction</th> <th>T</th> <th>M</th> <th>Comment</th>
</tr>
</thead>
<tbody>
<tr><td class="t-instr">ld a,b          </td><td>4</td><td>1</td><td class="t-comment">; Work on the upper byte of the address</td></tr>
<tr><td class="t-instr">and %00000111   </td><td>7</td><td>2</td><td class="t-comment">; a = Y2 Y1 y0                         </td></tr>
<tr><td class="t-instr">or %01000000    </td><td>7</td><td>2</td><td class="t-comment">; first  three bits are always 010     </td></tr>
<tr><td class="t-instr">ld h,a          </td><td>4</td><td>1</td><td class="t-comment">; store in h                           </td></tr>
<tr><td class="t-instr">ld a,b          </td><td>4</td><td>1</td><td class="t-comment">; get bits Y7, Y6                      </td></tr>
<tr><td class="t-instr">rra             </td><td>4</td><td>1</td><td class="t-comment">; move them into place                 </td></tr>
<tr><td class="t-instr">rra             </td><td>4</td><td>1</td><td class="t-comment">;                                      </td></tr>
<tr><td class="t-instr">rra             </td><td>4</td><td>1</td><td class="t-comment">;                                      </td></tr>
<tr><td class="t-instr">and %00011000   </td><td>7</td><td>2</td><td class="t-comment">; mask off                             </td></tr>
<tr><td class="t-instr">or h            </td><td>4</td><td>1</td><td class="t-comment">;  a = 0 1 0 Y7 Y6 Y2 Y1 Y0            </td></tr>
<tr><td class="t-instr">ld h,a          </td><td>4</td><td>1</td><td class="t-comment">; calculation of h is now complete     </td></tr>
<tr><td class="t-instr">ld a,b          </td><td>4</td><td>1</td><td class="t-comment">; get y                                </td></tr>
<tr><td class="t-instr">rla             </td><td>4</td><td>1</td><td class="t-comment">;                                      </td></tr>
<tr><td class="t-instr">rla             </td><td>4</td><td>1</td><td class="t-comment">;                                      </td></tr>
<tr><td class="t-instr">and %11100000   </td><td>7</td><td>2</td><td class="t-comment">; a = y5 y4 y3 0 0 0 0 0               </td></tr>
<tr><td class="t-instr">ld l,a          </td><td>4</td><td>1</td><td class="t-comment">; store in l                           </td></tr>
<tr><td class="t-instr">ld a,c          </td><td>4</td><td>1</td><td class="t-comment">;                                      </td></tr>
<tr><td class="t-instr">and %00011111   </td><td>7</td><td>2</td><td class="t-comment">; a = X4 X3 X2 X1                      </td></tr>
<tr><td class="t-instr">or l            </td><td>4</td><td>1</td><td class="t-comment">; a =  Y5 Y4 Y3 X4 X3 X2 X1            </td></tr>
<tr><td class="t-instr">ld l,a          </td><td>4</td><td>1</td><td class="t-comment">; calculation of l is complete         </td></tr>
<tr><td class="t-instr">ret             </td><td>10</td><td>1</td><td class="t-comment">                                       </td></tr>
</tbody>
</table>


For a total of 105 T-States in 26 bytes of memory.

## Looking up a screen address

Instead of calculating the screen address every time we need it, a better alternative may be pre-calculating the results and placing them in a lookup table. 

In current programming terms we store the address of the first pixel in each screen row, in an array (let's call it `screen_map`). We then calculate the  address as `screen_map[y*2] + x`. The multiplier of 2 is because it is an array of bytes and the addresses are words.

I remember writing a basic program to print the hex addresses for the first pixel of each screen row and write it to the Sinclair printer. Then spinning up my assembler (from tape) and entering in the values by hand.

<div class="dbImg zoom50 centeredImg" data-src="2018-03-11-lets-talk-about-the-zx-specrum-screen-layout-part-three/sinclair_printer.jpg" title="Sinclair printer" ></div>

[Image Copyright:  Jbattersby. Open sourced][3]
{: style="color:gray; font-size: 80%; text-align: center;"}

The code to perform our address translation (remember `B` is the `Y` coordinate and `C` the character `X`) becomes:


<table class="t-state">
<thead>
<tr>
    <th>Instruction</th> <th>T</th> <th>M</th> <th>Comment</th>
</tr>
</thead>
<tbody>
<tr><td class="t-instr"> ld  h, 0     </td><td> 7 </td><td> 2 </td><td class="t-comment">  </td></tr>
<tr><td class="t-instr"> ld  l, b     </td><td> 4 </td><td> 1 </td><td class="t-comment">  ; hl = Y</td></tr>
<tr><td class="t-instr"> add hl, hl   </td><td> 11 </td><td> 1 </td><td class="t-comment">  ; hl = Y * 2 </td></tr>
<tr><td class="t-instr"> ld  de, screen_map  </td><td> 10 </td><td> 3 </td><td class="t-comment">  ; de = screen_map </td></tr>
<tr><td class="t-instr"> add hl, de   </td><td> 11 </td><td> 1 </td><td class="t-comment"> ; hl = screen_map + (row * 2) </td></tr>
<tr><td class="t-instr"> ld  a, (hl)  </td><td> 7 </td><td> 1 </td><td class="t-comment"> ; implements ld hl, (hl)  </td> </tr>
<tr><td class="t-instr"> inc hl       </td><td> 6 </td><td> 1 </td><td class="t-comment">  </td></tr>
<tr><td class="t-instr"> ld  h, (hl)  </td><td> 7 </td><td> 1 </td><td class="t-comment">  </td></tr>
<tr><td class="t-instr"> ld  l, a     </td><td> 4 </td><td> 1 </td><td class="t-comment"> ; hl = address of first pixel  from screen_map </td></tr>
<tr><td class="t-instr"> ld  d, 0     </td><td> 7 </td><td> 2 </td><td class="t-comment">  </td></tr>
<tr><td class="t-instr"> ld  e, c     </td><td> 4 </td><td> 1 </td><td class="t-comment"> ; de = X </td></tr>
<tr><td class="t-instr"> add hl, de   </td><td> 11 </td><td> 1 </td><td class="t-comment">  ; add the char X offset  </td></tr>
<tr><td class="t-instr"> ret          </td><td> 10 </td><td> 1 </td><td class="t-comment">  ; return screen_map[Y*2] + X </td></tr>

<tr><td class="t-instr" colspan = "4"> &nbsp; </td></tr>
<tr><td class="t-instr" colspan = "4"> screen_map:  .defw #4000, #4100, #4200,  #4300, #4400, #4500, #4600,  #4700, #4020, #4120, #4220,  #4320  </td></tr>
<tr><td class="t-instr" colspan = "4">   </td></tr>

</tbody>
</table>

That's 99 T-States and 401 bytes of memory (17  bytes of code and 384 bytes for the lookup table.

I'm not a mean spirited guy. If you want to play along at home here's a link to a [gist][4] that contains the code and more importantly
the lookup table!


## Space time trade off

So which one of these approaches is the best? The answer is, as usual, it depends. Let's compare the results

|Approach|Lines of code|T-States|Total memory|
|--|--|--|--|
|Calculation|21|105|26|
|Look up|13|99|384|

The calculated approach is slower (about 6%) more complex (61% longer method) but really efficient in memory (14 times less memory!). So for _space_ constrained applications like ROMs, calculation is the approach to take.

However for games, well, speed is king. Even small margins make a difference, especially in crucial areas like screen rendering. So it'd be a rare spectrum game that didn't use techniques like this.

As a simple example of the difference in timing of these two approaches I coded a race. On the left the contender is _calculated addresses_ and on the right; _lookup tables_. Each function is tested by filling the screen with pixels many times, alternating the border colour after each iteration.


<video class="centeredImg" src="../images/2018-03-11-lets-talk-about-the-zx-specrum-screen-layout-part-three/side-by-side.mp4"  width="320" height="240" controls preload></video>

You can see that by the end of the test, the lookup table function was in the lead by about a second. Winer, Winer, Chicken Dinner :-)




[1]: {{ site.baseurl }}{% post_url 2018-03-03-lets-talk-about-the-zx-specrum-screen-layout %}

[2]: {{ site.baseurl }}{% post_url 2018-03-10-lets-talk-about-the-zx-specrum-screen-layout-part-two %}

[3]: https://en.wikipedia.org/wiki/ZX_Printer#/media/File:Sinclair.zx.thermal.printer.jpg

[4]: https://gist.github.com/davidblackuk/7b5e71a3c226bf9fe93e715002667e67
