---
layout: post
title:  Why is my SharePoint site settings page wrong / missing?
tags: [ sharepoint ]
location: London, England
excerpt: Argh... my sub site has a blank settings page or is showing the wrong content.
comments: true
share: true
---

Never forget that SharePoint is not your friend, it hates you and will never change. You however like all down trodden masses must struggle on regardless (can you tell I've had a crappy day with SharePoint!)

So todays problem is fairly simple, I create a new SharePoint server and commission it. I create a sub-site and all is fine and dandy. So I go to my sub-site and then to site settings and I see my settings, yes?, Err no. I get a blank screen (other times you might even see the main site settings page.) So whats going on?

My server is hosted and as always when you're not setting SharePoint up on an intranet there are issues with Alternative Access Mappings (AAMs). Now AAMs are clever things, they allow you to host content on different incoming URLs, process pages and map the outgoing results with very little thought on your behalf. The trouble tends to happen with the very little thought part!

The resolution to my problem was to make sure that there were internal URL entries for both the machine name _and_ for local host too. That solved the problem for local access.

For remote access to the server I needed to add a _public_ URL with the full external server name and add it to the _Internet_ zone (Make sure to select Internet from the drop-down). 

No big deal, but for a while I was stumped.
