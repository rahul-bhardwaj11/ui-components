# Documenting Components

All components exported by `@mindtickle/mt-ui-components` are documented and displayed on our [github page](https://mindtickle.github.io/mt-ui-components/) (you probably are looking at it now).

It is rendered with [Storybook](https://storybook.js.org).

## Story

**story** is a term we use to describe single page which contains all documentation about component. For
instance, [this page with `<Button/>`](https://github.com/MindTickle/mt-ui-components/blob/master/src/components/Button/button.stories.js) is a story.

All of what you see in the aforementioned link is generated automatically from component source. The code examples, the list of props, the preview, all of it is done so you don't have to.

All you need is a little configuration.

## Creating a story

Stories are files with `.story.js` extension. These files go through webpack loader which extracts component metadata
and renders it. 
