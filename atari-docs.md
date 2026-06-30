---
layout: page
title: Atari Scanned Documents
published: false
---

<p class="lead">OCR'd scans of Atari manuals and books, published via DocuMentor.</p>

{% assign docs = site.posts | where_exp: "p", "p.tags contains 'atari-scanned-doc'" %}
{% if docs.size == 0 %}
<p><em>No documents published yet.</em></p>
{% else %}
<ul>
  {% for doc in docs %}
  <li><a href="{{ doc.url }}">{{ doc.title }}</a> <span class="entry-date"><time datetime="{{ doc.date | date_to_xmlschema }}">{{ doc.date | date: "%B %d, %Y" }}</time></span></li>
  {% endfor %}
</ul>
{% endif %}
