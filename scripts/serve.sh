#!/bin/bash

# args
port=${1:-1234}
dist=${2:-"./dist"}
html=${3:-"test.html"}

# config
bin=live-server
watch=$dist,$html

# existing
kill `pgrep -f $bin` 2>/dev/null

# main
npx $bin --port=$port --watch=$watch --no-browser --entry-file=$html &
pid=$!
sleep 0.5
echo "$bin started, pid: $pid!"
echo "Run kill $pid to terminate"

# release terminal
sleep 0.5
cat <<END 
END
