#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'New deployment'
git push -f git@github.com:sb5m/vue-app.git master:gh-pages

cd -