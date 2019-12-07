//= require jquery.js
//= require bootstrap.js

function resizeHeaderOnScroll() {
  const distanceY = window.pageYOffset || document.documentElement.scrollTop,
  shrinkOn = 1,
  headerEls = document.getElementsByClassName('sticky-offset');

  for (let headerEl of headerEls) {
    if (distanceY > shrinkOn) {
      headerEl.classList.add("smaller");
    } else {
      headerEl.classList.remove("smaller");
    }
  }
}

window.addEventListener('scroll', resizeHeaderOnScroll);
