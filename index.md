---
layout  : main
title   : Home
section : Home
feed    : /atom.xml
---
 
Welcome
=======

This site is as a hook to hang my blog from. The content may rarely change, my enthusiasm could wane, or I might get overtaken by events. For now, optimistically, I'll say...

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
