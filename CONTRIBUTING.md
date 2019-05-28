1. To begin, [fork this project], clone your fork, and add our [upstream].

  ```bash
  # Clone your fork of the repository into the current directory
  git clone https://github.com/<Mindticlle/mt-react-components
  # Navigate to the newly cloned directory
  cd mt-react-components
  # Install the tools necessary for development
  npm install
  ```

2. Be sure your code follows our practices.

  ```bash
  # Test current code
  npm run test
  # Ensure you meet our linting rules
  npm run lint
  ```

  Our `npm run test:watch` tests and _watch_. 
  You can run `npm run lint:fix` which will fix all eslint errors.

3. Running our demo page.

  We use the awesome [react-story](https://github.com/storybooks/react-storybook)!

  ```bash
  npm run start
  ```

