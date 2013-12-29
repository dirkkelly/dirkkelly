---
title:      Red Ale
layout:     recipe
color:      13SRM
og:         1.053
fg:         1.014
abv:        5.2%
bitterness: 27IBU
---

------|--------
8oz   |American Caramel 60̊L
4oz   |Belgian Aromatic 20̊L
1oz   |Debittered Black Malt 500̊L
3lb   |Golden Light Dry Malt Extract
3.3lb |Amber Liquid Malt Extract

---|------------|------|----
2oz|Fuggle      |4.2%AA|60min
1oz|Willamette  |4.2%AA|60min

---------|----------------------------------
1 Package|Wyeast 1084 Irish Ale Liquid Yeast

<ul>
  {% for post in site.categories.red-ale %}
    <li>
      {{ post.date | date_to_string }}
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
