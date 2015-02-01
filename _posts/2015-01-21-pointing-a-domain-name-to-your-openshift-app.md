---
layout: post
title: "Using a domain name with OpenShift"
modified: 2015-01-15 09:30:10 +0100
tags: [openshift]
image:
  feature: 
  credit: 
  creditlink: 
comments: true
share: true

---


Bit of a quick one this. So you have an OpenShift project and a domain name that you want to access it through, how do you proceed?

There is a small amount of work to be done both at the domain hosting end and the OpenShift application end. In my case I have the brand new domain: 

[https://www.designedincroxleygreen.com](https://www.designedincroxleygreen.com "Go to the site via the new address") 

and I want it to point to the existing OpenShift application: 

[http://tubular-davidblack.rhcloud.com](http://tubular-davidblack.rhcloud.com "Access the site via the OpenShift hosted name")

First step: Configure DNS
=========================

At a minimum we need a `CNAME` DNS record to allow us to forward the `www.designedincroxleygreen.com` address to OpenShift. If we wanted to do this at the base level and have `designedincroxleygreen.com` resolve to our app we'd need an A record and more effort. 

While you domain registrars page will probably appear different to mine the approach is the same, go to the control panel and find the 'advanced' DNS settings page and add a new CNAME record pointing to your app. The DNS entry is for the pattern `www` and the remote item  is your OpenShift application URL.


<img class="dosShot screenShot"  src="../../images/2015-01-21-pointing-a-domain-name-to-your-openshift-app/ss1.png"  />


Second step: Configure OpenShift
================================

Now we've told the DNS servers where to route the domain to, we have to tell OpenShift to serve the application for that name. We do this using `rhc` tubular is the name of my application

	> rhc alias add tubular www.designedincroxleygreen.com

This will create a vhost in apache to route the requests for that domain to our app. To confirm the creation of the alias we can list out all aliases

	> rhc alias list tubular
	Alias                          Has Certificate? Certificate Added
	------------------------------ ---------------- -----------------
	www.designedincroxleygreen.com no               -

Finally: Be patient
===================

My domain registrar says it can take up to 48 hours for changes to propagate. My bindings started working after about 28 hours. Your mileage may vary.




<img class="dosShot screenShot"  src="../../images/2015-01-21-pointing-a-domain-name-to-your-openshift-app/ss2.png"  />

