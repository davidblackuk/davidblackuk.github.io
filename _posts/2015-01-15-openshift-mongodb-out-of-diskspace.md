---
layout: post
title: "Out of disk space issues on OpenShift with mongodb"
modified: 2015-01-15 09:30:10 +0100
tags: [openshift, mongodb, tubulate]
image:
  feature: 
  credit: 
  creditlink: 
comments: true
share: true
pageJS: cDash1.1-alpha.js
pageJS2: thermometerAlpha.js
---

I'm coming close to _finally_ getting my iOS app Tubulate deployed to the app store. Part of that process is to create a web site to promote it and to serve as a contact point for the app store page.

I decided to use a free Openshift gear to host my site and Node.js / Express to implement it. Openshift comes with  a default disk quota of 1 Gigabyte, enough I figured, for anything I could ever need for such a small site.

However I decided to get funky and learn more about node, express, sessions etc and to use a MongoDB database to bootstrap a user login system (Can you see why this app has taken ages to get   published yet?, I do call my blog overtaken by events for a reason...)

So I code up the implementation of sign-in, register and sign out locally and all is golden. I push the local repository out to Openshift and all works as expected. I make a minor modification after the initial push and I redeploy. Eek! There's a warning message at the end of the deploy saying that I was at 99% of my disk quota.

Time to investigate. A quick look at the quota's from the `rhc` command shows the problem (tubular is my OpenShift App name)


	> rhc app show tubular --gears quota

	Gear                     Cartridges                Used Limit
	------------------------ ----------------------- ------ -----
	54b11fa5e0b8cd5ac0000172 nodejs-0.10 mongodb-2.4 0.9 GB  1 GB

That's a little on the excessive size considering that the database has exactly two users in it and nothing else. I try a basic tidy up

	> rhc app tidy tubular

But that didn't really have any noticeable effect. Logging on to the server and enjoying a little `du` action led me to the mongodb folder as being the main culprit:

	> rhc ssh $@ -a tubular
	Connecting to ...

Find where MongoDB stores its data

	> cd ~/mongodb/data/

Check what's going on

	> du -mH  .
	1	./tubular
	385	./journal
	481	.

Total space used is 481 MB with 385 of those being the journal. A quick look at the folder content shows the actual tables are 34MB each (data table and ns file), hardly ideal for a tiny app but acceptable. 

	> ls -l --block-size=MB
	total 101MB
	-rw-------.  17MB Feb  1 07:11 admin.0
	-rw-------.  17MB Feb  1 07:11 admin.ns
	drwxr-xr-x.   1MB Feb  1 06:20 journal
	-rw-------.  17MB Feb  1 06:35 local.0
	-rw-------.  17MB Feb  1 06:35 local.ns
	-rwxr-xr-x.   1MB Feb  1 06:35 mongod.lock
	drwxr-xr-x.   1MB Feb  1 06:15 tubular
	-rw-------.  17MB Feb  1 06:20 tubular.0
	-rw-------.  17MB Feb  1 06:20 tubular.ns

The journal however is taking up 385MB (38.5% of the quota for the gear!) So something needs to be done.

The journal is used to cache updates to the table before they are written and provide a recovery mechanism from MongoDB crashes or unexpected power outages mid-write. Journals are a good thing&#0153;, but not  compulsory , by default they're not even enabled for 32 bit servers. So ours has to go! (But think long and hard before you do this for a write heavy site).

To disable journaling, edit the MongoDB configuraion file `mongodb.conf.`

	> vim ~/mongodb/conf/mongodb.conf

Add the line

	nojournal = true

Then restart your MongoDB cartridge (the line below assumes you are still logged in via ssh, to do this locally on your machine use `rhc`)

	> ctl_app  restart
	Cart to restart?
	1. nodejs-0.10
	2. mongodb-2.4

Enter 2 (your listing will vary, your number may be different. I'm patronizing you now aren't I... )

	Stopping MongoDB cartridge
	Starting MongoDB cartridge
	Waiting for mongo to start...

Finally the payoff, we remove the logs

	> cd ~/mongodb/data/journal/
	> ls -l
	total 393228
	-rw-------. 134217728 Feb  1 06:20 prealloc.0
	-rw-------. 134217728 Dec  8 13:19 prealloc.1
	-rw-------. 134217728 Dec  8 13:19 prealloc.2

	> rm *

Back on my machine

	> rhc app show tubular --gears quota
	Gear                     Cartridges                Used Limit
	------------------------ ----------------------- ------ -----
	54b11fa5e0b8cd5ac0000172 nodejs-0.10 mongodb-2.4 0.5 GB  1 GB

Isn't that better :-)







