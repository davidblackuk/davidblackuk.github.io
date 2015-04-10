---
layout: post
title: "Unit testing serialization in swift"
modified: 2015-03-12 13:30:10 +0100
tags: [swift, unittest]
image:
  feature: 
  credit: 
  creditlink: 
comments: true
share: true

---

When I started using Swift I decided to unit test all the code that I wrote, the intent was that coding test-first would allow me to concentrate on the language more efficiently. To aid unit testing I have started to put together a bast test class with common helper methods. The criteria for the helpers are that they

*	Are reusable across many tests (obviously)
*	Help me learn the intricacies of Swift<sup>1</sup>
*	Help me, help myself and stop me from repeating past mistakes

In programming for the apple watch I've been passing data back to to the watch in an `NSData` serialized representation using `NSKeyedArchivers`. Unit testing these is usually a snip, I serialize a class with a known value, deserialize a copy and compare the values with the expected value from the original.

To test this code I originally place a helper method into the test class to do the archive/unarchive step. As I started the second class using the same technique it mandated the code be moved into the base class and generalized. 


{% highlight swift %}
class TKUnitTest: XCTestCase {
    func cloneViaCoding(root: T) -> T {
        var data = NSKeyedArchiver.archivedDataWithRootObject(root)
        var res = NSKeyedUnarchiver.unarchiveObjectWithData(data) as T
        return res
    }
}
{% endhighlight %}

By using a generic method we can provide a nice clean type safe clone method and our unit test is

{% highlight swift %}
 func testCloneSetNameCorrectly() {
        let o = TKMiniLineStatus(name: "name", status: "")
        let res = self.cloneViaCoding(o)
        XCTAssertEqual("name", res.name)
    }
{% endhighlight %}

As usual I test only one thing per test case so there will be another method to test status etc.

That's all good. Next I wrote another class with archiving, however, on that class all of my tests failed! It took me a few minutes to spot the error, I'd forgot to  extend `NSCoding` (which is easy to do with optional protocols). This got me to thinking about how to avoid making this mistake again (point 3 above).

A quick flick through the _Swift Programming Language_ manual from Apple lead to the section on _Type Constraint Syntax_. So I extended the unit test to mandate that the type `T` being cloned must implement the `NSCoding` protocol. 


{% highlight swift %}
class TKUnitTest: XCTestCase {
    func cloneViaCoding<T: NSCoding>(root: T) -> T {
        var data = NSKeyedArchiver.archivedDataWithRootObject(root)
        var res = NSKeyedUnarchiver.unarchiveObjectWithData(data) as T
        return res
    }
}
{% endhighlight %}

Now instead of the clone name test failing, leaving me head scratching as to why, I get a nice clear build error, for eaxmple this test 

{% highlight swift %}
    func testCompileTimeSupport() {
        let tmp = ColorTool();
        let res = self.cloneViaCoding(tmp)
    }
{% endhighlight %}

gets this build error



	Type 'ColorTool' does not conform to protocol 'NSCoding'


Sweet :-)






<sup>1</sup> Yes it's a bad idea to drive class design through language features but this is a learning project
