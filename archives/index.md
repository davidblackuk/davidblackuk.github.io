---
layout  : main
title   : Archives
section : Past
feed    : /atom.xml
---

Archives
========

This is the complete archive of posts at *[Overtaken by events](/)* in
reverse chronological order.


{% assign year = "none" %}
{% assign month = "none" %}

{% for post in site.posts %}
{% capture curryear %}{{post.date | date:'%Y'}}{% endcapture %}
{% capture currmonth %}{{post.date | date:'%Y-%m'}}{% endcapture %}
<div class="section list">
  <h1>{% if currmonth != month %}<a name="{{ currmonth }}">{% endif %}
	{% if curryear != year %}<a name="{{ curryear }}">{% endif %}
	{{ post.date | date_to_string }}
	{% if currmonth != month %}</a>{% endif %}
	{% if curryear != year %}</a>{% endif %}
  </h1>
  <p class="line">
    <a class="title" href="{{ post.url }}">{{ post.title }}</a>
  </p>
  <p class="excerpt">{% if post.excerpt %}
	{{ post.excerpt }}
  {% else %}
    {{ post.content | html_truncate }}
  {% endif %}</p>
</div>
{% assign year = curryear %}{% assign month = currmonth %}{% endfor %}
