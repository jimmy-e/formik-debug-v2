#!/bin/bash

if [[ $BRANCH != "master" || $APP_ENV != "staging" ]]; then
  exit
fi

# clean the build directory
rm -rf build/

# set api url to the local api server
if [[ "$(uname)" == "Darwin" ]]; then
  sed -i "" "s|https://staging.onarchipelago.com|http://localhost:4300|" src/config.ts
else
  sed -i "s|https://staging.onarchipelago.com|http://localhost:4300|" src/config.ts
fi

# build assets
yarn build

# upload assets to local bucket
cd build
aws s3 sync --delete . s3://local-archipelago-web-assets

# reset api url
cd ..
git checkout src/config.ts

# clean build
rm -rf build/
