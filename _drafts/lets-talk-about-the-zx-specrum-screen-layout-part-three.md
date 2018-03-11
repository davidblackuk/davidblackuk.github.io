---
layout: post
title:  "The ZX-Spectrum screen layout: Part III"
tags: [ 8bit, z80, spectrum]
location: London, England
excerpt: Addressing the Spectrum screen programmatically
comments: true
share: true
date: 2018-03-11
---
# The code

In previous posts I've discussed the Spectrum's [attribute map][1], and [screen layout][2]. Give those posts a read over if you've not done so already, it'll you understand what I'm about to cover.

In this post I'm going to describe two ways to to find the pixel address of a screen location. Both of these solutions address the same problem: Given a pixel y address (0..191) in register `B` and a character x address (0..31) in  register `C`, calculate the screen address that represents those coordinates and return it in `HL`. It's assumed the subroutine will trash all registers.

The two approaches to solving this problem, are calculating the address programmatically and using a look up table. Once we've covered the implementations, we'll talk about the relative performance and trade-offs in storage, time and complexity.

## Calculating a screen address

The Spectrum's screen memory starts at #4000 so the most significant three bits of our address will always be `010`. The 5 least significant bits will always be the `X` (column) address. Bits 5 - 12 represent the pixel `Y`, but not in the way you might imagine.


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
>




## Looking up a screen address

## Space time trade off



[1]: {{ site.baseurl }}{% post_url 2018-03-03-lets-talk-about-the-zx-specrum-screen-layout %}

[2]: {{ site.baseurl }}{% post_url 2018-03-10-lets-talk-about-the-zx-specrum-screen-layout-part-two %}
