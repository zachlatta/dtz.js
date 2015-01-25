#!/bin/sh

# Crazy magic sed-fu that gets rid of the ncurses bullshit.
./zork "$@" | sed 's/.$//' | sed 's/.*>//' | sed "s/\r\x1b\[/\n/g" | ./strip_control_chars | sed "s/^[0-9d][0-9d][0-9d]//" | sed "s/\x1b(B\x1b\[m//" | sed "s/\x1b\[34;1H//" | tail -n+3
