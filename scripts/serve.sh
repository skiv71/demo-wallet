#!/bin/bash

# args
port=$1
html=$2
dist=$3

# config
bin=live-server

# functions
error() {
    echo "Error, $1"
    exit 1
}

# check
[[ -n "$port" ]] || error "Port number required!"
[[ -n "$html" ]] || error "HTML path required!"

# existing
kill `pgrep -f $bin` 2>/dev/null

# main
watch=`[[ -n "$dist" ]] && echo $html,$dist || echo $html`
echo $html
echo $watch
npx $bin --port=$port --watch=$watch --no-browser --entry-file=$html &
pid=$!
sleep 0.5
echo "$bin started, pid: $pid!"
echo "Run kill $pid to terminate"

# release terminal
sleep 0.5
cat <<END 
END
