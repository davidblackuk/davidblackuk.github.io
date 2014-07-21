---
layout: post
title: "cDash: The new Thermometer dial"
modified: 2014-07-21 19:30:10 +0100
tags: [cdash, javascript, typescript]
image:
  feature: 
  credit: 
  creditlink: 
comments: true
share: true
pageJS: cDash1.1-alpha.js
pageJS2: thermometerAlpha.js
---

One of the new dials scheduled for cDash 1.1 is the thermometer. This new gauge is in the Slider family of gauges, and here it is:


<canvas style="display:block;margin-left:auto;margin-right:auto" id="demo" width="90" height="200">  </canvas>



At the time of writing there is still much to do. The control is only available in the vertical or North/South orientation. There are also choices to be made. Currently my thoughts are:

*	North and South should have the same appearance
	*	Or should the 'tube' stay in the same orientation and the value appear either below (north) or above (south)
*	East and west should have the same appearance
	*	Or should East / West have the value below / above too?
*	The scale values should be suppressed
	*	Or the width would need to be significantly enlarged
	*	Or only display the scale and values on one side? (two looks better to me though)

I'd be interested to here your thoughts in the comments section