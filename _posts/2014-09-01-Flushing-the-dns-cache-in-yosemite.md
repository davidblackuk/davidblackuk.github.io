---
layout: post
title: "Flushing the DNS cache in OS X 10.10 Yosemite"
modified: 2014-09-01 12:30:10 +0100
tags: [OSX]
image:
  feature: 
  credit: 
  creditlink: 
comments: true
share: true
pageJS: cDash1.1-alpha.js
pageJS2: thermometerAlpha.js
---

Yosemite may still be in Beta and as it seems every time that Apple updates OS X they change the mechanism for flushing the DNS cache. Well guess what, they changed it again, Harrumph! (and at my age your allowed to harrumph loudly and as often as you like). 

So the new way of doing it in 10.10 Yosemite is

	> sudo discoveryutil mdnsflushcache; sudo discoveryutil udnsflushcaches

For those stuck in the past...

OSX 10.9

	> dscacheutil -flushcache; sudo killall -HUP mDNSResponder


OSX 10.7  and  10.8

	> sudo killall -HUP mDNSResponder

OSX 10.6

	> sudo dscacheutil -flushcache ; sudo arp -d -a


OSX 10.5 

	> sudo dscacheutil -flushcache

OSX 10.0, 10.1, 10.2, 10.3 and 10.4

	> lookupd -flushcache

