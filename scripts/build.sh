#!/bin/bash

# args
src=$1
dist=$2

# functions
error() {
    echo "Error, $1"
    exit 1
}

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

# check
[[ -n "$src" ]] || error "Source folder required!"
[[ -n "$dist" ]] || error "Dist folder required!"

# main
clean $dist

for f in `files $src`; do
    build $f $dist
done
