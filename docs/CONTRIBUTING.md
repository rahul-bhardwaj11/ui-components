# Contributing

We're happy for your input but we also want good quality. Hence contributors are required to:

* submit concise and clear issues with reproducible examples
* submit focused pull requests that tackle one thing only

## Contacts

* product/UI/UX [Himanshu Bansal] <himanshu.bansal@mindtickle.com>
* code/issues/PRs [Afroz Alam (@afrozMT)](https://github.com/afrozMT)

Do not hesitate to reach out, we are here to help.

## Setup

### Installation

```sh
npm install
```

Ensure packages are installed with correct version numbers by running:
```sh
(
  export PKG=@mindtickle/mt-ui-components;
  npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g; s/ *//g' | xargs npm install --save "$PKG"
)
```

```sh
npm start
open localhost:6006
```

`npm start` spins up a server at [localhost:6006](http://localhost:6006) with [storybook](https://storybook.js.org/). this is our reference/sandbox.

## Components guidelines

* One component per file
* All components in `src/components` folder

## Adding new component

* check github issues if no one else is working on same component
* design according to [Invision](https://projects.invisionapp.com/d/main#/projects/prototypes/14032629) design created by UX guild.
