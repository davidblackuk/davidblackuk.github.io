---
layout: post
title: "Chaining with continuations in Swift"
modified: 2015-01-15 09:30:10 +0100
tags: [tubulate, ios, swift, restkit]
image:
  feature: 
  credit: 
  creditlink: 
comments: true
share: true

---


'RestKit' comes with great support for asynchronous invocations that complete in a block. My recent experience with Node.js lead to me adopting a pattern, that Swift with its modern clean syntax, makes a snip to use. 

The chain of actions that I need to perform to get the status for the users home location is: 

* Find their current location
* Find the Home station (closest of their favorite stations
* Get the status of all lines
* Process the status and return the data to the watch

Let's use an action in the chain  to demonstrate the pattern. If we look at the `HomeStaionFinder` class: 

{% highlight swift %}
 func find(#andThen: (TBStation) -> () ) {
        TBLInes.sharedInstance().updateDistances(location)
        andThen(TBLInes.sharedInstance().stationsOrderedByDistance().first);
    }
{% endhighlight %}

This code is elided but should show the gist of it. What makes the whole thing really pleasant to use and easy to read is the continuation method `andThen:`  passed in as a parameter. When these classes are chained together we get:



{% highlight swift %}
 func collect( finally: (HomePageData) -> () ) {
    LocationFinder(waitFor: 1).find( andThen: { (location) -> () in
        HomeStationFinder(from:location).find(andThen: { (home) -> () in
            StatusFinder().find(andThen: { () -> () in
                finally(self.collectedData);
            })
        })
    })
}
    
{% endhighlight %}

I think I'm going to like Swift.









