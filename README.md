# MT UI Components

> MT UI Components are a set of React UI components. The aim is to promote a consistent and reusable component library. 


##### [Demo](https://MindTickle.github.io/mt-ui-components/)

## Getting Started

### Installation
```bash
$ npm i 
```

### Usage

To use it inside your project
```
$ npm i git+ssh://github.com/MindTickle/mt-ui-components.git#master --save
```
#### Note: Ensure that all peerDependencies are installed.

If you are using webpack bundler inside your project, make sure following config is added to your sass-loader option.
This is needed to use JS variable inside scss files
```
var sassUtils = require("node-sass-utils")(sass);
const sassVars = require(<mt-ui-component_node_moduleDir> + "/lib/theme.js");
{
            loader: "sass-loader",
            options: {
              functions: {
                "get($keys)": function(keys) {
                  keys = keys.getValue().split(".");
                  let result = sassVars;
                  let i;
                  for (i = 0; i < keys.length; i++) {
                    result = result[keys[i]];
                  }
                  result = sassUtils.castToSass(result);
                  return result;
                }
              }
            }
          }
```
```jsx
import React from 'react';
import Button from '@mindtickle/mt-ui-components/lib/Button';
```
```jsx
const MyComponent = () =>
  <Button onClick={() => console.log('Button clicked!)')}>
    Click me!
  </Button>;
```

## Deployment

This project follows branch wise release. Just run following command from the branch you want ot build and commit/publish the artifacts.
```
$ npm run build:prod

```
### Deploying storybook

```
$ npm run deploy:sb
```

### Running storybook locally
```
$ npm run start
```

### Build component locally
```
$ npm run build:watch
```

### Local Development
For faster local development with this module, you can link them with npm as described below:

```
$ cd ~/mt-ui-components 
$ npm link
$ cd ~/your-project
$ npm link @mindtickle/mt-ui-components 
```
