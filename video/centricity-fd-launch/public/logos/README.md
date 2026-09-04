# Issuer + brand marks

The film ships with flat colour tiles standing in for these. The wiring to use
the real files is done and tested — it just needs the files.

## Why they are not already here

Figma serves issuer assets from `www.figma.com`, and Blostem serves its mark
from `blostem.com`. This environment's network policy denies both hosts at the
gateway. The proxy reports each directly:

    connect_rejected — gateway answered 403 to CONNECT
    host: www.figma.com:443
    host: blostem.com:443

The MCP bridge itself works: specs, metadata and screenshots all come through.
Only the bytes are blocked, and no retry or alternate URL gets around a policy
denial.

## What to drop in

SVG or PNG — both are accepted, and the manifest records whichever filename it
finds, so no code cares about the format. PNGs should be square, transparent or
on the issuer's own background, 128px or larger. Filenames must match these
slugs exactly:

    icici.png        ICICI Home Finance
    suryoday.png     Suryoday Small Finance Bank
    unity.png        Unity Small Finance Bank
    utkarsh.png      Utkarsh SF Bank
    shriram.png      Shriram Finance
    mahindra.png     Mahindra Finance
    centricity.png   the Centricity wordmark
    blostem.svg      the Blostem wordmark (white version)

`centricity.png` sits on the share card's dark header (#17120E) and again in
the end-card lockup, so it wants the WHITE version, not `centricity-logo-black`.

`blostem.svg` sits beside it in that same lockup, on the dark room — white
version too. Its published URL is

    https://blostem.com/logos/blostem-logo-white.svg

which has to be fetched from a machine that is not behind this egress policy,
then dropped in here.

## Then

    sh tools/logos.sh

That regenerates `src/lib/logo-manifest.json`. Every tile in the film swaps to
the real mark with no code change. Anything still missing keeps its colour
tile, so a partial drop is safe and the film never breaks.
