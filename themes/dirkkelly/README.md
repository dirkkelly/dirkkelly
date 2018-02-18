# Dirk Kelly

## Goals

I want to learn Hugo better so I am creating my own theme using the Bootstrap 4 framework

- [ ] Bootstrap 4
  - [ ] Responsive
  - [ ] Custom Theme CSS
- [ ] Multiple Layouts
  - [ ] Home
  - [ ] Articles
  - [ ] "Explore"
- [ ] Menu
- [ ] Comments
  - [ ] Disqus?
  - [ ] FOSS Alternative?

![Screenshot](todo)

## Contents

- [Installation](#installation)
- [Options](#options)
  - [Sidebar menu](#sidebar-menu)
  - [Sticky sidebar content](#sticky-sidebar-content)
  - [Themes](#themes)
  - [Reverse layout](#reverse-layout)
  - [Disqus](#disqus)
- [Author](#author)
- [Ported by](#ported-by)
- [License](#license)


## Installation

TODO

## Options

TODO

### ThemeColor

TODO

To use a theme, add the `themeColor` variable under `params`, like so:

**TOML**
```toml
theme = "dirkkelly"

[params]
  themeColor = "theme-base-09"
```

**YAML**
```yaml
theme: "dirkkelly"

params:
  themeColor: "theme-base-09"
```

To create your own theme, look to the Themes section of [included CSS file](https://github.com/poole/hyde/blob/master/public/css/hyde.css). Copy any existing theme (they're only a few lines of CSS), rename it, and change the provided colors.

### Disqus

You can optionally enable a comment system powered by Disqus for the posts. Simply add the variable `disqusShortname` to the `params` in your config file.

**TOML**
```toml
[params]
  disqusShortname = "dirkkellycom"
```

**YAML**
```yaml
params:
  disqusShortname: "dirkkellycom"
```

## Author
**Mark Otto**
- <https://github.com/mdo>
- <https://twitter.com/mdo>

## Ported By
**Steve Francia**
- <https://github.com/spf13>
- <https://twitter.com/spf13>

## License

Open sourced under the [MIT license](LICENSE.md).

<3
