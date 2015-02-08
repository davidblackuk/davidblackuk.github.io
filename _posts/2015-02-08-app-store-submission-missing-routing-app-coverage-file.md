---
layout: post
title: "Missing Routing App Coverage file"
modified: 2015-01-15 09:30:10 +0100
tags: [tubulate, ios, appstore]
image:
  feature: 
  credit: 
  creditlink: 
comments: true
share: true

---

So the soon to be ending saga of  putting my App Tubulate up for approval on the AppStore is coming to a close. So far I have

*	Designed and built the App (feels like the smallest part now!)
*	Created a marketing and support site written in Node.js
*	Created the App in iTunes connect and uploaded a metric crap load of images, descriptive test etc.
*	Generated all of the certificates, profiles etc. to allow me to submit.
*	Built and archived my application into an IPA
*	Verified my archive through the xCode Organizer
*	Submitted it to the App Store
*	Pressed the button to trigger a review, Yeah!

Hold on, not so fast there sonny. Time for an obscure error message. 

The iTunes connect page started nagging me, saying that an application that provides routing information needs to have a Routing App coverage file uploaded. Tubulate uses maps, it doesn't  however actually provide routing information so I was a little perplexed that I was being hounded for it.

If you don't believe me look at a screen shot

<img class="dosShot screenShot"  src="../../images/2015-02-08-app-store-submission-missing-routing-app-coverage-file/ss01.png"  />

I make no claim to supply any routes. So why has the App Store got it in for me? (Infamy, Infamy, they've all got it in for me; as Kennith Williams was won't to say).

The short and sweet answer is that the applications info.plist file contained two key value pairs that were causing an issue the first is the `MKDirectionsApplicationSupportedModes` key and value, this needs removing.

{% highlight xml %}
	<key>MKDirectionsApplicationSupportedModes</key>
	<array/>
{% endhighlight %}

The second entry is the `CFBundleDocumentTypes` key value entry. I suspect this is the actual culprit but since I removed both entries and the submission succeeded I guess I'll never know (till next time). When removing this entry be a little careful as you might have other Doc types you want to keep, if not remove the entire key value pair.

{% highlight xml %}
	<key>CFBundleDocumentTypes</key>
	<array>
		<dict>
			<key>CFBundleTypeName</key>
			<string>MKDirectionsRequest</string>
			<key>LSItemContentTypes</key>
			<array>
				<string>com.apple.maps.directionsrequest</string>
			</array>
		</dict>
	</array>
{% endhighlight %}

But from context it looks like the entry says we accept the `com.apple.maps.directionsrequest` document type and so iTunes connect reasonably expects the routing app coverage file to be present. 

Tubulate is submitted for review. Now I wait.


