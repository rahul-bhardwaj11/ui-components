// /*eslint-disable */
const { readdirSync, writeFileSync, lstatSync, readFileSync } = require('fs');
const { join } = require('path');
const { spawn } = require('child_process');
const sourceDir = join(__dirname, '..', 'src');
const indexFilePath = join(sourceDir, 'index.js');
const prettier = require('prettier');

module.exports = function() {
  // generating index file
  const files = readdirSync(sourceDir, generateIndexFile);
  generateIndexFile(files);

  spawn('git', ['add', indexFilePath]);
};

function generateIndexFile(files) {
  const filteredFolder = files.filter(item => {
    let itemPath = join(sourceDir, item);
    return (
      new RegExp(/^(?!.*images|styles|Introduction|utils).*$/g).test(item) &&
      lstatSync(itemPath).isDirectory()
    );
  });

  console.log('==========Creating Index File========');
  let indexFile = _createIndexFile(filteredFolder);
  const prettierOptions = JSON.parse(readFileSync('./.prettierrc'));
  indexFile = prettier.format(indexFile, {
    parser: 'babylon',
    ...prettierOptions
  });
  console.log('==========Writing Index File=========');
  writeFileSync(indexFilePath, indexFile);
}

function _createIndexFile(files) {
  const fileString = `
  /***
   * Autogenerated file
   * Do not Change
   * This file is generated post build
   * */
  `;
  const fileLines = files.map(v => `export ${v} from './${v}';`);
  fileLines.unshift(fileString);
  fileLines.push('');
  return fileLines.join('\n');
}