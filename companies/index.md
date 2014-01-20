---
layout: default
---

I live in a time where it's very unlikely you'll ever
be able to meet, let alone talk to, the owner of a 
company. Of course this generally means that regardless
of how terrible things are, they'll never get fixed,
or how amazing things are, the right people will never
receive praise.

This list helps me keep track of what I feel about companies.

<div class="col-md-4 alert alert-danger">
  <p>Never Using Again</p>
</div>
<div class="col-md-4 alert alert-warning">
  <p>Don't care about whether or not I use them again</p>
</div>
<div class="col-md-4 alert alert-success">
  <p>Regularly use them and recommend them to others.</p>
</div>

<table class="table">
  <tbody>
    {% for company in site.data.companies %}
      {% if company.rating == -1 %}<tr class="danger">
      {% elsif company.rating == 0 %}<tr class="warning">
      {% elsif company.rating == 1 %}<tr class="success">
      {% endif %}
        <th>{{company.name}}</th>
        <td>{{company.industry}}</td>
        <td>{{company.comments}}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>

