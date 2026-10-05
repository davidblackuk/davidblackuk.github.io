---
layout: post
title: cpc firmware guide
tags:
    - atari
    - atari-scanned-doc
    - retro
description: "Scanned and OCR'd: cpc firmware guide"
date: 2026-07-19
slug: cpc-firmware-guide

---

<!-- page 1 -->

# The Amstrad CPC Firmware Guide  


By Bob Taylor and Thomas Defoe, 1992  


Electronic version by David Cantrell, 1994  HTML Version, 1996/97  http://www.cantrell.org.uk/david/tech/cpc/  


Transferred to Acrobat PDF format  By John Kavanagh, 2002  


PDF version in association with  CPC Oxygen  http://www.cpcoxygen.pro.ie  


PDF Version 1.0 (2002)

---

<!-- page 2 -->

The Amstrad CPC Firmware Guide

---

<!-- page 3 -->

## Introduction  


Fortunately, when Amstrad developed the CPC and CPC+ computers, they let the user access many of the computer's internal routines (the firmware) and use them in their own programs. Experienced coders will no doubt write faster or more versatile code, yet these can easily be patched in using the Firmware Jumplock.  


For many years, Amstrad produced the definitive guide to the insides of the CPC but sale of this was stopped in 1989. Since then the Firmware Manual has been a much sought- after item by programmers. Nevertheless, the original guide had some omissions, notably the abscence of information on the system variables and the Z80 microprocessor inside every CPC and CPC+.  


This guide is not intended to explain how to program in machine code, but we hope that it will supply the information needed to make the most of the Amstrad's capabilities when writing your own programs.  


Bob Taylor and Thomas Defoe, 1992

---

<!-- page 4 -->

The Amstrad CPC Firmware Guide

---

<!-- page 5 -->

## Contents  


# Use of Memory by the Operating System 7  


Overview of the CPC 7  System Variables 8  


# Firmwire Guide 33  


Kernel 35  Low Jumplock 38  High Jumplock 40  The Key Manager 43  The Text VDU 47  The Graphics VDU 53  The Screen Pack 57  Cassette / AMSDOS 63  AMSDOS / BIOS 66  The Sound Manager 69  The Machine Pack 71  664 / 6128 only 73  The Firmware Indirections 75  The Maths Firmware 77  Maths Subroutines for the 464 only 80  Maths Subroutines for the 664 and 6128 only 81  


# The Z80 Instruction Set 83  


The Opcodes and T States 83  The Flag Register 83  


# The CRTC Registers 105

---

<!-- page 6 -->

The Amstrad CPC Firmware Guide

---

<!-- page 7 -->

## Use of memory by the Operating System  


The following list of memory addresses and their uses has been compiled over a number of years, mainly from personal investigation. It does not claim to be definitive, since no accurate source seems to be available to the average computer user, and so may be inaccurate or deficient at certain points; also, some of the areas described have uses additional to those listed. We have tried to make it as accurate as possible, to enable others to use to the full those facilities which present themselves via this information.  


- Addresses and values are present in memory with the low byte first. The Z80 processor represents all 16- bit values in the order lo- byte hi- byte. 
- The term 'above' means higher in memory. 
- Areas with numbers of bytes of either &00 or &FF given in brackets, may be safe to use for machine code routines etc, as may the tape area, and the Sound ENT and ENT areas if these are unused. 
- The first column given is the address (for the 6128) of the memory being considered, while the second column gives the equivalent 464 address - unfortunately the 464 differs from the 6128 for most addresses, so if one address is omitted, the system variable is not available for that machine. 
- The next column gives the size allocated in bytes. Addresses on the right hand side enclosed in brackets are of System Variables which hold the address of the bytes being explained. With addresses or values anywhere in the text, the value shown is for the 6128; a value in italics is for the 464 only.  


## Overview of the CPC's memory  


In the following tables, the following symbols are used:  


<> - not the value or bit which follows \\* - this applies to all machine with a disk drive fitted b0 - bit 0 b1 - bit 1 ... b15 - bit 15 HB - most significant byte, hi- byte LB - least significant byte, lo- byte  


When addresses are given in the comments, they apply to the 6128. When the 464's address is different, it is given in brackets, such as at the comment for &B763.  


Please note that this section of the guide has been set out with all the addresses in the leftmost column in the correct order for the 6128.

---

<!-- page 8 -->

# The System Variables  



<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&amp;lt;0000</td><td>&amp;lt;0000</td><td>&amp;lt;40</td><td>Restart block:</td></tr><tr><td>&amp;lt;0000</td><td>&amp;lt;0000</td><td colspan="2">RST 0: complete machine reset</td></tr><tr><td>&amp;lt;0008</td><td>&amp;lt;0008</td><td colspan="2">RST 1: LOWJUMP: in-line two byte address: b0 to b13=address;<br>b14=Low ROM disabled;<br>b15=Upper ROM disabled</td></tr><tr><td>&amp;lt;000B</td><td>&amp;lt;000B</td><td colspan="2">LOW PCHL: HL has address as RST 1</td></tr><tr><td>&amp;lt;000E</td><td>&amp;lt;000E</td><td colspan="2">`JMP BC': BC has address to jump to</td></tr><tr><td>&amp;lt;0010</td><td>&amp;lt;0010</td><td colspan="2">RST 2: SIDE CALL: inline two byte address: b0 to b13=address-&amp;lt;0000;<br>b14 to b15=offset to required ROM (used between sequenced Foreground ROMs)</td></tr><tr><td>&amp;lt;0013</td><td>&amp;lt;0013</td><td colspan="2">SIDE PCHL: HL has address as RST 2</td></tr><tr><td>&amp;lt;0016</td><td>&amp;lt;0016</td><td colspan="2">`JMP DE': DE has address to jump to</td></tr><tr><td>&amp;lt;0018</td><td>&amp;lt;0018</td><td colspan="2">RST 3: FAR CALL: inline three byte address block: bytes 1 and 2 hold the address;<br>byte 3 holds the ROM select address</td></tr><tr><td>&amp;lt;001B</td><td>&amp;lt;001B</td><td colspan="2">FAR PCHL: as RST 3, but HL has address;<br>C has ROM select</td></tr><tr><td>&amp;lt;001E</td><td>&amp;lt;001E</td><td colspan="2">`JMP HL': HL has address to jump to</td></tr><tr><td>&amp;lt;0020</td><td>&amp;lt;0020</td><td colspan="2">RST 4: RAM LAM: LD A,(HL) from RAM with ROMs disabled</td></tr><tr><td>&amp;lt;0023</td><td>&amp;lt;0023</td><td colspan="2">FAR CALL: as RST 3, but HL has address of three byte address block</td></tr><tr><td>&amp;lt;0028</td><td>&amp;lt;0028</td><td colspan="2">RST 5: FIRM JUMP: inline two byte address to jump to</td></tr><tr><td>&amp;lt;0030</td><td>&amp;lt;0030</td><td colspan="2">RST 6: User restart;<br>default to RST 0</td></tr><tr><td>&amp;lt;0038</td><td>&amp;lt;0038</td><td colspan="2">RST 7: Interrupt entry (KB/Time etc)</td></tr><tr><td>&amp;lt;003B</td><td>&amp;lt;003B</td><td colspan="2">External interrupt (default to RET)</td></tr><tr><td>&amp;lt;0040</td><td>&amp;lt;0040</td><td>&amp;lt;130</td><td>ROM lower foreground area: BASIC input area (tokenised)</td></tr><tr><td>&amp;lt;016F</td><td>&amp;lt;016F</td><td colspan="2">end of BASIC input area.</td></tr><tr><td>&amp;lt;0170</td><td>&amp;lt;0170</td><td colspan="2">BASIC working area for program, variables, etc...</td></tr><tr><td>&amp;lt;0170</td><td>&amp;lt;0170</td><td>Program area;<br>Variables and DEF FNs area;<br>Arrays area;<br>Free space;<br>end of free space;<br>Strings area;<br>end of Strings area (=HIMEM);<br>Space for user machine code routines;<br>end of user space, byte before user;<br>defined graphics area;<br>User defined graphics area;<br>end of UDG area;<br>ROM Upper reserved area, expandible during;</td><td></td></tr><tr><td></td><td></td><td>KL ROM WALK, including:</td><td></td></tr><tr><td>r*4</td><td></td><td>ROM chaining blocks (arranged as follows):</td><td></td></tr></table>

---

<!-- page 9 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&A6FC</td><td>&A6FC</td><td>4</td><td>AMSDOS chain,ing block:</td></tr><tr><td>&A6FC</td><td>&A6FC</td><td>2</td><td>address of next ROM block in chain (or &amp;0000 if the last in chain)</td></tr><tr><td>&A6FE</td><td>&A6FE</td><td>1</td><td>ROM Select address</td></tr><tr><td>&A6FF</td><td>&A6FF</td><td>1</td><td>&amp;00</td></tr><tr><td>&A700</td><td>&A700</td><td>&amp;500</td><td>AMSDOS reserved area. This area is moved down if any ROMs have numbers greater than eight (6128 only)</td></tr><tr><td>&A700</td><td>&A700</td><td>1</td><td>Current drive number (0=A; 1=B)</td></tr><tr><td>&A701</td><td>&A701</td><td>1</td><td>Current USER number</td></tr><tr><td>&A702</td><td>&A702</td><td>1</td><td>flag?</td></tr><tr><td>&A703</td><td>&A703</td><td>2</td><td>address?</td></tr><tr><td>&A705</td><td>&A705</td><td>1</td><td>flag?</td></tr><tr><td>&A706</td><td>&A706</td><td>2</td><td>address?</td></tr><tr><td>&A708</td><td>&A708</td><td>1</td><td>OPENIN flag (&amp;FF=closed; &amp;gt;&amp;FF=opened)</td></tr><tr><td>&A709</td><td>&A709</td><td>&amp;20</td><td>Copy of current or last Disc Directory entry for OPENIN/LOAD:</td></tr><tr><td>&A709</td><td>&A709</td><td>1</td><td>USER number</td></tr><tr><td>&A70A</td><td>&A70A</td><td>8</td><td>filename (padded with spaces)</td></tr><tr><td>&A712</td><td>&A712</td><td>3</td><td>file extension (BAS, BIN, BAK, etc) including:</td></tr><tr><td>&A712</td><td>&A712</td><td>1</td><td>b7 set = Read Only</td></tr><tr><td>&A713</td><td>&A713</td><td>1</td><td>b7 set = System (ie not listed by CAT or DIR)</td></tr><tr><td>&A715</td><td>&A715</td><td>1</td><td>16K block sequence number for this directory entry (0 for first block; if &amp;lt;0 part of a larger file)</td></tr><tr><td>&A716</td><td>&A716</td><td>2</td><td>unused</td></tr><tr><td>&A718</td><td>&A718</td><td>1</td><td>length of this block in 128 byte records</td></tr><tr><td>&A719</td><td>&A719</td><td>16</td><td>sequence of Disc Block numbers containing file - &amp;00 as end marker</td></tr><tr><td>&A729</td><td>&A729</td><td>1</td><td>number of 128 byte records loaded so far; before loading proper: &amp;00 for ASCII (ie nothing loaded yet); &amp;01 for BIN or BAS files (ie header record loaded)</td></tr><tr><td>&A72A</td><td>&A72A</td><td>1</td><td></td></tr><tr><td>&A72B</td><td>&A72B</td><td>1</td><td></td></tr><tr><td>&A72C</td><td>&A72C</td><td>1</td><td>OPENOUT flag (&amp;FF=closed; &amp;gt;&amp;FF=opened)&lt;br/&gt;</td></tr><tr><td>&A72D</td><td>&A72D</td><td>&amp;20</td><td>Copy of current or last Disc Directory entry for OPENOUT/SAVE:</td></tr><tr><td>&A72D</td><td>&A72D</td><td>1</td><td>USER number</td></tr><tr><td>&A72E</td><td>&A72E</td><td>8</td><td>filename (padded with spaces)</td></tr><tr><td>&A736</td><td>&A736</td><td>3</td><td>file extension ($$$$ while open; correct extension when finished)</td></tr><tr><td>&A739</td><td>&A739</td><td>1</td><td>flag (&amp;00=open; &amp;FF=closed, ie finished)</td></tr><tr><td>&A73A</td><td>&A73A</td><td>1</td><td></td></tr><tr><td>&A73B</td><td>&A73B</td><td>1</td><td>flag (&amp;00=open; &amp;FF=closed)</td></tr><tr><td>&A73C</td><td>&A73C</td><td>1</td><td>number of 128 byte records saved so far</td></tr><tr><td>&A73D</td><td>&A73D</td><td>16</td><td>sequence of Disc Block numbers containing file - &amp;00 as end mark</td></tr></table>

---

<!-- page 10 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&A74D</td><td>&A74D</td><td>1</td><td>number of 128 byte records saved so far</td></tr><tr><td>&A74E</td><td>&A74E</td><td>1</td><td></td></tr><tr><td>&A74F</td><td>&A74F</td><td>1</td><td></td></tr><tr><td>&A750</td><td>&A750</td><td>1</td><td>flag (&amp;lt;00=OPENIN; &amp;lt;01=In Char; &amp;lt;02=In Direct (whole file))</td></tr><tr><td>&A751</td><td>&A751</td><td>2</td><td>address of 2K buffer for ASCII, or of start of current/last block if BIN or BAS file</td></tr><tr><td>&A753</td><td>&A753</td><td>2</td><td>address of next byte to read for ASCII, or of 2K buffer for BAS or BIN file</td></tr><tr><td>&A755</td><td>&A755</td><td>&amp;lt;45</td><td>first &amp;lt;45 bytes of BAS/BIN file (extended header) or of extended header made for ASCII file</td></tr><tr><td>&A755</td><td>&A755</td><td>1</td><td>USER number</td></tr><tr><td>&A756</td><td>&A756</td><td>8</td><td>filename (padded)</td></tr><tr><td>&A75E</td><td>&A75E</td><td>3</td><td>extension</td></tr><tr><td>&A761</td><td>&A761</td><td>6</td><td>unused</td></tr><tr><td>&A767</td><td>&A767</td><td>1</td><td>file type (&amp;lt;00=BASIC; &amp;lt;01=protected BASIC; &amp;lt;02=Binary; &amp;lt;16=ASCII)</td></tr><tr><td>&A768</td><td>&A768</td><td>2</td><td>unused</td></tr><tr><td>&A76A</td><td>&A76A</td><td>2</td><td>address to load file into (=actual destination), or buffer for an ASCII file</td></tr><tr><td>&A76C</td><td>&A76C</td><td>1</td><td>unused for disc</td></tr><tr><td>&A76D</td><td>&A76D</td><td>2</td><td>length of file in bytes (&amp;lt;0000 for ASCII files)</td></tr><tr><td>&A76F</td><td>&A76F</td><td>2</td><td>execution address fora BIN file</td></tr><tr><td>&A770</td><td>&A770</td><td>&amp;lt;25</td><td>unused</td></tr><tr><td>&A795</td><td>&A795</td><td>3</td><td>length of actual file in bytes (as &amp;lt;A76D)-BAS and BIN only</td></tr><tr><td>&A798</td><td>&A798</td><td>2</td><td>simple checksum of first 67 bytes of header (LB first) - BAS and BIN only</td></tr><tr><td>&A79A</td><td>&A79A</td><td>1</td><td>flag (&amp;lt;00=OPENOUT; &amp;lt;01=Out Char; &amp;lt;02=Out Direct(whole file))</td></tr><tr><td>&A79B</td><td>&A79B</td><td>2</td><td>address of 2K block if an ASCII file, or of current/last block saved if a BAS or BIN file</td></tr><tr><td>&A79D</td><td>&A79D</td><td>2</td><td>address of next byte to write for ASCII files, or of 2K buffer for BAS and BIN files</td></tr><tr><td>&A79F</td><td>&A79F</td><td>&amp;lt;45</td><td>first &amp;lt;45 bytes of BAS/BIIN file (ie extended header)</td></tr><tr><td>&A79F</td><td>&A79F</td><td>1</td><td>USER number</td></tr><tr><td>&A7A0</td><td>&A7A0</td><td>8</td><td>filename (padded)</td></tr><tr><td>&A7A8</td><td>&A7A8</td><td>3</td><td>extension</td></tr><tr><td>&A7AB</td><td>&A7AB</td><td>1</td><td>flag (&amp;lt;00=Open)</td></tr><tr><td>&A7AC</td><td>&A7AC</td><td>1</td><td></td></tr><tr><td>&A7AD</td><td>&A7AD</td><td>1</td><td>flag (&amp;lt;00=Open)</td></tr><tr><td></td><td>&A7AE</td><td>3</td><td>unused</td></tr><tr><td>&A7B1</td><td>&A7B1</td><td>1</td><td>file type (&amp;lt;00=BASIC; &amp;amp;01=protected BASIC; &amp;amp;02=Binary; &amp;amp;16=ASCII)</td></tr><tr><td>&A7B2</td><td>&A7B2</td><td>2</td><td>unused</td></tr><tr><td>&A7B4</td><td>&A7B4</td><td>2</td><td>address to save file from (for BAS or BIN files), or of buffer for ASCII files</td></tr></table>

---

