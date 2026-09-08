#!/bin/sh
# Regenerate the logo manifest from whatever is actually in public/logos.
# Run this after dropping new marks in. The slug is the filename without its
# extension; SVG and PNG are both accepted, so the manifest records the real
# filename per slug rather than assuming one.
cd "$(dirname "$0")/.."
printf '{ "have": {' > src/lib/logo-manifest.json
first=1
for f in public/logos/*.png public/logos/*.svg; do
  [ -e "$f" ] || continue
  n=$(basename "$f")
  s=${n%.*}
  [ $first -eq 1 ] && first=0 || printf ',' >> src/lib/logo-manifest.json
  printf ' "%s": "%s"' "$s" "$n" >> src/lib/logo-manifest.json
done
printf ' } }\n' >> src/lib/logo-manifest.json
echo "logo manifest:"; cat src/lib/logo-manifest.json
