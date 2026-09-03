#!/bin/sh
# Regenerate the logo manifest from whatever is actually in public/logos.
# Run this after dropping new PNGs in. Slugs are the filenames without .png.
cd "$(dirname "$0")/.."
printf '{ "have": [' > src/lib/logo-manifest.json
first=1
for f in public/logos/*.png; do
  [ -e "$f" ] || continue
  s=$(basename "$f" .png)
  [ $first -eq 1 ] && first=0 || printf ',' >> src/lib/logo-manifest.json
  printf '"%s"' "$s" >> src/lib/logo-manifest.json
done
printf '] }\n' >> src/lib/logo-manifest.json
echo "logo manifest:"; cat src/lib/logo-manifest.json
