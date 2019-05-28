const rimraf = require('rimraf')
const {join} = require("path")

const buildDir = join(__dirname, "..", "lib")

module.exports = function() {
  rimraf.sync(buildDir)
}
