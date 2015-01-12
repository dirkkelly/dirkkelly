---
layout:               default
title:                Dirk Kelly
---

<div class="media page-header">
  <div class="media-left">
    <img src="/images/2015-01-12.jpg" alt="Dirk Kelly - 2014/01/19" class="img-circle" style="width: 100px; height: 100px" />
  </div>
  <div class="media-body">
    <h1 style="padding-top: 65px; margin-bottom: 0">{{site.title}} <small>{{site.subtitle}}</small></h1>
  </div>
</div>

<div class="panel panel-default">
  <div class="panel-heading">
    <h1 class="panel-title">Adventure Time <small>In which give my opinions on what an episode means, to me?</small></h1>
  </div>
  <ul class="list-group">
    {% for episode in site.adventure_time %}
      <li class="list-group-item">
        <a href="{{ episode.url }}">s{{episode.season}}e{{episode.episode}} - {{ episode.title }}</a>
        <p>{{ episode.plot }}</p>
      </li>
    {% endfor %}
  </ul>
</div>

<div class="row">
  <div class="col-md-6">
    {% include sidebar/posts/latest.html %}
  </div>

  <div class="col-md-6">
    {% include sidebar/brews/latest.html %}
  </div>
</div>
