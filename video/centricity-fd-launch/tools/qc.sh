#!/bin/sh
# Extract a 10fps low-res sequence for tools/audit.py. One ffmpeg call per film:
# the bundled build has its `fps` filter stripped, so rate comes from -r.
set -e
src="$1"; out="$2"
rm -rf "$out"; mkdir -p "$out"
npx remotion ffmpeg -v error -i "$src" -r 10 -vf scale=48:27 "$out/%05d.png" -y
