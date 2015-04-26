---
layout: post
title: "Tabulate UI on <i class='fa fa-apple'> </i>  WATCH #1"
modified: 2015-01-15 09:30:10 +0100
tags: [tubulate, ios, swift, appleWatch]
image:
  feature: 
  credit: 
  creditlink: 
comments: true
share: true

---

I'm having fun programming the Apple Watch. What I like the most about the exercise are the challenges
 of designing a UI for a teeny-tiny device.

 Quite how little space you have to work with can be shown from the image below (these are device screen shots)

<img class="dosShot screenShot centeredImg"  src="../../images/2015-03-01-tululate-apple-watch-implementation-1/ss00.png"  />


The main interface for the iPhone application is the home screen. For your current home station if shows you 
how painful your commute is about to become. 

<img class="dosShot screenShot"  src="../../images/2015-03-01-tululate-apple-watch-implementation-1/ss01.png"  />
<img class="dosShot screenShot"  src="../../images/2015-03-01-tululate-apple-watch-implementation-1/ss02.png"  />



The overall status indicator gives you a high-level overview, you then drill down to the details. I wanted to keep the same approach for the watch application but given the space, compromises needed to be made.

Notice the brevity of the text, "Some issues" and "But elsewhere", the reality is that the color of the image is the 
actual indicator that users will care about:

*	Red - Issues exist on lines through this station
*	Orange - Issues exist on other lines
*	Green - No issues on any lines (it does happen, just never on a Monday morning)

If you tap the status button, you get to see the over all line status:

<img class="dosShot screenShot"  src="../../images/2015-03-01-tululate-apple-watch-implementation-1/ss05.png"  />
<img class="dosShot screenShot"  src="../../images/2015-03-01-tululate-apple-watch-implementation-1/ss03.png"  />

Again, not to bang on about it, but you get 10 lines displayed on the phone, just 4 on the watch and you have to accept that the truncation of long names is going to happen (Part two covers the 'Solution' to this where we sacrifice space for words in improve readability!).

Finally tapping a line in the status display takes you to the details of the issues on the line.

<img class="dosShot screenShot"  src="../../images/2015-03-01-tululate-apple-watch-implementation-1/ss06.png"  />
<img class="dosShot screenShot"  src="../../images/2015-03-01-tululate-apple-watch-implementation-1/ss04.png"  />

A pretty good start and we have functionality that'll be useful when the  <i class='fa fa-apple'> </i>  WATCH comes out. 


