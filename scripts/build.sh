#!/bin/bash

# args
src=${1:-"./src"}
dist=${2:-"./dist"}

# functions
clean() {
    [[ -d $1 ]] || return
    echo "Clean - folder: $1..."
    rm -rf $1/*
}

build() {
    echo "Build - file: $1 ---> output: $2..."
    npx rollup -c --environment file:$1,dist:$2
}

files() {
    echo `find $1 -maxdepth 1 -type f`
}

# main
clean $dist

for f in `files $src`; do
    build $f $dist
done
