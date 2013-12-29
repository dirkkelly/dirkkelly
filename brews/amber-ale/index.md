---
title:                Amber Ale
layout:               default
---

<ul>
  {% for post in site.categories.amber-ale %}
    <li>
      {{ post.date | date_to_string }}
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
