/*eslint-disable */
const {readdirSync, lstatSync} = require("fs");
const {join} = require("path")
const chalk = require("chalk")

const sourceDir = join(__dirname, '..', 'src')

const files = readdirSync(sourceDir);

listModules(files)

function listModules(files) {
  const filteredFolder = files.filter(item => {
    let itemPath = join(sourceDir, item)
    return (
      new RegExp(/^(?!.*images|styles).*$/g).test(item) &&
      lstatSync(itemPath).isDirectory()
    );
  });
  console.log("==========Components Builded=========");
  console.log(chalk.green(filteredFolder.join("\n")));
  console.log("=====================================");
}
