#!/bin/bash

# args
bin=rollup
src=$1
output=$2
env=$3

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
    local args="-c --environment INPUT_FILE:$1,OUTPUT_DIR:$2,BUILD_ENV=$3"
    echo "Build: "$bin $args
    npx $bin $args
}

input() {
    echo `find $1 -maxdepth 1 -type f`
}

sourcemapURL() {
    sed -i "s|URL=|URL=dist/|" `realpath $1`
}

# check
[[ -n "$src" ]] || error "Build source folder required!"
[[ -n "$output" ]] || error "Build output folder required!"

# main
clean $output
build `input $src` $output
exit
# sourcemaps

for f in `ls $output/*.min.js`; do
    [[ -f `realpath $f.map` ]] && sourcemapURL $f
done
