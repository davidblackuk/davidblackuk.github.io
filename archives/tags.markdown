---
layout  : main
title   : Tags
section : Past
feed    : /atom.xml
---

Tags
====
{% assign elephant = site.tags | item_names %}

Now {{ site.tags | item_names }}

Wow2 {{ elephant | item_names }}
