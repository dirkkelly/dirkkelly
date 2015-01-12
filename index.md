---
layout:               default
title:                Dirk Kelly
---

# Dirk Kelly

## Brewer, Boarder and Internet Software Person

---

<div class="row">
  <img src="/images/2014-10-14.jpg" class="col-md-4 img-circle img-responsive" alt="Dirk Kelly - 2014/01/19" />

  <div class="col-md-4">
    {% include sidebar/posts/latest.html %}
  </div>

  <div class="col-md-4">
    {% include sidebar/brews/latest.html %}
  </div>
</div>

<div class="panel panel-default">
  <div class="panel-heading">
    <h1 class="panel-title">Adventure Time</h1>
  </div>
  <div class="panel-body">
    <strong>In which give my opinions on what an episode means, to me?</strong>
  </div>
  <ul class="list-group">
    {% for episode in site.adventure_time %}
      <li class="list-group-item">
        <a href="{{ episode.url }}">{{ episode.title }}</a>
        <p>{{ episode.plot }}</p>
      </li>
    {% endfor %}
  </ul>
</div>
