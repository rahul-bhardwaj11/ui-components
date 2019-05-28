#!/bin/bash
set -e
NPM_TOKEN=e1pNW9c3oIx0vo4n+Xu+JMBxTIen0XesvB7tcbCkfmc=

success() {
  echo  "\033[32;1m$1"
}

error() {
  echo "\033[31;1m$1"
}

if [ -z "$NPM_TOKEN" ]; then
  error "Unable to publish, missing environment variables"
  exit 0
fi

#npm set registry http://verdaccio.ops.mindtickle.com
npm config set //verdaccio.ops.mindtickle.com/:_authToken=$NPM_TOKEN > /dev/null 2>&1


# # release defaults to patch (last number in semver)
RELEASE="patch" && [ -n "$1" ] && RELEASE=$1

# # tag defaults to latest
TAG="latest" && [ -n "$2" ] && TAG=$2

# # cut the release
VERSION=$(npm --no-git-tag-version version $RELEASE | sed 's/v//')

success "VERSION: "$VERSION;
success "TAG: "$TAG

npm run build:prod && npm publish --tag $TAG

git add package.json
git commit -m "release: $VERSION"
git push --set-upstream origin master


success "published v$VERSION with TAG:"$TAG