<!-- page 11 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&A7B6</td><td>&A7B6</td><td>1</td><td>unused for disc</td></tr><tr><td>&A7B7</td><td>&A7B7</td><td>2</td><td>length of file in bytes</td></tr><tr><td>&A7B9</td><td>&A7B9</td><td>2</td><td>execution address for BIN files</td></tr><tr><td>&A7BB</td><td>&A7BB</td><td>&amp;25</td><td>unused</td></tr><tr><td>&A7DF</td><td>&A7DF</td><td>3</td><td>length of actual file in bytes (as at &amp;amp;A7B7) - BAS and BIN only</td></tr><tr><td>&A7E2</td><td>&A7E2</td><td>2</td><td>simple checksum of first 67 bytes of header (LB first) - BAS and BIN only</td></tr><tr><td>&A7E4</td><td>&A7E4</td><td>&amp;80</td><td>buffer area for records sent to or loaded from Disc, or used in forming filename and extension</td></tr><tr><td>&A864</td><td>&A864</td><td>14*3</td><td>Tape Jumpblock is stored here by AMSDOS - is moved to &amp;amp;BC77 etc after |TAPE</td></tr><tr><td>&A88B</td><td>&A88B</td><td>3</td><td>far address used by AMSDOS RST 3s at &amp;amp;BC77 etc (&amp;amp;CD30,&amp;amp;07)</td></tr><tr><td>&A890</td><td>&A890</td><td>&amp;19</td><td>Drive A Extended Disc Parameter Block (XDPB):</td></tr><tr><td>&A890</td><td>&A890</td><td>2</td><td>number of 128 byte records per track</td></tr><tr><td>&A892</td><td>&A892</td><td>1</td><td>log2(Block size)-7 (&amp;amp;03=1024 bytes; &amp;amp;04=2048 bytes)</td></tr><tr><td>&A893</td><td>&A893</td><td>1</td><td>(Block size)/128-1 (&amp;amp;07=1024 bytes;</td></tr><tr><td>&A894</td><td>&A894</td><td>1</td><td>(Block size)/1024 (if total of blocks &amp;lt;256, else /2048)-1</td></tr><tr><td>&A895</td><td>&A895</td><td>2</td><td>number of blocks per disc side (excluding reserved tracks)</td></tr><tr><td>&A897</td><td>&A897</td><td>2</td><td>number of (directory entries)-1</td></tr><tr><td>&A899</td><td>&A899</td><td>2</td><td>bit significant value of number of blocks for directory (&amp;amp;0080=1; &amp;amp;00C0=2)</td></tr><tr><td>&A89B</td><td>&A89B</td><td>2</td><td>number of bits in checksum =((&amp;amp;A894)+1)/4</td></tr><tr><td>&A89D</td><td>&A89D</td><td>2</td><td>number of reserved tracks (&amp;amp;00=Data; &amp;amp;01=IBM; &amp;amp;02=System)</td></tr><tr><td>&A89F</td><td>&A89F</td><td>1</td><td>number of first sector (&amp;amp;01=IBM; &amp;amp;41=System; &amp;amp;C1=Data)</td></tr><tr><td>&A8A0</td><td>&A8A0</td><td>1</td><td>number of sectors per track (Data=9; System=9; IBM=8)</td></tr><tr><td>&A8A1</td><td>&A8A1</td><td>1</td><td>gap length (Read/Write)</td></tr><tr><td>&A8A2</td><td>&A8A2</td><td>1</td><td>gap length (Format)</td></tr><tr><td>&A8A3</td><td>&A8A3</td><td>1</td><td>format filler byte (&amp;amp;E5)</td></tr><tr><td>&A8A4</td><td>&A8A4</td><td>1</td><td>log2( sector size)-7 (&amp;amp;02=512; &amp;amp;03=1024)</td></tr><tr><td>&A8A5</td><td>&A8A5</td><td>1</td><td>records per sector</td></tr><tr><td>&A8A6</td><td>&A8A6</td><td>1</td><td>current track (not for use)</td></tr><tr><td>&A8A7</td><td>&A8A7</td><td>1</td><td>0=not aligned (not for use)</td></tr><tr><td>&A8A8</td><td>&A8A8</td><td>1</td><td>Auto select flag (&amp;amp;00=Auto select; &amp;amp;FF=don&#x27;t alter)</td></tr><tr><td>&A8A9</td><td>&A8A9</td><td></td><td></td></tr><tr><td>&A8B9</td><td>&A8B9</td><td></td><td></td></tr><tr><td>&A8D0</td><td>&A8D0</td><td>&amp;19</td><td>Drive B Extended Disc Parameter Block (arranged as at &amp;amp;A890)</td></tr><tr><td>&A8E9</td><td>&A8E9</td><td></td><td>(&amp;amp;17 bytes of &amp;amp;FF)</td></tr><tr><td>&A8F9</td><td>&A8F9</td><td></td><td></td></tr><tr><td>&A900</td><td>&A900</td><td></td><td>(&amp;amp;12 bytes of &amp;amp;00)</td></tr><tr><td>&A910</td><td>&A910</td><td></td><td></td></tr><tr><td>&A918</td><td>&A918</td><td>2</td><td>address of area for reading directory entries for Drive A</td></tr></table>

---

<!-- page 12 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&amp;amp;A91A</td><td>&amp;amp;A91A</td><td>2</td><td>address of Drive A XDPB</td></tr><tr><td>&amp;amp;A91C</td><td>&amp;amp;A91C</td><td>2</td><td>address of the byte after the end of Drive A XDPB</td></tr><tr><td>&amp;amp;A91E</td><td>&amp;amp;A91E</td><td>2</td><td></td></tr><tr><td>&amp;amp;A920</td><td>&amp;amp;A920</td><td></td><td>(8bytes of &amp;amp;00)</td></tr><tr><td>&amp;amp;A928</td><td>&amp;amp;A928</td><td>2</td><td>address of area for reading directory entries for Drive B</td></tr><tr><td>&amp;amp;A92A</td><td>&amp;amp;A92A</td><td>2</td><td>address of Drive B XDPB</td></tr><tr><td>&amp;amp;A92C</td><td>&amp;amp;A92C</td><td>2</td><td>address of the byte after the end of Drive B XDPB</td></tr><tr><td>&amp;amp;A92E</td><td>&amp;amp;A92E</td><td>2</td><td></td></tr><tr><td>&amp;amp;A930</td><td>&amp;amp;A930</td><td>&amp;amp;80</td><td>block of directory entries, including last file loaded</td></tr><tr><td>&amp;amp;A9B0</td><td>&amp;amp;A9B0</td><td>&amp;amp;200</td><td>buffer for loading; usually contains last sector loaded</td></tr><tr><td>&amp;amp;ABB0</td><td>&amp;amp;ABB0</td><td></td><td>(&amp;amp;50 bytes of &amp;amp;00)</td></tr><tr><td>&amp;amp;AC00</td><td>&amp;amp;AC00</td><td></td><td>Start of BASIC Operating System reserved area:</td></tr><tr><td>&amp;amp;AC00</td><td>&amp;amp;AC00</td><td>1</td><td>program line redundant spaces flag (0=keep extra spaces; &amp;lt;&amp;gt;0=remove)</td></tr><tr><td></td><td>&amp;amp;AC01</td><td>9*3</td><td>groups of 3 RET bytes (&amp;amp;C9) called by the Upper ROM</td></tr><tr><td>&amp;amp;AC01</td><td>&amp;amp;AC1C</td><td>1</td><td>AUTO flag (0=off; &amp;lt;&amp;gt;0=on)</td></tr><tr><td>&amp;amp;AC02</td><td>&amp;amp;AC1D</td><td>2</td><td>number of the next line (6128) or of the current line (464) for AUTO</td></tr><tr><td>&amp;amp;AC04</td><td>&amp;amp;AC1F</td><td>2</td><td>step distance for AUTO</td></tr><tr><td>&amp;amp;AC06</td><td>&amp;amp;AC21</td><td>1</td><td></td></tr><tr><td>&amp;amp;AC07</td><td>&amp;amp;AC22</td><td>1</td><td></td></tr><tr><td>&amp;amp;AC08</td><td></td><td>1</td><td></td></tr><tr><td></td><td>&amp;amp;AC23</td><td>1</td><td></td></tr><tr><td>&amp;amp;AC09</td><td>&amp;amp;AC24</td><td>1</td><td>WIDTH (&amp;amp;84=132)</td></tr><tr><td>&amp;amp;AC0A</td><td>&amp;amp;AC25</td><td></td><td></td></tr><tr><td>&amp;amp;AC0B</td><td></td><td></td><td></td></tr><tr><td>&amp;amp;AC0C</td><td>&amp;amp;AC26</td><td>1</td><td>FOR/NEXT flag (0=NEXT not yet used; &amp;lt;&amp;gt;0=used)</td></tr><tr><td>&amp;amp;AC0D</td><td>&amp;amp;AC27</td><td>5</td><td>FOR start value (real). Only 2 bytes are used if % or DEFINIT variable</td></tr><tr><td>&amp;amp;AC12</td><td>&amp;amp;AC2C</td><td>2</td><td>address of : ' or of the end of program line byte after a NEXT command</td></tr><tr><td>&amp;amp;AC14</td><td>&amp;amp;AC2E</td><td>2</td><td>address of LB of the line number containing WEND</td></tr><tr><td>&amp;amp;AC16</td><td>&amp;amp;AC30</td><td>1</td><td>WHILE/WEND flag (&amp;amp;41=WEND not yet used; &amp;amp;04=used)</td></tr><tr><td>&amp;amp;AC17</td><td>&amp;amp;AC31</td><td></td><td></td></tr><tr><td>&amp;amp;AC18</td><td>&amp;amp;AC32</td><td>2</td><td></td></tr><tr><td>&amp;amp;ACIA</td><td>&amp;amp;AC34</td><td>2</td><td></td></tr><tr><td>&amp;amp;AC1C</td><td>&amp;amp;AC36</td><td>2</td><td>address of location holding ROM routine address for KB event block</td></tr><tr><td>&amp;amp;AC1E</td><td>&amp;amp;AC38</td><td>&amp;amp;0C</td><td>Event Block for ON SQ(I):</td></tr><tr><td>&amp;amp;AC1E</td><td>&amp;amp;AC38</td><td>2</td><td>chain address to next event block; &amp;amp;0000 if last in chain, but &amp;amp;FFFF if unused</td></tr><tr><td>&amp;amp;AC20</td><td>&amp;amp;AC3A</td><td>1</td><td>count</td></tr><tr><td>&amp;amp;AC21</td><td>&amp;amp;AC3B</td><td>1</td><td>class: Far address, highest (ON SQ) priority, Normal &amp;amp; Synchronous event</td></tr></table>

---

<!-- page 13 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&amp;amp;AC22</td><td>&amp;amp;AC3C</td><td>2</td><td>routine address (in BASIC ROM)</td></tr><tr><td>&amp;amp;AC24</td><td>&amp;amp;AC3E</td><td>1</td><td>ROM Select number (&amp;amp;FD ie ROM 0 enabled, Lower ROM disabled)</td></tr><tr><td>&amp;amp;AC25</td><td>&amp;amp;AC3F</td><td>1</td><td>(first byte of user field)</td></tr><tr><td>&amp;amp;AC26</td><td>&amp;amp;AC40</td><td>2</td><td>address of the end of program line byte or &#x27;:&#x27; after &#x27;ON<br>SQ(x) GOSUB line number&#x27; statement</td></tr><tr><td>&amp;amp;AC28</td><td>&amp;amp;AC42</td><td>2</td><td>address of the end of program line byte of the line before the GOSUB routine</td></tr><tr><td>&amp;amp;AC2A</td><td>&amp;amp;AC44</td><td>&amp;amp;OC</td><td>Event block for ON SQ(2), arranged as &amp;amp;AC1E onwards - second ON SQ priority</td></tr><tr><td>&amp;amp;AC36</td><td>&amp;amp;AC50</td><td>&amp;amp;OC</td><td>Event block for ON SQ(4), arranged as &amp;amp;AC1E onwards - lowest ON SQ priority</td></tr><tr><td>&amp;amp;AC42</td><td>&amp;amp;AC5C</td><td>&amp;amp;12</td><td>Ticker and Event Block for AFTER/EVERY Timer 0</td></tr><tr><td>&amp;amp;AC42</td><td>&amp;amp;AC5C</td><td>2</td><td>chain address to next event block (usually to another timer or &amp;amp;00FF)</td></tr><tr><td>&amp;amp;AC44</td><td>&amp;amp;AC5E</td><td>2</td><td>&#x27;count down&#x27; count</td></tr><tr><td>&amp;amp;AC46</td><td>&amp;amp;AC60</td><td>2</td><td>recharge count (for EVERY only - &amp;amp;0000 if AFTER)</td></tr><tr><td>&amp;amp;AC48</td><td>&amp;amp;AC62</td><td>2</td><td>chain address to next ticker block</td></tr><tr><td>&amp;amp;AC4A</td><td>&amp;amp;AC64</td><td>1</td><td>count</td></tr><tr><td>&amp;amp;AC4B</td><td>&amp;amp;AC65</td><td>1</td><td>class: Far address, lowest (timer) priority, Normal and Synchronous event</td></tr><tr><td>&amp;amp;AC4C</td><td>&amp;amp;AC66</td><td>2</td><td>Routine address (in BASIC ROM)</td></tr><tr><td>&amp;amp;AC4E</td><td>&amp;amp;AC68</td><td>1</td><td>ROM Select No (&amp;amp;FD ie ROM 0 enabled, Lower ROM disabled)</td></tr><tr><td>&lt;fcel&gt;</td><td>&lt;fcel&gt;</td><td>&lt;fcel&gt;</td><td>&lt;nl&gt;</td></tr><tr><td>&lt;fcel&gt;</td><td>&lt;fcel&gt;</td><td colspan="2">&lt;lcel&gt;</td></tr><tr><td>&lt;fcel&gt;</td><td>&lt;fcel&gt;-</td><td>&lt;fcel&gt;</td><td>&lt;nl&gt;</td></tr><tr><td></td><td>&lt;fcel&gt;</td><td>&lt;fcel&gt;</td><td>&lt;a&gt;</td></tr><tr><td>&lt;fcel&gt;</td><td>&lt;fcel&gt;&lt;fcel&gt;</td><td>&lt;fcel&gt;</td><td>&lt;nl&gt;&lt;nl&gt;</td></tr><tr><td>&lt;fcel&gt;</td><td>&lt;fcl&gt;</td><td>&lt;fcel&gt;</td><td>&lt;nl&gt;</td></tr></table>

---

<!-- page 14 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&amp;amp;AD99</td><td>&amp;amp;ADB2</td><td>&amp;amp;09</td><td>Current SOUND parameter block (see Firmware Jump &amp;amp;BCAA)</td></tr><tr><td>&amp;amp;AD99</td><td>&amp;amp;ADB2</td><td>1</td><td>channel andrendezvous status</td></tr><tr><td>&amp;amp;AD9A</td><td>&amp;amp;ADB3</td><td>1</td><td>amplitude envelope (ENV) number</td></tr><tr><td>&amp;amp;AD9B</td><td>&amp;amp;ADB4</td><td>1</td><td>tone envelope (ENT) number</td></tr><tr><td>&amp;amp;AD9C</td><td>&amp;amp;ADB5</td><td>2</td><td>tone period</td></tr><tr><td>&amp;amp;AD9E</td><td>&amp;amp;ADB7</td><td>1</td><td>noise period</td></tr><tr><td>&amp;amp;AD9F</td><td>&amp;amp;ADB8</td><td>1</td><td>initial amplitude</td></tr><tr><td>&amp;amp;ADA0</td><td>&amp;amp;ADB9</td><td>2</td><td>duration, or envelope repeat count</td></tr><tr><td>&amp;amp;ADA2</td><td>&amp;amp;ADBB</td><td>&amp;amp;10</td><td>Current Amplitude or Tone Envelope parameter bloc (see &amp;amp;BCBC or &amp;amp;BCBF)</td></tr><tr><td>&amp;amp;ADA2</td><td>&amp;amp;ADBB</td><td>1</td><td>number of sections (+&amp;amp;80 for a negative ENT number, ie the envelope is run until end of sound</td></tr><tr><td>&amp;amp;ADA3</td><td>&amp;amp;ADBC</td><td>3</td><td>first section of the envelope:</td></tr><tr><td>&amp;amp;ADA3</td><td>&amp;amp;ADBC</td><td>1</td><td>step count (if &amp;lt;&amp;amp;80) otherwise envelope shape (not tone envelope)</td></tr><tr><td>&amp;amp;ADA4</td><td>&amp;amp;ADBD</td><td>1</td><td>step size (if step count&amp;lt;&amp;amp;80) otherwise envelope period (not tone envelope)</td></tr><tr><td>&amp;amp;ADA5</td><td>&amp;amp;ADBE</td><td>1</td><td>pause time (if step count&amp;lt;&amp;amp;80) otherwise envelope period (nottone envelope)</td></tr><tr><td>&amp;amp;ADA6</td><td>&amp;amp;ADBF</td><td>3</td><td>second section of the envelope, as &amp;amp;ADA3</td></tr><tr><td>&amp;amp;ADA9</td><td>&amp;amp;ADC2</td><td>3</td><td>third section of the envelope, as &amp;amp;ADA3</td></tr><tr><td>&amp;amp;ADAC</td><td>&amp;amp;ADC5</td><td>3</td><td>fourth section of the envelope, as &amp;amp;ADA3</td></tr><tr><td>&amp;amp;AADAF</td><td>&amp;amp;ADC8</td><td>3</td><td>fifth section of the envelope, as &amp;amp;ADA3</td></tr><tr><td>&amp;amp;ABD2</td><td>&amp;amp;ADCB</td><td>5</td><td></td></tr><tr><td>&amp;amp;ADB7</td><td>&amp;amp;ADD0</td><td>&amp;amp;36</td><td></td></tr><tr><td>&amp;amp;ADEB</td><td>&amp;amp;AE04</td><td>2</td><td></td></tr><tr><td>&amp;amp;ADED</td><td>&amp;amp;AE06</td><td>6</td><td></td></tr><tr><td>&amp;amp;ADF3</td><td>&amp;amp;AE0C</td><td>26*1</td><td>table of DEFINT (&amp;amp;02), DEFSTR (&amp;amp;03) or DEFREAL default (&amp;amp;05), for variables &#x27;a&#x27; to &#x27;z&#x27;</td></tr><tr><td>&amp;amp;AE0D</td><td>&amp;amp;AE26</td><td></td><td></td></tr><tr><td>&amp;amp;AE0E</td><td>&amp;amp;AE27</td><td>2</td><td></td></tr><tr><td>&amp;amp;AE10</td><td>&amp;amp;AE29</td><td>2</td><td></td></tr><tr><td>&amp;amp;AE12</td><td>&amp;amp;AE2B</td><td>2</td><td></td></tr><tr><td>&amp;amp;AE14</td><td>&amp;amp;AE2D</td><td>1</td><td></td></tr><tr><td>&amp;amp;AE15</td><td>&amp;amp;AE2E</td><td>2</td><td>address of line number LB of last BASIC line (or &amp;amp;FFFF)</td></tr><tr><td>&amp;amp;AE17</td><td>&amp;amp;AE30</td><td>2</td><td>address of byte before next DATA item (eg comma or space)</td></tr><tr><td>&amp;amp;AE19</td><td>&amp;amp;AE32</td><td>2</td><td>address of next space on GOSUB etc stack, (see also &amp;amp;B06F)</td></tr><tr><td>&amp;amp;AE1B</td><td>&amp;amp;AE34</td><td>2</td><td>address of byte before current statement (&amp;amp;003F if in Direct Command mode)</td></tr><tr><td>&amp;amp;AE1D</td><td>&amp;amp;AE36</td><td>2</td><td>address of line number LB of line of current statement (&amp;amp;0000 if in Direct Command mode)</td></tr><tr><td>&amp;amp;AE1F</td><td>&amp;amp;AE38</td><td>1</td><td>trace flag (0=TROFF; &amp;lt;0=TRON)</td></tr></table>

---

<!-- page 15 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&amp;amp;AE20</td><td>&amp;amp;AE39</td><td>1</td><td>flag used with Trace (&amp;amp;00 if in Direct Command mode; &amp;amp;01 if in a program)</td></tr><tr><td>&amp;amp;AE21</td><td>&amp;amp;AE3A</td><td></td><td></td></tr><tr><td>&amp;amp;AE22</td><td>&amp;amp;AE3B</td><td>2</td><td></td></tr><tr><td>&amp;amp;AE24</td><td>&amp;amp;AE3D</td><td>2</td><td></td></tr><tr><td>&amp;amp;AE26</td><td>&amp;amp;AE3F</td><td>2</td><td>address to load cassette file to</td></tr><tr><td>&amp;amp;AE28</td><td>&amp;amp;AE41</td><td></td><td></td></tr><tr><td>&amp;amp;AE29</td><td>&amp;amp;AE42</td><td>1</td><td>file type from cassette header</td></tr><tr><td>&amp;amp;AE2A</td><td>&amp;amp;AE43</td><td>2</td><td>file length from cassette header</td></tr><tr><td>&amp;amp;AE2C</td><td>&amp;amp;AE45</td><td>1</td><td>program protection flag (&amp;lt;=&amp;gt;0 hides program as if protected)</td></tr><tr><td>&amp;amp;AE2D</td><td>&amp;amp;AE46</td><td>17</td><td>buffer used to form binary or hexadecimal numbers before printing etc</td></tr><tr><td>&amp;amp;AE3A</td><td>&amp;amp;AE53</td><td>5</td><td>start of buffer used to form hexadecimal numbers before printing etc</td></tr><tr><td>&amp;amp;AE3A</td><td>&amp;amp&amp;amp;AE53</td><td>1</td><td>Key Number used with INKEY (providing the Key Number is written as a decimal)</td></tr><tr><td>&amp;amp;AE3E</td><td>&amp;amp;AE57</td><td>1</td><td>last byte (usually &amp;amp;00 or &amp;amp;20) of the formed binary or hexadecimal number</td></tr><tr><td>&amp;amp;AE43</td><td>&amp;amp;AE5D</td><td>13</td><td>buffer used to form decimal numbers before printing etc</td></tr><tr><td>&amp;amp;AE4E</td><td>&amp;amp;AE68</td><td>1</td><td>last byte (usually &amp;amp;00 or &amp;amp;00) of the formed decimal number</td></tr><tr><td></td><td>&amp;amp;AE6B</td><td>3</td><td></td></tr><tr><td>&amp;amp;AE51</td><td></td><td>1</td><td></td></tr><tr><td>&amp;amp;AE52</td><td>&amp;amp;AE6E</td><td>2</td><td></td></tr><tr><td>&amp;amp;AE54</td><td></td><td>1</td><td></td></tr><tr><td></td><td>&amp;amp;AE70</td><td>2</td><td>temporary store for address after using (&amp;amp;AE68)</td></tr><tr><td>&amp;amp;AE55</td><td>&amp;amp;AE72</td><td>2</td><td>address of last used ROM or RSX JUMP instruction in its Jump Block</td></tr><tr><td>&amp;amp;AE57</td><td>&amp;amp;AE74</td><td>1</td><td>ROM Select number if address above is in ROM</td></tr><tr><td>&amp;amp;AE58</td><td>&amp;amp;AE75</td><td>2</td><td>BASIC Parser position, moved on to : : , or the end of program line byte after a CALL or an RSX</td></tr><tr><td>&amp;amp;AE5A</td><td>&amp;amp;AE77</td><td>2</td><td>the resetting address for machine Stack Pointer after a CALL or an RSX</td></tr><tr><td>&amp;amp;AE5C</td><td>&amp;amp;AE79</td><td>2</td><td>ZONE value</td></tr><tr><td>&amp;amp;AE5D</td><td></td><td>1</td><td></td></tr><tr><td></td><td>&amp;amp;AE7A</td><td>1</td><td></td></tr><tr><td>&amp;amp;AE5E</td><td>&amp;amp;AE7B</td><td>2</td><td>HIMEM (set by MEMORY)</td></tr><tr><td></td><td>&amp;amp;AE7D</td><td>2</td><td>address of the byte before the UDG area (the end of the user M/C routine area or the Strings area) if the UDG area is still present, otherwise the highest byte of Program etc area</td></tr><tr><td>&amp;amp;AE60</td><td>2</td><td></td><td>address of highest byte of free RAM (ie last byte of UDG area)</td></tr><tr><td>&amp;amp;AE62</td><td>&amp;amp;AE7F</td><td>2</td><td>address of start of ROM lower reserved area (used for tokenised lines)</td></tr><tr><td>&amp;amp;AE64</td><td>&amp;amp;AE81</td><td>2</td><td>address of end of ROM lower reserved area (byte before Program area)</td></tr><tr><td>&amp;amp;AE66</td><td>&amp;amp;AE83</td><td>2</td><td>as &amp;amp;AE68</td></tr></table>


The Amstrad CPC Firmware Guide

---

<!-- page 16 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&AE68</td><td>&AE85</td><td>2</td><td>address of start of Variables and DEF FNs area</td></tr><tr><td>&AE6A</td><td>&AE87</td><td>2</td><td>address of start of Arrays area (where next Variable or DEF FN entry is placed)</td></tr><tr><td>&AE6C</td><td>&AE89</td><td>2</td><td>address of start of free space (where next Array entry is placed)</td></tr><tr><td>&AE6E</td><td></td><td>1</td><td></td></tr><tr><td>&AE70</td><td>&AE8C</td><td>&1FF</td><td>GOSUB, FOR and WHILE stack. Entries are added above any existing ones in use (mixed as encountered) at address given by &B06F and must be used up in the opposite order. Completed entries are not deleted, just overwritten by the next new entry:</td></tr><tr><td></td><td></td><td>1</td><td>(byte of &amp;amp;00)</td></tr><tr><td></td><td></td><td>2</td><td>address of end of program line byte or :: after GOSUB statement (the point to RETURN to)</td></tr><tr><td></td><td></td><td>2</td><td>address of line number HB of line containing GOSUB</td></tr><tr><td></td><td></td><td>1</td><td>byte of &amp;amp;06, ie the length of the GOSUB entry</td></tr><tr><td></td><td></td><td>2</td><td>address of current value of control variable (in Variables area)</td></tr><tr><td></td><td></td><td>5</td><td>value of limit (ie the TO value) - there are two bytes only for Integer FORs</td></tr><tr><td></td><td></td><td>5</td><td>value of STEP - two bytes for Integer FORs</td></tr><tr><td></td><td></td><td>1</td><td>sign byte (&amp;amp;00 for positive; &amp;amp;01 for negative)</td></tr><tr><td></td><td></td><td>2</td><td>address of the end of program line byte, or :: after the FOR statement (ie the address for the NEXT loop to restart at)</td></tr><tr><td></td><td></td><td>2</td><td>address of line number LB of line containing FOR</td></tr><tr><td></td><td></td><td>2</td><td>address of byte after NEXT statement (ie the address to continue at when the limit is exceeded)</td></tr><tr><td></td><td></td><td>2</td><td>address of byte after NEXT statement again</td></tr><tr><td></td><td></td><td>1</td><td>length byte (&amp;amp;16 for Real FORs; &amp;amp;10 for Integer FORs)</td></tr><tr><td>WHILE<br>(66 max<br>capacity):</td><td></td><td></td><td></td></tr><tr><td></td><td></td><td>2</td><td>address of line number LB of line containing WHILE</td></tr><tr><td></td><td></td><td>2</td><td>address of the end of program line byte or :: after WEND statement (ie the address to continue at when the condition is false)</td></tr><tr><td></td><td></td><td>2</td><td>address of condition after the WHILE command</td></tr><tr><td></td><td></td><td>1</td><td>length byte of &amp;amp;07 - end of WHILE entry proper but:</td></tr><tr><td></td><td></td><td>+5</td><td>value of condition (0 or -1 as a floating point value) only while the WHILE entry is the last on the stack</td></tr><tr><td>&B06F</td><td>&B08B</td><td>2</td><td>address of the next space on the GOSUB etc stack (see also &amp;amp;AE19)<br>NB: The free space on the stack is also used as a workspace by various routines for values and addresses and for Variable names</td></tr><tr><td>&B071</td><td>&B08D</td><td>2</td><td>address of end of free space (the byte before the Strings area)</td></tr><tr><td>&B073</td><td>&B08F</td><td>2</td><td>address of end of Strings area (=HIMEM)</td></tr><tr><td>&B075</td><td></td><td>1</td><td></td></tr><tr><td></td><td>&B091</td><td>1</td><td></td></tr></table>

---

<!-- page 17 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td></td><td>&B092</td><td>2</td><td></td></tr><tr><td>&B076</td><td>&B094</td><td>2</td><td></td></tr><tr><td>&B078</td><td>&B096</td><td>2</td><td>address of the highest byte of free RAM disregarding UDGs (usually A6FB)</td></tr><tr><td>&B07A</td><td>&B098</td><td>2</td><td></td></tr><tr><td>&B07C</td><td>&B09A</td><td>2</td><td>address for the next entry in the String Concatenation area</td></tr><tr><td>&B07E</td><td>&B09C</td><td>10*3</td><td>concatenation area holding descriptors of strings being used</td></tr><tr><td>&B09C</td><td>&B0BA</td><td>1</td><td>length of last String used</td></tr><tr><td>&B09D</td><td>&B0BB</td><td>2</td><td>address of last String used</td></tr><tr><td></td><td>&B0BD</td><td>2</td><td></td></tr><tr><td></td><td>&B0BF</td><td>2</td><td></td></tr><tr><td>&B09F</td><td>&BOC1</td><td>1</td><td>type byte used with the Virtual Accumulator (&amp;amp;02=Integer; &amp;amp;03=String; &amp;amp;05=Real)</td></tr><tr><td>&B0A0</td><td>&B0C2</td><td>5</td><td>Virtual Accumulator used by the maths routines (two bytes for an Integer value; three bytes for a String Descriptor; five bytes for a Real value)</td></tr><tr><td>&B0A0</td><td>&B0C2</td><td>2</td><td></td></tr><tr><td>&B0A2</td><td>&B0C4</td><td>1</td><td></td></tr><tr><td>&B0A3</td><td>&B0C5</td><td>2</td><td></td></tr><tr><td>&B0A5</td><td>&B0C7</td><td>&amp;amp;5B</td><td>(&amp;amp;39 bytes on 464) bytes of &amp;amp;FF</td></tr><tr><td>&B100</td><td>&B8E4</td><td>2</td><td>&amp;amp;07, &amp;amp;C6</td></tr><tr><td>&B102</td><td>&B8E6</td><td>2</td><td>&amp;amp;65, &amp;amp;89</td></tr><tr><td>&B104</td><td>&B8E8</td><td>5</td><td></td></tr><tr><td>&B109</td><td>&B8ED</td><td>5</td><td></td></tr><tr><td>&B10E</td><td>&B8F2</td><td>5</td><td></td></tr><tr><td>&B113</td><td>&B8F7</td><td>1</td><td>DEG/RAD flag (&amp;amp;00=RAD; &amp;amp;FF=DEG)</td></tr><tr><td>&B114</td><td>&B8DC</td><td>1</td><td></td></tr><tr><td>&B115</td><td>&B8DD</td><td>1</td><td></td></tr><tr><td>&B116</td><td>&B8DE</td><td>1</td><td></td></tr><tr><td>&B117</td><td>&B8DF</td><td>1</td><td></td></tr><tr><td>&B118</td><td>&B800</td><td>&amp;amp;D2</td><td>Area used for Cassette handling:</td></tr><tr><td>&B118</td><td>&B800</td><td>1</td><td>cassette handling messages flag (0=enabled; &amp;lt;0=disabled)</td></tr><tr><td>&B119</td><td>&B801</td><td>1</td><td></td></tr><tr><td>&B11A</td><td>&B802</td><td>1</td><td>file IN flag (&amp;amp;00=closed; &amp;amp;02=IN file; &amp;amp;03=opened; &amp;amp;05=IN char)</td></tr><tr><td>&B11B</td><td>&B803</td><td>2</td><td>address of 2K buffer for directories</td></tr><tr><td>&B11D</td><td>&B805</td><td>2</td><td>address of 2K buffer for loading blocks of files - often as &amp;amp;B11B</td></tr><tr><td>&B11F</td><td>&B807</td><td>&amp;amp;40</td><td>IN Channel header</td></tr><tr><td>&B11F</td><td>&B807</td><td>&amp;amp;10</td><td>filename (padded with NULs)</td></tr><tr><td>&B12F</td><td>&B817</td><td>1</td><td>number of block being loaded, or next to be loaded</td></tr><tr><td>&B130</td><td>&B818</td><td>1</td><td>last block flag (&amp;amp;FF=last block; &amp;amp;00=not)</td></tr></table>

---

<!-- page 18 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&B131</td><td>&B819</td><td>1</td><td>file type (&amp;lt;00=BASIC; &amp;lt;01=Protected BASIC; &amp;lt;02=Binary; &amp;lt;08=Screen; &amp;lt;16=ASCII)</td></tr><tr><td>&B132</td><td>&B81A</td><td>2</td><td>length of this block</td></tr><tr><td>&B134</td><td>&B81C</td><td>2</td><td>address to load this or the next block at, or the address of the byte after last one loaded</td></tr><tr><td>&B136</td><td>&B81E</td><td>1</td><td>first block flag (&amp;lt;FF=first block; &amp;lt;00=not)</td></tr><tr><td>&B137</td><td>&B81F</td><td>2</td><td>total length of file (all blocks)</td></tr><tr><td>&B139</td><td>&B821</td><td>2</td><td>execution address for BIN files (&amp;lt;0000 if not saved as such)</td></tr><tr><td>&B13B</td><td>&B823</td><td>&amp;lt;24</td><td>not allocated</td></tr><tr><td>&B15F</td><td>&B847</td><td>1</td><td>file OUT flag (&amp;lt;00=closed; &amp;lt;02=IN file; &amp;lt;03=opened; &amp;lt;05=IN char)</td></tr><tr><td>&B160</td><td>&B848</td><td>2</td><td>address to start the next block save from, or the address of the buffer if it is OPENOUT</td></tr><tr><td>&B162</td><td>&B84A</td><td>2</td><td>address of start of the last block saved, or the address of the buffer if it is OPENOUT</td></tr><tr><td>&B164</td><td>&B84C</td><td>&amp;lt;40</td><td>OUT Channel Header (details as IN Channel Header):</td></tr><tr><td>&B164</td><td>&B84C</td><td>&amp;lt;10</td><td>filename</td></tr><tr><td>&B174</td><td>&B85C</td><td>1</td><td>number of the block being saved, or next to be saved</td></tr><tr><td>&B175</td><td>&B85D</td><td>1</td><td>last block flag (&amp;lt;FF=last block; &amp;lt;00=not)</td></tr><tr><td>&B176</td><td>&B85E</td><td>1</td><td>file type (as at &amp;lt;B131</td></tr><tr><td>&B177</td><td>&B85F</td><td>2</td><td>length saved so far</td></tr><tr><td>&B179</td><td>&B861</td><td>2</td><td>address of start of area to save, or address of buffer if it is an OPENOUT instruction</td></tr><tr><td>&B17B</td><td>&B863</td><td>1</td><td>first block flag (&amp;lt;FF=first block; &lt;00=not)</td></tr><tr><td>&B17C</td><td>&B864</td><td>2</td><td>total length of file to be saved</td></tr><tr><td>&B17E</td><td>&B866</td><td>2</td><td>execution address for BIN files (&amp;lt;0000if parameter not supplied)</td></tr><tr><td>&B180</td><td>&B868</td><td>&amp;lt;24</td><td>not allocated</td></tr><tr><td>&B1A4</td><td>&B88C</td><td>&amp;lt;40</td><td>used to construct IN Channel header:</td></tr><tr><td>&B1B5</td><td>&B89D</td><td>1</td><td></td></tr><tr><td>&B1B7</td><td>&B89F</td><td>2</td><td></td></tr><tr><td>&B1B8</td><td>&B8A3</td><td>1</td><td></td></tr><tr><td>&B1BE</td><td>&B8A6</td><td>1</td><td></td></tr><tr><td>&B1B9</td><td>&B51D</td><td></td><td>base address for calculating relevant Sound Channel block</td></tr><tr><td>&B1BC</td><td>&B520</td><td></td><td>base address for calculating relevant Sound Channel ?</td></tr><tr><td>&B1BE</td><td>&B522</td><td></td><td>base address for calculating relevant Sound Channel ?</td></tr><tr><td>&B1D5</td><td>&B539</td><td></td><td>base address for calculating relevant Sound Channel ?</td></tr><tr><td>&B1E4</td><td>&B8CC</td><td>1</td><td></td></tr><tr><td>&B1E5</td><td>&B8CD</td><td>1</td><td>synchronisation byte</td></tr><tr><td>&B1E6</td><td>&B8CE</td><td>2</td><td>&amp;lt;55, &amp;62</td></tr><tr><td>&B1E8</td><td>&B8D0</td><td>1</td><td></td></tr><tr><td>&B1E9</td><td>&B8D1</td><td>1</td><td>cassette precompensation (default &amp;lt;06; SPEED WRITE 1 &amp;lt;0C @4microseconds)</td></tr><tr><td>&B1EA</td><td>&B8D2</td><td>1</td><td>cassette 'Half a Zero' duration (default &amp;lt;53; SPEED WRITE 1 &amp;lt;29 @ 4microseconds)</td></tr></table>

---

<!-- page 19 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td rowspan="2">&B1EB</td><td rowspan="2">&B8D3</td><td>2</td><td></td></tr><tr><td>&B550</td><td>1 used by sound routines</td></tr><tr><td></td><td></td><td>&B551</td><td>1 used by sound routines</td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td>&B1ED</td><td></td><td>1</td><td>used by sound routines</td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td>&B11EE</td><td>&B552</td><td>1</td><td>used by sound routines</td></tr><tr><td></td><td></td><td></td><td>used by sound routines</td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td rowspan="2">&B1F0</td><td rowspan="2">&BB54</td><td>1</td><td>used by sound routines</td></tr><tr><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td>&B55C</td><td>&3F</td><td>Sound Channel A (1) data:</td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td rowspan="2">number of sounds still queuing</td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td>&B212</td><td>&B576</td><td>1</td><td>number of sounds originally queuing</td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr></table>

---

<!-- page 20 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&B336</td><td>&B69A</td><td>&amp;10</td><td>ENV 9</td></tr><tr><td>&B346</td><td>&B6AA</td><td>&amp;10</td><td>ENV 10</td></tr><tr><td>&B356</td><td>&B6BA</td><td>&amp;10</td><td>ENV 11</td></tr><tr><td>&B366</td><td>&B6CA</td><td>&amp;10</td><td>ENV 12</td></tr><tr><td>&B376</td><td>&B6DA</td><td>&amp;10</td><td>ENV 13</td></tr><tr><td>&B386</td><td>&B6EA</td><td>&amp;10</td><td>ENV 14</td></tr><tr><td>&B396</td><td>&B6FA</td><td>&amp;10</td><td>ENV 15</td></tr><tr><td>&B396</td><td>&B6FA</td><td>base address for calculating relevant ENT parameter block</td></tr><tr><td>&B3A6</td><td>&B70A</td><td>15*16</td><td>ENT parameter block area (each arranged as &amp;ADA2):</td></tr><tr><td>&B3A6</td><td>&B70A</td><td>10</td><td>ENT 1</td></tr><tr><td>&B3B6</td><td>&B71A</td><td>&amp;10</td><td>ENT 2</td></tr><tr><td>&B3C6</td><td>&B72A</td><td>&amp;10</td><td>ENT 3</td></tr><tr><td>&B3D6</td><td>&B73A</td><td>&amp;10</td><td>ENT 4</td></tr><tr><td>&B3E6</td><td>&B74A</td><td>&amp;10</td><td>ENT 5</td></tr><tr><td>&B3F6</td><td>&B75A</td><td>&amp;10</td><td>ENT 6</td></tr><tr><td>&B406</td><td>&B76A</td><td>&amp;10</td><td>ENT 7</td></tr><tr><td>&B416</td><td>&B77A</td><td>&amp;10</td><td>ENT 8</td></tr><tr><td>&B426</td><td>&B78A</td><td>&amp;10</td><td>ENT 9</td></tr><tr><td>&B436</td><td>&B79A</td><td>&amp;10</td><td>ENT 10</td></tr><tr><td>&B446</td><td>&B7AA</td><td>&amp;10</td><td>ENT 11</td></tr><tr><td>&B456</td><td>&B7BA</td><td>&amp;10</td><td>ENT 12</td></tr><tr><td>&B466</td><td>&B7CA</td><td>&amp;10</td><td>ENT 13</td></tr><tr><td>&B476</td><td>&B7DA</td><td>&amp;10</td><td>ENT 14</td></tr><tr><td>&B486</td><td>&B7EA</td><td>&amp;10</td><td>ENT 15</td></tr><tr><td>&B496</td><td>&B34C</td><td>&amp;50</td><td>Normal Key Table:</td></tr></table>


<table><tr><td>Cur U</td><td>Cur R</td><td>Cur D</td><td>f9</td><td>f6</td><td>f3</td><td>Enter</td><td>f.</td></tr><tr><td>Cur L</td><td>Copy</td><td>f7</td><td>f8</td><td>f5</td><td>f1</td><td>f2</td><td>f0</td></tr><tr><td>Clr</td><td>[</td><td>Ret</td><td>]</td><td>f4</td><td></td><td>\</td><td></td></tr><tr><td>^</td><td>-</td><td>@</td><td>p</td><td>;</td><td>:</td><td>/</td><td>.</td></tr><tr><td>0</td><td>9</td><td>o</td><td>i</td><td>l</td><td>k</td><td>m</td><td>j</td></tr><tr><td>8</td><td>7</td><td>u</td><td>y</td><td>h</td><td>j</td><td>n</td><td>Space</td></tr><tr><td>6</td><td>5</td><td>r</td><td>t</td><td>g</td><td>f</td><td>b</td><td>v</td></tr><tr><td>4</td><td>3</td><td>e</td><td>w</td><td>s</td><td>d</td><td>c</td><td>x</td></tr><tr><td>1</td><td>2</td><td>Esc</td><td>q</td><td>Tab</td><td>a</td><td>Caps</td><td>z</td></tr><tr><td>[VT]</td><td>[LF]</td><td>[BS]</td><td>[TAB]</td><td>Fire2</td><td>Fire1</td><td></td><td>Del</td></tr></table>


<table><tr><td>Cur U</td><td>Cur R</td><td>Cur D</td><td></td><td>f9</td><td>f6</td><td>f3</td><td>Enter</td><td>f.<td></td></td></tr><tr><td>Cur L</td><td>Copy</td><td>f7</td><td>f8</td><td></td><td>f5</td><td>f1</td><td>f2</td><td>f0</td></tr><tr><tr><td>Clr</td><td>[</td><td>Ret</td><td>]</td><td>f4</td><td>.</td><td></td><td></td><td></td></tr><tr><td>£</td><td>=</td><td>l</td><td>P</td><td>+</td><td>*</td><td>?</td><td>></td><td></td></tr><tr><td>_</td><td>)</td><td>O</td><td>l</td><td>L</td><td>K</td><td>M</td><td><</td><td></td></tr><tr><td>(</td><td>'</td><td>U</td><td>Y</td><td>H</td><td>J</td><td>N</td><td>Space</td><td></td></tr><tr><td>&amp;</td><td>%</td><td>R</td><td>T</td><td>G</td><td>F</td><td>B</td><td>V</td><td></td></tr><tr><td>$</td><td>#</td><td>E</td><td>W</td><td>S</td><td>D</td><td>C</td><td>X</td><td></td></tr></tr></table>


<table><tr><td>Cur U</td><td>Cur R<br/>Copy</td><td>Cur D</td><td>f9</td><td>f6</td><td>f3</td><td>Enter<br/>f1</td><td>f.</td></tr><tr><td>Cur L</td><td>Copy</td><td>f7</td><td></td><td>f8</td><td>f5</td><td>f2</td><td>f0</td></tr><tr><td>Clr</td><td>[</td><td></td><td>Ret</td><td>]</td><td>f4</td><td>.</td><td></td></tr><tr><td>£</td><td>=</td><td>l</td><td>P</td><td>+<br/>*</td><td>?</td><td>></td><td></td></tr><tr><td>_</td><td>)</td><td></td><td>O</td><td>l</td><td>K</td><td>M</td><td>&lt;</td></tr><tr><td>(</td><td>'</td><td>U</td><td>Y</td><td>H</td><td></td><td>N</td><td>Space</td></tr><tr><td>&amp;</td><td>%</td><td>R</td><td>T</td><td>G</td></tr><tr><td>$</td><td>#</td><td>E</td><td>W</td><td>S</td><td></td><td>C</td><td>X</td></tr></table>


The Amstrad CPC Firmware Guide

---

<!-- page 21 -->

<table><tr><td>1"</td><td>Esc</td><td>Q</td><td>-></td><td>A</td><td>Caps</td><td>Z</td></tr><tr><td></td><td>[VT]</td><td>[LF]</td><td>[BS]</td><td>[TA]</td><td>Fire2</td><td>Fire1</td></tr></table>


&B536 &B3EC &50 Control Key Table:



<table><tr><td>Cur U</td><td>Cur R</td><td>Cur D</td><td>f9</td><td>f6</td><td>f3</td><td>Enter</td><td>f.</td></tr><tr><td>Cur L</td><td>Copy</td><td>f7</td><td>f8</td><td>f5</td><td>f1</td><td>f2</td><td>f0</td></tr><tr><td>Clr</td><td>(ESC)</td><td>Ret</td><td>(GS)</td><td>f4</td><td></td><td>(FS)</td><td></td></tr><tr><td>(RS)</td><td></td><td>(NUL)</td><td>(DLE)</td><td></td><td></td><td></td><td></td></tr><tr><td>(US)</td><td></td><td>(SI)</td><td>(HT)</td><td>(FF)</td><td>(VT)</td><td>(CR)</td><td></td></tr><tr><td></td><td></td><td>(NAK)</td><td>(EM)</td><td>(BS)</td><td>(LF)</td><td>(SO)</td><td></td></tr><tr><td></td><td></td><td>(DC2)</td><td>(DC4)</td><td>(BEL)</td><td>(ACK)</td><td>(STX)</td><td>(SYN)</td></tr><tr><td></td><td></td><td>(ENQ)</td><td>(ETB)</td><td>(DC3)</td><td>(EOT)</td><td>(ETX)</td><td>(CAN)</td></tr><tr><td></td><td>~</td><td>Esc</td><td>(DC1)</td><td>Ins/Ovrt</td><td>(SOH)</td><td>S-Ick</td><td>(SUB)</td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td>Del</td><td></td></tr></table>


&B586 &B43C 10 KB repeats table (each byte/bit applies to all three key tables): 1 byte is used per line of the tables; b0 to b7 give the columns (left to right), repeat if set


&B590 &B446 &98 DEF KEY's definition area (for Keys &80 to &9F in sequence): each definition has either a single byte of &00 if it is unused/unaltered, or: byte 1: length of definition bytes 2 to x: definition, either a single key or a string of keys


&B628 &B4DE 1 Byte after end of DEF KEY area


&B629 &B4DF 1


&B62A &B4E0 1


&B62B &B4E1 2 address of DEF KEY area


&B62D &B4E3 2 address of byte after end of DEF KEY area


&B62F &B4E5 1


&B630 &B4E6 1


&B631 &B4E7 1 Shift lock flag (&00=off; &FF=on)


&B632 &B4E8 1 Caps lock flag (&00=off; &FF=on)


&B633 &B4E9 1 KB repeat period (SPEED KEY - default &02 @ 0.02 seconds)


&B634 &B4EA 1 KB delay period (SPEED KEY - default &1E @ 0.02 seconds)


&B635 &B4EB 2*10 Tables used for key scanning; bits 0 to 7 give the table columns (from left to right):


&B635 &B4EB 1



<table><tr><td>Cur U</td><td>Cur R</td><td>Cur D</td><td> f9</td><td> f6</td><td> f3</td><td>Enter</td><td>f.</td></tr><tr><td>Cur L</td><td>Copy</td><td> f7</td><td> f8</td><td> f5</td><td> f1</td><td> f2</td><td>f0</td></tr><tr><td>Cir</td><td>[Ret]</td><td> f4</td><td> Shift</td><td> \</td><td> Ctrl</td><td></td><td></td></tr><tr><td>A·@</td><td>p</td><td>:</td><td>:</td><td>:</td><td></td><td></td><td></td></tr><tr><td>0</td><td>9</td><td>0</td><td>i</td><td>k</td><td>m</td><td>j</td><td></td></tr><tr><td>8</td><td>7</td><td>u</td><td>h</td><td>j</td><td>n</td><td>Space</td><td></td></tr></table>


&B636 &B4EC 1


&B637 &B4ED 1


&B638 &B4EE 1


&B639 &B4EF 1


&B63A &B4F0 1

---

<!-- page 22 -->

<table><tr><td colspan="2">6128</td><td colspan="2">464</td><td colspan="2">Size</td><td colspan="8">Comments on the memory locations</td></tr><tr><td rowspan="2"></td><td rowspan="2">&B63B</td><td rowspan="2">&B4F1</td><td rowspan="2">1</td><td>Down</td><td>Up</td><td>Left</td><td>Right</td><td>Fire2</td><td>Fire1</td><td>(Joystick 1)</td><td></td><td></td><td></td></tr><tr><td>6</td><td>5</td><td>r</td><td>t</td><td>g</td><td>f</td><td>b</td><td>v</td><td></td><td></td></tr><tr><td></td><td>&B63C</td><td>&B4F2</td><td>1</td><td>4</td><td>3</td><td>e</td><td>w</td><td>s</td><td>d</td><td>c</td><td>x</td><td></td><td></td></tr><tr><td></td><td>&B63D</td><td>&B4F3</td><td>1</td><td>1</td><td>2</td><td>Esc</td><td>q</td><td>Tab</td><td>a</td><td>Caps</td><td>z</td><td></td><td></td></tr><tr><td></td><td>&B63E</td><td>&B4F4</td><td>1</td><td>Down</td><td>Up</td><td>Left</td><td>Right</td><td>Fire2</td><td> Fire1</td><td>(Joystick 2)</td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Del</td><td></td><td></td><td></td></tr><tr><td></td><td>&B63F</td><td>&B4F5</td><td>1</td><td>complement of &B635</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td>&B640</td><td>&B4F6</td><td>1</td><td>complement of &B636</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></table>

---

<!-- page 23 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&B691</td><td>&B547</td><td>2</td><td>address of the KB repeats table</td></tr><tr><td>&B692</td><td></td><td>1</td><td></td></tr><tr><td>&B693</td><td>&B328</td><td>2</td><td>ORIGIN x</td></tr><tr><td>&B695</td><td>&B32A</td><td>2</td><td>ORIGIN y</td></tr><tr><td>&B697</td><td>&B32C</td><td>2</td><td>graphics text x position (pixel)</td></tr><tr><td>&B699</td><td>&B32E</td><td>2</td><td>graphics text y position(pixel)</td></tr><tr><td>&B69B</td><td>&B330</td><td>2</td><td>graphics window x of one edge (pixel)</td></tr><tr><td>&B69D</td><td>&B332</td><td>2</td><td>graphics window x of other edge (pixel)</td></tr><tr><td>&B69F</td><td>&B334</td><td>2</td><td>graphics window y of one side (pixel)</td></tr><tr><td>&B6A1</td><td>&B336</td><td>2</td><td>graphics window y of other side (pixel)</td></tr><tr><td>&B6A3</td><td>&B338</td><td>1</td><td>GRAPHICS PEN</td></tr><tr><td>&B6A4</td><td>&B339</td><td>1</td><td>GRAPHICS PAPER</td></tr><tr><td>&B6A5</td><td>&B33A</td><td>8/14</td><td>(This area is 14 bytes on the 464) Used by line drawing (and other) routines, as follows:</td></tr><tr><td>&B6A7</td><td>&B33A</td><td>2</td><td>x+1()</td></tr><tr><td>&B6A9</td><td>&B33C</td><td>2</td><td>y/2+1()</td></tr><tr><td>&B6AB</td><td>&B33E</td><td>2</td><td>y/2-x()</td></tr><tr><td>&B6AD</td><td>&B340</td><td>2</td><td></td></tr><tr><td></td><td>&B342</td><td>2</td><td></td></tr><tr><td>&B6AF</td><td>&B344</td><td>1</td><td></td></tr><tr><td>&B6B0</td><td>&B345</td><td>1</td><td></td></tr><tr><td>&B6B1</td><td>&B346</td><td>1</td><td></td></tr><tr><td>&B6B2</td><td></td><td>1</td><td>first point on drawn line flag (&amp;lt;=&amp;gt;0=to be plotted; 0=don&#x27;t plot)</td></tr><tr><td>&B6B3</td><td></td><td>1</td><td>line MASK</td></tr><tr><td>&B6B4</td><td></td><td>1</td><td></td></tr><tr><td></td><td>&B207</td><td>2</td><td></td></tr><tr><td>&B6B5</td><td>&B20C</td><td>1</td><td>current stream number</td></tr><tr><td>&B6B6</td><td>&B20D</td><td>14/15</td><td>(These areas are 15 bytes on the 464) Stream (window) 0 parameter block. These areas are arranged as &amp;8B726</td></tr><tr><td>&B6C4</td><td>&B21C</td><td>14/15</td><td>stream (window) 1 parameter block</td></tr><tr><td>&B6D2</td><td>&B22B</td><td>14/15</td><td>stream (window) 2 parameter block</td></tr><tr><td>&B6E0</td><td>&B23A</td><td>14/15</td><td>stream (window) 3 parameter block</td></tr><tr><td>&B6EE</td><td>&B249</td><td>14/15</td><td>stream (window) 4 parameter block</td></tr><tr><td>&B6FC</td><td>&B258</td><td>14/15</td><td>stream (window) 5 parameter block</td></tr><tr><td>&B70A</td><td>&B267</td><td>14/15</td><td>stream (window) 6 parameter block</td></tr><tr><td>&B718</td><td>&B276</td><td>14/15</td><td>stream (window) 7 parameter block</td></tr><tr><td>&B726</td><td>&B285</td><td>14/15</td><td>Current Stream (Window) parameter block:</td></tr><tr><td>&B726</td><td>&B285</td><td>1</td><td>cursor y position (line) with respect to the whole screen (starting from 0)</td></tr><tr><td>&B727</td><td>&B286</td><td>1</td><td>cursor x position (column) with respect to the whole screen (starting from 0)</td></tr><tr><td>&B728</td><td>&B287</td><td></td><td></td></tr></table>

---

<!-- page 24 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&B729</td><td>&B288</td><td>1</td><td>window top line (y) with respect to the whole screen (starting from 0)</td></tr><tr><td>&B72A</td><td>&B289</td><td>1</td><td>window left column (x) with respect to the whole screen (starting from 0)</td></tr><tr><td>&B72B</td><td>&B28A</td><td>1</td><td>window bottom line (y) with respect to the whole screen (starting from 0)</td></tr><tr><td rowspan="2">&B72C</td><td rowspan="2">&B28B</td><td rowspan="2">1</td><td>window right column (x) with respect to the whole screen (starting from 0)</td></tr><tr></tr><tr><td>&B72D</td><td>&B28C</td><td>1</td><td>scroll count</td></tr><tr><td rowspan="2">&B72E</td><td rowspan="2">&B28D</td><td rowspan="2">1</td><td>cursor flag (&amp;amp;01=disable; &amp;amp;02=off; &amp;amp;FD=on; &amp;amp;FE=enable)</td></tr><tr></tr><tr><td>&B72F</td><td>&B28F</td><td>1</td><td>current PEN number (encoded, not its INK number)</td></tr><tr><td>&B730</td><td>&B290</td><td>1</td><td>current PAPER number (encoded, not its INK number)</td></tr><tr><td>&B731</td><td>&B291</td><td>2</td><td>address of text background routine: opaque=&amp;amp;1392; transparent=&amp;amp;13A0</td></tr><tr><td>&B733</td><td>&B293</td><td>1</td><td>graphics character writing flag (0=off; &amp;lt;&amp;gt;0=on)</td></tr><tr><td>&B734</td><td>&B294</td><td>1</td><td>ASCII number of the first character in User Defined Graphic (UDG) matrix table</td></tr><tr><td>&B735</td><td>&B295</td><td>1</td><td>UDG matrix table flag (&amp;amp;00=non-existent; &amp;amp;FF=present)</td></tr><tr><td>&B736</td><td>&B296</td><td>2</td><td>address of UDG matrix table</td></tr><tr><td>&B738</td><td>&B298</td><td>2</td><td></td></tr><tr><td>&B758</td><td>&B2B8</td><td>1</td><td></td></tr><tr><td>&B759</td><td>&B2B9</td><td>1</td><td></td></tr><tr><td>&B763</td><td>&B2C3</td><td>32*3</td><td>Control Code handling routine table - each code's entry comprises: byte 1: +0 to +9=number of parameters; +&amp;amp;80=re-run routine at a System Reset bytes 2 and 3: address of the control code's handling routine</td></tr><tr><td>&B763</td><td>&B2C3</td><td>3</td><td>ASC 0: &amp;amp;80,&amp;amp;1513: NUL</td></tr><tr><td>&B766</td><td>&B2C6</td><td>3</td><td>ASC 1: &amp;amp;81,&amp;amp;1335: Print control code chararacter [,char]</td></tr><tr><td>&B769</td><td>&B2C9</td><td>3</td><td>ASC 2: &amp;amp;80,&amp;amp;1297: Disable cursor</td></tr><tr><td>&B76C</td><td>&B2CC</td><td>3</td><td>ASC 3: &amp;amp;80,&amp;amp;1286: Enable cursor</td></tr><tr><td>&B76F</td><td>&B2CF</td><td>3</td><td>ASC 4: &amp;amp;81,&amp;amp;0AE9: Set mode [,mode]</td></tr><tr><td>&B772</td><td>&B2D2</td><td>3</td><td>ASC 5: &amp;amp;81,&amp;amp;1940: Print character using graphics mode [,char]</td></tr><tr><td>&B775</td><td>&B2D5</td><td>3</td><td>ASC 6: &amp;amp;00,&amp;amp;1459: Enable VDU</td></tr><tr><td>&B778</td><td>&B2D8</td><td>3</td><td>ASC 7: &amp;amp;80,&amp;amp;14E1: Beep</td></tr><tr><td>&B77B</td><td>&B2DB</td><td>3</td><td>ASC 8: &amp;amp;80,&amp;amp;1519: Back-space</td></tr><tr><td>&B77E</td><td>&B2DE</td><td>3</td><td>ASC 9: &amp;amp;80,&amp;amp;151E: Step-right</td></tr><tr><td>&B781</td><td>&B2E1</td><td>3</td><td>ASC 10: &amp;amp;80,&amp;amp;1523: Linefeed</td></tr><tr><td>&B784</td><td>&B2E4</td><td>3</td><td>ASC 11: &amp;amp;80,&amp;amp;1528: Previous line</td></tr><tr><td>&B787</td><td>&B2E7</td><td>3</td><td>ASC 12: &amp;amp;80,&amp;amp;154F: Clear window and locate the cursor at position 1,1</td></tr><tr><td>&B78A</td><td>&B2EA</td><td>3</td><td>ASC 13: &amp;amp;80,&amp;amp;153F: RETURN</td></tr><tr><td>&B78D</td><td>&B2ED</td><td>3</td><td>ASC 14: &amp;amp;81,&amp;amp;12AB: Set paper [,pen]</td></tr><tr><td>&B790</td><td>&B2F0</td><td>3</td><td>ASC 15: &amp;amp;81,&amp;amp;12A6: Set pen [,pen]</td></tr></table>

---

<!-- page 25 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&B793</td><td>&B2F3</td><td>3</td><td>ASC 16: &amp;amp;80, &amp;amp;155E: Delete the character at the cursor position</td></tr><tr><td>&B796</td><td>&B2F6</td><td>3</td><td>ASC 17: &amp;amp;80, &amp;amp;1599: Clear the line up to the current cursor position</td></tr><tr><td>&B799</td><td>&B2F9</td><td>3</td><td>ASC 18: &amp;amp;80, &amp;amp;158F: Clear from the cursor position to the end of the line</td></tr><tr><td>&B79C</td><td>&B2FC</td><td>3</td><td>ASC 19: &amp;amp;80, &amp;amp;1578: Clear from start of the window to the cursor position</td></tr><tr><td>&B79F</td><td>&B2FF</td><td>3</td><td>ASC 20: &amp;amp;80, &amp;amp;1565: Clear from the cursor position to the end of a window</td></tr><tr><td>&B7A2</td><td>&B302</td><td>3</td><td>ASC 21: &amp;amp;80, &amp;amp;1452: Disable VDU</td></tr><tr><td>&B7A5</td><td>&B305</td><td>3</td><td>ASC 22: &amp;amp;81, &amp;amp;14EC: Set text write mode [,mode]</td></tr><tr><td>&B7A8</td><td>&B308</td><td>3</td><td>ASC 23: &amp;amp;81, &amp;amp;0C55: Set graphics draw mode [,mode]</td></tr><tr><td>&B7AB</td><td>&B30B</td><td>3</td><td>ASC 24: &amp;amp;80, &amp;amp;12C6: Exchange pen and paper</td></tr><tr><td>&B7AE</td><td>&B30E</td><td>3</td><td>ASC 25: &amp;amp;89, &amp;amp;150D: Define user defined character [,char,8 rows of char]</td></tr><tr><td>&B7B1</td><td>&B311</td><td>3</td><td>ASC 26: &amp;amp;84, &amp;amp;1501: Define window [,left,right,top,bottom]</td></tr><tr><td>&B7B4</td><td>&B314</td><td>3</td><td>ASC 27: &amp;amp;00, &amp;amp;14EB: ESC (=user)</td></tr><tr><td>&B7B7</td><td>&B317</td><td>3</td><td>ASC 28: &amp;amp;83, &amp;amp;14F1: Set the pen inks [,pen,ink 1,ink 2]</td></tr><tr><td>&B7BA</td><td>&B31A</td><td>3</td><td>ASC 29: &amp;amp;82, &amp;amp;14FA: Set border colours [,ink,ink2]</td></tr><tr><td>&B7BD</td><td>&B31D</td><td>3</td><td>ASC 30: &amp;amp;80, &amp;amp;1539: Locate the text cursor at position 1,1</td></tr><tr><td>&B7C0</td><td>&B320</td><td>3</td><td>ASC 31: &amp;amp;82, &amp;amp;1547: Locate the text cursor at [,column,line]</td></tr><tr><td>&B7C3</td><td>&B1C8</td><td>1</td><td>MODE number</td></tr><tr><td>&B7C4</td><td>&B1C9</td><td>2</td><td>screen offset</td></tr><tr><td>&B7C6</td><td>&B1CB</td><td>1</td><td>screen base HB (LB taken as &amp;amp;00)</td></tr><tr><td>&B7C7</td><td>&B1CC</td><td>3</td><td>graphics VDU write mode indirection - JP &amp;amp;0C74</td></tr><tr><td></td><td>&B1CF</td><td>8</td><td>list of bytes having only one bit set, from b7 down to b0</td></tr><tr><td>&B7D2</td><td>&B1D7</td><td>1</td><td>first flash period (SPEED INK - default &amp;amp;0A @ 0.02 seconds)</td></tr><tr><td>&B7D3</td><td>&B1D8</td><td>1</td><td>second flash period (SPEED INK - default &amp;amp;0A @ 0,02 seconds)</td></tr><tr><td>&B7D4</td><td>&B1D9</td><td>1+16</td><td>Border and Pens' First Inks (as hardware numbers):</td></tr><tr><td>&B7D4</td><td>&B1D9</td><td>1</td><td>hw &amp;amp;04 = sw 1 (blue) border</td></tr><tr><td>&B7D5</td><td>&B1DA</td><td>1</td><td>hw &amp;amp;04 = sw 1 (blue) pen 0</td></tr><tr><td>&B7D6</td><td>&B1DB</td><td>1</td><td>hw &amp;amp;0A = sw 24 (bright yellow) pen 1</td></tr><tr><td>&B7D7</td><td>&B1DC</td><td>1</td><td>hw &amp;amp;13 = sw 20 (bright cyan) pen 2</td></tr><tr><td>&B7D8</td><td>&B1DD</td><td>1</td><td>hw &amp;amp;0C = sw 6 (bright red) pen 3</td></tr><tr><td>&B7D9</td><td>&B1DE</td><td>1</td><td>hw &amp;amp;0B = sw 26 (bright white) pen 4</td></tr><tr><td>&B7DA</td><td>&B1DF</td><td>1</td><td>hw &amp;amp;14 = sw 0 (black) pen 5</td></tr><tr><td>&B7DB</td><td>&B1E0</td><td>1</td><td>hw &amp;amp;15 = sw 2 (bright blue) pen 6</td></tr><tr><td>&B7DC</td><td>&B1E1</td><td>1</td><td>hw &amp;amp;0D = sw 8 (bright magenta) pen 7</td></tr><tr><td>&B7DD</td><td>&B1E2</td><td>1</td><td>hw &amp;amp;06 = sw 10 (cyan) pen 8</td></tr><tr><td>&B7DE</td><td>&B1E3</td><td>1</td><td>hw &amp;amp;1E = sw 12 (yellow) pen 9</td></tr><tr><td>&B7DF</td><td>&B1E4</td><td>1</td><td>hw &amp;amp;1F = sw 14 (pale blue) pen 10</td></tr></table>

---

<!-- page 26 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&B7E0</td><td>&B1E5</td><td>1</td><td>hw &amp;amp;07 = sw 16 (pink) pen 11</td></tr><tr><td>&B7E1</td><td>&B1E6</td><td>1</td><td>hw &amp;amp;12 = sw 18 (bright green) pen 12</td></tr><tr><td>&B7E2</td><td>&B1E7</td><td>1</td><td>hw &amp;amp;19 = sw 22 (pale green) pen 13</td></tr><tr><td>&B7E3</td><td>&B1E8</td><td>1</td><td>hw &amp;amp;04 = sw 1 (blue) pen 14</td></tr><tr><td>&B7E4</td><td>&B1E9</td><td>1</td><td>hw &amp;amp;17 = sw 11 (sky blue) pen 15</td></tr><tr><td>&B7E5</td><td>&B1EA</td><td>1+16</td><td>Border and Pens' Second Inks (as hardware numbers):</td></tr><tr><td>&B7E5</td><td>&B1EA</td><td>1</td><td>hw &amp;amp;04 = sw 1 (blue) border</td></tr><tr><td>&B7E6</td><td>&B1EB</td><td>1</td><td>hw &amp;amp;04 = sw 1 (blue) pen O</td></tr><tr><td>&B7E7</td><td>&B1EC</td><td>1</td><td>hw &amp;amp;0A = sw 24 (bright yellow) pen 1</td></tr><tr><td>&B7E8</td><td>&B1ED</td><td>1</td><td>hw &amp;amp;13 = sw 20 (bright cyan) pen 2</td></tr><tr><td>&B7E9</td><td>&B1EE</td><td>1</td><td>hw &amp;amp;0C = sw 6 (bright red) pen 3</td></tr><tr><td>&B7EA</td><td>&B1FF</td><td>1</td><td>hw &amp;amp;0B = sw 26 (bright white) pen 4</td></tr><tr><td>&B7EB</td><td>&B1F0</td><td>1</td><td>hw &amp;amp;14 = sw 0 (black) pen 5</td></tr><tr><td>&B7EC</td><td>&B1F1</td><td>1</td><td>hw &amp;amp;15 = sw 2 (bright blue) pen 6</td></tr><tr><td>&B7ED</td><td>&B1F2</td><td>1</td><td>hw &amp;amp;0D = sw 8 (bright magenta) pen 7</td></tr><tr><td>&B7EE</td><td>&B1F3</td><td>1</td><td>hw &amp;amp;06 = sw 10 (cyan) pen 8</td></tr><tr><td>&B7EF</td><td>&B1F4</td><td>1</td><td>hw &amp;amp;1E = sw 12 (yellow) pen 9</td></tr><tr><td>&B7F0</td><td>&B1F5</td><td>1</td><td>hw &amp;amp;1F = sw 14 (pale blue) pen 10</td></tr><tr><td>&B7F1</td><td>&B1F6</td><td>1</td><td>hw &amp;amp;07 = sw 16 (pink)pen 11</td></tr><tr><td>&B7F2</td><td>&B1F7</td><td>1</td><td>hw &amp;amp;12 = sw 18 (bright green)pen 12</td></tr><tr><td>&B7F3</td><td>&B1F8</td><td>1</td><td>hw &amp;amp;19 = sw 22 (pale green ) pen 13</td></tr><tr><td>&B7F4</td><td>&B1F9</td><td>1</td><td>hw &amp;amp;04 = sw 1 (bright yellow) pen 14</td></tr><tr><td>&B7F5</td><td>&B1FA</td><td>1</td><td>hw &amp;amp;17 = sw 11 (pink) pen 15</td></tr><tr><td>&B7F6</td><td>&B1FB</td><td>1</td><td></td></tr><tr><td>&B7F7</td><td>&B1FC</td><td>1</td><td></td></tr><tr><td>&B7F8</td><td>&B1FD</td><td>1</td><td></td></tr><tr><td>&B7F9</td><td>&B1FE</td><td>2</td><td></td></tr><tr><td>&B7FB</td><td>&B200</td><td>2</td><td></td></tr><tr><td>&B7FD</td><td></td><td></td><td></td></tr><tr><td>&B802</td><td></td><td>1+1</td><td></td></tr><tr><td>&B804</td><td></td><td>1</td><td>number of entries in the Printer Translation Table (normally 10)</td></tr><tr><td>&B805</td><td></td><td>20*2</td><td>Printer Translation Table; each entry comprises: byte 1:<br>screen code byte 2: printer code</td></tr><tr><td>&B805</td><td></td><td>2</td><td>screen &amp;amp;A0 printer &amp;amp;5E (acute accent)</td></tr><tr><td>&B807</td><td></td><td>2</td><td>screen &amp;amp;A1 printer &amp;amp;5C (\)</td></tr><tr><td>&B809</td><td></td><td>2</td><td>screen &amp;amp;A2 printer &amp;amp;7B (\)</td></tr><tr><td>&B80B</td><td></td><td>2</td><td>screen &amp;amp;A3 printer &amp;amp;23 (#)</td></tr><tr><td>&B80D</td><td></td><td>2</td><td>screen &amp;amp;A6 printer &amp;amp;40 (@)</td></tr><tr><td>&B80F</td><td></td><td>2</td><td>screen &amp;amp;AB printer &amp;amp;7C (\)</td></tr><tr><td>&B811</td><td></td><td>2</td><td>screen &amp;amp;AC printer &amp;amp;7D (\)</td></tr><tr><td>&B813</td><td></td><td>2</td><td>screen &amp;amp;AD printer &amp;amp;7E (~)</td></tr></table>

---

<!-- page 27 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&B815</td><td></td><td>2</td><td>screen &amp;amp;AE printer &amp;amp;5D (I)</td></tr><tr><td>&B817</td><td></td><td>2</td><td>screen &amp;amp;AF printer &amp;amp;SE (I)</td></tr><tr><td>&B819</td><td></td><td>20</td><td>room for ten more translations</td></tr><tr><td>&B82D</td><td>&B100</td><td>1</td><td></td></tr><tr><td>&B82E</td><td>&B101</td><td>1</td><td></td></tr><tr><td>&B82F</td><td>&B102</td><td>2</td><td></td></tr><tr><td>&B831</td><td>&B104</td><td>1</td><td></td></tr><tr><td>&B832</td><td>&B105</td><td>2</td><td>temporary store for stack pointer (SP) during interrupt handling</td></tr><tr><td>&B834</td><td>&B107</td><td>&amp;amp;70</td><td>temporary machine stack (from &amp;amp;B8B3 downwards) during interrupt handling</td></tr><tr><td>&B8B4</td><td>&B187</td><td>4</td><td>TIME (stored with the LB first - four bytes give &amp;gt;166 days; three bytes give &amp;gt;15 hours)</td></tr><tr><td>&B8B8</td><td>&B18B</td><td>1</td><td></td></tr><tr><td>&B8B9</td><td>&B18C</td><td>2</td><td></td></tr><tr><td>&B8BB</td><td>&B18E</td><td>2</td><td></td></tr><tr><td>&B8BD</td><td>&B190</td><td>2</td><td>address of the first ticker block in chain (if any)</td></tr><tr><td>&B8BF</td><td>&B192</td><td>1</td><td>Keyboard scan flag (&amp;amp;00=scan not needed; &amp;amp;01=scan needed)</td></tr><tr><td>&B8C0</td><td>&B193</td><td>2</td><td>address of the first event block in chain (if any)</td></tr><tr><td>&B8C2</td><td>&B195</td><td>1</td><td></td></tr><tr><td>&B8C3</td><td>&B196</td><td>&amp;amp;10</td><td>buffer for last RSX or RSX command name (last character has bit 7 set)</td></tr><tr><td>&B8D3</td><td>&B1A6</td><td>2</td><td>address of first ROM or RSX chaining block in chain</td></tr><tr><td>&B8D5</td><td></td><td>1</td><td>RAM bank number</td></tr><tr><td>&B8D6</td><td>&B1A8</td><td>1</td><td>Upper ROM status (eg select number)</td></tr><tr><td>&B8D7</td><td>&B1A9</td><td>2</td><td>entry point of foreground ROM in use (eg &amp;amp;C006 for BASIC ROM)</td></tr><tr><td>&B8D9</td><td>&B1AB</td><td>1</td><td>foreground ROM select address (0 for the BASIC ROM)</td></tr><tr><td>&B8DA</td><td></td><td>16*2</td><td>ROM entry IY value (ie the address table) - the 6128 has ROMs numbered from 0 to 15:</td></tr><tr><td></td><td>&B1AC</td><td>7*2</td><td>ROM entry IY value (ie the address table)</td></tr><tr><td>&B8DA</td><td></td><td>2</td><td>ROM 0 IY (not for the 464)</td></tr><tr><td>&B8DC</td><td>&B1AC</td><td>2</td><td>ROM 1 IY</td></tr><tr><td>&B8DE</td><td>&B1AE</td><td>2</td><td>ROM 2 IY</td></tr><tr><td>&B8E0</td><td>&B1B0</td><td>2</td><td>ROM 3 IY</td></tr><tr><td>&B8E2</td><td>&B1B2</td><td>2</td><td>ROM 4 IY</td></tr><tr><td>&B8E4</td><td>&B1B4</td><td>2</td><td>ROM 5 IY</td></tr><tr><td>&B8E6</td><td>&B1B6</td><td>2</td><td>ROM 6 IY</td></tr><tr><td>&B8E8</td><td>&B1B8</td><td>2</td><td>ROM 7 IY (usually &amp;amp;A700 for AMSDOS/CPM ROM)</td></tr><tr><td>&B8EA</td><td></td><td>2</td><td>ROM 8 IY (not 464)</td></tr><tr><td>&B8EC</td><td></td><td>2</td><td>ROM 9 IY (not 464)</td></tr><tr><td>&B8EE</td><td></td><td>2</td><td>ROM 10 IY (not 464)</td></tr><tr><td>&B8F0</td><td></td><td>2</td><td>ROM 11 IY (not 464)</td></tr></table>

---

<!-- page 28 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&B8F2</td><td></td><td>2</td><td>ROM 12 IY (not 464)</td></tr><tr><td>&B8F4</td><td></td><td>2</td><td>ROM 13 IY (not 464)</td></tr><tr><td>&B8F6</td><td></td><td>2</td><td>ROM 14 IY (not 464)</td></tr><tr><td>&B8F8</td><td></td><td>2</td><td>ROM 15 IY (not 464)</td></tr><tr><td>&B8FA</td><td></td><td>6</td><td>6 bytes of &amp;amp;FF</td></tr><tr><td></td><td></td><td>&B1BA</td><td>14 14 bytes of &amp;amp;00</td></tr><tr><td>&B900</td><td></td><td>&B900</td><td>12*3 High Kernel Jumplock (on the 464 this block is 11*3 bytes in size)</td></tr><tr><td>&B924</td><td></td><td>&B921</td><td>&amp;amp;1C0 routines used by the High Kernel Jumplock (on the 464 this is &amp;amp;1C8 bytes in size)</td></tr><tr><td>&B4EA</td><td></td><td>&B4E9</td><td>bytes of &amp;amp;FF (&amp;amp;1C bytes on 6128, &amp;amp;17 bytes on 464)</td></tr><tr><td>&B800</td><td></td><td>&B800</td><td>26*3 Key Manager Jumplock</td></tr><tr><td>&B4E</td><td></td><td>&B4E</td><td>36*3 Text VDU Jumplock</td></tr><tr><td>&B8BA</td><td></td><td>&B8BA</td><td>23*3 Graphics VDU Jumplock</td></tr><tr><td>&B8FF</td><td></td><td>&B8FF</td><td>34*3 Screen Pack Jumplock</td></tr><tr><td>&BC65</td><td></td><td>&BC65</td><td>22*3 Cassette (and Disc if fitted) Manager Jumplock</td></tr><tr><td>&BCA7</td><td></td><td>&BCA7</td><td>11*3 Sound Manager Jumplock</td></tr><tr><td>&BCC8</td><td></td><td>&BCC8</td><td>25*3 Kernel Jumplock</td></tr><tr><td>&BD13</td><td></td><td>&BD13</td><td>26*3 Machine Pack Jumplock (on the 464 this block is 14*3 bytes in size)</td></tr><tr><td>&BD61</td><td></td><td>&BD3D</td><td>32*3 Maths Jumplock (on the 464 this block is 48*3 bytes in size)</td></tr><tr><td>&BDDD</td><td></td><td>&BDDD</td><td>14*3 Firmware Indirections (on the 464 this block is 13*3 bytes in size</td></tr><tr><td>&BDF7</td><td></td><td>&BDF4</td><td>bytes of &amp;amp;00 (&amp;amp;09 bytes on 6128, &amp;amp;0C bytes on the 464) the lower limit of Machine Stack if no Disc Drive</td></tr><tr><td>&BEO0</td><td></td><td>&BEO0</td><td>&amp;amp;40 &amp;amp;40 bytes of &amp;amp;FF</td></tr><tr><td>&BEA0</td><td></td><td>&BEA0</td><td>&amp;amp;4x used by the AMSDOS ROM if a disc drive is fitted (otherwise &amp;amp;4x bytes of &amp;amp;FF)</td></tr><tr><td>&BEA0</td><td></td><td>&BEA0</td><td>2 (address A910)</td></tr><tr><td>&BEA2</td><td></td><td>&BEA2</td><td>2 address of drive A XDPB</td></tr><tr><td>&BEA4</td><td></td><td>&BEA4</td><td>9 Disc Set Up timing block:</td></tr><tr><td>&BEA4</td><td></td><td>&BEA4</td><td>2 motor on period (default &amp;amp;0032; fastest &amp;amp;0023 @ 20mS)</td></tr><tr><td>&BEA6</td><td></td><td>&BEA6</td><td>2 motor off period (default &amp;amp;00FA; fastest &amp;amp;00C8 @ 20mS)</td></tr><tr><td>&BEA8</td><td></td><td>&BEA8</td><td>1 write current off period (default &amp;amp;AF @ 10aS)</td></tr><tr><td>&BEA9</td><td></td><td>&BEA9</td><td>1 head settle time (default &amp;amp;0F @ 1mS)</td></tr><tr><td>&BEA4</td><td></td><td>&BEA4</td><td>1 step rate period (default &amp;amp;0C; fastest &amp;amp;0A @ 1mS)</td></tr><tr><td>&BEA8</td><td></td><td>&BEA8</td><td>B head unload delay (default &amp;amp;01)</td></tr><tr><td>&BEA4C</td><td></td><td>&BEA4C</td><td>1 b0=non DMA mode; b1 to b7=head load delay (default &amp;amp;03)</td></tr><tr><td>&BEA4D</td><td></td><td>&BEA4D</td><td>2</td></tr><tr><td>&BEA4F</td><td></td><td>&BEA4F</td><td>1 Drive Header Information Block:</td></tr><tr><td>&BEA4F</td><td></td><td>&BEA4F</td><td>1 last track used</td></tr><tr><td>&BEA50</td><td></td><td>&BEA50</td><td>1 head number (&amp;amp;00)</td></tr><tr><td>&BEA51</td><td></td><td>&BEA51</td><td>1 last sector used</td></tr></table>

---

<!-- page 29 -->

<table><tr><td>6128</td><td>464</td><td>Size</td><td>Comments on the memory locations</td></tr><tr><td>&BE52</td><td>&BE52</td><td>1</td><td>log2( sector size)-7</td></tr><tr><td>&BE53</td><td>&BE53</td><td>1</td><td></td></tr><tr><td>&BE54</td><td>&BE54</td><td>1</td><td></td></tr><tr><td>&BE55</td><td>&BE55</td><td>1</td><td></td></tr><tr><td>&BE56</td><td>&BE56</td><td>1</td><td></td></tr><tr><td>&BE58</td><td>&BE58</td><td>1</td><td></td></tr><tr><td>&BE59</td><td>&BE59</td><td>1</td><td></td></tr><tr><td>&BE5D</td><td>&BE5D</td><td>1</td><td></td></tr><tr><td>&BE5E</td><td>&BE5E</td><td>1</td><td></td></tr><tr><td>&BE5F</td><td>&BE5F</td><td>1</td><td>disc motor flag (&amp;amp;00=off;&amp;amp;01=on - strangely reversed)</td></tr><tr><td>&BE60</td><td>&BE60</td><td>2</td><td>address of buffer for directory entries block (&amp;amp;A930)</td></tr><tr><td>&BE62</td><td>&BE62</td><td>2</td><td>as &amp;amp;BE76 (ie&amp;amp;A9B0)</td></tr><tr><td>&BE64</td><td>&BE64</td><td>2</td><td></td></tr><tr><td>&BE66</td><td>&BE66</td><td>1</td><td>disc retries (default &amp;amp;10)</td></tr><tr><td>&BE67</td><td>&BE67</td><td>&amp;amp;11</td><td>AMSDOS Ticker and Event Block:</td></tr><tr><td>&BE67</td><td>&BE67</td><td>2</td><td>ticker chaining address</td></tr><tr><td>&BE69</td><td>&BE69</td><td>2</td><td>tick count</td></tr><tr><td>&BE6B</td><td>&BE6B</td><td>2</td><td>recharge count</td></tr><tr><td>&BE6D</td><td>&BE6D</td><td>2</td><td>event chaining address</td></tr><tr><td>&BE6F</td><td>&BE6F</td><td>1</td><td>count</td></tr><tr><td>&BE70</td><td>&BE70</td><td>1</td><td>class (asynchronous event)</td></tr><tr><td>&BE71</td><td>&BE71</td><td>2</td><td>ROM routine address (&amp;amp;C9D6)</td></tr><tr><td>&BE73</td><td>&BE73</td><td>1</td><td>ROM select number (&amp;amp;07 ie the AMSDOS/CPM ROM)</td></tr><tr><td>&BE74</td><td>&BE74</td><td>1</td><td>last sector number used</td></tr><tr><td>&BE75</td><td>&BE75</td><td>1</td><td></td></tr><tr><td>&BE76</td><td>&BE76</td><td>2</td><td>address of &amp;amp;K buffer, or of header info block (for WRITE SECTOR etc)</td></tr><tr><td>&BE78</td><td>&BE78</td><td>1</td><td>disc error message flag (&amp;amp;00=on; &amp;amp;FF=off - reversed again)</td></tr><tr><td>&BE7D</td><td>&BE7D</td><td>2</td><td>address of AMSDOS reserved area (&amp;amp;A700)</td></tr><tr><td>&BE7F</td><td>&BE7F</td><td>x</td><td>area used by AMSDOS to copy routines into RAM for running</td></tr><tr><td>&BE80</td><td>&BE80</td><td>&amp;amp;80</td><td>&amp;amp;80 bytes of &amp;amp;FF (limit of machine stack if disc drive fitted)</td></tr><tr><td>&BF00</td><td>&BF00</td><td>xy</td><td>&amp;amp;xy bytes of &amp;amp;00)</td></tr><tr><td>&BFxy</td><td></td><td></td><td>machine stack (in theory this stack could extend down much further)</td></tr><tr><td>&BFFF</td><td>&BFFF</td><td></td><td>upper limit of machine stack</td></tr></table>

---

<!-- page 30 -->

The area from &C000 to &FFFF is taken up by the screen memory - the layout of which is illustrated below. Printed below are diagrams which show how the CPC uses the bytes of screen memory in the different MODEs. For each byte:  


in MODE 2 (where there are two colours only, each pixel needs only one bit - either on or off)  


bit7 bit6 bit5 bit4 bit3 bit2 bit1 bit0  


p0 p1 p2 p3 p4 p5 p6 p7  


(the pixels are arranged with p0 being the leftmost one, etc)  


in MODE 1 (where four colours are available and so two bits are needed for each pixel - 1 byte represents 4 pixels)  


bit7 bit6 bit5 bit4 bit3 bit2 bit1 bit0 p0(1) p1(1) p2(1) p3(1) p0(0) p1(0) p2(0) p3(0)  


p0(1) p1(1) p2(1) p3(1)  


(each pixel is twice as wide as in MODE 2)  


in MODE 0 (where sixteen colours are possible and four bits are needed for each pixel - 1 byte represents 2 pixels)  


bit7 bit6 bit5 bit4 bit3 bit2 bit1 bit0 


p0(0) p1(0) p0(2) p1(2) p0(1) p1(1) p0(3) p1(3) 


(each pixel is four times as wide as in MODE 2)  


NB: The numbers in brackets show which bit of the pixel's pen number the screen byte bit refers to. For example in MODE 1, the 4 most significant bits of the byte hold bit 1 of the pixel's pen value and the least significant bits hold bit 0 of the pen value.  



<table><tr><td>LINE</td><td>ROW0</td><td>ROW1</td><td>ROW2</td><td>ROW3</td><td>ROW4</td><td>ROW5</td><td>ROW6</td><td>ROW7</td></tr><tr><td>1</td><td>C000</td><td>C800</td><td>D000</td><td>D800</td><td>E000</td><td>E800</td><td>F000</td><td>F800</td></tr><tr><td>2</td><td>C050</td><td>C850</td><td>D050</td><td>D850</td><td>E050</td><td>E850</td><td>F050</td><td>F850</td></tr><tr><td>3</td><td>C0A0</td><td>C8A0</td><td>D0A0</td><td>D8A0</td><td>E0A0</td><td>E8A0</td><td>F0A0</td><td>F8A0</td></tr><tr><td>4</td><td>C0F0</td><td>C8F0</td><td>D0F0</td><td>D8F0</td><td>E0F0</td><td>E8F0</td><td>F0F0</td><td>F8F0</td></tr><tr><td>5</td><td>C140</td><td>C940</td><td>D140</td><td>D940</td><td>E140</td><td>E940</td><td>F140</td><td>F940</td></tr><tr><td>6</td><td>C190</td><td>C990</td><td>D190</td><td>D990</td><td>E190</td><td>E990</td><td>F190</td><td>F990</td></tr><tr><td>7</td><td>C1E0</td><td>C9E0</td><td>D1E0</td><td>D9E0</td><td>E1E0</td><td>E9E0</td><td>F1E0</td><td>F9E0</td></tr><tr><td>8</td><td>C230</td><td>CA30</td><td>D230</td><td>DA30</td><td>E230</td><td>EA30</td><td>F230</td><td>FA30</td></tr><tr><td>9</td><td>C280</td><td>CA80</td><td>D280</td><td>DA80</td><td>E280</td><td>EA80</td><td>F280</td><td>FA80</td></tr><tr><td>10</td><td>C2D0</td><td>CAD0</td><td>D2D0</td><td>DAD0</td><td>E2D0</td><td>EAD0</td><td>F2D0</td><td>FAD0</td></tr><tr><td>11</td><td>C320</td><td>CB20</td><td>D320</td><td>DB20</td><td>E320</td><td>EB20</td><td>F320</td><td>FB20</td></tr><tr><td>12</td><td>C370</td><td>CB70</td><td>D370</td><td>DB70</td><td>E370</td><td>EB70</td><td>F370</td><td>FB70</td></tr><tr><td>13</td><td>C3C0</td><td>CBC0</td><td>D3C0</td><td>DBC0</td><td>E3C0</td><td>EBC0</td><td>F3C0</td><td>FBC0</td></tr><tr><td>14</td><td>C410</td><td>CC10</td><td>D410</td><td>DC10</td><td>E410</td><td>EC10</td><td>F410</td><td>FC10</td></tr><tr><td>15</td><td>C460</td><td>CC60</td><td>D460</td><td>DC60</td><td>E460</td><td>EC60</td><td>F460</td><td>FC60</td></tr></table>

---

<!-- page 31 -->

<table><tr><td>16</td><td>C4B0</td><td>CCB0</td><td>D4B0</td><td>DCB0</td><td>E4B0</td><td>ECB0</td><td>F4B0</td><td>FCB0</td></tr><tr><td>17</td><td>C500</td><td>CD00</td><td>D500</td><td>DD00</td><td>E500</td><td>ED00</td><td>F500</td><td>FD00</td></tr><tr><td>18</td><td>C550</td><td>CD50</td><td>D550</td><td>DD50</td><td>E550</td><td>ED50</td><td>F550</td><td>FD50</td></tr><tr><td>19</td><td>C5A0</td><td>CDA0</td><td>D5A0</td><td>DDA0</td><td>E5A0</td><td>EDA0</td><td>F5A0</td><td>FDA0</td></tr><tr><td>20</td><td>C5F0</td><td>CDF0</td><td>D5F0</td><td>DDF0</td><td>E5F0</td><td>ED50</td><td>F550</td><td>FD50</td></tr><tr><td>21</td><td>C640</td><td>CE40</td><td>D640</td><td>DE40</td><td>E640</td><td>EE40</td><td>F640</td><td>FE40</td></tr><tr><td>22</td><td>C690</td><td>CE90</td><td>D690</td><td>DE90</td><td>E690</td><td>EE90</td><td>F690</td><td>FE90</td></tr><tr><td>23</td><td>C6E0</td><td>CEE0</td><td>D6E0</td><td>DEE0</td><td>E6E0</td><td>EEE0</td><td>F6E0</td><td>FEE0</td></tr><tr><td>24</td><td>C730</td><td>CF30</td><td>D730</td><td>DF30</td><td>E730</td><td>EF30</td><td>F730</td><td>FF30</td></tr><tr><td>25</td><td>C780</td><td>CF80</td><td>D780</td><td>DF80</td><td>E780</td><td>EF80</td><td>F780</td><td>FF80</td></tr><tr><td>spare start</td><td>C7D0</td><td>CFD0</td><td>D7D0</td><td>DFD0</td><td>E7D0</td><td>EFD0</td><td>F7D0</td><td>FFD0</td></tr><tr><td>spare end</td><td>C7FF</td><td>CFFF</td><td>D7FF</td><td>DFFF</td><td>E7FF</td><td>EFFF</td><td>F7FF</td><td>FFFF</td></tr></table>  


Once the whole screen has been scrolled in any direction, the table will become incorrect. On scrolling, all the above addresses will have an offset (MOD &800) added, derived as follows:  


+&02 per scroll to the left (2, 1 or ½ character in MODE 2, MODE 1 or MODE 0 respectively)  
- &02 per scroll to the right (2, 1 or ½ character in MODE 2, MODE 1or MODE 0 respectively)  
+&50 per scroll up one line  
- &50 per scroll down one line  


If scrolled far enough, a screen row may sit across the boundaries of the screen memory area, whose bottom end will then wrap around to join up with the top (ie byte &FFFF will be followed by byte &C000 assuming the normal screen area). If before scrolling however, a window had been set up smaller than the whole screen then the table will remain accurate despite any scrolling. The 'spare' areas of screen memory are filled with bytes of the relevant PAPER value each time there is a full screen CLS, and are not really available for other uses. After scrolling the spare areas may be used as screen with other bytes becoming spare.

---

<!-- page 32 -->

The Amstrad CPC Firmware Guide

---

<!-- page 33 -->

## The Firmware Guide - Summary  


The Firmware Jumplock is the recommended method of communicating with the routines in the lower ROM - it is used by BASIC, and it should also be used by other programs. The reason for using the jumplock is that the routines in the lower ROM are located at different positions on the different machines. The entries in the jumplock, however, are all in the same place - the instructions in the jumplock redirect the computer to the correct place in the lower ROM. Thus, providing a program uses the jumplock, it should work on any CPC computer. By altering the firmware jumplock it is possible to make the computer run a different routine from normal. This could either be a different routine in the lower or upper ROM, or a routine written by the user - this is known as 'patching the jumplock'. It is worth noting that because BASIC uses the firmware jumplock quite heavily, it is possible to alter the effect of BASIC commands. The following example will change the effect of calling SCR SET MODE (&BCOE) - instead of changing the mode, any calls to this location will print the letter 'A'. The first thing to do is to assemble the piece of code that will be used to print the letter - this is printed below and starts at &4000.  


ORG &4000  LD A,65 ;65 is ASCII FOR 'A'  CALL &BB5A ;TXT OUTPUT  RET ; return from subroutine  


The jumplock entry for SCR SET MODE is now patched so that it reroutes all calls to &BCOE away from the lower ROM and to our custom routine at &4000. This is done by changing the bytes at &BCOE, &BC0F and &BC10 to &C3, &00, &40 respectively (ie JP &4000). Any calls to &BC0E or MODE commands will now print the letter A instead of changing mode. The indirections jumplock contains a small number of routines which are called by the rest of the firmware. By altering this jumplock, it is possible to alter the way in which the firmware operates on a large scale - thus it is not always necessary to patch large numbers of entries in the firmware jumplock. There are two jumplocks which are to do with the Kemel (ie the high and low Kernel jumplocks). The high jumplock allows ROM states and interrupts to be altered, and also controls the introduction of RSXs. The low jumplock contains general routines and restart instructions which are used by the computer for its own purposes.

---

<!-- page 34 -->

The Amstrad CPC Firmware Guide

---

<!-- page 35 -->

## The Kernel  


## &BCC8 KL CHOKE OFF  


Action Clears all event queues and timer lists, with the exception of keyboard scanning and sound routines Entry No entry conditions B contains the foreground ROM select address (if any), DE contains the ROM entry address, C holds Exit the ROM select address for a RAM foreground program, AF and HL are corrupt, and all others are preserved  


## &BCCB KL ROM WALK  


Action Finds and initialises all background ROMs  


Entry DE holds the address of the first usable byte of memory, HL holds the address of the last usable byte  


Exit DE holds the address of the new first usable byte of memory, HL holds the address of the new last usable byte, AF and BC are corrupt, and all other registers are preserved  


This routine looks at the ROM select addresses from 0 to 15 (1 to 7 for the 464) and calls the initialisation routine of any ROMs present; these routines may reserve memory by adjusting DE and HL before returning control to KL ROM WALK, and the ROM is then added to the list of command handling routines  


## &BCCE KL INIT BACK  


Action Finds and initialises a specific background ROM  


Entry C contains the ROM select address of the ROM, DE holds the address of the first usable byte of memory, HL holds the address of the last useable byte of memory  


Exit DE holds the address of the new first useable byte of memory, HL holds the address of the new last usable byte. AF and B are corrupt, and all other registers are preserved  


The ROM select address must be in the range of 0 to 15 (or 1 to 7 for the 464) although address 7 is for the AMSDOS/CPM ROM if present. The ROM's initialisation routine is then called and some memory may be reserved for the ROM by adjusting the values of DE and HL before returning control to KL INIT BACK  


## &BCD1 KL LOG EXT  


Action Logs on a new RSX to the firmware  


Entry BC contains the address of the RSX's command table, HL contains the address of four bytes exclusively for use by the firmware  


Exit DE is corrupt, and all other registers are preserved  


## &BCD4 KL FIND COMMAND  


Action Searches an RSX, background ROM or foreground ROM, to find a command in its table  


Entry HL contains the address of the command name (in RAM only) which is being searched for  


If the name was found in a RSX or background ROM then Carry is true, C contains the ROM select Exit address, and HL contains the address of the routine; if the command was not found, then Carry is false, C and HL are corrupt; in either case, A, B and DE are corrupt, and all others are preserved  


Notes The command names should be in upper case and the last character should have &80 added to it; the sequence of searching is RSXs, then ROMs with lower numbers before ROMs with higher numbers  


## &BCD7 KL NEW FRAME FLY  


Action Sets up a frame flyback event block which will be acted on whenever a frame flyback occurs  


Entry HL contains the address of the event block in the central 32K of RAM, B contains the event class. C contains the ROM select address (if any), and DE contains the address if the event routine  


Exit AF, DE and HL are corrupt, and all other registers are preserved  


## &BCDA KL ADD FRAME FLY  


Action Adds an existing but deleted frame flyback event block to the list of routines run when a frame flyback occurs  


Entry HL contains the address of the event block (in the central 32K of RAM)

---

<!-- page 36 -->

Exit AF, DE and HL are corrupt, and all others are preserved  


## &BCDD KL DEL FRAME FLY  


Action Removes a frame flyback event block from the list of routines which are mn when a frame flyback occurs  


Entry HL contains the address of the event block  


Exit AF, DE and HL are corrupt, and all others are preserved  


&BCE0 KL NEW FAST TICKER  


Action Sets up a fast ticker event block which will be run whenever the I/300th second ticker interrupt occurs  


Entry HL contains the address of the event block (in the central 32K of RAM), B contains the event class, C contains the ROM select address (if any), and DE contains the address of the event routine  


Exit AF, DE and HL are corrupt, and all other registers are preserved  


## &BCE3 KL ADD FAST TICKER  


Action Adds an existing but deleted fast ticker event block to the list of routines which are run when the I/300th sec ticker interrupt occurs  


Entry HL contains the address of the event block  


Exit AF, DE and HL are corrupt, and all the other registers are preserved  


## &BCE6 KL DEL FAST TICKER  


Action Removes a fast ticker event block from the list of routines run when the I/300th sec ticker interrupt occurs  


Entry HL contains the address of the event block  


Exit AF, DE and HL are corrupt, and all others are preserved  


# &BCE9 KL ADD TICKER  


Action Sets up a ticker event block which will be run whenever a 1/50th second ticker interrupt occurs  


Entry HL contains the address of the event block (in the central 32Kof RAM), DE contains the initial value for the counter, and BC holds the value that the counter will be given whenever it reaches zero  


Exit AF, BC, DE and HL are corrupt, and all the other registers are preserved  


Every 1/50th of a second all the tick blocks are looked at and their counter is decreased by 1; when the counter reaches zero, the event is 'kicked' and the counter is loaded with the value in BC; any tick block with a counter of 0 is ignored, and therefore if the value in BC is 0, the event will be kicked only once and ignored after that  


## &BCEC KL DEL TICKER  


Action Removes a ticker event block from the list of routines that are run when a I/50th sec ticker interrupt occurs  


Entry HL contains the address of the event block  


If the event block was found, then Carry is true, and DE holds the value remaining of the counter; if the event block was not found, then Carry is false, and DE is corrupt; in both cases, A, HL and the other flags are corrupt, and all other registers are preserved  


## &BCEF KL INIT EVENT  


Action Initialises an event block  


Entry HL contains the address of the event block (in the central 32Kf RAM), B contains the class of event, and C contains the ROM select address, and DE holds the address of the event routine  


Exit HL holds the address of the event block+7, and all other registers are preserved  


The event class is derived as follows bit 0 - indicates a near address bits 1 to 4 - hold the synchronous event priority bit 5 - always zero Notes bit 6 - if bit 6 is set, then it is an express event bit 7 - if bit 7 is set, then it is an asynchronous event. Asynchronous events do not have priorities; if it is an express asynchronous event, then its event routine is called from the interrupt path; if it is a normal asynchronous event, then its event routine is called just before returning from the interrupt; if it is an express synchronous event, then it has a higher

---

<!-- page 37 -->

priority than normal synchronous events, and it may not be disabled through use of KL EVENT DISABLE; if the near address bit is set, then the routine is located in the central 32K of RAM and is called directly, so saving time; no event may have a priority of zero  


## &BCF2 KL EVENT  


Action Kicks an event block  Ently HL contains the address of the event block  Exit AF, BC, DE and HL are corrupt, and all other registers are preserved  


## &BCF5 KL SYNC RESET  


Action Clears the synchronous event queue  Entry No entry conditions  Exit AF and HL are corrupt, and all other registers are preserved  Notes When using this routine, all events that are waiting to be dealt with are simply discarded  


## &BCF8 KL DEL SYNCHRONOUS  


Action Removes a synchronous event from the event queue  Entry HL contains the address of the event block  Exit AF, BC, DE and HL are corrupt and all other registers are preserved  


## &BCFB KL NEXT SYNC  


Action Finds out if there is a synchronous event with a higher priority  Entry No entry conditions  


If there is an event to be processed, then Carry is true, HL contains the address of the event block, and Exit A contains the priority of the previous event; if there is no event to be processed, then Carry is false, and A and HL are corrupt; in either case, DE is corrupt, and all other registers are preserved  


## &BCFE KL DO SYNC  


Action Runs a synchronous event routine  


Entry HL contains the address of the event block  


Exit AF, BC, DE and HL are corrupt, and all other registers are preserved  


Notes See KL DONE SYNC below  


## &BD01 KL DONE SYNC  


Action Finishes running a synchronous event routine  


Entry A contains the priority of the previous event, and HL contains the address of the event block  


Exit AF, BC, DE and HL are corrupt, and all other registers are prevented  


When an event that is waiting to be processed has been found by KL NEXT SYNC, the event routine should be run by KL DO SYNC; after this KL DONE SYNC should be called so that the event counter can be decreased - if the counter is greater than zero then the event is placed back on the synchronous event queue  


## &BD04 KL EVENT DISABLE  


Action Disables normal synchronous events  


Entry No entry conditions  


Exit HL is corrupt, and all other registers are preserved  


## &BD07 KL EVENT ENABLE  


Action Enables normal synchronous events  


Entry No entry conditions  


Exit HL is corrupt, and all other registers are preserved  


Action Disarms a specific event and stops it from occurring

---

<!-- page 38 -->

Entry HL contains the address of the event block Exit AF is corrupt, and all other registers are preserved Notes This routine should be used to disarm only asynchronous events; see also KL DEL SYNCHRONOUS  


## &BD0D KL TIME PLEASE  


Action Returns the time that has elapsed since the computer was switched on or reset (in 1/300ths of a second)  


Entry No entry conditions  


Exit DEHL contains the four byte count of the time elapsed, and all other registers are preserved  


Notes D holds the most significant byte of the time elapsed, and L holds the least significant; the four byte count overflows after approximately l66 days have elapsed.  


## &BD10 KL TIME SET  


Action Sets the elapsed time (in l/300ths of a second)  


Entry DEHL contains the four byte count of the time to set  


Exit AF is corrupt, and all other registers are preserved  


## Low Kernel Jumplock  


## &0000 RESET ENTRY (RST 0)  


Action Resets the computer as if it has just been switched on  


Entry No entry conditions  


Exit This routine is never returned from  


Notes After initialisation of the hardware and firmware, control is handed over to ROM 0 (usually BASIC)  


## &0008 LOW JUMP (RST 1)  


Action Jumps to a routine in either the lower ROM or low RAM  


Entry No entry conditions - all the registers are passed to the destination routine unchanged  


Exit The registers are as set by the routine in the lower ROM or RAM or are returned unaltered  


The RST 1 instruction is followed by a two byte low address, which is defmed as follows  


if bit 15 is set, then the upper ROM is disabled  


if bit 14 is set, then the lower ROM is disabled  


bits 13 to 0 contain the address of the routine to jump to. This command is used by the majority of entries in the main firmware jumplock  


## &000B KL LOW PCHL  


Action Jumps to a routine in either the lower ROM or low RAM  


# Entry HL contains the low address - all the registers are passed to the destination routine unchanged  


Exit The registers are as set by the routine in the lower ROM or RAM orare returned unaltered  


The two byte low address in the HL register pair is defined as follows  


Notes if bit 15 is set, then the upper ROM is disabled  


if bit 14 is set, then the lower ROM is disabled  


bits 13 to 0 contain the address of the routine to jump to  


## &000E PCBC INSTRUCTION  


Action Jumps to the specified address  


Entry BC contains the address to jump to - all the registers are passed to the destination routine unaltered  


Exit The registers are as set by the destination routine or are returned unchanged  


## &0010 SIDE CALL (RST 2)  


Action Calls a routine in ROM, in a group of up to four foreground ROMs  


Entry No entry conditions - all the registers apart from IY are passed to the destination routine unaltered

---

<!-- page 39 -->

Exit IY is corrupt, and the other registers are as set by the destination routine or are returned unchanged  


The RST 2 instruction is followed by a two byte side address, which is defined as follows bits 14 and 15 give a number between 0 and 3, which is added to the main foreground ROM select Address - this is then used as the ROM select address bits 0 to 13 contain the address to which is added &C000 - this gives the address of the routine to be called  


## &0013 KL SIDE PCHL  


Action Calls a routine in another ROM  


Entry HL contains the side address - all the registers apart from IY are passed to the destination routine unaltered  


Exit IY is corrupt, and the other registers are as set by the destination route or are returned unchanged  


The two byte side address is defined as follows bits 14 and 15 give a number between 0 and 3 which is added to the main foreground ROM select Address - this is then used as the ROM select addres bits 0 to 13 contain the address to which is added &C000 - this gives th address of the routine to be called  


## &0016 PCDE INSTRUCTION  


Action Jumps to the specified address  


Entry DE contains the address to jump to - all the registers are passed to the destination routine unaltered  


Exit The registers are as set by the destination routine or are returned unchanged  


## &0018 FAR CALL (RST 3)  


Action Calls a routine anywhere in ROM or ROM  


Entry No entry conditions - all the registers apart from IY are passed to the destination routine unaltered  


# Exit IY is preserved, and the other registers are as set by the destination routine or are returned unchanged  


The RST 3 instruction is followed by a two byte in- line address. At this address, there is a three byte far address, which is defined as follows bytes 0 and 1 give the address of the routine to be called byte 2 is the ROM select byte which has values as follows &00 to &FB- - select the given upper ROM, enable the upper ROM and disable the lower ROM Notes &FC - no change to the ROM selection, enable the upper and lower ROMs &FD - no change to the ROM selection, enable the upper ROM and disable the lower ROM &FE - no change to the ROM selection, disable the upper ROM and enable the lower ROM &FF - no change to the ROM selection, disable the upper and lower ROMs When it is returned from, the ROM selection and state are restored to their settings before the RST 3 command  


## &001B KL FAR PCHL  


Action Calls a routine, given by the far address in HL & C, anywhere in RAM or ROM  


Entry HL holds the address of the routine to be called, and C holds the ROM select byte - all the registers apart from IY are passed to the destination routine unaltered  


## Exit IY is preserved, and the other registers are as set by the destination routine or are returmed unchanged  


Notes See FAR CALL (RST 3) above for more details on the ROM select byte  


## &001E PCHL INSTRUCTION  


Action Jumps to the specified address  


Entry HL contains the address to jump to - all the registers are passed to the destination routine unaltered.  


Exit The registers are as set by the destination routine or are returned unchanged  


&0020 RAM LAM  


Action Puts the contents of a RAM memory location into the A register  


Entry HL contains the address of the memory location  


Exit A holds the contents of the memory location, and all other registers are preserved  


Notes This routine always reads from RAM, even if the upper or lower ROM is enabled  


## &0023 KL FAR CALL  


Action Calls a routine anywhere in RAM or ROM

---

<!-- page 40 -->

Entry HL holds the address of the three byte far address that is to be used - all the registers apart from IY are passed to the destination routine unaltered  


Exit IY is preserved, and the other registers are as set by the destination routine or are returned unchanged  


Notes See FAR CALL above for more details on the three byte far address  


## &0028 FIRM JUMP (RST 5)  


Action Jumps to a routine in either the lower ROM or the central 32K of RAM  


Entry No entry conditions - all the registers are passed to the destination routine unchanged  


Exit The registers are as set by the routine in the lower ROM or RAM or are returned unaltered  


Notes The RST 5 instruction is followed by a two byte address, which is the address to jump to; before the jump is made, the lower ROM is enabled, and is disabled when the destination routine is returned from  


## &0030 USER RESTART (RST 6)  


Action This is an RST instruction that may be set aside by the user for any purpose  


Entry Defined by the user  


Exit Defined by the user  


Notes The bytes from &0030 to &0037 are available for the user to put their own code in if they wish  


## &0038 INTERRUPT ENTRY (RST 7)  


Action Deals with normal interrupts  


Entry No entry conditions  


Exit All registers are preserved  


Notes The RST 7 instruction must not be used by the user; any external interrupts that are generated by hardware on the expansion port will be dealt with by the EXT INTERRUPT routine (see Low Kernel Jumplock)  


## &003B EXT INTERRUPT  


Action This area is set aside for dealing with external interrupts that are generated by any extra hardware  


Entry No entry conditions  


Exit AF, BC, DE and HL are corrupt, and all other registers are preserved  


Notes If any external hardware is going to generate interrupts, then the user must patch the area from &003B to &003F so that the computer can deal with the external interrupt; when an external interrupt occurs, the lower ROM is disabled and the code at &003B is called; the default external interrupt routine at &003B simply returns, and this will cause the computer to hang because the interrupt will continue to exist  


## High Kernel Jumplock  


## &B900 KL U ROM ENABLE  


Action Enables the current upper ROM  


Entry No entry conditions  


Exit A contains the previous state of the ROM, the flags are corrupt, and all other registers are preserved  


Notes After this routine has been called, all reading from addresses between &C000 and &FFFF refers to the upper ROM, and not the top 16K of RAM which is usually the screen memory; any writing to these addresses still affects the RAM as, by its nature, ROM cannot be written to  


## &B903 KL U ROM DISABLE  


Action Disables the upper ROM  


Entry No entry conditions  


Exit A contains the previous state of the ROM, the flags are corrupt, and al other registers are preserved  


Notes After this routine has been called, all reading from addresses between &C000and &FFFF refers to the top 16K of RAM which is usually the screen memory

---

<!-- page 41 -->

## &B906 KL L ROM ENABLE  


Action Enables the lower ROM  


Entry No entry conditions  


Exit A contains the previous state of the ROM, the flags are corrupt, and all other registers are preserved  


After this routine has been called, all reading from addresses between &0000 and &4000 refers to the lower ROM, and not the bottom 16K of RAM; any writing to these addresses still affects the RAM as a ROM cannot be written to; the lower ROM is automatically enabled when a firmware routine is called, and is then disabled when the routine returns  


## &B909 KL L ROM DISABLE  


Action Disables the lower ROM  


Entry No entry conditions  


Exit A contains the previous state of the ROM, the flags are corrupt, and al other registers are preserved  


After this routine has been called, all reading from addresses between &0000 and 4000 refers to the Notes bottom 16K of RAM; the lower ROM is automatically enabled when a firmware routine is called, and is then disabled when  


## &B90C KL ROM RESTORE  


Action Restores the ROM to its previous state  


Entry A contains the previous state of the ROM  


Exit AF is corrupt, and all other registers are preserved  


Notes The previous four routines all return values in the A register which are suitable for use by KL ROM RESTORE  


## &B90F KL ROM SELECT  


Action Selects an upper ROM and also enables it  


Entry C contains the ROM select address of the required ROM  


Exit C contains the ROM select address of the previous ROM, and B contains the state of the previous ROM  


## &B912 KL CURR SELECTION  


Action Gets the ROM select address of the current ROM  


Entry No entry conditions  


Exit A contains the ROM select address of the current ROM, and all other registers are preserved  


## &B915 KL PROBE ROM  


Action Gets the class and version of a specified ROM  


Entry C contains the ROM select address of the required ROM  


Exit A contains the class of the ROM, H holds the version number, L holds me mark number, B and the flags are corrupt, and all other registers are preserved  


The ROM class may be one of the following:  


Notes &01 - a background ROM &02 - an extension foreground ROM &80 - the built in ROM (ie the BASIC ROM)  


## &B918 KL ROM DESELECT  


Action Selects the previous upper ROM and sets its state  


Entry C contains me ROM select address of the ROM to be reselected, and B contains the state of the required ROM  


Exit C contains the ROM select address of me current ROM, B is corrupt, and all others are preserved  


Notes This routine reverses the acoon of KL ROM SELECT, and uses the values that it returns in B and C  


## &B91B KL LDIR  


Action Switches off the upper and lower ROMs, and moves a block of memory

---

<!-- page 42 -->

Entry As for a standard LDIR instruction (ie DE holds the destination location, HL points to the first byte to be moved, and BC holds the length of the block to be moved)  


Exit F, BC, DE amd HL are set as for a normal LDIR instruction, and all other registers are preserved  


## &B91E KL DDR  


Action Switches off the upper and lower ROMs, amd moves a block of memory  


Entry As for a standard LDDR instruction (ie DE holds the first destination location, HL points to the highest byte lit in memory to be moved, amd BC holds the number of bytes to be moved)  


Exit F, BC, DE amd HL, are set as for a normal LDDR instruction, and all other registers are preserved  


## &B921 KL POLL SYNCHRONOUS  


Action Tests whether an event with a higher priority than the current event is waiting to be dealt with  


Entry No entry conditions  


Exit If there is a higher priority event, then Carry is false; if there is no higher priority event, then Carry is true; in either case, A and the other flags are corrupt, and all other registers are preserved  


## &B92A KL SCAN NEEDED  


Action Ensures that the keyboard is scanned when the next ticker interrupt occurs  


Entry No entry conditions  


Exit AF amd HL are corrupt, amd all other registers are preserved  


Notes This routine is useful for scanning the keyboard when interrupts are disabled and normal key scanning is not occuring

---

<!-- page 43 -->

## The Key Manager  


## &BB00 KM INITIALISE  


Initialises the Key Manager and sets up everything as it is when the computer is first switched on; the Action key buffer is emptied, Shift and Caps lock are turned off amd all the expansion and translation tables are reset to normal; also see the routine KM RESET below  


Entry No entry conditions Exit AF, BC, DE and HL corrupt, and all other registers are preserved  


## &BB03 KM RESET  


Action Resets the Key Manager; the key buffer is emptied and all current keys/characters are ignored  


Entry No entry conditions  


Exit AF, BC, DE and HL are corrupt and all other registers are preserved  


Notes See also KM INITIALISE above. On the 664 or 6128, the key buffer can also be cleared separately by calling the KM FLUSH routine  


## &BB06 KM WAIT CHAR  


Action Waits for the next character from the keyboard buffer  


Entry No entry conditions  


Exit Carry is true, A holds the character value, the other flags are corrupt, and all other registers are preserved  


## &BB09 KM READ CHAR  


Action Tests to see if a character is available from the keyboard buffer, but doesn't wait for one to become available  


Entry No entry conditions  


Exit If a character was available, then Carry is true, and A contains the character; otherwise Carry is false, and A is corrupt; in both cases, the other registers are preserved  


## &BBOC KM CHAR RETURN  


Action Saves a character for the next use of KM WAIT CHAR or KM READ CHAR  


Entry A contains the ASCII code of the character to be put back  


Exit All registers are preserved  


## &BBOF KM SET EXPAND  


Action Assigns a string to a key code  


Entry B holds the key code; C holds the length of the string; HL contains the address of the string (must be in RAM)  


Exit If it is OK, then Carry is true; otherwise Carry is false; in either case, A, BC, DE and HL are corrupt, and all other registers rlre preserved  


## &BB12 KM GET EXPAND  


Action Reads a character from an expanded string of characters  


Entry A holds an expansion token (ie a key code) and L holds the character position number (starts from 0)  


Exit If it is OK, then Carry is true, and A holds the character; otherwise Carry is false, and A is corrupt; in either case, DE and flags are corrupt, and the other registers are preserved  


## &BB15 KM EXP BUFFER  


Action Sets aside a buffer area for character expansion strings  


Entry DE holds the address of the buffer and HL holds the length of the buffer  


Exit If it is OK, then Carry is true; otherwise Carry is false;in either case, A, BC, DE and HL are corrupt  


Notes The buffer must be in the central 32K of RAM and must be at least 49 bytes long

---

<!-- page 44 -->

## &BB18 KM WAIT KEY  


Action Waits for a key to be pressed - this routine does not expand any expansion tokens  


Entry No entry conditions  


Exit Carry is true, A holds the character or expansion token, and all other registers are preserved  


## &BB1B KM READ KEY  


Action Tests whether a key is available from the keyboard  


Entry No entry conditions  


Exit If a key is available, then Carry is true, and A contains the character; otherwise Carry is false, and A is corrupt; in either case, the other registers are preserved  


Notes Any expansion tokens are not expanded  


## &BB1E KM TEST KEY  


Action Tests if a particular key (or joystick direction or button) is pressed  


Entry A contains the key/joystick number  


Exit If the requested key is pressed, then Zero is false; otherwise Zero is true for both, Carry is false A and HL are corrupt. C holds the Shift and Control status and others are preserved  


Notes After calling this, C will hold the state of shift and control - if bit 7 is set then Control was pressed, and if bit 5 is set then Shift was pressed  


## &BB21 KM GET STATE  


Action Gets the state of the Shift and Caps locks  


Entry No entry conditions  


Exit If L holds &FF then the shift lock is on, but if L holds &00 then the Shift lock is off; if H holds &FF then the caps lock is on, and if H holds &00 then the Caps lock is off; whatever the outcome, all the other registers are preserved  


## &BB24 KM GET JOYSTICK  


Action Reads the present state of any joysticks attached  


Entry No entry conditions  


Exit H and A contains the state of joystick 0, L holds that state of joystick 1, and all others are preserved  


The joystick states are bit significant and are as follows Bit 0 - Up Bit 1 - Down Bit 2 - Left Bit 3 - Right Bit 4 - Fire2 Bit 5 - Fire1 Bit 6 - Spare Bit 7 - Always zero The bits are set when the corresponding buttons or directions are operated  


## &BB27 KM SET TRANSLATE  


Action Sets the token or character that is assigned to a key when neither Shift nor Control are pressed  


Entry A contains the key number and B contains the new token or character  


Exit AF and HL are corrupt, and all other registers are preserved  


Special values for B are as follows &80 to &9F - these values correspond to the expansion tokens &FD - this causes the caps lock to toggle on and off &FE - this causes the shift lock to toggle on and off &FF - causes this key to be ignored  


## &BB2A KM GET TRANSLATE  


Action Finds out what token or character will be assigned to a key when neither Shift nor Control are pressed  

<|det|>[[68, D 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 2 0 0 0 0 0 0 0 0 0 3 0 0 0 0 0 0 0 0 0 4 0 0 0 0 0 0 0 0 0 5 0 0 0 0 0 0 0 0 0 6 0 0 0 0 0 0 0 0 0 7 0 0 0 0 0 0 0 0 0 8 0 0 0 0 0 0 0 0 0 9 0 0 0 0 0 0 0 0 0 10 0 0 0 0 0 0 0 0 11 0 0 0 0 0 0 0 0 12 0 0 0 0 0 0 0 0 13 0 0 0 0 0 0 0 0 14 0 0 0 0 0 0 0 0 15 0 0 0 0 0 0 0 0 16 0 0 0 0 0 0 0 0 17 0 0 0 0 0 0 0 0 18 0 0 0 0 0 0 0 0 19 0 0 0 0 0 0 0 0 20 0 0 0 0 0 0 0 0 21 0 0 0 0 0 0 0 0 22 0 0 0 0 0 0 0 0 23 0 0 0 0 0 0 0 0 24 0 0 0 0 0 0 0 0 25 0 0 0 0 0 0 0 0 26 0 0 0 0 0 0 0 0 27 0 0 0 0 0 0 0 0 28 0 0 0 0 0 0 0 0 29 0 0 0 0 0 0 0 0 30 0 0 0 0 0 0 0 0 31 0 0 0 0 0 0 0 0 32 0 0 0 0 0 0 0 0 33 0 0 0 0 0 0 0 0 34 0 0 0 0 0 0 0 0 35 0 0 0 0 0 0 0 0 36 0 0 0 0 0 0 0 0 37 0 0 0 0 0 0 0 0 38 0 0 0 0 0 0 0 0 39 0 0 0 0 0 0 0 0 40 0 0 0 0 0 0 0 0 41 0 0 0 0 0 0 0 0 42 0 0 0 0 0 0 0 0 43 0 0 0 0 0 0 0 0 44 0 0 0 0 0 0 0 0 45 0 0 0 0 0 0 0 0 46 0 0 0 0 0 0 0 0 47 0 0 0 0 0 0 0 0 48 0 0 0 0 0 0 0 0 49 0 0 0 0 0 0 0 0 50 0 0 0 0 0 0 0 0 51 0 0 0 0 0 0 0 0 52 0 0 0 0 0 0 0 0 53 0 0 0 0 0 0 0 0 54 0 0 0 0 0 0 0 0 55 0 0 0 0 0 0 0 0 56 0 0 0 0 0 0 0 0 57 0 0 0 0 0 0 0 0 58 0 0 0 0 0 0 0 0 59 0 0 0 0 0 0 0 0 60 0 0 0 0 0 0 0 0 61 0 0 0 0 0 0 0 0 62 0 0 0 0 0 0 0 0 63 0 0 0 0 0 0 0 0 64 0 0 0 0 0 0 0 0 65 0 0 0 0 0 0 0 0 66 0 0 0 0 0 0 0 0 67 0 0 0 0 0 0 0 0 68 0 0 0 0 0 0 0 0 69 0 0 0 0 0 0 0 0 70 0 0 0 0 0 0 0 0 71 0 0 0 0 0 0 0 0 72 0 0 0 0 0 0 0 0 73 0 0 0 0 0 0 0 0 74 0 0 0 0 0 0 0 0 75 0 0 0 0 0 0 0 0 76 0 0 0 0 0 0 0 0 77 0 0 0 0 0 0 0 0 78 0 0 0 0 0 0 0 0 79 0 0 0 0 0 0 0 0 80 0 0 0 0 0 0 0 0 81 0 0 0 0 0 0 0 0 82 0 0 0 0 0 0 0 0 83 0 0 0 0 0 0 0 0 84 0 0 0 0 0 0 0 0 85 0 0 0 0 0 0 0 0 86 0 0 0 0 0 0 0 0 87 0 0 0 0 0 0 0 0 88 0 0 0 0 0 0 0 0 89 0 0 0 0 0 0 0 0 90 0 0 0 0 0 0 0 0 91 0 0 0 0 0 0 0 0 92 0 0 0 0 0 0 0 0 93 0 0 0 0 0 0 0 0 94 0 0 0 0 0 0 0 0 95 0 0 0 0 0 0 0 0 96 0 0 0 0 0 0 0 0 97 0 0 0 0 0 0 0 0 98 0 0 0 0 0 0 0 0 99 0 0 0 0 0 0 0 0 100 0 0 0 0 0 0 0 0 101 0 0 0 0 0 0 0 0 102 0 0 0 0 0 0 0 0 103 0 0 0 0 0 0 0 0 104 0 0 0 0 0 0 0 0 105 0 0 0 0 0 0 0 0 106 0 0 0 0 0 0 0 0 107 0 0 0 0 0 0 0 0 108 0 0 0 0 0 0 0 0 109 0 0 0 0 0 0 0 0 110 0 0 0 0 0 0 0 0 111 0 0 0 0 0 0 0 0 112 0 0 0 0 0 0 0 0 113 0 0 0 0 0 0 0 0 114 0 0 0 0 0 0 0 0 115 0 0 0 0 0 0 0 0 116 0 0 0 0 0 0 0 0 117 0 0 0 0 0 0 0 0 118 0 0 0 0 0 0 0 0 119 0 0 0 0 0 0 0 0 120 0 0 0 0 0 0 0 0 121 0 0 0 0 0 0 0 0 122 0 0 0 0 0 0 0 0 123 0 0 0 0 0 0 0 0 124 0 0 0 0 0 0 0 0 125 0 0 0 0 0 0 0 0 126 0 0 0 0 0 0 0 0 127 0 0 0 0 0 0 0 0 128 0 0 0 0 0 0 0 0 129 0 0 0 0 0 0 0 0 130 0 0 0 0 0 0 0 0 131 0 0 0 0 0 0 0 0 132 0 0 0 0 0 0 0 0 133 0 0 0 0 0 0 0 0 134 0 0 0 0 0 0 0 0 135 0 0 0 0 0 0 0 0 136 0 0 0 0 0 0 0 0 137 0 0 0 0 0 0 0 0 138 0 0 0 0 0 0 0 0 139 0 0 0 0 0 0 0 0 140 0 0 0 0 0 0 0 0 141 0 0 0 0 0 0 0 0 142 0 0 0 0 0 0 0 0 143 0 0 0 0 0 0 0 0 144 0 0 0 0 0 0 0 0 145 0 0 0 0 0 0 0 0 146 0 0 0 0 0 0 0 0 147 0 0 0 0 0 0 0 0 148 0 0 0 0 0 0 0 0 149 0 0 0 0 0 0 0 0 150 0 0 0 0 0 0 0 0 151 0 0 0 0 0 0 0 0 152 0 0 0 0 0 0 0 0 153 0 0 0 0 0 0 0 0 154 0 0 0 0 0 0 0 0 155 0 0 0 0 0 0 0 0 156 0 0 0 0 0 0 0 0 157 0 0 0 0 0 0 0 0 158 0 0 0 0 0 0 0 0 159 0 0 0 0 0 0 0 0 160 0 0 0 0 0 0 0 0 161 0 0 0 0 0 0 0 0 162 0 0 0 0 0 0 0 0 163 0 0 0 0 0 0 0 0 164 0 0 0 0 0 0 0 0 165 0 0 0 0 0 0 0 0 166 0 0 0 0 0 0 0 0 167 0 0 0 0 0 0 0 0 168 0 0 0 0 0 0 0 0 169 0 0 0 0 0 0 0 0 170 0 0 0 0 0 0 0 0 171 0 0 0 0 0 0 0 0 172 0 0 0 0 0 0 0 0 173 0 0 0 0 0 0 0 0 174 0 0 0 0 0 0 0 0 175 0 0 0 0 0 0 0 0 176 0 0 0 0 0 0 0 0 177 0 0 0 0 0 0 0 0 178 0 0 0 0 0 0 0 0 179 0 0 0 0 0 0 0 0 180 0 0 0 0 0 0 0 0 181 0 0 0 0 0 0 0 0 182 0 0 0 0 0 0 0 0 183 0 0 0 0 0 0 0 0 184 0 0 0 0 0 0 0 0 185 0 0 0 0 0 0 0 0 186 0 0 0 0 0 0 0 0 187 0 0 0 0 0 0 0 0 188 0 0 0 0 0 0 0 0 189 0 0 0 0 0 0 0 0 190 0 0 0 0 0 0 0 0 191 0 0 0 0 0 0 0 0 192 0 0 0 0 0 0 0 0 193 0 0 0 0 0 0 0 0 194 0 0 0 0 0 0 0 0 195 0 0 0 0 0 0 0 0 196 0 0 0 0 0 0 0 0 197 0 0 0 0 0 0 0 0 198 0 0 0 0 0 0 0 0 199 0 0 0 0 0 0 0 0 200 0 0 0 0 0 0 0 0 201 0 0 0 0 0 0 0 0 202 0 0 0 0 0 0 0 0 203 0 0 0 0 0 0 0 0 204 0 0 0 0 0 0 0 0 205 0 0 0 0 0 0 0 0 206 0 0 0 0 0 0 0 0 207 0 0 0 0 0 0 0 0 208 0 0 0 0 0 0 0 0 209 0 0 0 0 0 0 0 0 210 0 0 0 0 0 0 0 0 211 0 0 0 0 0 0 0 0 212 0 0 0 0 0 0 0 0 213 0 0 0 0 0 0 0 0 214 0 0 0 0 0 0 0 0 215 0 0 0 0 0 0 0 0 216 0 0 0 0 0 0 0 0 217 0 0 0 0 0 0 0 0 218 0 0 0 0 0 0 0 0 219 0 0 0 0 0 0 0 0 220 0 0 0 0 0 0 0 0 221 0 0 0 0 0 0 0 0 222 0 0 0 0 0 0 0 0 223 0 0 0 0 0 0 0 0 224 0 0 0 0 0 0 0 0 225 0 0 0 0 0 0 0 0 226 0 0 0 0 0 0 0 0 227 0 0 0 0 0 0 0 0 228 0 0 0 0 0 0 0 0 229 0 0 0 0 0 0 0 0 230 0 0 0 0 0 0 0 0 231 0 0 0 0 0 0 0 0 232 0 0 0 0 0 0 0 0 233 0 0 0 0 0 0 0 0 234 0 0 0 0 0 0 0 0 235 0 0 0 0 0 0 0 0 236 0 0 0 0 0 0 0 0 237 0 0 0 0 0 0 0 0 238 0 0 0 0 0 0 0 0 239 0 0 0 0 0 0 0 0 240 0 0 0 0 0 0 0 0 241 0 0 0 0 0 0 0 0 242 0 0 0 0 0 0 0 0 243 0 0 0 0 0 0 0 0 244 0 0 0 0 0 0 0 0 245 0 0 0 0 0 0 0 0 246 0 0 0 0 0 0 0 0 247 0 0 0 0 0 0 0 0 248 0 0 0 0 0 0 0 0 249 0 0 0 0 0 0 0 0 250 0 0 0 0 0 0 0 0 251 0 0 0 0 0 0 0 0 252 0 0 0 0 0 0 0 0 253 0 0 0 0 0 0 0 0 254 0 0 0 0 0 0 0 0 255 0 0 0 0 0 0 0 0 256 0 0 0 0 0 0 0 0 257 0 0 0 0 0 0 0 0 258 0 0 0 0 0 0 0 0 259 0 0 0 0 0 0 0 0 260 0 0 0 0 0 0 0 0 261 0 0 0 0 0 0 0 0 262 0 0 0 0 0 0 0 0 263 0 0 0 0 0 0 0 0 264 0 0 0 0 0 0 0 0 265 0 0 0 0 0 0 0 0 266 0 0 0 0 0 0 0 0 267 0 0 0 0 0 0 0 0 268 0 0 0 0 0 0 0 0 269 0 0 0 0 0 0 0 0 270 0 0 0 0 0 0 0 0 271 0 0 0 0 0 0 0 0 272 0 0 0 0 0 0 0 0 273 0 0 0 0 0 0 0 0 274 0 0 0 0 0 0 0 0 275 0 0 0 0 0 0 0 0 276 0 0 0 0 0 0 0 0 277 0 0 0 0 0 0 0 0 278 0 0 0 0 0 0 0 0 279 0 0 0 0 0 0 0 0 280 0 0 0 0 0 0 0 0 281 0 0 0 0 0 0 0 0 282 0 0 0 0 0 0 0 0 283 0 0 0 0 0 0 0 0 284 0 0 0 0 0 0 0 0 285 0 0 0 0 0 0 0 0 286 0 0 0 0 0 0 0 0 287 0 0 0 0 0 0 0 0 288 0 0 0 0 0 0 0 0 289 0 0 0 0 0 0 0 0 290 0 0 0 0 0 0 0 0 291 0 0 0 0 0 0 0 0 292 0 0 0 0 0 0 0 0 293 0 0 0 0 0 0 0 0 294 0 0 0 0 0 0 0 0 295 0 0 0 0 0 0 0 0 296 0 0 0 0 0 0 0 0 297 0 0 0 0 0 0 0 0 298 0 0 0 0 0 0 0 0 299 0 0 0 0 0 0 0 0 300 0 0 0 0 0 0 0 0 301 0 0 0 0 0 0 0 0 302 0 0 0 0 0 0 0 0 303 0 0 0 0 0 0 0 0 304 0 0 0 0 0 0 0 0 305 0 0 0 0 0 0 0 0 306 0 0 0 0 0 0 0 0 307 0 0 0 0 0 0 0 0 308 0 0 0 0 0 0 0 0 309 0 0 0 0 0 0 0 0 310 0 0 0 0 0 0 0 0 311 0 0 0 0 0 0 0 0 312 0 0 0 0 0 0 0 0 313 0 0 0 0 0 0 0 0 314 0 0 0 0 0 0 0 0 315 0 0 0 0 0 0 0 0 316 0 0 0 0 0 0 0 0 317 0 0 0 0 0 0 0 0 318 0 0 0 0 0 0 0 0 319 0 0 0 0 0 0 0 0 320 0 0 0 0 0 0 0 0 321 0 0 0 0 0 0 0 0 322 0 0 0 0 0 0 0 0 323 0 0 0 0 0 0 0 0 324 0 0 0 0 0 0 0 0 325 0 0 0 0 0 0 0 0 326 0 0 0 0 0 0 0 0 327 0 0 0 0 0 0 0 0 328 0 0 0 0 0 0 0 0 329 0 0 0 0 0 0 0 0 330 0 0 0 0 0 0 0 0 331 0 0 0 0 0 0 0 0 332 0 0 0 0 0 0 0 0 333 0 0 0 0 0 0 0 0 334 0 0 0 0 0 0 0 0 335 0 0 0 0 0 0 0 0 336 0 0 0 0 0 0 0 0 337 0 0 0 0 0 0 0 0 338 0 0 0 0 0 0 0 0 339 0 0 0 0 0 0 0 0 340 0 0 0 0 0 0 0 0 341 0 0 0 0 0 0 0 0 342 0 0 0 0 0 0 0 0 343 0 0 0 0 0 0 0 0 344 0 0 0 0 0 0 0 0 345 0 0 0 0 0 0 0 0 346 0 0 0 0 0 0 0 0 347 0 0 0 0 0 0 0 0 348 0 0 0 0 0 0 0 0 349 0 0 0 0 0 0 0 0 350 0 0 0 0 0 0 0 0 351 0 0 0 0 0 0 0 0 352 0 0 0 0 0 0 0 0 353 0 0 0 0 0 0 0 0 354 0 0 0 0 0 0 0 0 355 0 0 0 0 0 0 0 0 356 0 0 0 0 0 0 0 0 357 0 0 0 0 0 0 0 0 358 0 0 0 0 0 0 0 0 359 0 0 0 0 0 0 0 0 360 0 0 0 0 0 0 0 0 361 0 0 0 0 0 0 0 0 362 0 0 0 0 0 0 0 0 363 0 0 0 0 0 0 0 0 364 0 0 0 0 0 0 0 0 365 0 0 0 0 0 0 0 0 366 0 0 0 0 0 0 0 0 0 367 0 0 0 0 0 0 0 0 0 368 0 0 0 0 0 0 0 0 0 369 0 0 0 0 0 0 0 0 0 370 0 0 0 0 0 0 0 0 0 371 0 0 0 0 0 0 0 0 0 372 0 0 0 0 0 0 0 0 0 373 0 0 0 0 0 0 0 0 0 374 0 0 0 0 0 0 0 0 0 375 0 0 0 0 0 0 0 0 0 376 0 0 0 0 0 0 0 0 0 377 0 0 0 0 0 0 0 0 0 378 0 0 0 0 0 0 0 0 0 379 0 0 0 0 0 0 0 0 0 380 0 0 0 0 0 0 0 0 0 381 0 0 0 0 0 0 0 0 0 382 0 0 0 0 0 0 0 0 0 383 0 0 0 0 0 0 0 0 0 384 0 0 0 0 0 0 0 0 0 385 0 0 0 0

---

<!-- page 45 -->

Notes See KM SET TRANSLATE for special values that can be returned  


## &BB2D KM SET SHIFT  


Action Sets the token or character that will be assigned to a key when Shift is pressed as well Entry A contains the key number and B contains the new token or character Exit AF and HL are corrupt, and all others are preserved Notes See KM SET TRANSLATE for special values that can be set  


## &BB30 KM GET SHIFT  


Action Finds out what token/character will be assigned to a key when Shift is pressed as well Entry A contains the key number Exit A contains the token/character that is assigned, HL and flags are corrupt, and all others are preserved Notes See KM SET TRANSLATE for special values that cannot be returned  


## &BB33 KM SET CONTROL  


Action Sets the token or character that will be assigned to a key when Control is pressed as well Entry A contains the key number and B contains the new token/character Exit AF and HL are corrupt, and all others are preserved Notes See KM SET TRANSLATE  


## &BB36 KM GET CONTROL  


Action Finds out what token or character will be assigned to a key when Control is pressed as well Entry A contains the key number Exit A contains the token/character that is signed, HL and flags are corrupt and all others are preserved Notes See KM SET TRANSLATE for special values that can be set.  


## &BB39 KM SET REPEAT  


Action Sets whether a key may repeat or not Entry A contains the key number B contains &00 if there is no repeat and &FF is it is to repeat Exit AF, BC and HL are corrupt, and all others are preserved  


## &BB3C KM GET REPEAT  


Action Finds out whether a key is set to repeat or not  


Entry A contains a key number  


Exit If the key repeats, then Zero is false; if the key does not repeat, then Zero is true; in either case, A, HL and flags are corrupt, Carry is false, and all other registers are preserved  


## &BB3F KM SET DELAY  


Action Sets the time that elapses before the first repeat, and also set the repeat speed Entry H contains the time before the first repeat, and L holds the time between repeats (repeat speed) Exit AF is corrupt, and all others are preserved Notes The values for the times are given in 1/50th seconds, and a value of 0 counts as 256  


## &BB42 KM GET DELAY  


Action Finds out the time that elapses before the first repeat and also the repeat speed  


Entry No entry conditions  


Exit H contains the time before the first repeat, and L holds the time between repeats, and all others are preserved  


## &BB45 KM ARM BREAK  


Action Arms the Break mechanism

---

<!-- page 46 -->

Entry DE holds the address of the Break handling routine, C holds the ROM select address for this routine  


Exit AF, BC, DE and HL are corrupt, and all the other registers are preserved  


## &BB48 KM DISARM BREAK  


Action Disables the Break mechanism  


Entry No entry conditions  


Exit AF and HL are corrupt, and all the other registers are preserved  


## &BB4B KM BREAK EVENT  


Action Generates a Break interrupt if a Break routine has been specified by KM ARM BREAK  


Entry No entry conditions  


Exit AF and HL are corrupt, and all other registers are preserved

---

<!-- page 47 -->

## The Text VDU  


## &BB4E TXT INITIALISE  


Initialise the text VDU to its settings when the computer is switched on, includes resetting all the text Action VDU indications, selecting Stream 0, resetting the text paper to pen 0 and the text pen to pen 1, moving the cursor to the top left corner of the screen and setting the writing mode to be opaque  


Entry No entry conditions Exit AF, BC, DE and HL are corrupt, and all others are preserved  


## &BB51 TXT RESET  


Action Resets the text VDU indications and the control code table Entry No entry conditions Exit AF, BC, DE and HL are corrupt, and all the other registers are preserved  


## &BB54 TXT VDU ENABLE  


Action Allows characters to be printed on the screen in the current stream Entry No entry conditions Exit AF is corrupt, and all other registers are preserved  


## &BB57 TXT VDU DISABLE  


Action Prevents characters from being printed to the current stream Entry No entry conditions Exit AF is corrupt, and all the other registers are preserved  


## &BB5A TXT OUTPUT  


Action Output a character or control code (800 to &1F) to the screen Entry A contains the character to output Exit All registers are preserved  


Any control codes are obeyed and nothing is printed if the VDU is disabled; characters are printed using Notes the TXT OUT ACTION routine; if using graphics printing mode, then control codes are printed and not obeyed  


## &BB5D TXT WR CHAR  


Action Print a character at the current cursor position - control codes are printed and not obeyed Entry A contains the character to be printed Exit AF, BC, DE and HL are corrupt, and all others are preserved Notes This routine uses the TXT WRITE CHAR indirection to put the character on the screen  


## &BB60 TXT RD CHAR  


Action Read a character from the screen at the current cursor position Entry No entry conditions  


If it was successful then A contains the character that was read from the screen and Carry is true; Exit otherwise Carry is false, and A holds 0; in either case, the other flags are corrupt, and all registers are preserved  


Notes This routine uses the TXT UNWRITE indirection  


## &BB63 TXT SET GRAPHIC  


Action Enables or disables graphics print character mode Entry To switch graphics printing mode on, A must be non- zero; to turn it off, A must contain zero Exit AF corrupt, and all other registers are preserved Notes When turned on, control codes are printed and not obeyed; characters are printed by GRA WR CHAR

---

<!-- page 48 -->

## &BB66 TXT WIN ENABLE  


Action Sets the boundaries of the current text window - uses physical coordinatesH holds the column number of one edge, D holds the column number of the other edge, L holds the line number of one edge, and E holds the line number of the other edgeExit AF, BC, DE and HL are corruptNotes The window is not cleared but the cursor is moved to the top left corner of the window  


## &BB69 TXT GET WINDOW  


Action Returns the size of the current window - returns physical coordinates  


Entry No entry conditions  


Entry No entry conditionsH holds the column number of the left edge, D holds the column number of the right edge, L holds the line number of the top edge, E holds the line number of the bottom edge, A is corrupt, Carry is false if the window covers the entire screen, and the other registers are always preserved  


## &BB6C TXT CLEAR WINDOW  


Action Clears the window (of the current stream) and moves the cursor to the top left corner of the window  


Entry No entry conditions  


Exit AF, BC, DE and HL are corrupt, and all others are preserved  


## &BB6F TXT SET COLUMN  


Action Sets the cursor's horizontal position  


Entry A contains the logical column number to move the cursor to  


Exit AF and HL are corrupt, and all the other registers are preserved  


Notes See also TXT SET CURSOR  


## &BB72 TXT SET ROW  


Action Sets the cursor's vertical position  


Entry A contains the logical line number to move the cursor to  


Exit AF and HL are corrupt, and all others are preserved  


Notes See also TXT SET CURSOR  


## &BB75 TXT SET CURSOR  


Action Sets the cursor's vertical and horizontal position  


Entry H contains the logical column number and L contains the logical line number  


Exit AF and HL are corrupt, and all the others are preserved  


Notes See also TXT SET COLUMN and TXT SET ROW  


## &BB78 TXT GET CURSOR  


Action Gets the cursor's current position  


Entry No entry conditions  


Exit H holds the logical column number, L holds the logical line number, and A contains the roll count, the flags are corrupt, and all the other registers are preserved  


Notes The roll count is increased when the screen is scrolled down, and is decreased when it is scrolled up  


## &BB7B TXT CUR ENABLE  


Action Allows the text cursor to be displayed (if it is allowed by TXT CUR ON) - intended for use by the user  


Entry No entry conditions  


Exit AF is corrupt, and all other registers are preserved  


## &BB7E TXT CUR DISABLE  


Action Prevents the text cursor from being displayed - intended for use by the user

---

<!-- page 49 -->

Entry No entry conditions Exit AF is corrupt, and all others are preserved  


## &BB81 TXT CUR ON  


Action Allows the text cursor to be displayed - intended for use by the operating system Entry No entry conditions Exit All registers and flags are preserved  


## &BB84 TXT CUR OFF  


Action Prevents the text cursor from being displayed - intended for use by the operating system Entry No entry conditions Exit All registers and flags are reserved  


## &BB87 TXT VALIDATE  


Action Checks whether a cursor position is within the current window Entry H contains the logical column number to check, and L holds the logical line number H holds the logical column number where the next character will be printed, L holds the logical line number; if printing at this position would make the window scroll up, then Carry is false and B holds Exit &FF; if printing at this position would make the window scroll down, then Carry is false and B contains &00; if printing at the specified cursor position would not scroll the window, then Carry is true and B is corrupt; always, A and the other flags are corrupt, and all others are preserved  


## &BB8A TXT PLACE CURSOR  


Action Puts a 'cursor blob' on the screen at the current cursor position Entry No entry conditions Exit AF is corrupt, and all other registers are preserved Notes It is possible to have more than one cursor in a window (see also TXT DRAW CURSOR); do not use this routine twice without using TXT REMOVE CURSOR between &BB8D TXT REMOVE CURSOR Action Removes a 'cursor blob' from the current cursor position Entry No entry conditions Exit AF is corrupt, and all the others are preserved  


Notes This should be used only to remove cursors created by TXT PLACE CURSOR, but see also TXT UNDRAW CURSOR &BB90 TXT SET PEN Action Sets the foreground PEN for the current stream Entry A contains the PEN number to use Exit AF and HL are corrupt, and all other registers are preserved  


## &BB90 TXT SET PEN  


Action Sets the foreground PEN for the current stream Entry A contains the PEN number to use Exit AF and Hl are corrupt, and all other registers are preserved &BB93 TXT GET PEN  


Action Gets the foreground PEN for the current stream Entry No entry conditions Exit A contains the PEN number, the flags are corrupt, and all other registers are preserved &BB96 TXT SET PAPER  


## &BB96 TXT SET PAPER  


Action Sets the background PAPER for the current stream Entry A contains the PEN number to use Exit AF and HL are corrupt,  


## &BB99 TXT GET PAPER  


Action Gets the background PAPER for the current stream Entry No entry conditions

---

<!-- page 50 -->

Exit A contains the PEN number, the flags are corrupt, and all other registers are preserved  


## &BB9C TXT INVERSE  


Action Swaps the current PEN and PAPER colours over for the current stream  


Entry No entry conditions  


Exit AF and HL are corrupt, and all others are preserved  


## &BB9F TXT SET BACK  


Action Sets the character write mode to either opaque or transparent  


Entry For transparent mode, A must be non- zero; for opaque mode, A has to hold zero  


Exit AF and HL are corrupt, and all other registers are preserved  


Notes Setting the character write mode has no effects on the graphics VDU  


## &BBA2 TXT GET BACK  


Action Gets the character write mode for the current stream  


Entry No entry conditions  


Exit If in transparent mode, A is non- zero; in opaque mode, A is zero; in either case DE, HL and flags are corrupt, and the other registers are preserved  


## &BBA5 TXT GET MATRIX  


Action Gets the address of a character matrix  


Entry A contains the character whose matrix is to be found  


Exit If it is a user- defined matrix, then Carry is true; if it is in the lower ROM then Carry is false; in either event, HL contains the address of the matrix, A and other flags are corrupt, and others are preserved  


Notes byte refers to the bottom row of the character; bit 7 of a byte refers to the leftmost pixel of a line, and bit 0 refers to the rightmost pixel in Mode 2.  


## &BBA8 TXT SET MATRIX  


Action Installs a matrix for a user- defined character  


Entry A contains the character which is being defined and HL contains the address of the matrix to be used  


Exit If the character is user- definable then Carry is true; otherwise Carry is false, and no action is taken; in both cases AF, BC, DE and HL are corrupt, and all other registers are preserved  


## &BBA8 TXT SET MATRIX  


Action Sets the address of a user- defined matrix table  


Entry DE is the first character in the table and HL is the table's address (in the central 32K of RAM)  


Exit If there are no existing tables then Carry is false, and A and HL are both corrupt; otherwise Carry is true, A is the first character and HL is the table's address; in both cases BC, DE and the other flags are corrupt  


## &BBAE TXT GET M TABLE  


Action Gets the address of a user- defined matrix table  


Entry No entry conditions  


Exit See TXT SET M TABLE above for details of the values that can be returned  


## &BBB1 TXT GET CONTROLS  


Action Gets the address of the control code table  


Entry No entry conditions  


Exit HL contains the address of the table, and all others are preserved  


Notes byte 1 is the number of parameters needed by the control code bytes 2 and 3 are the address of the routine, in the Lower ROM, to execute the control code  


## &BBB4 TXT STR SELECT

---

<!-- page 51 -->

Action Selects a new VDU text streamEntry A contains the value of the stream to change toExit A contains the previously selected stream, HL and the flags are corrupt, and all others are preserved  


## &BBB7 TXT SWAP STREAMS  


Action Swaps the states of two stream attribute tablesEntry B contains a stream number, and C contains the other stream numberExit AF, BC, DE and HL are corrupt, and all other registers are preservedNotes The foreground pen and paper, the window size, the cursor position, the character write mode and graphic character mode are all exchanged between the two streams

---

<!-- page 52 -->

The Amstrad CPC Firmware Guide

---

<!-- page 53 -->

## The Graphics VDU  


## &BBBA GRA INITIALISE  


Action Initialises the graphics VDU to its default set- up (ie its set- up when the computer is switched on)  


Entry No entry conditions  


Exit AF, BC, DE and HL are corrupt, and all other registers are preserved  


Sets the graphics indirections to their defaults, sets the graphic paper to text pen O and the graphic pen Notes to text pen 1, reset the graphics origin and move the graphics cursor to the bottom left of the screen, reset the graphics window and write mode to their defaults  


## &BBBD GRA RESET  


Action Resets the graphics VDU  


Entry No entry conditions  


Exit AF, BC, DE and HL are corrupt, and all others are preserved  


Notes Resets the graphics indirections and the graphics write mode to their defaults  


## &BBC0 GRA MOVE ABSOLUTE  


Action Moves the graphics cursor to an absolute screen position  


Entry DE contains the user X- coordinate and HL holds the user Y- coordinate  


Exit AF, BC, DE and HL are corrupt, and all other registers are reserved  


## &BBC3 GRA MOVE RELATIVE  


Action Moves the graphics cursor to a point relative to its present screen position  


Entry DE contains the X- distance to move and HL holds the Y- distance  


Exit AF, BC, DE and HL are corrupt, and all others are preserved.  


## &BBC6 GRA ASK CURSOR  


Action Gets the graphics cursor's current position  


Entry No entry conditions  


Exit DE holds the user X- coordinate, HL holds the user Y- coordinate, AF is corrupt, and all others are preserved  


## &BBC9 GRA SET ORIGIN  


Action Sets the graphics user origin's screen position  


Entry DE contains the standard X- coordinate and HL holds the standard Y- coordinate  


Exit AF, BC, DE and HL are corrupt, and all other registers are prevented  


## &BBCC GRA GET ORIGIN  


Action Gets the graphics user origin's screen position  


Entry No entry conditions  


Exit DE contains the standard X- coordinate and HL holds the standard Y- coordinate, and all others are preserved  


## &BBCF GRA WIN WIDTH  


Action Sets the left and right edges of the graphics window  


Entry DE contains the standard X- coordinate of one edge and HL holds the standard X- coordinate of the other side  


Exit AF, BC, DE and HL are corrupt, and all the other registers are preserved  


Notes The default window covers the entire screen and is restored to its default when the mode is changed; used in conjunction with GRA WIN HEIGHT  


## &BBD2 GRA WIN HEIGHT

---

<!-- page 54 -->

Action Sets the top and bottom edges of the graphics window


Entry DE contains the standard Y-coordinate of one side and HL holds the standard Y-coordinate of the other side


Exit AF, BC, DE and HL are corrupt, and all others are preserved


Notes See GRA WIN WIDTH for further details


# &BBD5 GRA GET W WIDTH


Action Gets the left and right edges of the graphics window


Entry No entry conditions


Exit DE contains the standard X-coordinate of the left edge and HL contains the standard Y-coordinate of the right edge, AF is corrupt, and all other registers are preserved


# &BBD8 GRA GET W HEIGHT


Action Gets the top and bottom edges of the graphics window


Entry No entry conditions


Exit DE contains the standard Y-coordinate of the top edge and HL contains the standard Y-coordinate of the bottom edge, AF is corrupt, and all other registers are preserved


# &BBDB GRA CLEAR WINDOW


Action Clears the graphics window to the graphics paper colour and moves the cursor back to the user origin


Entry No entry conditions


Exit AF, BC, DE and HL are corrupt, and all other registers are preserved


# &BBDE GRA SET PEN


Action Sets the graphics PEN


Entry A contains the required text PEN number


Exit AF is corrupt, and all other registers are preserved


# &BBE1 GRA GET PEN


Action Gets the graphics PEN


Entry No entry conditions


Exit A contains the text PEN number, the flags are corrupt, and all other registers are preserved


# &BBE4 GRA SET PAPER


Action Sets the graphics PAPER


Entry A contains the required text PEN number


Exit AF corrupt, and all others are preserved


# &BBE7 GRA GET PAPER


Action Gets the graphics PAPER


Entry No entry conditions


Exit A contains the text PEN number, the flags are corrupt, and all others are preserved


# &BBEA GRA PLOT ABSOLUTE


Action Plots a point at an absolute user coordinate, using the GRA PLOT indirection


Entry DE contains the user X-coordinate and HL holds the user Y-coordinate


Exit AF, BC, DE and HL are corrupt, and all others are preserved

---

<!-- page 55 -->

Action Moves to an absolute position, and tests the point there using the GRA TEST indirection  


Entry DE contains the user X- coordinate and HL holds the user Y- coordinate for the point you wish to test  


Exit A contains the pen at the point, and BC, DE, HL and flags are corrupt, and all others are preserved  


## &BBF3 GRA TEST RELATIVE  


Action Moves to a position relative to the current position, and tests the point there using the GRA TEST indirection  


Exit A contains the pen at the point, and BC, DE, HL and flag are corrupt, and all others are preserved  


## &BBF6 GRA LINE ABSOLUTE  


Action Draws a line from the current graphics position to an absolute position, using GRA LINE  


Entry DE contains the user X- coordinate and HL holds the user Y- coordinate of the end point  


Exit AF, BC, DE and HL are corrupt, and all others are preserved  


Notes The line will be plotted in the current graphics pen colour (may be masked to produce a dotted line on a 6128)  


## &BBF9 GRA LINE RELATIVE  


Action Draws a line from the current graphics position to a relative screen position, using GRA LINE  


Entry DE contains the relative X- coordinate and HL contains the relative Y- coordinate  


Notes See GRA LINE ABSOLUTE above for details of how the line is plotted  


## &BBFC GRA WR CHAR  


Action Writes a character onto the screen at the current graphics position  


Entry A contains the character to be put onto the screen  


Exit AF, BC, DE and HL are corrupt, and all the other registers are preserved  


As in BASIC, all characters including control codes are printed; the character is printed with its top left Notes corner at the current graphics position; the graphics position is moved one character width to the right so that it is ready for another character to be printed

---

<!-- page 56 -->

The Amstrad CPC Firmware Guide

---

<!-- page 57 -->

## The Screen Pack  


## &BBFF SCR INITIALISE  


Action Initialises the Screen Pack to the default values used when the computer is first switched on  


Entry No entry conditions  


Exit AF, BC, DE and HL are corrupt, and all others are preserved  


Notes All screen indirections are restored to their default settings, as are inks and flashing speeds; the mode is switched to MODE 1 and the screen is cleared with PEN 0; the screen address is moved to &C000 and the screen offset is set to zero  


## &BC02 SCR RESET  


Action Resets the Screen Pack's indirections, flashing speeds and inks to their default values  


Entry No entry conditions  


Exit AF, BC, DE r1nd HL are corrupt, and all other registers are preserved  


## &BC05 SCR SET OFFSET  


Action Sets the screen offset to the specified values - this can cause the screen to scroll  


Entry HL contains the required offset, which should be even  


Exit AF and HL are corrupt, and all others are preserved  


Notes The screen offset is reset to 0 whenever its mode is set, or it is cleared by SCR CLEAR (but not BASIC's CLS)  


## &BC08 SCR SET BASE  


Action Sets the location in memory of the screen - effectively can only be &C000 or &4000  


Entry A contains the most significant byte of the screen address required  


Exit AF and HL are corrupt, and all other registers are preserved  


Notes The screen memory can only be set at 16K intervals (ie &0000, &4000, &8000, &C000) and when the computer is first switched on the 16K of screen memory is located at &C000)  


## &BCOB SCR GET LOCATION  


Action Gets the location of the screen memory and also the screen offset  


Entry No entry conditions  


Exit A holds the most significant byte of the screen address, HL holds the current offset, and all others are preserved  


## &BCOE SCR SET MODE  


Action Sets the screen mode  


Entry A contains the mode number - it has the same value and characteristics as in BASIC  


Exit AF, BC, DE and HL are corrupt, and all others are preserved.  


Notes The windows are set to cover the whole screen and the graphics origin is set to the bottom left corner of the screen; in addition, the current stream is set to zero, and the screen offset is zeroed  


## &BC11 SCR GET MODE  


Action Gets the current screen mode  


Entry No entry conditions  


If the mode is 0, then Carry is true, Zero is false, and A contains 0; if the mode is 1, then Carry is false, Zero is true, and A contains 1; if the mode is 2, then Carry is false, Zero is false, and A contains 2; in all cases the other flags are corrupt and all the other registers are preserved  


## &BC14 SCR CLEAR  


Action Clears the whole of the screen  


Entry No entry conditions

---

<!-- page 58 -->

Exit AF, BC, DE and HL are corrupt, and all others are preserved  


## &BC17 SCR CHAR LIMITS  


Action Gets the size of the whole screen in terms of the numbers of characters that can be displayed  


Entry No entry conditions  


Exit B contains the number of characters across the screen, C contains the number of characters down the screen, AF is corrupt, and all other registers are preserved  


## &BC1A SCR CHAR POSITION  


Action Gets the memory address of the top left corner of a specified character position  


Entry H contains the character physical column and L contains the character physical row  


Exit HL contains the memory address of the top left corner of the character, B holds the width in bytes of a character in the present mode, AF is corrupt, and all other registers are preserved  


## &BC1D SCR DOT POSITION  


Action Gets the memory address of a pixel at a specified screen position  


Entry DE contains the base X- coordinate of the pixel, and HL contains the base Y- coordinate  


Exit HL contains the memory address of the pixel, C contains the bit mask for this pixel, B contains the number of pixels stored in a byte minus 1, AF and DE are corrupt, and all others are preserved  


## &BC20 SCR NEXT BYTE  


Action Calculates the screen address of the byte to the right of the specified screen address (may be on the next line)  


Entry HL contains the screen address  


Exit HL holds the screen address of the byte to the right of the original screen address, AF is corrupt, all others are preserved  


## &BC23 SCR PREV BYTE  


Action Calculates the screen address of the byte to the left of the specified screen address (this address may actually be on the previous line)  


Entry HL contains the screen address  


Exit HL holds the screen address of the byte to the left of the original address, AF is corrupt, all others are preserved  


&BC26 SCR NEXT LINE  


Action Calculates the screen address of the byte below the specified screen address  


Entry HL contains the screen address  


Exit HL contains the screen address of the byte below the original screen address, AF is corrupt, and all the other registers are preserved  


## &BC29 SCR PREV LINE  


Action Calculates the screen address of the byte above the specified screen address  


Entry HL contains the screen address  


Exit HL holds the screen address of the byte above the original address, AF is corrupt, and all others are preserved  


## &BC2C SCR INK ENCODE  


Action Converts a PEN to provide a mask which, if applied to a screen byte, will convert all of the pixels in the byte to the appropriate PEN  


Entry A contains a PEN number  


Exit A contains the encoded value of the PEN, the flags are corrupt, and all other registers are preserved  


Notes The mask returned is different in each of the screen modes  


## &BC2F SCR INK DECODE  


Action Converts a PEN mask into the PEN number (see SCR INK ENCODE for the re- erse process)  


Entry A contains the encoded value of the PEN

---

<!-- page 59 -->

Exit A contains the PEN number, the flags are corrupt, and all others are preserved  


## &BC32 SCR SET INK  


Action Sets the colours of a PEN - if the two values supplied are different then the colours will alternate (flash) Entry contains the PEN number, B contains the first colour, and C holds the second colour Exit AF, BC, DE and HL are corrupt, and all others are preserved  


## &BC35 SCR GET INK  


Action Gets the colours of a PEN Entry A contains the PEN number B contains the first colour, C holds the second colour, and AF, DE and HL are corrupt, and all others are preserved  


## &BC38 SCR SET BORDER  


Action Sets the colours of the border - again if two different values are supplied, the border will flash Entry B contains the first colour, and C contains the second colour Exit AF, BC, DE and HL are corrupt, and all others are preserved.  


## &BC38 SCR GET BORDER  


Action Gets the colours of the border Entry No entry conditions B contains the first colour, C holds the second colour, and AF, DE and HL are corrput, and all others are preserved  


## &BC3E SCR SET FLASHING  


Action Sets the speed with which the border's and PENs' colours flash Entry H holds the time that the first colour is displayed, L holds the time the second colour is displayed for Exit AF and HL are corrupt, and all other registers are preserved Notes The length of time that each colour is shown is measured in 1/50ths of a second, and a value of 0 is taken to mean \(256*1 / 50\) seconds - the default value is \(10*1 / 50\) seconds  


## &BC41 SCR GET FLASHING  


Action Gets the periods with which the colours of the border and PENs flash  


Entry No entry conditions Exit H holds the duration of the first colour, L holds the duration of the second colour, AF is corrupt, and all other registers are preserved - see SCR SET FLASHING for the units of time used  


## &BC44 SCR FILL BOX  


Action Fills an area of the screen with an ink - this only works for 'character-sized' blocks of screen A contains the mask for the ink that is to be used, H contains the left hand column of the area to fill, D Entry contains the right hand column, L holds the top line, and E holds the bottom line of the area (using physical coordinates) Exit AF, BC, DE and HL are corrupt, and all others are preserved  


## &BC17 SCR FLOOD BOX  


Action Fills an area of the screen with an ink - this only works for byte- sized' blocks of screen C contains the encoded PEN that is to be used, HL contains the screen address of the top left hand Entry corner of the area to fill, D contains the width of the area to be filled in bytes, and E contains the height of the area to be filled in screen lines Exit AF, BC, DE and HL are corrupt, and all other registers are preserved Notes The whole of the area to be filled must lie on the screen otherwise unpredictable results may occur  


## &BC4A SCR CHAR INVERT  


Action Inverts a character's colours; all pixels in one PEN's colour are printed in another PEN's colour, and vice versa

---

<!-- page 60 -->

Entry B contains one encoded PEN, C contains the other encoded PEN, H contains the physical column number, and L contains the physical line number of the character that is to be inverted  


Exit AF, BC, DE and HL are corrupt, and all the other registers are preserved  


## &BC4D SCR HWL ROLL  


Action Scrolls the entire screen up or down by eight pixel rows (ie one character line)  


Entry B holds the direction that the screen will roll, A holds the encoded PAPER which the new line will appear in  


Exit AF, BC, DE and HL are corrupt, and all others are preserved  


Notes This alters the screen offset; to roll down, B must hold zero, and to roll upwards B must be non- zero  


## &BC50 SCR SW ROLL  


Action Scrolls part of the screen up or down by eight pixel lines - only for 'character- sized' blocks of the screen B holds the direction to roll the screen, A holds the encoded PAPER which the new line will appear in, H Entry holds the left column of the area to scroll, D holds the right column, L holds the top line, E holds the bottom line  


Exit AF, BC, DE and HL are corrupt, and all other registers are preserved  


Notes The area of the screen is moved by copying it; to roll down, B must hold zero, and to roll upwards B must be non- zero; this routine uses physical roundrates  


## &BC53 SCR UNPACK  


Action Changes a character matrix from its eight byte standard form into a set of pixel masks which are suitable for the current mode - four \*8 bytes are needed in mode 0, two \*8 bytes in mode 1, and 8 bytes in mode 2  


Entry HL contains the address of the matrix, and DE contains the address where the masks are to be stored  


Exit AF, BC, DE and HL are corrupt, and all other registers are reserved  


## &BC56 SCR REPACK  


Action Changes a set of pixel masks (for the current mode) into a standard eight byte character matrix  


Entry A contains the encoded foreground PEN to be matched against (ie the PEN that is to be regarded as being set in the character), H holds the physical column of the character to be 'repacked', L holds the physical line of the character, and DE contains the address of the area where the character matrix will be built  


Exit AF, BC, DE and HL are corrupt, and all the others are preserved  


## &BC59 SCR ACCESS  


Action Sets the screen write mode for graphics  


Entry A contains the write mode (0=Fill, 1=XOR, 2=AND, 3=OR)  


Exit AF, BC, DE and HL are corrupt, and all other registers are prepared  


Notes The fill mode means that the ink that plotting was requested in is the ink that appears on the screen; in XOR mode, the specified ink is XORed with ink that is at that point on the screen already before plotting; a similar situation occurs with the AND and OR modes  


## &BC5C SCR PIXELS  


Action Puts a pixel or pixels on the screen regardless of the write mode specified by SCR ACCESS above  


Entry B contains the mask of the PEN to be drawn with, C contains the pixel mask, and HL holds the screen address of the pixel  


Exit AF is corrupt, and all others are preserved  


## &BC5F SCR HORIZONTAL  


Action Draws a horizontal line on the screen using the current graphics write mode  


Entry A contains the encoded PEN to be drawn with, DE contains the base X- coordinate of the start of the line, BC contains the end base X- coordinate, and HL contains the base Y- coordinate  


Exit AF, BC, DE and HL are corrupt, and all other registers are served  


Notes The start X- coordinate must be less than the end X- coordinate

---

<!-- page 61 -->

## &BC62 SCR VERTICAL  


Action Draws a vertical line on the screen using the current graphics write mode  


A contains the encoded PEN to be drawn with, DE contains the base X- coordinate of the line, HL holds the start base Y- coordinate, and BC contains the end base Y- coordinate - the start coordinate must be less than the end coordinate  


Exit AF, BC, DE and HL are corrupt, and all the other registers are preserved

---

<!-- page 62 -->

The Amstrad CPC Firmware Guide

---

<!-- page 63 -->

## The Cassette/AMSDOS manager  


NOTE: Some of these routines are only applicable to the cassette manager; where a disc version exists it is indicated by an asterisk (\*) next to the command name. These disc version jumplocks are automatically installed by the Operating System on switch on.  


## &BC65 CAS INITIALISE  


Action Initialises the cassette manager  Entry No entry conditions  Exit AF, BC, DE and HL are corrupt, and all the other registers are preserved  Notes Both read and write streams are closed; tape messages are switched on; the default speed is reselected  


## &BC68 CAS SET SPEED  


Action Sets the speed at which the cassette manager saves programs  Entry HL holds the length of 'half a zero' bit, and A contains the amount of precompensation  Exit AF and HL are corrupt  


The value in HL is the length of time that half a zero bit is written as; a one bit is twice the length of a Notes zero bit; the default values (ie SPEED WRITE 0) are 333 microseconds (HL) and 25 microseconds (A) for SPEED WRITE 1, the values are given as 107 microseconds and 50 microseconds respectively  


## &BC68 CAS NOISY  


Action Enables or disables the display of cassette handling messages  Entry To enable the messages then A must be 0, otherwise the messages are disabled  Exit AF is corrupt, and all other registers are preserved  


## &BC6E CAS START MOTOR  


Action Switches on the tape motor  


Entry No entry conditions  


Exit If the motor operates properly then Carry is true; if ESC was pressed then Carry is false; in either case, A contains the motor's previous state, the flags are corrupt, and all others are preserved  


## &BC71 CAS STOP MOTOR  


Action Switches off the tape motor  


Entry No entry conditions  


Exit If the motor turns off then Carry is true; if ESC was pressed then Carry is false; in both cases, A holds the motor's previous state, the other flags are corrupt, all others are preserved  


## &BC74 CAS RESTORE MOTOR  


Action Resets the tape motor to its previous state  


Entry A contains the previous state of the motor (eg from CAS START MOTOR or CAS STOP MOTOR)  


Exit If the motor operates properly then Carry is true; if ESC was pressed then carry is false; in all cases, A and the other flags are corrupt and all others are preserved  


## &BC77 \\*CAS IN OPEN  


Action Opens an input buffer and reads the first block of the file  


Entry B contains the length of the filename, HL contains the filename's address, and DE contains the address of the 2K buffer to use for reading the file  


If the file was opened successfully, then Carry is true, Zero is false, HL holds the address of a buffer containing the file header data, DE holds the address of the destination for the file, BC holds the file length, and A holds the file type; if the read stream is already open then Carry and Zero are false, A contains an error number (664/6128 only) and BC, DE and HL are corrupt; if ESC was pressed by the user, then Carry is false, Zero is true, A holds an error number (664/6128 only) and BC, DE and HL are corrupt; in all cases, IX and the other flags are corrupt, and the others are preserved

---

<!-- page 64 -->

Notes A filename of zero length means 'read the neXt file on the tape'; the stream remains open until it is closed by either CAS IN CLOSE or CAS IN ABANDON  


Disc Similar to tape except that if there is no header on the file, then a fake header is put into memory by this routine  


## &BC7A \\*CAS IN CLOSE  


Action Closes an input file  


Entry No entry conditions  


Exit If the file was closed successfully, then Carry is true and A is corrupt; if the read stream was not open, then Carry is false, and A holds an error code (664/6128 only); in both cases, BC, DE, HL and the other flags are all corrupt  


Disc All the above applies, but also if the file failed to close for any other reason, then Carry is false, Zero is true and A contains an error number; in all cases the drive motor is turned off immediately  


## &BC7D \\*CAS IN ABANDON  


Action Abandons an input file  


Entry No entry conditions  


Exit AF, BC, DE and HL are corrupt, and all others are preserved  


Disc All the above applies for the disc routine  


## &BC80 \\*CAS IN CHAR  


Action Reads in a single byte from a file  


Entry No entry conditions  


Exit If a byte was read, then Carry is true, Zero is false, and A contains the byte read from the file; if the end of file was reached, then Carry and Zero are false, A contains an error number (664/6128 only) or is corrupt (for the 464); if ESC was pressed, then Carry is false, Zero is true, and A holds an error number (664/6128 only) or is corrupt (for the 464); in all cases, IX and the other flags are corrupt, and all others are preserved  


Disc All the above applies for the disc routine  


## &BC83 \\*CAS IN DIRECT  


Action Reads an entire file directly into memory  


Entry HL contains the address where the file is to be placed in RAM  


Exit If the operation was successful, then Carry is true, Zero is false, HL contains the entry address and A is corrupt; if it was not open, then Carry and Zero are both false, HL is corrupt, and A holds an error code (664/6128) or is corrupt (464); if ESC was pressed, Carry is false, Zero is true, HL is corrupt, and A holds an error code (664/6128 only); in all cases, BC, DE and IX and the other flags are corrupt, and the others are preserved  


Notes This routine cannot be used once CAS IN CHAR has been used  


Disc All the above applies to the disc routine  


## &BC86 \\*CAS RETURN  


Action Puts the last byte read back into the input buffer so that it can be read again at a later time  


Entry No entry conditions  


Exit All registers are preserved  


Notes The routine can only return the last byte read and at least one byte must have been read  


Disc All the above applies to the disc routine  


## &BC89 \\*CAS TEST EOF  


Action Tests whether the end of file has been encountered  


Entry No entry conditions  


Exit If the end of file has been reached, then Carry and Zero are false, and A is corrupt; if the end of file has not been encountered, then Carry is true, Zero is false, and A is corrupt; if ESC was pressed then Carry is false, Zero is true and A contains an error number (664/6128 only); in all cases, IX and the other flags

---

<!-- page 65 -->

are corrupt, and all others are preserved  


Disc All the above applies to the disc routine  


## &BC8C \\*CAS OUT OPEN  


Action Opens an output file  


Entry B contains the length of the filename, HL contains the address of the filename, and DE holds the address of the 2K buffer to be used  


If the file was opened correctly, then Carry is true, Zero is false, HL holds the address of the buffer containing the file header data that will be written to each block, and A is corrupt; if the write stream is already open, then Carry and Zero are false, A holds an error number (66\~/6128) and HL is corrupt; if ESC was pressed then Carry is false, Zero is true, A holds an error number (664/6128) and HL is corrupt; in all cases, BC, DE, IX and the other flags are corrupt, and the others are preserved  


Notes The buffer is used to store the contents of a file block before it is actually written to tape  


Disc The same as for tape except that the filename must be present in its usual AMSDOS format  


## &BC8F \\*CAS OUT CLOSE  


Action Closes an output file  


Entry No entry conditions  


If the file was closed successfully, then Carry is true, Zero is false, and A is corrupt; if the write stream was not open, then Carry and Zero are false and A holds an error code (664/6128 only); if ESC was pressed then Carry is false, Zero is true, and A contains an error code (664/6128 only); in all cases, BC, DE, HL, IX and the other flags are all corrupt  


Notes The last block of a file is written only when this routine is called; if writing the file is to be abandoned, then CAS OUT ABANDON should be used instead  


Disc All the above applies to the disc routine  


## &BC92 \\*CAS OUT ABANDON  


Action Abandons an output file  


Entry No entry conditions  


Exit AF, BC, DE and HL are corrupt, and all others are preserved  


Notes When using this routine, the current last block of the file is not written to the tape  


Similar to the tape routine; if more than 16K of a file has been written to the disc, then the first 16K of the file will exist on the disc with a file extension of. \(\) 3\(because each 16K section of the file requires a separate directory entry  


## &BC95 \\*CAS OUT CHAR  


Action Writes a single byte to a file  


Entry A contains the byte to be written to the file output buffer  


If a byte was written to the buffer, then Carry is true, Zero is false, and A is corrupt; if the file was not open, then Carry and Zero are false, and A contains an error number (664/6128 only) or is corrupt (on the 464); if ESC was pressed, then Carry is false, Zero is true, and A contains an error number (664/6128 only) or it is corrupt (on the 464); in all cases, IX and the other flags are corrupt, and all others are preserved  


If the 2K buffer is full of data then it is written to the tape before the new character is placed in the buffer; it is important to call CAS OUT CLOSE when all the data has been sent to the file so that the last block is written to the tape  


Disc All the above applies to the disc routine  


## &BC98 \\*CAS OUT DIRECT  


Action Writes an entire file directly to tape  


HL contains the address of the data which is to be written to tape, DE contains the length of this data, BC contains the e- e- e- e- e- e- e- e- e- e- e e- e- e- e- e- e- e- e- e- e  


If the operation was successful, then Carry is true, Zero is false, and A is corrupt; if the file was nte open, Carry and Zero are false, A holds an error number (664/6128) or is corrupt (464); if ESC was pressed, then Carry is false, Zero is true, and A holds an error code (664/6128 only); in all cases BC, DE, HL, IX and the other flags are corrupt, and the others are preserved

---

<!-- page 66 -->

Notes This routine cannot be used once CAS OUT CHAR has been used  


Disc All the above applies to the disc routine  


## &BC9B \\*CAS CATALOG  


Action Creates a catalogue of all the files on the tape  


Entry DE contains the address of the 2K buffer to be used to store the information  


Exit If the operation was successful, then Carry is true, Zero is false, and A is corrupt; if the read stream is already being used, then Carry and Zero are false, and A holds an error code (664/6128 or is corrupt (for the 464); in all cases, BC, DE, HL, IX and the other flags are corrupt and all others are preserved  


Notes This routine is only left when the ESC key is pressed (cassette only) and is identical to BASIC's CAT command  


Disc All the above applies, except that a sorted list of files is displayed; system files are not listed by this routine  


## &BC9E CAS WRITE  


Action Writes data to the tape in one long file (ie not in 2K blocks)  


Entry HL contains the address of the data to be written to tape, DE contains the length of the data to be written, and A contains the sync character  


Exit If the operation was successful, then Carry is true and A is corrupt; if an error occurred then Carry is false and A contains an error code; in both cases, BC, DE, HL and IX are corrupt, and all other registers are preserved  


Notes For header records the sync character is &2C, and for data it is &16; this routine starts and stops the cassette motor and also turns off interrupts whilst writing data  


## &BCA1 CAS READ  


Action Reads data from the tape in one long file (ie as originally written by CAS WRITE only)  


Entry HL holds the address to place the file, DE holds the length of the data, and A holds the expected sync character  


Exit If the operation was successful, then Carry is true and A is corrupt;if an error occurred then Carry is false and A contains an error code; in both cases, BC DE, HL and IX are corrupt, and all other registers are preserved  


Notes For header records the sync character is &2C, and for data it i &16; this routine starts and stops the cassette motor and turns off interrupts whilst reading data  


## &BCA4 CAS CHECK  


Action Compares the contents of memory with a file record (ie header or data) on tape  


Entry HL contains the address of the data to check, DE contains the length of the data and A holds the sync character that was used when the file was originally written to the tape  


Exit If the two are identical, then Carry is true and A is corrupt; if an error occurred then Carry is false and \(A\) holds an error code; in all cases, BC, DE, HL, IX and other flags are corrupt, and all other registers are preserved  


Notes For header records the sync character is &2C, and for data iti &16; this routine starts and stops the cassette motor and turns off interrupts whilst reading data; does not have to read the whole of a record, but must start at the beginning  


## AMSDOS and BIOS Firmware  


## &C033 BIOS SET MESSAGE  


Action Enables or disables disc error messages  


Entry To enable messages, A holds &00; to disable messages, A holds &FF  


Exit A holds the previous state, HL and the flags are corrupt, and all others are preserved  


Notes Enabling and disabling the messages can also be achieved by poking &BE78 with &00 or &FF  


## &C036 BIOS SETUP DISC

---

<!-- page 67 -->

Action Sets the parameters which effect the disc speed  


Entry HL holds the address of the nine bytes which make up the parameter block  


Exit AF, BC, DE and HL are corrupt, and all other registers are preserved  


The parameter block is arranged as follows  


bytes 0&1 - the motor on time in 20ms units; the default is &0032; the fastest is &0023 bytes 2&3 - the motor off time in 20ms units; the default is &00FA; the fastest is &00C8 byte 4 - the write off time in 10es units; the default is &AF; should not be changed byte 5 - the head settle time in 1ms units; the default is &0F; should not be changed byte 6 - the step rate time in 1ms units; the default is &0C; the fastest is &0A byte 7 - the head unload delay; the default is &01; should not be changed byte 8 - a byte of &03 and this should be left unaltered  


&039 BIOS SELECT FORMAT  


Action Sets a format for a disc  


Entry A holds the type of format that is to be selected  


Exit AF, BC, DE and HL are corrupt, and all the other registers are preserved  


To select one of the normal disc formats, the following values should be put into the A register Data format - &C1  


Notes System format - &41 - Used by CP/M IBM format - &01 - compatible with CP/M- 86 This routine sets the extended disc parameter block (XDPB) at &A890 to &A8A8 - to set other formats, the XDPB must be altered directly  


## &03C BIOS READ SECTOR  


Action Reads a sector from a disc into memory  


Entry HL holds the address in memory where the sector will be read to, E holds the drive number (&00 for drive A, and &01 for drive B), D holds the track number, and C holds the sector number  


If the sector was read properly, then Carry is true, A holds 0, and HL is preserved; if the read failed, then Carry is false, A holds an error number, and HL is corrupt; in either case, the other flags are corrupt, and all other registers are preserved  


## &03F BIOS WRITE SECTOR  


Action Writes a sector from memory onto disc  


Entry HL holds the address of memory which will be written to the disc, E holds the drive number (&00 for drive A, and &01 for drive B),D holds the track number, and C holds the sector number  


If the sector was written properly, then Carry is true, A holds 0, and HL is preserved; if the write failed, then Carry is false, A holds an error number, and HL is corrupt; in ether case, the other flags are corrupt, and all other registers are preserved  


Exit then Carry is false, A holds an error number, and HL is corrupt; in either case,the other flags are corrupt, and all other registers are preserved  


## &042 BIOS FORMAT TRACK  


Action Formats a complete track, inserts sectors, and fills the track with bytes of &E5  


Entry HL contains the address of the header information buffer which holds the header information blocks, E contains the drive number (&00 for drive A, and &01 for drive B), and D holds the track number  


if the formatting process was successful, then Carry is true, A holds 0, and HL is preserved; if the Exit formatting process failed, then Carry is false, A holds an error number, and HL is corrupt; in other case, the other flags are corrupt, and all the other registers are preserved  


The header information block is laid out as follows  


byte 0 - holds the track number  


byte 1 - holds the head number (set to zero)  


Notes byte 2 - holds the sector number  


byte 3 - holds log2(sector size) - 7 (usually either &02=512 bytes, or &03=1024 bytes).  


Header information blocks must be set up contiguously for every sector on the track, and in the same sequence that they are to be laid down (eg &C1, &C6, &C2, &C7, &C3, &C8, &C4, &C9, &C5)  


## &045 BIOS MOVE TRACK  


Action Moves the disc drive head to the specified track  


Entry E holds the drive number (&00 for drive A, and &01 for drive B), and D holds th  


Exit If the head was moved successfully, then Carry is true, A holds 0, and HL is preserved; if the move failed, then Carry is false, A holds an error number, and HL is corrupt; in both cases, the other flags are

---

<!-- page 68 -->

corrupt, and all other registers are preserved  


Notes There is normally no need to call this routine as READ SECTOR, WRITE SECTOR and FORMAT TRACK automatically move the head to the correct position  


## &C048 BIOS GET STATUS  


Action Returns the status of the specified drive  


Entry A holds the drive number (&00 for drive A, and &01 for drive B)  


If Carry is true, then A holds the status byte, and HL is preserved; if Carry is false, then A is corrupt, and HL holds the address of the byte before the status byte; in either case, the other flags are preserved, and all other registers are preserved  


The status byte indicates the drive's status as follows  


Notes if bit 6 is set, then either the write protect is set or the disc is missing if bit 5 is set, then the drive is ready and the disc is fitted (whether the disc is formatted or not) if bit 4 is set, then the head is at track 0  


## &C04B BIOS SET RETRY COUNT  


Action Sets the number of times the operation is retried in the event of disc error  


Entry A holds the number of retries required  


Exit A holds the previous number of retries, HL and the flags are corrupt, and all others are preserved  


Notes The default setting is &10, and the minimum setting is &01; the number of retries can also be altered by poking &BE66 with the required value  


## &C56C GET SECTOR DATA  


Action Gets the data of a sector on the current track  


Entry E holds the drive number  


Exit If a formatted disc is present, then Carry is true, and HL is preserved; if an unformatted disc is present or the disc is missing, then Carry is false, and HL holds the address of the byte before the status byte; in either case, A and the other flags are corrupt, and all other registers are preserved  


Notes The track number is held at &BE4F, the head number is held at &BE50, the sector number is held at &BE51, and the log2(sector size)- 7 is held at &BE52; disc parameters do not need to be set to the format of the disc; this routine is best used with the disc error messages turned off

---

<!-- page 69 -->

## The Sound Manager  


## &BCA7 SOUND RESET  


Action Resets the sound manager by clearing the sound queues and abandoning any current soundsEntry No entry conditionsExit AF, BC, DE and HL are corrupt, and all others are preserved  


## &BCAA SOUND QUEUE  


Action Adds a sound to the sound queue of a channelEntry HL contains the address of a series of bytes which define the sound and are stored in the central 32K of RAMIf the sound was successfully added to the queue, then Carry is true and HL is corrupt; if one of the Exit sound queues was full, then Carry is false and HL is preserved; in either case, A, BC, DE, IX and the other flags are corrupt, and all others are preservedThe bytes required to define the sound are as followsbyte 0 - channel status bytebyte 1 - volume envelope to usebyte 2 - tone envelope to useNotes bytes 3&4 - tone periodbyte 5 - noise periodbyte 6 - start volumebytes 7&8 - duration of the sound, or envelope repeat count  


## &BCAD SOUND CHECK  


Action Gets the status of a sound channelEntry A contains the channel to test - for channel A, bit 0 set; for channel B, bit 1 set; for channel C, bit 2 setExit A contains the channel status, BC, DE, HL and flags are corrupt, and all others are preservedThe channel status returned is bit significant, as followsbits 0 to 2 - the number of free spaces in the sound queuebit 3 - trying to rendezvous with channel ANotes bit 4 - trying to rendezvous with channel Bbit 5 - trying to rendezvous with channel Cbit 6 - holding the channelbit 7 - producing a sound  


## &BCBO SOUND ARM EVENT  


Action Sets up an event which will be activated when a space occurs in a sound queueEntry A contains the channel to set the event up for (see SOUND CHECK for the bit values this can take), and HL holds the address of the event blockExit AF, BC, DE and HL are corrupt, and all other registers are preservedNotes The event block must be initialised by KL INIT EVENT and is disarmed when the event itself is run  


Action Allows the playing of sounds on specific channels that had been stopped by SOUND HOLDEntry A contains the sound channels to be released (see SOUND CHECK for the bit values this can take)Exit AF, BC, DE, HL and IX are corrupt, and all others are preserved  


## &BCB6 SOUND HOLD  


Action Immediately stops all sound output (on all channels)Entry No entry conditionsExit If a sound was being made, then Carry is true; if no sound was being made, then Carry is false; in all cases, A, BC, HL and other flags are corrupt, and all others are preservedNotes When the sounds are restarted, they will begin from exactly the same place that they were stopped  


## &BCB9 SOUND CONTINUE

---

<!-- page 70 -->

Action Restarts all sound output (on all channels)  


Entry No entry conditions  


Exit AF, BC, DE and IX are corrupt, and all others are preserved  


## &BCBC SOUND AMPL ENVELOPE  


Action Sets up avolume envelope  


Entry A holds an envelope number (from 1 to 15), HL holds the address of a block of data for the envelope  


If it was set up properly, Carry is true, HL holds the data block address + 16, A and BC are corrupt; if the envelope number is invalid, then Carry is false, and A, B and HL are preserved; in either case, DE and the other flags are corrupt, and all other registers are preserved  


All the rules of envelopes in BASIC also apply; the block of the data for the envelope is set up as follows  


byte 0 - number of sections in the envelope bytes 1 to 3 - first section of the envelope bytes 4 to 6 - second section of the envelope bytes 7 to 9 - third section of the envelope bytes 10 to 12 - fourth section of the envelope Notes bytes 13 to 15 - fifth section of the envelope Each section of the envelope has three bytes set out as follows byte 0 - step count (with bit 7 set) byte 1 - step size byte 2 - pause time or if it is a hardware envelope, then each section takes the following form byte 0 - envelope shape (with bit 7 not set) bytes 1 and 2 - envelope period  


See also SOUND TONE ENVELOPE below  


## &BCBF SOUND TONE ENVELOPE  


Action Sets up a tone envelope  


Entry A holds an envelope number (from 1 to 15), HL holds  


If it was set up properly, Carry is true, HL holds the data block addresses + 16, A and BC are corrupt; if the envelope number is invalid, then Carry  


All the rules of envelopes in BASIC also apply; the block of the data for  


## &BCC2 SOUND A ADDRESS  


Action Gets the address of the data block associated with a volume envelope  


Entry A contains an envelope number (from 1 to 15)  


If it was found, then Carry is true, HL holds the data block's address, and BC holds its length; if the envelope number is invalid, then Carry is false, HL is corrupt and BC is preserved; in both cases, A and the other flags are corrupt, and all others are preserved  


## &BCC5 SOUND T ADDRESS  


Action Gets the address of the data block associated with a tone envelope  


Entry A contains an envelope number (from 1 to 15)  



<table><tr><td>Exit</td><td>If it was found, then Carry is true, HL holds the data block&#x27;s address, and BC holds its length; if the envelope number is invalid, then Carry is false. HL is corrupt and BC is preserved; in both cases, A and the other flags are corrupt and all others are preserved</td></tr></table>

---

<!-- page 71 -->

## The Machine Pack  


## &BD13 MC BOOT PROGRAM  


Action Loads a program into RAM and then executes it  


Entry HL contains the address of the routine which is used to load the program  


Exit Control is handed over to the program and so the routine is not returned from  


All events, sounds and interrupts are turned off, the firmware indirections are returned to their default settings, and the stack is reset; the routine to run the program should be in the central block of memory, and should obey the following exit conditions:  


Notes if the program was loaded successfully, then Carry is true, and HL contains the program entry point; if the program failed to load, then Carry is false, and HL is corrupt; in either case, A, BC, DE, IX, IY and the other flags are all corrupt Should the program fail to load, control is returned to the previous foreground program  


## &BD16 MC START PROGRAM  


Action Runs a foreground program  Entry HL contains the entry point for the program, and C contains the ROM selection number  Exit Control is handed over to the program and so the routine is not returned from  


## &BD19 MC WAIT FLYBACK  


Action Waits until a frame flyback occurs  


Entry No entry conditions  


Exit All registers are preserved  


Notes When the frame flyback occurs the screen is not being written to and so the screen c- n be manipulated during this period without any flickering or ghosting on the screen  


## &BD1C MC SET MODE  


Action Sets the screen mode  


Entry A contains the required mode  


Exit AF is corrupt, and all other registers are preserved  


Notes Although this routine changes the screen mode it does not inform the routines which write to the screen that the mode has been changed; therefore these routines will write to the screen as if the mode had not been changed; however as the hardware is now interpreting these signals differently, unusual effects may occur  


## &BD1F MC SCREEN OFFSET  


Action Sets the screen offset  Entry A contains the screen base, and HL contains the screen offset  Exit AF is corrupt, and all other registers are preserved  


As with MC SET MODE, this routine changes the hardware setting without telling the routines that write Notes to the screen; therefore these routines may cause unpredictable effects if called; the default screen base is &CO  


## &BD22 MC CLEAR INKS  


Action Sets all the PENs and the border to one colour, so making it seem as if the screen has been cleared  


Entry DE contains the address of the ink vector  


Exit AF is corrupt, and all other registers are preserved  


The ink vector takes the following form:  


Notes byte 0 - holds the colour for the border  byte 1 - holds the colour for all of the PENs  The values for the colours are all given as hardware values  


## &BD25 MC SET INKS  


Action Sets the colours of all the PENs and the border

---

<!-- page 72 -->

Entry DE contains the address of the ink vector Exit AF is corrupt, and all other registers are preserved The ink vector takes the following form: Notes byte 0 - holds the colour for the border byte 1 - holds the colour for PEN 0... byte 16 - holds the colour for PEN 15. The values for the colours are all given as hardware values; the routine sets all sixteen PEN's  


## &BD28 MC RESET PRINTER  


Action Sets the MC WAIT PRINTER indirection to its original routine Entry No entry conditions Exit AF, BC, DE and HL are corrupt, and all others are preserved  


## &BD2B MC PRINT CHAR  


Action Sends a character to the printer and detects if it is busy for too long (more than 0.4 seconds) Entry A contains the character to be printed - only characters upto ASCII 127 can be printed Exit If the character was sent properly, then Carry is true; if the printer was busy, then Carry is false; in either case, A and the other flags are corrupt, and all other registers are preserved Notes This routine uses the MC WAIT PRINTER indirection  


## &BD2E MC BUSY PRINTER  


Action Tests to see if the printer is busy Entry No entry conditions Exit If the printer is busy, then Carry is true; if the printer is not busy, then Carry is false; in both cases, the other flags are corrupt, and all other registers are preserved  


## &BD31 MC SEND PRINTER  


Action Sends a character to the printer, which must not be busy Entry A contains tile character to be printed - only characters up to ASCII 127 can be printed Exit Carry is true, A and the other flags are corrupt, and all other registers are preserved  


## &BD34 MC SOUND REGISTER  


Action Sends data to a sound chip register Entry A contains the register number, and C contains the data to be sent Exit AF and BC are corrupt, and all other registers are preserved  


## &BD37 JUMP RESTORE  


Action Restores the jumplock to its default state Entry No entry conditions Exit AF, BC, DE and HL are corrupt, and all other registers are preserved Notes This routine does not affect the indirections jumplock, but restores all entries in the main jumplock

---

<!-- page 73 -->

## 664 and 6128 only  


## &BD3A KM SET LOCKS  


Action Turns the shift and caps locks on and off  Entry H contains the caps lock state, and L contains the shift lock state  Exit AF is corrupt, and all others are preserved  Notes In this routine, &00 means turned off, and &FF means turned on  


## &BD3D KM FLUSH  


Action Empties the key buffer  Entry No entry conditions  Exit AF is corrupt, and all other registers are preserved  Notes This routine also discards any current expansion string  


## &BD40 TXT ASK STATE  


Action Gets the VDU and cursor state  Entry No entry conditions  Exit A contains the VDU and cursor state, the flags are corrupt, and all others are preserved  The value in the A register is bit significant, as follows:  if bit 0 is set, then the cursor is disabled, otherwise it is enabled  Notes if bit 1 is set, then the cursor is turned off, otherwise it is on  if bit 7 is set, then the VDU is enabled, otherwise it is disabled  


## &BD43 GRA DEFAULT  


Action Sets the graphics VDU to its default mode  Entry No entry conditions  Exit AF, BC, DE and HL are corrupt, and all other registers are preserved  Notes Sets the background to opaque, the first point of line is plotted, lines aren't dotted, and the write mode is force  


## &BD46 GRA SET BACK  


Action Sets the graphics background mode to either opaque or transparent  Entry A holds zero if opaque mode is wanted, or holds &FF to select transparent mode  Exit All registers are preserved  


## &BD49 GRA SET FIRST  


Action Sets whether the first point of a line is plotted or not  Entry A holds zero if the first point is not to be plotted, or holds &FF if it is to be plotted  Exit All registers are preserved  


## &BD4C GRA SET LINE MASK  


Action Sets how the points in a line are plotted - ie defines whether a line is dotted or not  Entry A contains the line mask that will be used when drawing lines  Exit All registers are preserved  


Notes The first point in the line corresponds to bit 7 of the line mask and after bit 0 the mask repeats; if a bit is set then that point will be plotted; the mask is always applied from left to right, or from bottom to top  


## &BD4F GRA FROM USER  


Action Converts user coordinates into base coordinates  Entry DE contains the user X coordinate, and HL contains the user Y coordinate  Exit DE holds the base X coordinate, and HL holds the base Y coordinate, AF is corrupt, and all others are

---

<!-- page 74 -->

preserved  


## &BD52 GRA FILL  


Action Fills an area of the screen starting from the current graphics position and extending until it reaches either the edge of the window or a pixel set to the PEN  


Entry A holds a PEN to fill with, HL holds the address of the buffer, and DE holds the length of the buffer  


Exit If the area was filled properly, then Carry is true; if the area was not filled, then Carry is false; in either case, A, BC, DE, HL and the other flags are corrupt, and all others are preserved  


The buffer is used to store complex areas to fill, which are remembered and filled when the basic shape has been done; each entry in the buffer uses seven bytes and so the more complex the shape the larger the buffer; if it runs out of space to store these complex areas, it will fill what it can and then return with Carry false  


## &BD55 SCR SET POSITION  


Action Sets the screen base and offset without telling the hardware  


Entry A contains the screen base, and HL contains the screen offset  


Exit A contains the masked screen base, and HL contains the masked screen offset, the flags are corrupt, and all other registers are preserved  


## &BD58 MC PRINT TRANSLATION  


Action Sets how ASCII characters will be translated before being sent to the printer  


Entry HL contains the address of the table  


Exit If the table is too long, then Carry is false (ie more than 20 entries); if the table is correctly set out, then Carry is true; in either case, A, BC, DE, HL and the other flags are corrupt,  


Notes The first byte in the table is the number of entries; each entry requires two bytes, as follows: byte 0 - the character to be translated byte 1 - the character that is to be sent to the printer If the character to be sent to the printer is &FF, then the character is ignored and nothing is sent  


## &BD5B KL BANK SWITCH (6128 only)  


Action Sets which RAM banks are being accessed by the Z80  


Entry A contains the organisation that is to be used  


Exit A contains the previous organisation, the flags are corrupt, and all other registers are preserved

---

<!-- page 75 -->

## The Firmware Indirections  


## &BDCD TXT DRAW CURSOR  


Action Places the cursor on the screen, if the cursor is enabled  Entry No entry conditions  Exit AF is corrupt, and all other registers are preserved  Notes The cursor is an inverse blob which appears at the current text position  


## &BDD0 TXT UNDRAW CURSOR  


Action Removes the cursor from the screen, if the cursor is enabled  Entry No entry conditions  Exit AF is corrupt,  


## &BDD3 TXT WRITE CHAR  


Action Writes a character onto the screen  Entry A holds the character to be written, H holds the physical column number, and L holds the physical line number  Exit AF, BC, DE and HL are corrupt, and all other registers are preserved  


## &BDD6 TXT UNWRITE  


Action Reads a character from the screen  Entry H contains the physical column number, and L contains the physical line number to read from  If a character was found, then Carry is true, and A contains the character; if no character was found, then Carry is false, and A contains zero; in either case, BC, DE, HL and the other nags are corrupt, and all other registers are preserved  Notes This routine works by comparing the image on the screen with the character matrices; therefore if the character matrices have been altered the routine may not find a readable a character  


## &BDD9 TXT OUT ACTION  


Action Writes a character to the screen or obeys a control code (800 to &1F)  Entry A contains the character or code  Exit AF, BC, DE and HL are corrupt, and all other registers are preserved  Control codes may take a maximum of nine parameters; when a control code is found, the required number of parameters is read into the control code buffer, and then the control code is acted upon; if the graphics character write mode is enabled, then characters and codes are printed using the graphics VDU; when using the graphics VDU control codes are printed and not obeyed  


## &BDDC GRA PLOT  


Action Plots a point in the current graphics PEN  Entry DE contains the user X coordinate, and HL contains the user Y coordinate of the point  Exit AF, BC, DE and HL are corrupt, and all other registers are preserved  Notes This routine uses the SCR WRITE indirection to write the point to the screen  


## &BDDF GRA TEST  


Action Tests a point and finds out what PEN it is set to  Entry DE contains the user X coordinate, and HL contains the user Y coordinate of the point.  Exit A contains the PEN that the point is written in, BC, DE and HL are corrupt, and all others are preserved  Notes This routine uses the SCR READ indirection to test a point on the screen  


## &BDE2 GRA LINE  


Action Draws a line in the current graphics PEN, from the current graphics position to the specified point

---

<!-- page 76 -->

Entry DE contains the user X coordinate, and HL contains the user Y coordinate for the endpoint  


Exit AF, BC, DE and HL are corrupt, and all others are preserved  


Notes This routine uses the SCR WRITE indirection to write the points of the line on the screen  


## &BDE5 SCR READ  


Action Reads a pixel from the screen and returns its decode a PEN  


Entry HL contains the screen address of the pixel, and C contains the mask for the pixel  


Exit A contains the decoded PEN of the pixel, the flags are corrupt, and all others are preserved  


Notes The mask should be for a single pixel, and is dependent on the screen mode  


## &BDE8 SCR WRITE  


Action Writes one or more pixels to the screen  


Entry HL contains the screen address of the pixel, C contains the mask, and B contains the encoded PEN  


Exit AF is corrupt, and all other registers are preserved  


Notes The mask should determine which pixels in the screen byte are to be plotted  


## &BDE8 SCR MODE CLEAR  


Action Fills the entire screen memory with &00, which clears the screen to PEN 0  


Entry No entry conditions  


Exit AF, BC, DE and HL are corrupt, and all the other registers are preserved  


## &BDE8 KM TEST BREAK  


Action Tests if the ESC key has been pressed, and acts accordingly  


Entry C contains the Shift and Control key states, and interrupts must be disabled  


Exit AF and HL are corrupt, and all other registers are preserved  


If bit 7 of C is set, then the Control key is pressed; if bit 5 of C is set, then the Shift key is pressed; if Notes ESC, Shift and Control are pressed at the same time, then it initiates a system reset; otherwise it reports a break event  


## &BDF1 MC WAIT PRINTER  


Action Sends a character to the printer if it is not busy  


Entry A contains the character to be sent to the printer  


Exit If the character was printed successfully, then Carry is true; if the printer was busy for too long (more than 0.4 seconds), then Carry is false; in either case, A and BC are corrupt, and all other registers are preserved  


## &BDF4 KM SCAN KEYS  


Action Scans the keyboard every 1/50th of a second, and updates the status of all keys  


Entry All interrupts must be disabled  


Exit AF, BC, DE and HL are corrupt, and all other registers are preserved

---

<!-- page 77 -->

## The Maths Firmware  


# &BDC1 MOVE REAL (&BD3D for the 464)  


Action Copies the five bytes that are pointed to by DE to the location held in HL  


Entry DE points to the source real value, and HL points to the destination  


Exit HL points to the real value in the destination, Carry is true if the move went properly, F is corrupt, and all other registers are preserved  


Notes For the 464 only, A holds the exponent byte of the real value when the routine is exited  


# &BD64 INTEGER TO REAL (&BD40 for the 464)  


Action Converts an integer value into a real value  


Entry HL holds the integer value, DE points to the desti- nation for the real value, bit 7 of A holds the sign of the integer value - it is taken to be negative if bit 7 is set  


Exit HL points to the real value in the destination, AF and DE are corrupt, and all others are preserved  


# &BD67 BINARY TO REAL (&BD43 for the 464)  


Action Converts a four byte binary value into a real value at the same location  


Entry HL points to the binary value, bit 7 of A holds the sign of the binary value - negative if it is set  


Exit HL points to the real value in lieu of the four byte binary value, AF is corrupt, and all others are preserved  


Notes A four byte binary value is an unsigned integer up to &FFFFFFF and is stored with the least significant byte first, and with the most significant byte last  


# &BD6A REAL TO INTEGER (&BD46 for the 464)  


Action Converts a real value, rounding it into an unsigned integer value held in HL  


Entry HL points to the real value  


Exit HL holds the integer value, Carry is true if the conversion worked successfully, the Sign flag holds the sign of the integer (negative if it is set). A, IX and the other flags are corrupt, and all other registers are preserved  


Notes This rounds the decimal part down if it is less than 0.5, but rounds up if it is greater than, or equal to 0.5  


# &BD6D REAL TO BINARY (&BD49 for the 464)  


Action Converts a real value, rounding it into a four byte binary value at the same location  


Entry HL points to the real value  


Exit HL points to the binary value in lieu of the real value, bit 7 of B holds the sign for the binary value (it is negative if bit 7 is set), AF, B and IX are corrupt, and all other registers are preserved  


Notes See REAL TO INTEGER for details of how the values are rounded up or down  


# &BD70 REAL FIX (&BD4C for the 464)  


Action Performs an equivalent of BASIC's FIX function on a real value, leaving the result as a four byte binary value at the same location  


Entry HL points to the real value  


Exit HL points to the binary value in lieu of the real value, bit 9 of B has the sign of the binary value (it is negative if bit 7 is set), AF, B and IX is corrupt, and all others are preserved  


Notes FIX removes any decimal part of the value, rounding down whether positive or negative - see the BASIC handbook for more details on the FIX command  


# &BD73 REAL INT (&BD4F for the 464)  


Action Performs an equivalent of BASIC's INT function on a real value, leaving the result as a four byte binary value at the same location.  


Entry HL points to the real value  


Exit HL points to the binary value in lieu of the real value, bit 8 of B has the sign of the binary value (it is

---

<!-- page 78 -->

negative if bit 7 is set), AF, B and IX are corrupt, and all others are preserved  


INT removes any decimal part of the value, rounding down if the number is positive, but rounding up if it is negative  


&BD76 INTERNAL SUBROUTINE - not useful (&BD52 for the 464)  


&BD79 REAL \*10^A (&BD55 for the 464)  


Action Multiplies a real value by 10 to the power of the value in the A register, leaving the result at the same location  


Entry HL points to the real value, and A holds the power of 10  


Exit HL points to the result, AF, BC, DE, IX and IY are corrupt  


&BD7C REAL ADDITION (&BD58 for the 464)  


Action Adds two real values, and leaves the result in lieu of the first real number  


Entry HL points to the first real value, and DE points to the second real value  


Exit HL points to the result, AF, BC, DE, IX and Iy are corrupt  


&BD82 REAL REVERSE SUBTRACTION (&BD5E for the 464)  


Action Subtracts the first real value from the second real value, and leaves the result in lieu of the first number  


Entry HL points to the first real value, and DE points to the second real  


Exit HL points to the result in place of the first real value, AF, BC, DE, IX and IY are corrupt  


&BD85 REAL MULTIPLICATION (&BD61 for the 464)  


Action Multiplies two real values together, and leaves the result in lieu of the first number  


Exit HL points to the result in place of the first real value, AF,BC,DE,IX and IY are corrupt  


&BD88 REAL DIVISION (&BD64 for the 464)  


Action Divides the first real value by the second real value, and leaves the result in lieu of the first number  


Entry HL points to the first real value, and DE points to the second real.  


Exit HL points to the result in place of the first real value, AF, Bc, DE, IX and IY are corrupt  


&BD8E REAL COMPARISON (&BD6A for the 464)  


Action Compares two real values  


Entry HL points to the first real value, and DE points to the second real val  


Exit A holds the result of the comparison process, IX, IY, and the other flags are corrupt, and all others are preserved  


After this routine has been called, the value in A depends on the result of the comparison as follows if the first real number is greater than the second real number, then A holds &01 if the first real number is the same as the second real number, then A holds &00 if the second real number is greater than the first real number, then A holds &FF  


&BD91 REAL UNARY MINUS (&BD6D for the 464)  


Action Reverses the sign of a real value  


Entry HL points to the real value  


Exit HL points to the new value of the real number (which is stored in place of the original number), bit 7 of A holds the sign of the result (it is negative if bit 7 is set), AF and IX are corrupt, and all other registers are preserved  


&BD94 REAL SIGNUM/SGN (&BD70 for the 464)  


Action Tests a real value, and compares it with zero  


Entry HL points to the real value  


Exit A holds the result of this comparison process, IX and the other jags are corrupt, and all others are preserved  


Notes After this routine has been called, the value in A depends on the result of the comparison as follows. if the real number is greater than 0, then A holds &01, Carry is false, and Zero is false

---

<!-- page 79 -->

if the real number is the same as 0, then A holds &00, Carry is false, and Zero is true if the real number is smaller than 0, then A holds &FF, Carry is true, and Zero is false  


## &BD97 SET ANGLE MODE (&BD73 for the 464)  


Action Sets the angular calculation mode to either degrees (DEG) or radians (RAD)  


Entry A holds the mode setting - 0 for RAD, and any other value for DEG  


Exit All registers are preserved  


## &BD9A REAL PI (&BD76 for the 464)  


Action Places the real value of pi at a given memory location  


Entry HL holds the address at which the value of pi is to be placed  


Exit AF and DE are corrupt, and all other registers are preserved  


## &BD9D REAL SQR (&BD79 for the 464)  


Action Calculates the square root of a real value, leaving the result in lieu of the real value  


Entry HL points to the real value  


Exit HL points to the result of the calculation, AF, BC, DE, IX and IY are corrupt  


## &BDA0 REAL POWER (&BD7C for the 464)  


Action Raises the first real value to the power of the second real value, leaving the result in lieu of the jirst real value  


Entry HL points to the first real value, and DE points to the second real value  


Exit HL points to the result of the calculation, AF, BC, DE, Ix and IY are corrupt  


## &BDA3 REAL LOG (&BD7F for the 464)  


Action Returns the naporian logarithm (to base e) of a real value, leaving the result in lieu of the real value  


Entry HL points to the real value  


Exit HL points to the logarithm that has been calculated, AF, BC, DE, LY and IY are corrupt  


## &BDA6 REAL LOG 10 (&BD82 for the 464)  


Action Returns the logarithm (to base 10) of a real value, leaving the result in lieu of the real value  


Entry HL points to the real value  


Exit HL points to the logarithm that has been calculated, AF, BC, DE IX and IY are corrupt  


## &BDA9 REAL EXP (&BD85 for the 464)  


Action Returns the antilogarithm (base e) of a real value, leaving the result in lieu of the real value  


Entry HL points to the real value  


Exit HL points to the antilogarithm that has been cal- culated, AF, BC, DE, IX and IY are corrupt  


Notes See the BASIC handbook for details of EXP  


## &BDAC REAL SINE (&BD88 for the 464)  


Action Returns the sine of a real value, leaving the result in lieu of the real value  


Entry HL points to the real value (ie all angle)  


Exit HL points to the sine value that has been calculated, AF, BC, DE, IX and IY are corrupt  


## &BDAF REAL COSINE (&BD8B for the 464)  


Action Returns the cosine of a real value, leaving a the result in lieu of the real value  


Entry HL points to the real value (ie an angle)  


Exit HL points to the cosine value that has been calculated, AF, BC, DE, IX and IY are corrupt  

# &BDB2 REAL TANGENT (&BD8E for the 464)  


Action Returns the tangent of a real value, leaving the result in lieu of the real value  

<|det|>【

---

<!-- page 80 -->

Exit HL points to the tangent value that has been cal- culated, AF, BC, DE, IX and IY are corrupt  


# &BDB5 REAL ARCTANGENT (&BD91 for the 464)  


Action Returns the arctangent of a real value, leaving the result in lieu of the real value  


Entry HL points to the real value (ie an angle)  


Exit HL points to the arctangent value that has been calculated, AF, BC, DE, IX and IY are corrupt All of the above routines to calculate sine, cosine, tangent and arctangent are slightly inaccurate  


&BDB8 INTERNAL SUBROUTINE - not useful (&BD94 for the 464)  


&BDB8 INTERNAL SUBROUTINE - not useful (&BD97 for the 464)  


&BDBE INTERNAL SUBROUTINE - not useful (&BD9A for the 464)  


## Maths Subroutines for the 464 only  


# &BD5B REAL SUBTRACTION  


Action Subtracts the second real value from the first real value, and leaves the result in lieu of the first number  


Entry HL points to the first real value, and DE points to the second real value  


Exit HL points to the result in place of the first real value, AF, BC, DE, IX and IY are corrupt  


# &BD67 REAL EXPONENT ADDITION  


Action Adds the value of the A register to the exponent byte of a real number  


Entry HL points to the real value, and A holds the value to be added  


Exit HL points to the result in place of the first real value, AF and IX are corrupt, and all others are preserved  


# &BD9D INTERNAL SUBROUTINE - not useful  


&BDA0 INTERNAL SUBROUTINE - not useful  


&BDA3 INTERNAL SUBROUTINE - not useful  


&BDA6 INTERNAL SUBROUTINE - not useful  


&BDA9 INTERNAL SUBROUTINE - not useful  


# &BDAC INTEGER ADDITION  


Action Adds two signed integer values  


Entry HL holds the first integer value, and DE holds the second integer value  


Exit HL holds the result of the addition, A holds &FF if there is an overflow but is preserved otherwise, the flags Z are corrupt, and all other registers are preserved  


# &BDAF INTEGER SUBTRACTION  


Action Subtracts the second signed integer value from the first signed integer value  


Entry HL holds the first integer value, and DE holds the second integer value  

Exit HL holds the result of the subtraction, A holds &FF if there is an overflow but is preserved otherwise, the flags are corrupt, and all the other registers are preserved  


# &BDB2 INTEGER REVERSE SUBTRACTION  


Action Subtracts the first signed integer value from the second signed integer value  


Entry HL holds the first integer value, and DE holds the second integer value  

Exi HL holds the result of the subtraction, AF and DE are corrupt, and all others are preserved  


# &BDB5 INTEGER MULTIPLICATION  


Action Multiplies two signed integer values together, and leaves the result in lieu of the first number  


Entry HL holds the first integer value, and DE holds the second integer value  

Entry HL holds the result of the multiplication, A holds &FF if there is an overflow but is corrupted otherwise,

---

<!-- page 81 -->

the flags, BC and DE are corrupt, and the other registers are preserved  


Notes Multiplication of signed integers does not produce the same result as with unsigned integers  


## &BDB8 INTEGER DIVISION  


Action Divides the first signed integer value by the second signed integer value  


Entry HL holds the first integer value, and DE holds the second integer value  


Exit HL holds the result of the division, DE holds the remainder, AF and BC are corrupt, and all others are preserved  


Notes Division of signed integers does not produce the same result as with unsigned integers  


Action Divides the first signed integer value by the second signed integer value  


# Entry HL holds the first integer value, and DE holds the second integer value  


Entry HL holds the first integer value, and DE holds the second integer valueDE holds the result of the division, HL holds the remainder, AF and BC are corrupt, and all others are preserved  


Notes Division of signed integers does not produce the same result as with unsigned integers  

# &BDC8 INTERNAL SUBROUTINE - not useful  


&BDC1 INTERNAL SUBROUTINE - not useful  


&BDC4 INTEGER COMPARISON  


Action Compares two signed integer values  


Entry HL holds the first integer value, and DE holds the second integer value  

Exit A holds the result of the comparison process, the flags are corrupt, and all others are preserved  


After this routine has been called, the value in A depends on the result of the comparison as follows  


if the first real number is greater than the second real number, then A holds &01  


Notes if the first real number is the same as the second real number, then A holds &00  


if the second real number is greater than the first real number, then A holds &FF  


With signed integers, the range of values runs from &8000 (- 32768) via zero to &7FFF (+32767) and so any value which is greater than &8000 is considered as being less than a value of &7FFF or less  


## &BDC7 INTEGER UNARY MINUS  


Action Reverses the sign of an integer value (by subtracting it from &10000)  


Entry HL holds the integer value  


Exit HL holds the new value of the integer number, AF is corrupt, cmd all other registers are preserved  


## &BDCA INTEGER SIGNUM/SGN  


Action Tests a signed integer value  


Entry HL holds the integer value  


Exit A holds the result of this comparison process, the flags are corrupt, and all others are preserved  


After this routine has been called, the value in A depends on the result of this comparison as follows if the integer number is greater than 0 and is less than &8000, then A holds &01 Notes if the integer number is the same as 0, then A holds &00  


if the integer number is greater than &7FFF and less than or equal to &FFFF, then A holds &FF See INTEGER COMPARISON for more details on the way that signed integers are laid out  


## Maths Subroutines for the 664 and 6128 only  


## &BD5E TEXT INPUT  


Action Allows upto 255 characters to be input from the keyboard into a buffer (hmmm ... not really a maths routine ...)  


Entry HL points to the start of the buffer - a NUL character must be placed after any characters already present, or at the start of the buffer if there is no text

---

<!-- page 82 -->

Exit A has the last key pressed, HL points to the start of the buffer, the flags are corrupt, and all others are preserved  


Notes This routine prints any existing contents of the buffer (upto the NUL character) and then echoes any keys used; it allows full line editing with the cursor keys and DEL, etc; it is exited only by use of ENTER or ESC  


## &BD7F REAL RND  


Action Creates a new RND real value at a location pointed to by HL  


Entry HL points to the destination for the result  


Exit HL points to the RND value, AF, BC, DE and IX registers are corrupt; and all others are preserved  


## &BD8B REAL RND(0)  


Action Returns the last RND value created, and puts it in a location pointed to by HL  


Entry HL points to the place where the value is to be returned to  


Exit HL points to the value created, AF, DE and IX are corrupt, and all other registers are preserved  


Notes: See the BASIC handbook for more details on RND(0)

---

<!-- page 83 -->

## The Z80 Instruction Set  


The Z80 Instruction SetThe lists contains all the normal machine code instructions for the microprocessor, plus a number of undocumented ones. The latter comprise those which operate on the high or low bytes of the Index registers (IX and IY) which are notated here as HIX, LIX, HIY and LIY - some assemblers may use the form IXH, etc - and a set of rotation instructions complementary to SRL, which are designated SLL.  


## The Opcodes and T states  


Within the tables of instructions, a number of abbreviations are used:  



<table><tr><td>d</td><td>displacement (a value from -128 (&amp;amp;80) to +127 (&amp;amp;7F))</td></tr><tr><td>n</td><td>a single byte value (from 0 (&amp;amp;00) to 255 (&amp;amp;FF))</td></tr><tr><td>hilo</td><td>a double byte value (from -32768 (&amp;amp;8000) via 0 to 32767 (&amp;amp;7FFF))</td></tr><tr><td>addr</td><td>an address value (from 0 (&amp;amp;0000) to 65535 (&amp;amp;FFFF))</td></tr></table>  


(in the sequence of opcode bytes, 'addr' and 'hilo' are entered low byte first)  


The next two columns detail the number of bytes applicable to each instruction, and the number of T states (clock pulses) that each requires - some have two figures which are distinguished as follows:  


f means 'the number of T states required when the condition is false' t means 'the number of T states needed when the condition is true' = means 'the number of T states needed when either BC=0 and/or A matches the contents of HL' # means 'the number of T states required when both the above conditions are false' z means 'the number of T states needed when B=0' nz means 'the number of T states required when B<>0'  


## The Flag Register  


The flag registerThe last columns give the effect on the flag bits which each instruction causes:  


? means the setting of the bit is unpredictable means the setting of the bit is unchanged 0 means that the flag bit is reset to zero 1 means that the flag bit is set to one.  


In addition, the Sign flag (bit 7) is also set:  


7 if bit 7 of the A register is set 15 if bit 15 of the HL register pair (ie bit 7 of the H register) is set \(= 7\) if bit 7 of the A register would be set by subtraction in lieu of CP  


The Zero flag (bi6 6) is also set:  


z if the A register or the HL register pair equals zero \(=\) if the A register matches the compared register or value \(= A\) if the A register matches the contents of the address pointed to by HL

---

<!-- page 84 -->

<>B if the B register holds zero  


<>b if the bit tested is zero  


## The Parity/Overflow flag (bit 2) is also set:  


p if the register concerned contains an even number of set bits v if an overflow has occured in Two's Complement arithmetic BC if BC is not zero A80 if the A register was &80 before this instruction was performed i to the contents of the microprocessor's internal interrupt register  


## The Carry flag (bit 0) is also set:  


c if an addition resulted in a carry out of bit 7 (for a register) or bit 15 (for a register pair) b if a subtraction required a borrow from bit 7 (for a register) or bit 15 (for a register pair) < if the A register is less than the value or register that is being compared r0 by the bit rotated in from bit 0 of the register concerned r7 by the bit rotated in from bit 7 of the register concerned x if the Carry was reset (ie zero) before this instruction was performed A0 if the A register was &00 before this instruction was performed  


The flag register is bit significant, and the bits are defined as follows:  


7 - Sign 6 - Zero 5 - unused 4 - Half Carry (cannot test) 3 - unused 2 - Parity/Overflow 1 - Add/Subtract (cannot test) 0 - Carry  



<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>BIT 0,(HL)</td><td>CB 46</td><td>2</td><td>12</td><td>?</td><td>&amp;lt;b</td><td>?</td><td>-</td></tr><tr><td>BIT 0,(IX+d)</td><td>CB DD 46 d</td><td>4</td><td>20</td><td>?</td><td>&amp;lt;b</td><td>?</td><td>-</td></tr><tr><td rowspan="2">BIT 0,(IY+d)</td><td rowspan="2">CB FD 46 d</td><td rowspan="2">4</td><td rowspan="2">20</td><td rowspan="2">?</td><td rowspan="2">&amp;lt;b</td><td rowspan="2">?</td><td rowspan="2">-</td></tr><tr></tr><tr><td>BIT 0,A</td><td>CB 47</td><td>2</td><td>8</td><td>?</td><td>&amp;lt;b</td><td>?</td><td>-</td></tr><tr><tr><td>BIT 0,B</td><td>CB 40</td><td>2</td><td>8</td><td>?</td><td>&amp;lt;b</td><td>?&lt;fcel-</td><td>-</td></tr><tr><td>BIT 0,C</td><td>CB 41</td><td>2</td><td>8</td><td>?</td><td>&amp;lt;b</td><td>?<br>-</td><td>-</td></tr><tr><td>BIT 0,D</td><td>CB 42</td><td>2</td><td>8</td><td>?</td><td>&amp;lt;b</td><td>? -</td><td>-</td></tr><tr><td>BIT 0,E</td><td>CB 43</td><td>2</td><td>8</td><td>?</td><td>&amp;lt;b</td><td>? <br>-</td><td>-</td></tr><tr><td>BIT 0,H</td><td>CB 44</td><td>2</td><td>8</td><td>?</td><td>&amp;lt;b</td><td>? &lt;fcel-</td><td>-</td></tr></table>

---

<!-- page 85 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>BIT 0,L</td><td>CB 45</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>-</td><td></td></tr><tr><td>BIT 1,(HL)</td><td>CB 4E</td><td>2</td><td>12</td><td>?</td><td>&lt;b&gt;?</td><td>-</td><td></td></tr><tr>&lt;<td>BIT 1,(IX+d)</td><td>CB DD 4E d</td><td>4</td><td>20</td><td>?</td><td>&lt;b&gt;?</td><td>-</td><td></td></tr><tr><tr><td>BIT 1,(IY+d)</td><td>CB FD 4E d</td><td>4</td><td>20</td><td>?</td><td>&lt;b&gt;&lt;b&gt;?</td><td>-</td><td></td></tr><tr><td>BIT 1,A</td><td>CB 1F</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td></td><td></td></tr><tr><td>BIT 1,B</td><td>CB 48</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>&lt;b&gt;?</td><td></td></tr><tr><td>BIT 1,C</td><td>CB 49</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td><br/>-</td><td></td></tr><tr><td>BIT 1,D</td><td>CB 4A</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>&gt;</td><td></td></tr><tr><td>BIT 1,E</td><td>CB 4B</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>?</td><td></td></tr><tr><td>BIT 1,H</td><td>CB 4C</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>?-</td><td></td></tr><tr><td>BIT 1,L</td><td>CB 4D</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>+</td><td></td></tr><tr><td>BIT 2,(HL)</td><td>CB 56</td><td>2</td><td>12</td><td>?</td><td>&lt;b&gt;?</td><td>&lt;b&gt;?<td>-</td></td></tr><tr><td>BIT 2,(IY+d)</td><td>CB FD 56 d</td><td>4</td><td>20</td><td>?</td><td>&lt;b&gt;?</td></tr><tr><td>BIT 2,(LY+d)</td><td>CB DD 56 d</td><td>4</td><td>20</td><td>?</td><td>&lt;b&gt;?-</td><td>-</td><td></td></tr><tr><td>BIT 2,A</td><td>CB 57</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>.</td><td></td></tr><tr><td>BIT 2,B</td><td>CB 50</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>.-</td><td></td></tr><tr><td>BIT 2,C</td><td>CB 51</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>*</td><td></td></tr><tr><td>BIT 2,D</td><td>CB 52</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>**</td><td></td></tr><tr><td>BIT 2,E</td><td>CB 53</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>***</td><td></td></tr><tr><td>BIT 2,H</td><td>CB 54</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>****</td><td></td></tr><tr><td>BIT 2,L</td><td>CB 55</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>††††††††††††††††††††</td><td></td></tr><tr><td>BIT 3,(HL)</td><td>CB 5E</td><td>2</td><td>12</td><td>?</td><td>&lt;b&gt;?</td></tr><tr><td>BIT 3,(IX+d)</td><td>CB DD 5E d</td><td>4</td><td>20</td><td>?</td><td>&lt;b&gt;?<td>-</td></td></tr><tr><td>BIT 3,(IY+d)</td><td>CB FD 5E d</td><td>4</td><td>20</td><td>?</td><td>&lt;b&gt;-</td><td>-</td><td></td></tr><tr><td>BIT 3,A</td><td>CB 5F</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td></tr><tr><td>BIT 3,B</td><td>CB 58</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td></tr><td>BIT 3,C</td><td>CB 59</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td></tr>&lt; tr&gt;<td>BIT 3,D</td><td>CB 5A</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td>&lt; tr&gt;<td>BIT 3,E</td><td>CB 5B</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td>&lt;/tr&gt;<tr><td>BIT 3,H</td><td>CB 5C</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td>&lt;&gt;</tr><tr><td>BIT 3,L</td><td>CB 5D</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td>&lt;<br/>-</tr><tr><td>BIT 4,(HL)</td><td>CB 66</td><td>2</td><td>12</td><td>?</td><td>&lt;b&gt;?</td><td>††††††</td></tr><tr><td>BIT 4,(IY+d)</td><td>CB FD 66 d</td><td>4</td><td>20</td><td>?</td><td>&lt;b&gt;?</td>&lt;br/>-</tr><tr><td>BIT 4,(LY+d)</td><td>CB DD 66 d</td><td>4</td><td>20</td><td>?</td><td>&lt;b&gt;?-</td>&lt;br/>-</tr><tr><td>BIT 4,A</td><td>CB 67</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td>&lt;-</tr><tr><td>BIT 4,B</td><td>CB 60</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td>&lt;++</tr><tr><td>BIT 4,C</td><td>CB 61</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td>&lt+</tr><tr><td>BIT 4,D</td><td>CB 62</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td>&lt-</tr></table>

---

<!-- page 86 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>BIT 4,E</td><td>CB 63</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>-</td><td></td></tr><tr><td>BIT 4,H</td><td>CB 64</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td></td><td></td></tr><tr><td>BIT 4,L</td><td>CB 65</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td><td></td></td></tr><tr><td>BIT 5,(HL)</td><td>CB 6E</td><td>2</td><td>12</td><td>?</td><td>&lt;b&gt;?</td><td>-</td><td></td></tr><tr><tr><td>BIT 5,(IX+d)</td><td>CB DD 6E d</td><td>4</td><td>20</td><td>?</td><td>&lt;b&gt;?</td><td>-</td><td></td></tr><tr>&lt;<td>BIT 5,(IY+d)</td><td>CB FD 6E d</td><td>4</td><td>20</td><td>?</td><td>&lt;b&gt;&lt;?</td><td>-</td><td></td></tr><tr><td>BIT 5,A</td><td>CB 6F</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>&lt;b&gt;?</td><td></td></tr><tr><td>BIT 5,B</td><td>CB 68</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>&gt;</td><td></td></tr><tr><td>BIT 5,C</td><td>CB 69</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>=</td><td></td></tr><tr><td>BIT 5,D</td><td>CB 6A</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>.</td><td></td></tr><tr><td>BIT 5,E</td><td>CB 6B</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>+</td><td></td></tr><tr><td>BIT 5,H</td><td>CB 6C</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>,</td><td></td></tr><tr><td>BIT 5,L</td><td>CB 6D</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>..</td><td></td></tr><tr><td>BIT 6,(HL)</td><td>CB 76</td><td>2</td><td>12</td><td>?</td><td>&lt;b&gt;?</td><td>.</td><td></td></tr><tr>&lt;<td>BIT 6,(IX+d)</td><td>CB DD 76 d</td><td>4</td><td>20</td><td>?</td><td>&lt;b&gt;?</td></tr><tr><td>BIT 6,(IY+d)</td><td>CB FD 76 d</td><td>4</td><td>20</td><td>?</td><td>&lt;b&gt;</td><td>-</td><td></td></tr><tr><td>BIT 6,A</td><td>CB 77</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>*</td><td></td></tr><tr><td>BIT 6,B</td><td>CB 70</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>**</td><td></td></tr><tr><td>BIT 6,C</td><td>CB 71</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>***</td><td></td></tr><tr><td>BIT 6,D</td><td>CB 72</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>****</td><td></td></tr><tr><td>BIT 6,E</td><td>CB 73</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>&lt;b&gt;</td><td></td></tr><tr><td>BIT 6,H</td><td>CB 74</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>`</td><td></td></tr><tr><td>BIT 6,L</td><td>CB 75</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>~</td><td></td></tr><tr><td>BIT 7,(HL)</td><td>CB 7E</td><td>2</td><td>12</td><td>?</td><td>&lt;b&gt;?</td></tr><tr><td>BIT 7,(IX+d)</td><td>CB DD 7E d</td><td>4</td><td>20</td><td>?</td><td>&lt;b&gt;?<td></td><td></td></td></tr><tr><td>BIT 7,(IY+d)</td><td>CB FD 7E d</td><td>4</td><td>20</td><td>?</td><td>&lt;b&gt;&lt;/b&gt;</td><td></td><td></td></tr><tr><td>BIT 7,A</td><td>CB 7F</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td></tr><tr><td>BIT 7,B</td><td>CB 78</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>^</td><td></td></tr><tr><td>BIT 7,C</td><td>CB 79</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td><td>_</td><td></td></tr><tr><td>BIT 7,D</td><td>CB 7A</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td></tr><td>BIT 7,E</td><td>CB 7B</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td></tr>&lt;<tr><td>BIT 7,H</td><td>CB 7C</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td></tr></tr><tr><td>BIT 7,L</td><td>CB 7D</td><td>2</td><td>8</td><td>?</td><td>&lt;b&gt;?</td></tr></table>

---

<!-- page 87 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>CALL p,addr</td><td>F4 dr ad</td><td>3</td><td>t17f10</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>CALL po,addr</td><td>E4 dr ad</td><td>3</td><td>t17f10</td><td>-</td><td>-</td></tr><tr><td>CALL pe,addr</td><td>EC dr ad</td><td>3</td><td>t17f10</td><td>-</td><td>-</td><td></td><td>-</td></tr><tr><td>CALL z,addr</td><td>CC dr ad</td><td>3</td><td>t17f10</td><td>-</td><td>-</td><td>x</td><td></td></tr><tr><td>CCF</td><td>3F</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>x</td></tr><tr><td>CP (HL)</td><td>BE</td><td>1</td><td>7</td><td>=7</td><td>=</td><td>v</td><td>&lt;</td></tr><tr><td>CP (IX+d)</td><td>DD BE d</td><td>3</td><td>19</td><td>=7</td><td>=</td><td>v</td><td>&lt;</td></tr><tr><td>CP(IY+d)</td><td>FD BE d</td><td>3</td><td>19</td><td>=7</td><td>=</td><td>v</td></tr><tr><td>CPA</td><td>BF</td><td>1</td><td>4</td><td>=7</td><td>=</td><td>v</td><td>&lt;</td></tr><tr><td>CPB</td><td>B8</td><td>1</td><td>4</td><td>=7</td><td>=</td><td>v</td><td>&lt;&gt;</td></tr><tr><td>CPC</td><td>B9</td><td>1</td><td>4</td><td>=7</td><td>=</td><td>v</td><td>&lt ;</td></tr><tr><td>CPD</td><td>BA</td><td>1</td><td>4</td><td>=7</td><td>=</td><td>v</td><td>&lt &gt;</td></tr><tr><td>CPE</td><td>BB</td><td>1</td><td>4</td><td>=7</td><td>=</td><td>v</td><td>&lt</td></tr><tr><td>CPH</td><td>BC</td><td>1</td><td>4</td><td>=7</td><td>=</td><td>v</td><td>&lt<br/></td></tr><tr><td>CP HIX</td><td>DD BC</td><td>2</td><td>8</td><td>=7</td><td>=</td><td>v</td><td>&lt;</td></tr><tr><td>CP HIY</td><td>FD BC</td><td>2</td><td>8</td><td>=7</td><td>=</td><td>v</td><td></td></tr><tr><td>CPL</td><td>BD</td><td>1</td><td>4</td><td>=7</td><td>=</td><td>v</td><td>c</td></tr><tr><td>CP LIX</td><td>DD BD</td><td>2</td><td>8</td><td>=7</td><td>=</td><td>v</td><td></td><td></td></tr><tr><td>CP LIY</td><td>FD BD</td><td>2</td><td>8</td><td>=7</td><td>=</td><td>v</td><td>&lt ;</td></tr><tr><td>CP n</td><td>FE n</td><td>2</td><td>7</td><td>=7</td><td>=</td><td>v</td><td></td></tr><tr><td>CPD</td><td>ED A9</td><td>2</td><td>16</td><td>?</td><td>= A</td><td>BC</td><td>-</td></tr><tr><td>CPDR</td><td>ED B9</td><td>2</td><td>=16#21</td><td>?</td><td>= A</td><td>BC</td><td>-</td></tr><tr><td>CPI</td><td>ED A1</td><td>2</td><td>16</td><td>?</td><td>= A</td><td>BC</td><td>-<td></td></td></tr><tr><td>CPIR</td><td>ED B2</td><td>2</td><td>=16#21</td><td>?</td><td>= A</td><td>BC<td>-</td></td></tr><tr><td>CPL</td><td>2F</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>DAA</td><td>27</td><td>1</td><td>4</td><td>7</td><td>z</td><td>p</td><td>c</td></tr><tr><td>DEC (HL)</td><td>35</td><td>1</td><td>11</td><td>7</td><td>z</td><td>v</td><td>-</td></tr><tr><td>DEC (IX+d)</td><td>DD 35 d</td><td>3</td><td>23</td><td>7</td><td>z</td><td>v</td><td>-</td></tr><tr><td>DEC (IY+d)</td><td>FD 35 d</td><td>3</td><td>23</td><td>7</td><td>z</td><td>v</td></tr><tr><td>DEC A</td><td>3D</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>-</td></tr><tr><td>DEC B</td><td>05</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>-</td><td></td></tr><tr><td>DEC BC</td><td>0B</td><td>1</td><td>6</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>DEC C</td><td>0D</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>-<td></td></td></tr><tr><td>DEC D</td><td>15</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>-</td>&gt;</tr><tr><td>DEC DE</td><td>1B</td><td>1</td><td>6</td><td>-</td><td>-</td><td>-</td><td>-<td></td></td></tr><tr><td>DEC E</td><td>1D</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>-&gt;</td></tr><tr><td>DEC H</td><td>25</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>-</td></td></tr><tr><td>DEC HIX</td><td>DD 25</td><td>2</td><td>8</td><td>7</td><td>z</td><td>v</td><td>-</td></tr></table>

---

<!-- page 88 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>DEC HIY</td><td>FD 25</td><td>2</td><td>8</td><td>7</td><td>z</td><td>v</td><td>-</td></tr><tr><td>DEC HL</td><td>2B</td><td>1</td><td>6</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>DEC IX</td><td>DD 2B</td><td>2</td><td>10</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>DEC IY</td><td>FD 2B</td><td>2</td><td>10</td><td>-</td><td>-</td><td>-</td></tr><tr><td>DEC L</td><td>2D</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>-</td></tr><tr><td>DEC LIX</td><td>DD 2D</td><td>2</td><td>8</td><td>7</td><td>z</td><td>v</td><td>-</td><td></td></tr><tr><td>DEC LIY</td><td>FD 2D</td><td>2</td><td>8</td><td>7</td><td>z</td><td>v</td></tr><tr><td>DEC SP</td><td>3B</td><td>1</td><td>6</td><td>-</td><td>-</td><td>-</td><td>-<td></td></td></tr><tr><td>DI</td><td>F3</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>DJNZ d</td><td>10 d</td><td>2</td><td>t13f8</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>EI</td><td>FB</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>EX (SP),HL</td><td>E3</td><td>1</td><td>19</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>EX(SP),IX</td><td>DD E3</td><td>2</td><td>23</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>EX SP),IY</td><td>FD E3</td><td>2</td><td>23</td><td>-</td><td>-</td><td>-</td><td></td><td></td></tr><tr><td>EX AF,AF'</td><td>08</td><td>1</td><td>4</td><td>s'</td><td>z'</td><td>p'</td><td>c'</td><td></td></tr><tr><td>EX DE,HL</td><td>EB</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td><tr><td>EXX</td><td>D9</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>HALT</td><td>76</td><td>1</td><td>min 4</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>IM 0</td><td>ED 46</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>IM 1</td><td>ED 56</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>IM 2</td><td>ED 5E</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>IN A,(C)</td><td>ED 78</td><td>2</td><td>12</td><td>7</td><td>z</td><td>p</td><td>0</td></tr><tr><td>IN A,(n)</td><td>DB n</td><td>2</td><td>11</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>IN B,(C)</td><td>ED 40</td><td>2</td><td>12</td><td>7</td><td>z</td><td>p</td><td>0</td><td></td></tr><tr><td>IN C,(C)</td><td>ED 48</td><td>2</td><td>12</td><td>7</td><td>z</td><td>p</td><td>0</td>-</tr><tr><td>IN D,(C)</td><td>ED 50</td><td>2</td><td>12</td><td>7</td><td>z</td><td>p</td><td>0</td>+</tr><tr><td>IN E,(C)</td><td>ED 58</td><td>2</td><td>12</td><td>7</td><td>z</td><td>p</td><td>0</td></td></tr><tr><td>IN H,(C)</td><td>ED 60</td><td>2</td><td>12</td><td>7</td><td>z</td><td>p</td><td>0</td><tr><td>IN L,(C)</td><td>ED 68</td><td>2</td><td>12</td><td>7</td><td>z</td><td>p</td><td>0</td>&lt; tr&gt;<td>INC (HL)</td><td>34</td><td>1</td><td>11</td><td>7</td><td>z</td><td>v</td><td>-</td><tr><td>INC (IX+d)</td><td>DD 34 d</td><td>3</td><td>23</td><td>7</td><td>z</td><td>v</td><td>-</td></tr><tr><td>INC (IY+d)</td><td>FD 34 d</td><td>3</td><td>23</td><td>7</td><td>z</td><td>v</td></tr><tr><td>INC A</td><td>3C</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>-</td><td></td></tr><tr><td>INC B</td><td>04</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>-</td>-</tr><tr><td>INC BC</td><td>03</td><td>1</td><td>6</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>INC C</td><td>0C</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>-<td></td></td></tr><tr><td>INC D</td><td>14</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>-</td><tr><td>INC DE</td><td>13</td><td>1</td><td>6</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr></tr></tr></table>

---

<!-- page 89 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>INC E</td><td>1C</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>-</td></tr><tr><td>INC H</td><td>24</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>-</td><td></td></tr><tr><td>INC HIX</td><td>DD 24</td><td>2</td><td>8</td><td>7</td><td>z</td><td>v</td><td>-</td><td></td></tr><tr><td>INC HIY</td><td>FD 24</td><td>2</td><td>8</td><td>7</td><td>z</td><td>v</td><td></td><td></td></tr><tr><td>INC HL</td><td>23</td><td>1</td><td>6</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>INC IX</td><td>DD 23</td><td>2</td><td>10</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>INC IY</td><td>FD 23</td><td>2</td><td>10</td><td>-</td><td>-</td><td>-</td><td></td><td></td></tr><tr><td>INC L</td><td>2C</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>-<td></td></td></tr><tr><td>INC LIX</td><td>DD 2C</td><td>2</td><td>8</td><td>7</td><td>z</td><td>v</td><td>-</td></tr><tr><td>INC LIY</td><td>FD 2C</td><td>2</td><td>8</td><td>7</td><td>z</td><td>v</td></tr><tr><td>INC SP</td><td>33</td><td>1</td><td>6</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>IND</td><td>ED AA</td><td>2</td><td>16</td><td>?</td><td>&lt;&gt;B</td><td>?</td><td>-</td></tr><tr><td>INDR</td><td>ED BA</td><td>2</td><td>z16nz21</td><td>?</td><td>1</td><td>?</td><td>-</td></tr><tr><td>INI</td><td>ED A2</td><td>2</td><td>16</td><td>?</td><td>&lt;&gt;B</td><td>?</td></tr><tr><td>INIR</td><td>ED B2</td><td>2</td><td>z16nz21</td><td>?</td><td>1</td><td>?<td>-</td></td></tr><tr><td>JP (HL)</td><td>E9</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>JP (IX)</td><td>DD E9</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>JP (IY)</td><td>FD E9</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>JP addr</td><td>C3 dr ad</td><td>3</td><td>10</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>JP c,addr</td><td>DA dr ad</td><td>3</td><td>10</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>JP m,addr</td><td>FA dr ad</td><td>3</td><td>10</td><td>-</td><td>-</td><td>-</td><td>(</td></tr><tr><td>JP nc,addr</td><td>D2 dr ad</td><td>3</td><td>10</td><td>-</td><td>-</td><td>-</td><td>(-</td></tr><tr><td>JP nz,addr</td><td>C2 dr ad</td><td>3</td><td>10</td><td>-</td><td>-</td><td>-</td></tr><tr><td>JP p,addr</td><td>F2 dr ad</td><td>3</td><td>10</td><td>-</td><td>-</td><td>-</td><tr><td>JP po,addr</td><td>E2 dr ad</td><td>3</td><td>10</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>JP pe,addr</td><td>EA dr ad</td><td>3</td><td>10</td><td>-</td><td>-</td><td>-</td></tr></tr></table>

---

<!-- page 90 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>LD (addr),IY</td><td>FD 22 dr ad</td><td>4</td><td>20</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD (addr),SP</td><td>ED 73 dr ad</td><td>4</td><td>20</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>LD (BC),A</td><td>02</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD (DE),A</td><td>12</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>LD (HL),A</td><td>77</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td><tr><td>LD (HL),A</td><td>77</td><td>1</td><td>7</td><td>-<td>-</td><td>-</td><td>-</td><td>-</td></td></tr><tr><td>LD (HL),B</td><td>70</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>LD (HL),C</td><td>71</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td>+</tr><tr><td>LD (HL),D</td><td>72</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td>
</tr><tr><td>LD (HL),E</td><td>73</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td>+
</tr><tr><td>LD (HL),H</td><td>74</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td>-
</tr><tr><td>LD (HL),L</td><td>75</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td>.
</tr><tr><td>LD (HL),n</td><td>36 n</td><td>2</td><td>10</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD (IX+d),A</td><td>DD 77 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD (IX+),B</td><td>DD 70 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td><td>-<td>-</td></td></tr><tr><td>LD (IX+d),C</td><td>DD 71 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td><td>- -</td></tr><tr><td>LD (IX+d),D</td><td>DD 72 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td><td>- +</td></tr><tr><td>LD (IX+d),E</td><td>DD 73 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td><td>- </td></tr><tr><td>LD (IX+d),H</td><td>DD 71 d</td><td>3</td><td>19</td><td>-</td><td>-</td></tr><tr><td>LD (IX+d),L</td><td>DD 75 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td><td>- <br/> -</td></tr><tr><td>LD (IX+d),n</td><td>DD 36 d n</td><td>4</td><td>19</td><td>-</td><td>-</td><td>-</td><td>- <br/> -<br/> -</td></tr><tr><td>LD (IY+d),A</td><td>FD 77 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD (IY+d),B</td><td>FD 70 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td></tr><tr>LD (IY+d),C<td>FD 71 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td></tr><tr>ld (IY+d),D<td>FD 72 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td></tr><tr></tr><tr><td>LD (IY+d),E</td><td>FD 73 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td></tr><tr> LD (IY+d),H<td>FD 74 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td></tr><tr>
LD (IY+d),L<td>FD 75 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td></tr><tr><br/>LD (IY+d),n<td>FD 36 d n</td><td>4</td><td>19</td><td>-</td><td>-</td><td>-<td>-</td></td></tr><tr><td>LD A,(addr)</td><td>3A dr ad</td><td>3</td><td>13</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD A,(BC)</td><td>0A</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td>&gt;</tr><tr><td>LD A,(DE)</td><td>1A</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-<br/> -</td></tr><tr><td>LD A,(HL)</td><td>7E</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td>&lt; hr&gt;</tr><tr><td>LD A,(HL)</td><td>7E</td><td>1</td><td>7</td></tr><tr><td>LD A,(IX+d)</td><td>DD 7E d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td><td>-<br/> -</td></tr><tr>LD A,(IY+d)<td>FD 7E d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-<td>-</td></td></tr><tr><td>LDA,A</td><td>7F</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD A,B</td><td>78</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr></table>

---

<!-- page 91 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>LD A,C</td><td>79</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD A,D</td><td>7A</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>LD A,E</td><td>7B</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td><tr><td>LD A,H</td><td>7C</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>LD A,HIX</td><td>DD 7C</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD A,HIY</td><td>FD 7C</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD A,I</td><td>ED 57</td><td>2</td><td>9</td><td>7</td><td>z</td><td>i</td><td>0</td></tr><tr><td>LD A,L</td><td>7D</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>&gt;</tr><tr><td>LD A,LIX</td><td>DD 7D</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>LD A,LIY</td><td>FD 7D</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LDA,n</td><td>3E n</td><td>2</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD A,R</td><td>ED 5F</td><td>2</td><td>9</td><td>7</td><td>z</td><td>i</td><td>0</td><td></td></tr><tr><td>LD B,(HL)</td><td>46</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LDB,(IX+d)</td><td>DD 46 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD B,(IY+d)</td><td>FD 46 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD B,A</td><td>47</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>
</tr><tr><td>LD B,B</td><td>40</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td></td></tr><tr><td>LD B,C</td><td>41</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>LD B,D</td><td>42</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>r</tr><tr><td>LD B,E</td><td>43</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>s</tr><tr><td>LD B,H</td><td>44</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>u</tr><tr><td>LD B,HIX</td><td>DD 44</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>LD B,HIY</td><td>FD 44</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>LD B,L</td><td>45</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>d</tr><tr><td>LD B,LIX</td><td>DD 45</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>r</tr><tr><td>LD B,LIY</td><td>FD 45</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td></td></tr><td>LD B,n</td><td>06 n</td><td>2</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-<br/>-</td><tr><td>LD BC,(addr)</td><td>ED 4B dr ad</td><td>4</td><td>20</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD BC,hilo</td><td>01 lo hi</td><td>3</td><td>10</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD C,(HL)</td><td>4E</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>LD C,(IX+d)</td><td>DD 4E d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td><td>-<br/>-</td></tr><tr><td>LD C,(IY+d)</td><td>DD 4E d</td><td>3</td><td>19</td><td>-</td></tr><tr><td>LD C,A</td><td>4F</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>p</tr><tr><td>LD C,B</td><td>48</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>q</tr><tr><td>LD C,C</td><td>49</td><td>1</td><td>1</td><td>-</td><td>-</td><td>-</td><td>-</td>r</tr><tr><td>LD C,D</td><td>4A</td><td>1</td><td>1</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>LD C,E</td><td>4B</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-<br/>-</td></tr><tr><tr><td>LD C,H</td><td>4C</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-<td colspan="2">-</td></tr></tr></tr></tr></table>

---

<!-- page 92 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>LD C,HIX</td><td>DD 4C</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD C,HIY</td><td>FD 4C</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD C,L</td><td>4D</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD C,LIX</td><td>DD 4D</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>LD C,LIY</td><td>FD 4D</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LDC,n</td><td>0E n</td><td>2</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD D,(HL)</td><td>56</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LDD,(IX+d)</td><td>DD 56 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LDD,(IY+d)</td><td>FD 56 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD D,A</td><td>57</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>LD D,B</td><td>50</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td><tr><td>LD D,C</td><td>51</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>LD D,D</td><td>52</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>&gt;</tr><tr><td>LD D,E</td><td>53</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>&lt; tr&gt;<td>LD D,H</td><td>54</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td></td></tr><tr><td>LD D,HIX</td><td>DD 54</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>LD D,HIY</td><td>FD 54</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>LD D,L</td><td>55</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>LD D,LIX</td><td>DD 55</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>LD D,LIY</td><td>FD 55</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td></td></tr><td>LD D,n</td><td>16 n</td><td>2</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-<td>-</td><tr><td>LD DE,(addr)</td><td>ED 5B dr ad</td><td>4</td><td>20</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD DE,hilo</td><td>11 lo hi</td><td>3</td><td>10</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD E,(HL)</td><td>5E</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>LD E,(IX+d)</td><td>DD 5E d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td><td>-<td>-</td></td></tr><tr><td>LD E,(IY+d)</td><td>FD 5E d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-<td>-</td></td></tr><tr><td>LD E,A</td><td>5F</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>r</tr><tr><td>LD E,B</td><td>58</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>s</tr><tr><td>LD E,C</td><td>59</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>u</tr><tr><td>LD E,D</td><td>5A</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>d</tr><tr><td>LD E,E</td><td>5B</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>i</tr><tr><td>LD E,H</td><td>5C</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>p</tr><tr><td>LD E,HIX</td><td>DD 5C</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-<td>-</td></td></tr><tr><td>LDE,HIY</td><td>FD 5C</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td></tr><tr>LD E,L<td>5D</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-<td>-</td></td></tr><tr><td></td><td>LD E,LIX</td><td>DD 5D</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td></tr><tr>LD ELIY<td>FD 5D</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-<td></td></tr><tr><td>LD E,n</td><td>1E n</td><td>2</td><td>7</td><td>-</td><td>-</td><td>-</td><td></td></tr></table>

---

<!-- page 93 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>LD H<sub>1</sub>(HL)</td><td>66</td><td>1</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD H<sub>1</sub>(IX+d)</td><td>DD 66 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD H<sup>1</sup>(IY+d)</td><td>FD 66 d</td><td>3</td><td>19</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD H<sub>2</sub>A</td><td>67</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD H<u>2</u>B</td><td>60</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>LD H<sub>3</sub>C</td><td>61</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td><tr><td>LD H<sub>4</sub>D</td><td>62</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>LD H<sub>5</sub>E</td><td>63</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td></td></tr><tr><td>LD H<sub>6</sub>H</td><td>64</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>LD H<sub>7</sub>L</td><td>65</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>r</tr><tr><td>LD H<sub>8</sub>n</td><td>26 n</td><td>2</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LDIHX,A</td><td>DD 67</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD HIX,B</td><td>DD 60</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>LD HIX,C</td><td>DD 61</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>LD HIX,D</td><td>DD 62</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>r</tr><tr><td>LD HIX,E</td><td>DD 63</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>s</tr><tr><td>LD HIX,HIX</td><td>DD 64</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>LDHIX,LIX</td><td>DD 65</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><tr><td>LD HIX,n</td><td>DD 26 n</td><td>3</td><td>11</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD HIY,A</td><td>FD 67</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>LD HIY,B</td><td>FD 60</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td></td></tr><td>LD HIY,C</td><td>FD 61</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td></td><tr><td>LD HIY,D</td><td>FD 62</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td></td></tr></tr></tr></tr></table>

---

<!-- page 94 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>LD L,A</td><td>6F</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD L,B</td><td>68</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>LD L,C</td><td>69</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td><tr><td>LD L,D</td><td>6A</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>LD L,E</td><td>6B</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>
</tr><tr><td>LD L,H</td><td>6C</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td></td></tr><tr><td>LD L,L</td><td>6D</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>LD L,n</td><td>2E n</td><td>2</td><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD LIX,A</td><td>DD 6F</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD LIX,B</td><td>DD 68</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>LD LIX,C</td><td>DD 69</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>LD LIX,D</td><td>DD 6A</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>LD LX,E</td><td>DD 6B</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><tr><td>LD LIX,HIX</td><td>DD 6C</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>
</tr><tr><td>LD LIX,LIX</td><td>DD 6D</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><tfoot><tr><td>LD LIX,n</td><td>DD 2E n</td><td>3</td><td>11</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD LIX, A</td><td>FD 6F</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LD LIX,B</td><td>FD 68</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>LD LIX,C</td><td>FD 69</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td></td></tr><td>LD LIX,D</td><td>FD 6A</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td></tr><tr><td>LDLIX,E</td><td>FD 6B</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td></tr><tr><td>DL LIX, HIX</td><td>FD 6C</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td></tr><tr><td>DD 6E</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></td></tr><tr><td>DD 6F</td><td>2</td><td>8</td><td>-</td><td>-</td><td></td><td>-</td></tr><tr><td>DD 6G</td><td>2</td><td>8</td><td>-</td><td>-</td><td></td><td>-</td></tr><td>DD 6H</td><td>2</td><td>8</td><td>-</td><td>-</td><td></td><td>-</td></tr></tfoot></tr></tr></table>

---

<!-- page 95 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>OR (IY+d)</td><td>FD B6 d</td><td>3</td><td>19</td><td>7</td><td>z</td><td>p</td><td>0</td></tr><tr><td>ORA</td><td>B7</td><td>1</td><td>4</td><td>7</td><td>z</td><td>p</td><td>0</td></tr><tr><td>OR B</td><td>B0</td><td>1</td><td>4</td><td>7</td><td>z</td><td>p</td><td>0</td><td></td></tr><tr><td>OR C</td><td>B1</td><td>1</td><td>4</td><td>7</td><td>z</td><td>p</td><td>0</td><tr><td>ORD</td><td>B2</td><td>1</td><td>4</td><td>7</td><td>z</td><td>p</td><td>0</td></td></tr><tr><td>ORE</td><td>B3</td><td>1</td><td>4</td><td>7</td><td>z</td><td>p</td><td>0</td>&lt; tr&gt;<td>OR H</td><td>B4</td><td>1</td><td>4</td><td>7</td><td>z</td><td>p</td><td>0</td></table>

---

<!-- page 96 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>RES 0,(I×+d)</td><td>DD CB d 86</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>RES 0,(IY+d)</td><td>FD CB d 86</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-<td>-</td></td></tr><tr><td>RES 0,A</td><td>CB 87</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>RES 0,B</td><td>CB 80</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>RES 0,C</td><td>CB 81</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>RES 0,D</td><td>CB 82</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><tr><td>RES 0,E</td><td>CB 83</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></td></tr><tr><td>RES 0,H</td><td>CB 81</td><td>2</td><td>8</td><td>-</td><td>-</td><td></td><td>-</td></tr><tr><td>RES 0,L</td><td>CB 85</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>&gt;</tr><tr><td>RES 1,(HL)</td><td>CB 8E</td><td>2</td><td>15</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>RES 1,(I×+d)</td><td>DD CB d 8E</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td></td><td>FD CB d 8E</td><td>4</td><td>23</td><td>-</td><td>-</td><td></td><td>-</td><td>-</td></tr><tr><td>RES 1,(IY+d)</td><td>CB 8F</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>&lt;<td>-</td></tr><tr><td>RES 1,A</td><td>CB 8F</td><td>2</td><td>8</td><td>-</td><td>-</td></tr><tr><td>RES 1,B</td><td>CB 88</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>
-</tr><tr><td>RES 1,C</td><td>CB 89</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><br/>-</tr><tr><td>RES 1,D</td><td>CB 8A</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td> -</tr><tr><td>RES 1,E</td><td>CB 8B</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>+</tr><tr><td>RES 1,H</td><td>CB 8C</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td> &lt;</tr><tr><td>RES 1,L</td><td>CB 8D</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td> +</tr><tr><td>RES 2,(HL)</td><td>CB 96</td><td>2</td><td>15</td><td>-</td><td>-</td><td>-</td><td>-</td>&lt;</tr><tr><td>RES 2,(I×+d)</td><td>DD CB d 96</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td><td>-</td>&lt;</tr><tr><td>RES2,(IY+d)</td><td>FD CB d 96</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-<td>-</td></td><tr><td>RES 2,A</td><td>CB 97</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>RES 2,B</td><td>CB 90</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>r</tr><tr><td>RES 2,C</td><td>CB 91</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>s</tr><tr><td>RES 2,D</td><td>CB 92</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>u</tr><tr><td>RES 2,E</td><td>CB 93</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>x</tr><tr><td>RES 2,H</td><td>CB 94</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>z</tr><tr><td>RES 2,L</td><td>CB 95</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>y</tr><tr><td>RES 3,(HL)</td><td>CB 9E</td><td>2</td><td>15</td><td>-</td><td>-</td><td>-</td><td>-&gt;</td></tr><tr><td>RES 3,(I×+d)</td><td>DD CB d 9E</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td><td>-&gt;</td></tr><tr><td></td><td>FD CB d 9E</td><td>4</td><td>23</td><td>-</td><td>-</td><td></td><td>-</td></tr><tr><td>RES 3,A</td><td>CB 9F</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-&gt;</td></tr><tr><td>&lt;fcel&gt;</td><td>&lt;fcel&gt;</td><td>&lt;fcel&gt;</td><td>&lt;ecel&gt;</td><td></td><td></td><td></td><td></td></tr><tr><td>&lt;fcel&gt;</td><td>&lt;fcel&gt;</td>&lt;fcel&gt;</td><td>&lt;fcel&gt;</td><td>&lt;fCEL&gt;</td><td></td><td></td><td></td><td></td></tr><tr><td>&lt;fcel&gt;&lt;fcel&gt;</td><td>&lt;fcel&gt;</td>&lt;fcel&gt;&lt;fcel&gt;</td><td>&lt;fcel&gt;&lt;fcel&gt;</td><td>&lt;fcel&lt;fcel&gt;</td><td></td><td></td><td></td><td></td></tr><tr><td>&lt;fcel&gt;;</td><td>&lt;fcel&gt;;</td>&lt;fcel&gt;;</td><td>&lt;fcel&gt;;</td><td>&lt;fcel&gt;;</td><td></td><td></td><td></td><td></td></tr><tr><td>&lt;fcel&gt;</td>&lt;fcel&gt;;</td>&lt;fcel&gt;;</td><td>&lt;fcel&lt;fcel&gt;;</td><td>&lt;fcel&gt;;</td><td></td><td></td></tr><tr><td>&lt;fcel&gt;</td>&lt;fcel&lt;fcel&gt;;</td>&lt;fcel&gt;;</td><td>&lt;fcel</td><td>&lt;fcel&gt;;</td><td></td><td></td><td></td><td></td></tr><tr></tr></table>

---

<!-- page 97 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>RES 3,L</td><td>CB 9D</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>RES 4,(HL)</td><td>CB A6</td><td>2</td><td>15</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>RES 4, (IX+d)</td><td>DD CB d A6</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>RES 4,IY+d)</td><td>FD CB d A6</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-<td>-</td></td></tr><tr><td>RES 4,A</td><td>CB A7</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>RES 4,B</td><td>CB A0</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><tr><td>RES 4,C</td><td>CB A1</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>RES 4,D</td><td>CB A2</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>
</tr><tr><td>RES 4,E</td><td>CB A3</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>&gt;</tr><tr><td>RES 4,H</td><td>CB A4</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>RES 4,L</td><td>CB A5</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>r</tr><tr><td>RES 5,(HL)</td><td>CB AE</td><td>2</td><td>15</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>RES 5,(IX+d)</td><td>DD CB d AE</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>RES 6,(HL)</td><td>CB B6</td><td>2</td><td>15</td><td>-</td><td>-</td><td>-</td><td>-<td></td></tr><tr><td>RES 6,(IX+d)</td><td>DD CB d B6</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td><td>-<td></td></tr><tr><td>RES 7,(HL)</td><td>CB BE</td><td>2</td><td>15</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>RES7,(IX+d)</td><td>DD CB d BE</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>RES8,(HL)</td><td>CB B7</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-<td></td></tr><tr><td>RES8,B</td><td>CB B0</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-<td>-</td></td></tr><tr><td>RES8,C</td><td>CB B1</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-<td>+</td></td></tr><tr><td>RES8,D</td><td>CB B2</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-<td>++</td></td></tr><tr><td>RES8,E</td><td>CB B3</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-<td>+-</td></td></tr><tr><td>RES8,H</td><td>CB B4</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-<td>--</td></td></tr><tr><td>RES8,L</td><td>CB B5</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-<td>---</td></td></tr><tr><td>RES8,(HL)</td><td>CB BE</td><td>2</td><td>15</td><td>-</td><td>-<td>-</td><td>-</td><td>-</td></td></tr><tr><td>RES8,(IX+d)</td><td>DD CB d BE</td><td>4</td><td>23</td><td>-<td>-</td><td>-</td><td>-</td><td>-</td></td></tr><tr><td>RES8,(IY+d)</td><td>FD CB d BE</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td></tr><tr><td>RES8,A</td><td>CB BF</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>&lt; tr&gt;<td>RES8,B</td><td>CB B8</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></td></tr><tr><td>RES8,C</td><td>CB B9</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><br/>-</tr><tr><td>RES8,D</td><td>CB BA</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></table>

---

<!-- page 98 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>RES 7,E</td><td>CB BB</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>RES 7,H</td><td>CB BC</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>RES 7,L</td><td>CB BD</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><tr><td>RET</td><td>C9</td><td>1</td><td>10</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>RET C</td><td>D8</td><td>1</td><td>t11f8</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>RET M</td><td>F8</td><td>1</td><td>t11f8</td><td>-</td><td>-</td><td>-<td>-</td></td></tr><tr><td>RET NC</td><td>D0</td><td>1</td><td>t11f8</td><td>-</td><td>-</td><td>-</td></tr><tr><td>RET NZ</td><td>C0</td><td>1</td><td>t11f8</td><td>-</td><td>-</td><td>-<td></td></td></tr><tr><td>RET P</td><td>F0</td><td>1</td><td>t11f8</td><td>-</td><td>-</td><td>- <td></td></td></tr><tr><td>RET PE</td><td>E8</td><td>1</td><td>t11f8</td><td>-</td><td>-</td><td>- </tr><tr><td>RET PO</td><td>E0</td><td>1</td><td>t11f8</td><td>-</td><td>-</td><td>- -</td></tr><tr><td>RET Z</td><td>C8</td><td>1</td><td>t11f8</td><td>-</td><td>-</td><td>- - <td></td></td></tr><tr><td>RETI</td><td>ED 4D</td><td>2</td><td>14</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>RETN</td><td>ED 45</td><td>2</td><td>14</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>RL (HL)</td><td>CB 16</td><td>2</td><td>15</td><td>7</td><td>z</td><td>p</td><td>r7</td></tr><tr><td>RL (IX+d)</td><td>DD CB d 16</td><td>4</td><td>23</td><td>7</td><td>z</td><td>p</td><td>r7</td></tr><tr><td>RL (IY+d)</td><td>FD CB d 16</td><td>4</td><td>23</td><td>7</td><td>z</td><td>p<td>r7</td></td></tr><tr><td>RL A</td><td>CB 17</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7</td></tr><tr><td>RL B</td><td>CB 10</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7 <td></td></td></tr><tr><td>RL C</td><td>CB 11</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7 -</td></tr><tr><td>RL D</td><td>CB 12</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7-</td></tr><tr><td>RL E</td><td>CB 13</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7 +</td></tr><tr><td>RL H</td><td>CB 14</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7 &amp;</td></tr><tr><td>RL L</td><td>CB 15</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7.</td></tr><tr><td>RLA</td><td>17</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>r7</td></tr><tr><td>RLC (HL)</td><td>CB 06</td><td>2</td><td>15</td><td>7</td><td>z</td><td>p</td><td>r7.</td></tr><tr><td>RLC (IX+d)</td><td>DD CB d 06</td><td>4</td><td>23</td><td>7</td><td>z</td><td>p</td><td>r7.</td></tr><tr><td>Rlc (IY+d)</td><td>FD CB d 06</td><td>4</td><td>23</td><td>7</td><td>z</td><td>p<td>r7</td><td></td></td></tr><tr><td>RLC A</td><td>CB 07</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7 .</td></tr><tr><td>RLC B</td><td>CB 00</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7..</td></tr><tr><td>RLC C</td><td>CB 01</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7 ..</td></tr><tr><td>RLC D</td><td>CB 02</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7...</td></tr><tr><td>RLC E</td><td>CB 03</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7 ...</td></tr><tr><td>RLC H</td><td>CB 04</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7 r</td></tr><tr><td>RLC L</td><td>CB 05</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7 t</td></tr><tr><td>RLCA</td><td>07</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>r7 .</td></tr><tr><td>RLD</td><td>ED 6F</td><td>2</td><td>18</td><td>7</td><td>z</td><td>p</td><td>-</td></tr><tr><td>RR (HL)</td><td>CB 1E</td><td>2</td><td>15</td><td>7</td><td>z</td><td>p</td><td>r0</td></tr></table>

---

<!-- page 99 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>RR (IX+d)</td><td>DD CB d 1E</td><td>4</td><td>23</td><td>7</td><td>z</td><td>p</td><td>r0</td></tr><tr><td>RR (IY+d)</td><td>FD CB d 1E</td><td>4</td><td>23</td><td>7</td><td>z</td><td>P</td><td>r0</td></tr><tr><td>RR A</td><td>CB 1F</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r0</td></tr><tr><td>RR B</td><td>CB 18</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r0<br/>r0</td></tr><tr><td>RR C</td><td>CB 19</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r0 r0</td></tr><tr><td>RR D</td><td>CB 1A</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r0 0</td></tr><tr><td>RR E</td><td>CB 1B</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r0r0</td></tr><tr><td>RR H</td><td>CB 1C</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r0.0</td></tr><tr><td>RR L</td><td>CB 1D</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r0 .0</td></tr><tr><td>RRA</td><td>1F</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>r0</td></tr><tr><td>RRC (HL)</td><td>CB 0E</td><td>2</td><td>15</td><td>7</td><td>z</td><td>p</td><td>r0 .0</td></tr><tr><td>RRC (IX+d)</td><td>DD CB d 0E</td><td>4</td><td>23</td><td>7</td><td>z</td><td>p</td><td>r1</td></tr><tr><td>RRC (IY+d)</td><td>FD CB d 0E</td><td>4</td><td>23</td><td>7</td><td>z</td><td>P</td><td>r1</td></tr><tr><td>RRC A</td><td>CB 0F</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r1 .0</td></tr><tr><td>RRC B</td><td>CB 08</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r1.0</td></tr><tr><td>RRC C</td><td>CB 09</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r1 0</td></tr><tr><td>RRC D</td><td>CB 0A</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r1 r0</td></tr><tr><td>RRC E</td><td>CB 0B</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r1r0</td></tr><tr><td>RRC H</td><td>CB 0C</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r1</td></tr><tr><td>RRC L</td><td>CB 0D</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r1,0</td></tr><tr><td>RRCA</td><td>0F</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>r1</td></tr><tr><td>RRD</td><td>ED 67</td><td>2</td><td>18</td><td>7</td><td>z</td><td>p</td><td>-</td></tr><tr><td>RST 0</td><td>C7</td><td>1</td><td>11</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>RST 1,addr</td><td>CF dr ad</td><td>3</td><td>(11)</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>RST 2,addr</td><td>D7 dr ad</td><td>3</td><td>(11)</td><td>-</td><td>-</td><td>-<td>-</td></td></tr><tr><td>RST 3,addr</td><td>DF dr ad</td><td>3</td><td>(11)</td><td>-</td><td>-</td><td>- <td>-</td></td></tr><tr><td>RST 4</td><td>E7</td><td>1</td><td>11</td><td>-</td><td>-</td><td>-</td><td>- <td>-</td></td></tr><tr><td>RST5,addr</td><td>EF dr ad</td><td>3</td><td>(11)</td><td>-</td><td>-</td><td>- -</td><td>-</td></tr><tr><td>RST 6</td><td>F7</td><td>1</td><td>11</td><td>-</td><td>-</td><td>-</td><td>- -</td></tr><tr><td>RST 7</td><td>FF</td><td>1</td><td>11</td><td>-</td><td>-</td><td>-</td><td>- - <td>-</td></td></tr><tr><td>SBC A,(HL)</td><td>9E</td><td>1</td><td>7</td><td>7</td><td>z</td><td>v</td><td>b</td></tr><tr><td>SBC A,(IX+d)</td><td>DD 9E d</td><td>3</td><td>19</td><td>7</td><td>z</td><td>v</td><td>b</td></tr><tr><td>SBC A, (IY+d)</td><td>FD 9E d</td><td>3</td><td>19</td><td>7</td><td>z</td><td>v<td>b</td></td></tr><tr><td>SBC A,A</td><td>9F</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>b</td></tr><tr><td>SBC A,B</td><td>98</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>b</td><td></td></tr><tr><td>SBC A,C</td><td>99</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>b</td><tr><td>SBC A,D</td><td>9A</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>b</td></td></tr><tr><td>SBC A,E</td><td>9B</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>b</td>-</tr></tr></table>

---

<!-- page 100 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>SBC A,H</td><td>9C</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>b</td></tr><tr><td>SBC A,HIX</td><td>DD 9C</td><td>2</td><td>8</td><td>7</td><td>z</td><td>v</td><td>b</td></tr><tr><td>SBC A,HIY</td><td>FD 9C</td><td>2</td><td>8</td><td>7</td><td>z</td><td>v</td></tr><tr><td>SBC A,L</td><td>9D</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>b</td><td></td></tr><tr><td>SBC A,LIX</td><td>DD 9D</td><td>2</td><td>8</td><td>7</td><td>z</td><td>v</td><td>b</td><td></td></tr><tr><td>SCC A,LIY</td><td>FD 9D</td><td>2</td><td>8</td><td>7</td><td>z</td><td>v</td></tr><tr><td>SBCH,LBC</td><td>DE n</td><td>2</td><td>7</td><td>7</td><td>z</td><td>v</td><td>b</td><td></td></tr><tr><td>SBCH,LD,DE</td><td>ED 42</td><td>2</td><td>15</td><td>15</td><td>z</td><td>v</td><td>b</td><td></td></tr><tr><td>SBCH,HL,LD</td><td>ED 52</td><td>2</td><td>15</td><td>15</td><td>z</td><td>v</td><td>b</td></tr><tr><td>SBCH,HL,SP</td><td>ED 72</td><td>2</td><td>15</td><td>15</td><td>z</td><td>v</td><td>b</td><tr><td>SCF</td><td>37</td><td>1</td><td>4</td><td>-</td><td>-</td><td>-</td><td>1</td></tr><tr><td>SET 0,(HL)</td><td>CB C6</td><td>2</td><td>15</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>SET 0,(IX+d)</td><td>DD CB d C6</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>SET 0, (IY+d)</td><td>FD CB d C6</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-<td>-</td></td></tr><tr><td>SET 0,A</td><td>CB C7</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>SET 0,B</td><td>CB C0</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>SET 0,C</td><td>CB C1</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>SET 0,D</td><td>CB C2</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><tr><td>SET 0,E</td><td>CB C3</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></td></tr><tr><td>SET 0,H</td><td>CB C4</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>
</tr><tr><td>SET 0,L</td><td>CB C5</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>&gt;</tr><tr><td>SET 1,(HL)</td><td>CB CE</td><td>2</td><td>15</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>SET1,(IX+d)</td><td>DD CB d CE</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>SET</td><td>1,(IY+d)</td><td>FD CB d CE</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td></tr><tr><td>SET 1,A</td><td>CB CF</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>&lt;</tr><tr><td>SET 1,B</td><td>CB C8</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>SET 1,C</td><td>CB C9</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>r</tr><tr><td>SET 1,D</td><td>CB CA</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>s</tr><tr><td>SET 1,E</td><td>CB CB</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>u</tr><tr><td>SET 1,H</td><td>CB CC</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>x</tr><tr><td>SET 1,L</td><td>CB CD</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>z</tr><tr><td>SET 2,(HL)</td><td>CB D6</td><td>2</td><td>15</td><td>-</td><td>-</td><td>-</td><td>-<td></td></tr><tr><td>SET 2,(IX+d)</td><td>DD CB d D6</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td><td>-<td></td></tr><tr><td>SET 1,(IY+d)</td><td>FD CB d D6</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-<td>-</td><td></td></td></tr><tr><td>SET 2,A</td><td>CB D7</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-<td></td></tr><tr><td>SET 3,B</td><td>CB D0</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-<td>-</td></td></tr><tr><td>SET 2,C</td><td>CB D1</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-<td><td></td></td></tr></tr></tr></tr></table>

---

<!-- page 101 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>SET 2,D</td><td>CB D2</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>SET 2,E</td><td>CB D3</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>SET 2,H</td><td>CB D4</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><tr><td>SET 2,L</td><td>CB D5</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>SET 3,(HL)</td><td>CB DE</td><td>2</td><td>15</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>SET 3,(IX+d)</td><td>DD CB d DE</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>SET 3, (IY+d)</td><td>FD CB d DE</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td></tr><tr><td>SET 3,A</td><td>CB DF</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>
</tr><tr><td>SET 3,B</td><td>CB D8</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>&gt;</tr><tr><td>SET 3,C</td><td>CB D9</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>&lt; tr&gt;<td>SET 3,D</td><td>CB DA</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></td></tr><tr><td>SET 3,E</td><td>CB DB</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>SET 3,H</td><td>CB DC</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>r</tr><tr><td>SET 3,L</td><td>CB DD</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>s</tr><tr><td>SET 4,(HL)</td><td>CB E6</td><td>2</td><td>15</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>SET 4,(IX+d)</td><td>DD CB d E6</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td><td>-</td>t</tr><tr><td>SET 5,(HL)</td><td>CB EE</td><td>2</td><td>15</td><td>-</td><td>-</td><td>-</td><td>-</td>r</tr><tr><td>SET 5,D</td><td>CB EA</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>u</tr><tr><td>SET 5,E</td><td>CB EB</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>x</tr><tr><td>SET 5,H</td><td>CB EC</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>y</tr><tr><td>SET 5,L</td><td>CB ED</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>z</tr><tr><td>SET 6,(HL)</td><td>CB F6</td><td>2</td><td>15</td><td>-</td><td>-</td><td>-</td><td>-<br/>-</td></tr><tr><td>SET 6,(IX+d)</td><td>DD CB d F6</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td><td>-<br/>-</td></tr><tr><td rowspan="2">SET 6,(IY+d)</td><td rowspan="2">FD CB d F6</td><td rowspan="2">4</td><td rowspan="2">23</td><td rowspan="2">-</td><td rowspan="2">-</td><td rowspan="2">-</td><td rowSpan="2">-</td></tr><tr><td>-</td></tr><tr><td>SET 6,A</td><td>CB F7</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>p</tr></table>

---

<!-- page 102 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>SET 6,B</td><td>CB F0</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>SET 6,C</td><td>CB F1</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td></td></tr><tr><td>SET 6,D</td><td>CB F2</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><tr><td>SET 6,E</td><td>CB F3</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>-</tr><tr><td>SET 6,H</td><td>CB F4</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>+</tr><tr><td>SET 6,L</td><td>CB F5</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>
</tr><tr><td>SET 7,(HL)</td><td>CB FE</td><td>2</td><td>15</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>SET 7,(IX+d)</td><td>DD CB d FE</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>SET 7, (IY+d)</td><td>FD CB d FE</td><td>4</td><td>23</td><td>-</td><td>-</td><td>-</td></tr><tr><td>SET 7,A</td><td>CB FF</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>+
</tr><tr><td>SET 7,B</td><td>CB F8</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>-
</tr><tr><td>SET 7,C</td><td>CB F9</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>+

<tr><td>SET 7,D</td><td>CB FA</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>

<tr><td>SET 7,E</td><td>CB FB</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>t
</tr><tr><td>SET 7,H</td><td>CB FC</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>r
</tr><tr><td>SET 7,L</td><td>CB FD</td><td>2</td><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td>s
</tr><tr><td>SLA (HL)</td><td>CB 26</td><td>2</td><td>15</td><td>7</td><td>z</td><td>p</td><td>r7</td></tr><tr><td>SLA (IX+d)</td><td>DD CB d 26</td><td>4</td><td>23</td><td>7</td><td>z</td><td>p</td><td>r7</td></tr><tr><td>SLA(IY+d)</td><td>FD CB d 26</td><td>4</td><td>23</td><td>7</td><td>z</td><td>p<td>r7</td></td></tr><tr><td>SLA A</td><td>CB 27</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7</td></tr><tr><td>SLA B</td><td>CB 20</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7<td></td></td></tr><tr><td>SLA C</td><td>CB 21</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7<br/>r7</td></tr><tr><td>SLA D</td><td>CB 22</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7r7</td></tr><tr><td>SLA E</td><td>CB 23</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7t</td></tr><tr><td>SLA H</td><td>CB 24</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7s</td></tr><tr><td>SLA L</td><td>CB 25</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7u</td></tr><tr><td>SLL (HL)</td><td>CB 36</td><td>2</td><td>15</td><td>7</td><td>z</td><td>p</td><td>r7v</td></tr><tr><td>SLL (IX+d)</td><td>DD CB d 36</td><td>4</td><td>23</td><td>7</td><td>z</td><td>p</td><td>r7w</td></tr><tr><td>SLL (IY+d)</td><td>FD CB d 36</td><td>4</td><td>23</td><td>7</td><td>z</td><td>p<td>r7x</td></td></tr><tr><td>SLL A</td><td>CB 37</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7y</td></tr><tr><td>SLL B</td><td>CB 30</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7z</td></tr><tr><td>SLL C</td><td>CB 31</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7a</td></tr><tr><td>SLL D</td><td>CB 32</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7b</td></tr><tr><td>SLL E</td><td>CB 33</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7c</td></tr><tr><td>SLL H</td><td>CB 34</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7d</td></tr><tr><td>SLL L</td><td>CB 35</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r7e</td></tr><tr><td>SRA (HL)</td><td>CB 2E</td><td>2</td><td>15</td><td>7</td><td>z</td><td>p</td><td>r0</td></tr><tr><td>SRA (IX+d)</td><td>DD CB d 2E</td><td>4</td><td>23</td><td>7</td><td>z</td><td>p</td><td>r0</td></tr></tr></table>

---

<!-- page 103 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>SRA (IY+d)</td><td>FD CB d 2E</td><td>4</td><td>23</td><td>7</td><td>z</td><td>p</td><td>r0</td></tr><tr><td>SRA A</td><td>CB 2F</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r0</td></tr><tr><td>SRA B</td><td>CB 28</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r0<br/>r0</td></tr><tr><td>SRA C</td><td>CB 29</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r0 r0</td></tr><tr><td>SRA D</td><td>CB 2A</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r0r0</td></tr><tr><td>SRA E</td><td>CB 2B</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r0 0</td></tr><tr><td>SRA H</td><td>CB 2C</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r0.0</td></tr><tr><td>SRA L</td><td>CB 2D</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r0 .0</td></tr><tr><td>SRL (HL)</td><td>CB 3E</td><td>2</td><td>15</td><td>7</td><td>z</td><td>p</td><td>r0 .0</td></tr><tr><td>SRL (IX+d)</td><td>DD CB d 3E</td><td>4</td><td>23</td><td>7</td><td>z</td><td>p</td><td>r1</td></tr><tr><td>SRL (IY+d)</td><td>FD CB d 3E</td><td>4</td><td>23</td><td>7</td><td>z</td><td>P</td><td>r0</td></tr><tr><td>SRL A</td><td>CB 3F</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r1 .0</td></tr><tr><td>SRL B</td><td>CB 38</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r1.0</td></tr><tr><td>SRL C</td><td>CB 39</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r1 0</td></tr><tr><td>SRL D</td><td>CB 3A</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r1</td></tr><tr><td>SRL E</td><td>CB 3B</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r1 r0</td></tr><tr><td>SRL H</td><td>CB 3C</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r1r0</td></tr><tr><td>SRL L</td><td>CB 3D</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>r1<br/>r0</td></tr><tr><td>SUB (HL)</td><td>96</td><td>1</td><td>7</td><td>7</td><td>z</td><td>v</td><td>b</td></tr><tr><td>SUB (IX+d)</td><td>DD 96 d</td><td>3</td><td>19</td><td>7</td><td>z</td><td>v</td><td>b</td></tr><tr><td>SUB (IY+d)</td><td>FD 96 d</td><td>3</td><td>19</td><td>7</td><td>z</td><td>v</td></tr><tr><td>SUB A</td><td>97</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>b</td></tr><tr><td>SUB B</td><td>90</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>b</td><td></td></tr><tr><td>SUB C</td><td>91</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>b</td><tr><td>SUB D</td><td>92</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>b</td></td></tr><tr><td>SUB E</td><td>93</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>b</td>r0</tr><tr><td>SUB H</td><td>94</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>b</td>t0</tr><tr><td>SUB HIX</td><td>DD AC</td><td>2</td><td>8</td><td>7</td><td>z</td><td>v</td><td>b</td></tr><tr><td>SUB HIY</td><td>FD AC</td><td>2</td><td>8</td><td>7</td><td>z</td><td>v</td><td>b<br/>b</td></tr><tr><td>SUB L</td><td>95</td><td>1</td><td>4</td><td>7</td><td>z</td><td>v</td><td>b</td>b</tr><tr><td>SUB LIX</td><td>DD AD</td><td>2</td><td>8</td><td>7</td><td>z</td><td>v</td><td>b</td>t0</tr><tr><td>SUB LIY</td><td>FD AD</td><td>2</td><td>8</td><td>7</td><td>z</td><td>v</td><td>b<br/><br/>b</td></tr><tr><td>SUB n</td><td>D6 n</td><td>2</td><td>7</td><td>7</td><td>z</td><td>v</td><td>b</td></tr><tr><td>XOR (HL)</td><td>AE</td><td>1</td><td>7</td><td>7</td><td>z</td><td>p</td><td>0</td></tr><tr><td>XOR (IX+d)</td><td>DD AC d</td><td>3</td><td>19</td><td>7</td><td>z</td><td>p</td><td>0</td></tr><tr><td>XOR (IY+d)</td><td>FD AC d</td><td>3</td><td>19</td><td>7</td><td>z</td><td>p</td><td>r0</td></tr><tr><td>XOR A</td><td>AF</td><td>1</td><td>4</td><td>7</td><td>z</td><td>p</td><td>r0</td></tr><tr><td>XOR B</td><td>A8</td><td>1</td><td>4</td><td>7</td><td>z</td><td>p</td><td>r0.0</td></tr></tr></table>

---

<!-- page 104 -->

<table><tr><td>Instruction</td><td>Opcode</td><td>B</td><td>Ts</td><td>S</td><td>Z</td><td>P</td><td>C</td></tr><tr><td>XOR C</td><td>A9</td><td>1</td><td>4</td><td>7</td><td>z</td><td>p</td><td>0</td></tr><tr><td>XOR D</td><td>AA</td><td>1</td><td>4</td><td>7</td><td>z</td><td>p</td><td>0</td><td></td></tr><tr><td>XOR E</td><td>AB</td><td>1</td><td>4</td><td>7</td><td>z</td><td>p</td><td>0</td><tr><td>XOR H</td><td>AC</td><td>1</td><td>4</td><td>7</td><td>z</td><td>p</td><td>0</td></td></tr><tr><td>XOR HIX</td><td>DD AC</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>0</td></tr><tr><td>XOR HIY</td><td>FD AD</td><td>2</td><td>8</td><td>7</td><td>z</td><td>p</td><td>0</td><td></td></tr><tr><td>Xor L</td><td>AD</td><td>1</td><td>4</td><td>7</td><td>z</td><td>p</td><td>0</td>&lt; tr&gt;<td>XOR LIX</td><td>DD AC</td><td>2</td><td>8</td><td>7</td><td>z</td><td>P</td><td>0</td><tr><td>XOR LIY</td><td>FD AD</td><td>2</td><td>8</td><td>7</td><td>z</td><td>P</td><td>0</td></tr><tr><td>XOR n</td><td>EE n</td><td>2</td><td>7</td><td>7</td><td>z</td><td>p</td><td>0</td></tr></tr></table>

---

<!-- page 105 -->

## The CRTC Registers  


To change the value of these registers, the register number should be output on address &BCxx and then the data output on &BDxx  



<table><tr><td>Reg</td><td>Function</td><td>Default Value</td><td>Reg</td><td>Function</td><td>Default Value</td></tr><tr><td>R0</td><td>Horizontal Total</td><td>63</td><td>R1</td><td>Horizontal Displayed</td><td>40</td></tr><tr><td>R2</td><td>Horizontal Sync Pos.</td><td>46</td><td>R3</td><td>Sync Width</td><td>112</td></tr><tr><td>R4</td><td>Vertical Total</td><td>38</td><td>R5</td><td>Vertical Total Adjust</td><td>0</td></tr><tr><td>R6</td><td>Vertical Displayed</td><td>25</td><td>R7</td><td>Vertical Sync Position</td><td>30</td></tr><tr><td>R8</td><td>Interface and Skew</td><td>0</td><td>R9</td><td>Maximum Raster Addr</td><td>7</td></tr><tr><td>R10</td><td>Cursor Start Raster</td><td>0</td><td>R11</td><td>Cursor End Raster</td><td>0</td></tr><tr><td>R12</td><td>Start Address (H)</td><td>48</td><td>R13</td><td>Start Address (L)</td><td>0</td></tr><tr><td>R14</td><td>Cursor Register (H)</td><td>192</td><td>R15</td><td>Cursor Register (L)</td><td>07</td></tr></table>