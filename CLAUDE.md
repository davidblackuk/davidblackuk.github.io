# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal Jekyll blog hosted at [overtakenbyevents.com](https://www.overtakenbyevents.com) (GitHub Pages). Content focuses on retro computing (Atari ST, ZX Spectrum, Amstrad CPC), software development, and related topics.

## Running locally

```bash
# Serve with drafts visible (use this for development)
bundle exec jekyll serve --drafts --config _config.yml,_home.yml

# Build only
jekyll build
```

The `scripts/build` script is Mac-specific (hardcoded path) — don't use it on Linux.

## Creating a new post

Use the Thor task to scaffold a post with correct front matter:

```bash
thor post:new "My Post Title"
```

This creates `_posts/YYYY-MM-DD-my-post-title.md`. Alternatively, copy a template from `_templates/` (e.g. `spectrum.md` for retro content).

## Post front matter

```yaml
---
layout: post
title: "Post title"
tags: [tag1, tag2]
location: London, England
excerpt: ""
description: "One-line description for SEO/OG"
comments: true
share: true
thumbnail: "filename.png"   # relative to /thumbs/ — used for OG image
date: YYYY-MM-DD
---
```

- `thumbnail` images live in `/thumbs/` and are 1280×720 for OG/social previews
- Post images live in `/images/YYYY-MM-DD/` (one folder per post)
- `pageCSS` front matter key loads an extra stylesheet from `assets/css/`

## Architecture

- **Jekyll** with the [So Simple theme](https://github.com/mmistakes/so-simple-theme), Kramdown markdown, Rouge syntax highlighting
- **Layouts**: `_layouts/post.html` (articles), `_layouts/page.html` (static pages), `_layouts/bare.html`
- **Includes**: `_includes/head.html` (meta/OG tags), `navigation.html`, `footer.html`, `scripts.html`
- **CSS**: compiled from `assets/less/main.less` → `assets/css/main.min.css` via Grunt/recess. `assets/css/extra.css` for custom overrides
- **JS**: `assets/js/plugins/` + `assets/js/_*.js` → `assets/js/scripts.min.js` via Grunt/uglify
- **Grunt** (`grunt default`) rebuilds CSS/JS assets and optimises images — only needed when changing Less or JS

## Embedded apps

Two pre-built apps are served as static files (do not edit these):

- `fred-godot-dist/` — a Godot WebAssembly game
- `tstates-dist/` — an Angular app (Z80 T-state calculator)

## Drafts

Work-in-progress posts go in `_drafts/` (no date prefix needed). They render when serving with `--drafts`.

## Deployment

Push to `master` — GitHub Pages builds and deploys automatically. The `CNAME` file sets the custom domain.
