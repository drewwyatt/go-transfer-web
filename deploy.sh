#!/bin/bash

set -o errexit -o nounset

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against $TRAVIS_BRANCH -- skipping deploy."
  exit 0
fi

rev=$(git rev-parse --short HEAD)

cd dist

git init
git config user.name "Drew Wyatt"
git config user.email "drew.j.wyatt@gmail.com"

git remote add upstream "https://$GH_TOKEN@github.com/drewwyatt/go-transfer-web.git"
git fetch upstream
git reset upstream/gh-pages

touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git push -q upstream HEAD:gh-pages