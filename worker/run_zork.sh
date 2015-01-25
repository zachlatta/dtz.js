#!/bin/sh

# Crazy magic sed-fu that gets rid of the ncurses bullshit.
output=$(./zork "$@" | sed 's/\r/\n/g' | ./strip_control_chars | sed 's/^[ \t]*//' | sed 's/[ \t]*$//' | tail -n+7 | sed '$d')

if [ $# -eq 0 ]; then
  echo "$output"
else
  tmp="$output"
  for arg in "$@"; do
    tmp=$(echo "$tmp" | sed '1,/^>.*$/d')
  done
  echo "$tmp"
fi
