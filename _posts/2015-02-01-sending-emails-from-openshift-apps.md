---
layout: post
title: "Sending emails from  OpenShift  using MailGun"
modified: 2015-01-15 09:30:10 +0100
tags: [openshift, email, tubular]
image:
  feature: 
  credit: 
  creditlink: 
comments: true
share: true

---

I'm trying to finally get my App Tubular deployed to the AppStore. As part of this process I need a web site and as part of that saga I want to be able to send emails from my app, to myself.

My web site is hosted in OpenShift and is a Node.js / Express Application with a little MongoDB thrown in for good measure. The contacts page on the web site has a simple form that posts back to the server an email address and a message to send. 


<img class="dosShot screenShot"  src="../../images/2015-02-01-sending-emails-from-openshift-apps/ss1.png"  />


In the route code for the post I solved the email sending problem by inserting the following line of code while I was completing the form side of the UI.

{% highlight javascript %}
function mailMe(from, message) {
	// TODO: Send am email
}
{% endhighlight %}

I looked around and decided that the [NodeMailer](https://github.com/andris9/Nodemailer "NodeMailer on github") package was the ideal solution to my problem. 

	npm install nodemailer --save

I looked on git hub and reproduced the TL;DR version of the code and tried it. _Please read on after the listing and don't use the content!_

{% highlight javascript %}
var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'gmail.user@gmail.com',
        pass: 'userpass'
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});
{% endhighlight %}

And it worked!, on my machine, until I deployed it to OpenShift, where it didn't. Boo! It turns out that GMail refuses to deal with inbound send requests for mail access from public clouds. OpenShift is of course hosted on Amazons EC3 cloud and so Google won't play nice.

There are several workarounds to the problem including the use of oAuth, however I decided to go another route and try a new provider. [MailGun](https://mailgun.com "MailGun home page") is a service that provides email, mailing lists and so much more. More importantly to me it:

* 	Allows you to send up to 10,00 emails a month for free
* 	Does not requite a credit card to set up
*	Is fairly simple to set up and use if you
	*	Have a domain
	*	Are comfortable editing your DNS records
	*	Or are happy to be limited to 10 emails a day.

I created a MailGun account without a domain to start with and generated a sandbox API Key (sandbox accounts are limited to 10 messages a day, you need a domain registered to proceed beyond that limit). A little searching found that there were two other `npm` packages that I needed to install:

First there is [mailgun-js](https://github.com/1lobby/mailgun-js "Mailgun-js github page")

	npm install mailgun-js --save

and also the [node mailer transport for mailgun-js](https://github.com/orliesaurus/nodemailer-mailgun-transport "Node mail transport for mailgun on github")
	
	npm install git+https://github.com/orliesaurus/nodemailer-mailgun-transport.git --save

Now we are in a position to send some emails. In my module I require two packages

{% highlight javascript %}
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
{% endhighlight %}

The third `npm` package we installed is a dependancy of `nodemailer-mailgun-transport` and not directly used. So now we can code up the message send.

{% highlight javascript %}

function mailMe(from, message) {
    var auth = {
      auth: {
          api_key: 'key-a3456ac123436971c8739f4d6392926',
          domain: 'my.domain'
      }
    };

    var transporter = nodemailer.createTransport(mg(auth));

    var mailOptions = {
        from: 'Tubular support <fred@gmail.com>',
        to: 'Tubular support <fred@gmail.com>',
        subject: 'The subject',
        text: 'Message in plain text', // plaintext body
        html: '<b>Hello</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });
}
{% endhighlight %}

That worked!, you will need to substitute your own api key and domain for the fake values used above.  If you get a 404 error on the message send from the MailGun server,  you have not specified the correct domain. The auth options require either the sandbox domain or the domain you registered with MailGun to be specified.

A fun bit of work and yet another nice open and free to get going PaaS.




