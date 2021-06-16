#!/usr/bin/env bash

echo "Building with API domain: $API_DOMAIN"

git checkout src/config.ts

# clean the build directory
rm -rf build/

# set api url to the local api server
if [[ "$(uname)" == "Darwin" ]]; then
  sed -i "" "s|https://staging.onarchipelago.com|https://$API_DOMAIN|" src/config.ts
else
  sed -i "s|https://staging.onarchipelago.com|https://$API_DOMAIN|" src/config.ts
fi

# build assets
yarn build

# reset api url
git checkout src/config.ts
