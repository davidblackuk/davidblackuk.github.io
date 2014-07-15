---
layout  : main
title   : Home
section : Home
feed    : /atom.xml
---
 
Welcome
=======

Welcome to my site. The name is derived from a quote:

	"Machines take me by surprise with great frequency."
		-- Alan Turing

If they take the great man by surprise just imaging how startled and struggling the rest of us are.

Blog
====

The main purpose of this site is as a hook to hang my blog on. While no doubt the content will rarely change and my enthusiasm will wane after short a while, for now optimistically I will say

Here are the recent posts:

{% for post in site.posts limit:5 %}
<div class="section list">
  <h1>{{ post.date | date_to_string }}</h1>
  <p class="line">
    <a class="title" href="{{ post.url }}">{{ post.title }}</a>
  </p>
  <p class="excerpt">
	{% if post.excerpt %}
	  {{ post.excerpt }}
    {% else %}
      {{ post.content | html_truncate }}
    {% endif %}
  </p>
</div>
{% endfor %}

Everything else is in [the archives](/archives/).
