---
category:   engineering
layout:     post
title:      The Styleguide
author: dirkkelly
---

Over the past few months I've lead a charge at InterExchange to implement
a living StlyleGuide. After achieving initial buy-in I have released a 
working prototype which we'll soon be using in production on
[app.interexchange.org](app.interexchange.org).

Throughout this process I've encountered the following tools.

## [trulia/Hologram](https://github.com/trulia/hologram)

A living StyleGuide must be the source of the framework as well as the 
documentation, our original implementation was built on [pivotalexperimental/style-guide](https://github.com/pivotalexperimental/style-guide) in a
different area of the application, this quickly lead to the ignored documentation
conundrum.

[Trulia/Hologram](https://github.com/trulia/hologram) introduced a fresh
concept where the documentaiton would be written within the source code itself and subsequently
transformed into html for web browsing.

Having selected a build system it was time to determine the framework.

## [twbs/bootstrap](https://github.com/twbs/bootstrap)

I wanted to extend off of [twbs/bootstrap](https://github.com/twbs/bootstrap)
a framwork that I have been using successfully for a fair amount of time and had 
committed in version 3 to treat responsive design as a first level concept.

## [gulpjs/gulp](https://github.com/gulpjs/gulp/)

Gulp came up as a Google search result for a JavaScript library manager. I've long
suffered the guilt of how naive my Javascript library management was. Gulp treated
things like Bundler, and I like Bundler.

I wanted to avoid Ruby for the build system. Whilst having a very conservative
opinion of web application devlopment within nodejs, it was hard to ignore the speed
of the build and the simplicity of managing libraries.

### More to come

I'd like to start releasing more information about the StyleGuide we are building.

I'll be using [@dirkabroad](https://twitter.com/dirkabroad) to announce any updates
to this post.

