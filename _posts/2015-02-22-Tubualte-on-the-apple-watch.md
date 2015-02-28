---
layout: post
title: "Apple Watch App communicating with the main App"
modified: 2015-01-15 09:30:10 +0100
tags: [tubulate, ios, swift, restkit]
image:
  feature: 
  credit: 
  creditlink: 
comments: true
share: true

---

Having spent the last few weekends creating a web site to market and support my App [Tubulate](http://www.designedincroxleygreen.com "Visit Tubulate Web Page"),  then spending the next two weekends getting it on the [AppStore](https://itunes.apple.com/gb/app/tubulate/id965526109?mt=8 "Open the app store to see the app"). It's time for the next step,  <i class="fa fa-apple small"></i> Watch integration! (Programming: Good - PhotoShop: Meh).


The first challenge to surmount is how to ship data from the iPhone App to the WatchKit extension. Data access needs to go through the phone App as it has all of the infrastructure to perform the REST calls already written  and tested. 

There are a couple of approaches to data transfer available:

You can set up a shared group and use an `NSUserdefaults` object to synchronize data between the two App parts. This approach is useful but not exactly what I need. 

A second approach is to invoke the `WKInterfaceController.openParentApplication` method in the extension which leads to the `handleWatchKitExtensionRequest` method on the iPhone App's `AppDelegate` to be invoked. This method can perform arbitrary calculations and return data to the watch via an `NSDictionary` of string value pairs.

The Objective-C definition of the `handleWatchKitExtensionRequest` method is as follows

{% highlight objective-c %}
-(void)application:(UIApplication *)application handleWatchKitExtensionRequest:(NSDictionary *)userInfo reply:(void (^)(NSDictionary *))reply{
    HomePageDataCollector *s = [[HomePageDataCollector alloc] init];
    [s collect:^(HomePageData *data) {
        reply([data toWatchKit]);
    }];
}
{% endhighlight %}


The parameter `userInfo` is a dictionary  used to pass parameters in from the watch. There is only one entry point to the application from the phone so we will need to pass in an descriptor for the operation to perform and then dispatch  execution to the correct class. Here we hard wire the call to the `HomePageDataCollector` class and pass the data back to the watch via the `reply()` callback.

As I mentioned the code is execute in a block,  my REST calls are asynchronous, unless I can somehow chain the invocations then the call will terminate and I will be up a famous creek without a paddle.

I'll cover the REST chain in the next post.









