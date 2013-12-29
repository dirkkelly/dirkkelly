---
title:      Saison Ale
---

<ul>
  {% for post in site.categories.saison-ale %}
    <li>
      {{ post.date | date_to_string }}
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
