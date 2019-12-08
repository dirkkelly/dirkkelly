---
title: Building a Hugo Progressive Web App with Gulp, ES6, SASS, and Bootstrap Support
date: 2019-12-08 20:38:18 +0800
subtitle: "It shouldn't be and it isn't difficult to set up a Hugo Progressive Web App which has full support for whatever CSS or JS libraries you like to use."
tags:
- Technology
- Dirk Kelly
- Blogging
- Go Hugo
aliases:
- /technology/building-hugo-gulp-es6-sass-bootstrap/
- /technology/building-pwa-hugo-gulp-es6-sass-bootstrap/
image: '/images/technology/2019-100-pwa.png'
featured: true
---

I've been using Hugo across a few different projects for almost 2 years now. Recently the Bootstrap team announced they'd be [replacing Jekyll with Hugo for their docs](https://blog.getbootstrap.com/2019/02/11/bootstrap-4-3-0/) which seems like pretty solid validation for the project.

I hope others decide to take Hugo on as their static site generator, I think the [community would benefit from having additional developers](https://github.com/gohugoio/hugo/graphs/contributors) as it receives more exposure. 

To help those who are looking to give it a go I thought I'd put together a how-to for what I would consider to be good practice for building a site in Hugo that supports ES6 and SASS.

In order to prep for this I have spent some time working on this site which you can [view the source code for on Github](https://github.com/dirkkelly/dirkkelly/tree/444d38c63ab15d3d3d5ef2aff9d5b2ca67ef8888). I am only building JavaScript and StyleSheets for this project, if you wanted to add fonts etc you could probably figure out the pattern from there.

## Don't Mess With The Folder Structure

There are quite a few example projects out there that move the Hugo files into something like a `site` folder. I really don't think this is necessary and it will only serve to confuse other people used to Hugo as well any content management frontends like [Forestry.io](https://forestry.io) (should you choose to use them).

## You'll Need Node, Yarn, and Gulp

There are definitely other ways to manage your assets, [Webpack](https://webpack.js.org/) being the most 'advanced' of them. I couldn't imagine a worse way to spend my weekend than wrapping my head around Webpack again for such a simple project though. 

So I'm going to recommend you just install Gulp to watch your assets and build them when you deploy. Feel free to disagree, if you really want feel free to submit a PR with a webpack implementation.

### [package.json](https://github.com/dirkkelly/dirkkelly/blob/444d38c63ab15d3d3d5ef2aff9d5b2ca67ef8888/package.json)

This should give you an idea of what node packages you'll need to install.

```json
{
  "name": "DirkKelly",
  "version": "1.0.0",
  "main": "dirkkelly.js",
  "engines": {
    "node": "11.x.x",
    "yarn": "1.x.x"
  },
  "license": "MIT",
  "private": true,
  "repository": {
    "type": "git",
    "url": "https://github.com/dirkkelly/dirkkelly.git"
  },
  "dependencies": {
    "bootstrap": "4.x.x",
    "gulp": "3.x.x",
    "gulp-concat": "2.x.x",
    "gulp-if": "3.x.x",
    "gulp-include": "2.x.x",
    "gulp-sass": "^4.x.x",
    "gulp-sourcemaps": "^2.6.5",
    "gulp-terser": "^1.x.x",
    "gulp-watch": "5.x.x",
    "iframe-resizer": "4.x.x",
    "jquery": "3.x.x",
    "popper.js": "1.x.x",
    "postcss-cli": "6.x.x"
  },
  "devDependencies": {
    "fancy-log": "1.x.x"
  }
}
```

### [gulpfile.js](https://github.com/dirkkelly/dirkkelly/blob/444d38c63ab15d3d3d5ef2aff9d5b2ca67ef8888/gulpfile.js)

```js
'use strict';

const concat = require('gulp-concat');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const include = require('gulp-include');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const watch = require('gulp-watch');

sass.compiler = require('node-sass');

const env = process.env.HUGO_ENV;
const production = ['production','staging'].includes(env);
const destination = production ? 'public' : 'static';

gulp.task('scripts', function() {
  return gulp.src([
      // including Popper.js fixes Bootstrap issues
      // https://github.com/twbs/bootstrap/issues/23381
      './node_modules/popper.js/dist/umd/popper.js',
      './src/js/*.js'
    ])
    .pipe(include({
      includePaths: [
        './node_modules/bootstrap/dist/js',
        './node_modules/jquery/dist'
      ]
    }))
    .pipe(gulpif(production, terser().on('error', console.error)))
    .pipe(gulp.dest('./' + destination + '/js'));
});

gulp.task('styles', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulpif(!production, sourcemaps.write('./maps')))
    .pipe(gulp.dest('./' + destination + '/css'));
});

gulp.task('build', ['scripts', 'styles'], function () {
});

gulp.task('serve', ['build'], function () {
  watch(['src/js/**/*','src/scss/**/*'], function() {
    gulp.start('build');
  });
});
```

#### Note

- `HUGO_ENV` is used to control the output directory.    
  When you're working locally with `hugo serve` you want them to build to the `static` dir, when you're building to production etc you want them in `public`.
- I'm using `terser`  and not `uglify` to get ES6 support.    
  This helps me with adding a keyword to blog title for better visibility, and 
  also means better javascript I guess.
- SCSS is always compressed, but in development a sourcemap is included for debugging.
- `serve` and `build` run the same commands, but `serve` keeps track of file changes. A benefit to webpack would be the live reload, but with Hugo I don't really see that as a benefit being that the site loads so quickly.

## You develop your assets in `./src`

### [src/js/dirkkelly.js](https://github.com/dirkkelly/dirkkelly/blob/444d38c63ab15d3d3d5ef2aff9d5b2ca67ef8888/src/js/dirkkelly.js)

```js
//= require jquery.js
//= require bootstrap.js

// ...
```

#### Notes

- You don't have to call your file `dirkkelly.js`, but you can if you want to.
- Because of the `includePaths` defined in the `Gulpfile.js` you can reference jQuery and Bootstrap directly (hopefully Bootstrap5 will be getting rid of jQuery dependency).
- There's some other code in this file that probably isn't relevant to your website, it just makes titles on my pages smaller as you scroll down.

### [src/scss/dirkkelly.scss](https://github.com/dirkkelly/dirkkelly/blob/444d38c63ab15d3d3d5ef2aff9d5b2ca67ef8888/src/scss/dirkkelly.scss)

```scss
@import 'node_modules/bootstrap/scss/bootstrap';

// ...
```

#### Notes

- You don't have to call your file `dirkkelly.scss`, but you can if you want to.
- I couldn't find a way (in the 45 seconds I tried) to have an includePath for bootstrap, lmk if this is doable.
- Feel free to call the folder `css` and update the `gulpfile.js` reference, this is just a habit I got into.
- Rest of the code in this file is just my site's styling.

## Just reference the assets in your templates

There's nothing special about your css or js now, they're just files that get output to the root of your project under their respective directories.

#### [layouts/\_default/baseof.html](https://github.com/dirkkelly/dirkkelly/blob/444d38c63ab15d3d3d5ef2aff9d5b2ca67ef8888/layouts/_default/baseof.html)

You should be using the [Base Templates and Blocks](https://gohugo.io/templates/base/) pattern in your layout, if you're not you'll just need to put this before your body tag. Then once you have this all working you should refactor to the [Base Templates and Blocks](https://gohugo.io/templates/base/) pattern.

```html
<html>
  {{ partial "head.html" . }}
  <body>
    <!-- ... -->
    <script src="/js/dirkkelly.js"></script>
  </body>
</html>
```

#### [layouts/partials/head.html](https://github.com/dirkkelly/dirkkelly/blob/444d38c63ab15d3d3d5ef2aff9d5b2ca67ef8888/layouts/partials/head.html)

My site's styling is very minimal (in fact I should really cut down on the bootstrap dependencies and I'm sorry for wasting your bandwidth), because of this though I do seem to get away with just loading the single css in the header.

```html
<head>
  <!-- ... -->
  <link rel="stylesheet" href="/css/dirkkelly.css" />
</head>
```

## Develop with Foreman

Those of us who have been using [Heroku](https://heroku.com) for many years and who have Ruby installed in their environment are well accustomed to using [Foreman](https://github.com/ddollar/foreman) for spinning up their applications for local development.

If Ruby isn't your thing then you may need another way to handle this step, basically though we need a way to run both Gulp and Hugo when we're developing.

### [Procfile.dev](https://github.com/dirkkelly/dirkkelly/blob/444d38c63ab15d3d3d5ef2aff9d5b2ca67ef8888/Procfile.dev)

Heroku best practice (you shouldn't be using Heroku for hosting Hugo by the way) is to have a `Procfile` for production/staging and a `Profile.dev` for development. I guess old habits die-hard so this is something I'm still doing here.

```ruby
hugo: hugo serve --ignoreCache --buildDrafts --buildFuture --disableFastRender
gulp: gulp serve
```

### [bin/serve](https://github.com/dirkkelly/dirkkelly/blob/444d38c63ab15d3d3d5ef2aff9d5b2ca67ef8888/bin/serve)

You can execute this command independently, I just prefer to have a `bin/serve` executable common across static site projects to serve up a development server.

```bash
foreman start -f Procfile.dev
```

## Deploy with Netlify

You in no way have to use [Netlify](https://netlify.com) for hosting your production instance and I'm not going to get into too much detail about it, I do recommend checking them out if you don't know about them. Either way you're just going to need an environment where you can define the `HUGO_ENV` variable that will be picked up in the `gulpfile.js`

### [netlify.toml](https://github.com/dirkkelly/dirkkelly/blob/444d38c63ab15d3d3d5ef2aff9d5b2ca67ef8888/netlify.toml)

```toml
[build]
  publish = "public"
  command = "bin/build"

[build.environment]
  HUGO_VERSION = "0.59.1"
  HUGO_ENV = "production"

[context.production]
  command = "bin/build -b ${URL}/"

[context.deploy-preview]
  command = "bin/build -b ${DEPLOY_PRIME_URL}/"

[context.branch-deploy]
  command = "bin/build -b ${DEPLOY_PRIME_URL}/"
```

What I really like about Netlify is the automated preview environments tied to my pull requests, the `-b` flag allows me to pass through the domain to properly define the links.

`HUGO_ENV` is defined in the `build.environment`, technically I should be specifying the staging in the `deploy-preview` and `branch-deploy`, but I actually think I'd be better of just removing the `staging` reference in the `gulpfile.js`

### [bin/build](https://github.com/dirkkelly/dirkkelly/blob/444d38c63ab15d3d3d5ef2aff9d5b2ca67ef8888/bin/build)

```bash
gulp build
hugo $@
```

Again, you don't need the executable, I just do it for consistency.

In essence though you want to run `gulp build` and then run `hugo` (the `$@` is how I take through the arguments passed in the `netlify.toml`).

## Making it a Progressive Web App

I'll admit, the implementation I have so far of a PWA is enough to meet the requirements of Lighthouse and get me that 100% across the board. I have plans to do a lot more with this, especially on other projects, but having this foundation is the first step towards getting there.

[I followed another guide](https://www.silvestar.codes/articles/how-i-built-my-first-progressive-web-app-pwa/) to get here, hoping that this serves as another reference for other travelers

#### [layouts/\_default/baseof.html](https://github.com/dirkkelly/dirkkelly/blob/444d38c63ab15d3d3d5ef2aff9d5b2ca67ef8888/layouts/_default/baseof.html)

First thing you need for a PWA is a service worker, this will allow the site to tell the browser that it's going to be caching some files for offline support.

```html
<html>
  <!-- ... -->
  <body>
    <!-- ... -->
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/service-worker.js')
            .then((reg) => {
              // console.log('Service worker registered.', reg);
            });
        });
      }
    </script>
  </body>
</html>
```

#### [src/js/service-worker.js](https://github.com/dirkkelly/dirkkelly/blob/444d38c63ab15d3d3d5ef2aff9d5b2ca67ef8888/static/service-worker.js)

There are 4 key things going on here.

- Setting up `FILES_TO_CACHE` which includes the offline page.
- Adding all the files to the cache on `install`
- Removing the old cache files on `activate`
- Fetching the offline file in the event of a request failure

```js
const CACHE_NAME = 'dk-cache-v1.0';
const FILES_TO_CACHE = [
  '/index.html',
  '/offline/index.html',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/site.webmanifest',
  '/safari-pinned-tab.svg',
  '/favicon.ico',
  '/browserconfig.xml'
];

self.addEventListener('install', (event) => {
  // CODELAB: Precache static resources here.
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page')
      return cache.addAll(FILES_TO_CACHE)
    })
  )
})

self.addEventListener('activate', (event) => {
  // CODELAB: Remove previous cached data from disk.
  event.waitUntil(
    caches.keys().then(keyList => Promise.all(keyList.map((key) => {
      if (key !== CACHE_NAME) {
        console.log('[ServiceWorker] Removing old cache', key)
        return caches.delete(key)
      }
    })))
  )
})

self.addEventListener('fetch', (event) => {
  // CODELAB: Add fetch event handler here.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.open(CACHE_NAME)
          .then(cache => cache.match('/offline/index.html')
        )
      )
    )
  }
})
````

### [content/offline.md](https://github.com/dirkkelly/dirkkelly/blob/444d38c63ab15d3d3d5ef2aff9d5b2ca67ef8888/content/offline.md)

This page does need more work, I'm not caching the CSS or JS right now. Again I really just wanted to get this working so I could make further improvements later on.

```md
---
title: Offline
---

Check out on my [Twitter](https://twitter.com/dirkkellycom), I'm probably still rambling there.
```

## Go Forth and Build Something Delightful

I know there isn't much here, and really that's the point. It shouldn't be and it isn't difficult to set up a Hugo Progressive Web App which has full support for whatever CSS or JS libraries you like to use.

I hope this helps whoever finds it, especially if that's me whenever I start up my next project.

![PWA](/images/technology/2019-100-pwa.png)
