# Dirk's Website


## Setup

### Heroku

```
heroku buildpacks:set heroku/ruby -a dirkkelly
heroku buildpacks:add https://github.com/interexchange/heroku-buildpack-hugo.git -a dirkkelly
heroku buildpacks:add https://github.com/interexchange/heroku-buildpack-nginx.git -a dirkkelly
```
