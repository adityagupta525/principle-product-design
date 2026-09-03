# Issuer + brand marks

The film ships with flat colour tiles standing in for these. The wiring to use
the real files is done and tested — it just needs the files.

## Why they are not already here

Figma serves asset files from `www.figma.com`, and this environment's network
policy denies that host at the gateway. The proxy reports it directly:

    connect_rejected — gateway answered 403 to CONNECT
    host: www.figma.com:443

The MCP bridge itself works: specs, metadata and screenshots all come through.
Only the bytes are blocked, and no retry or alternate URL gets around a policy
denial.

## What to drop in

PNG, square, transparent or on the issuer's own background, 128px or larger.
Filenames must match these slugs exactly:

    icici.png        ICICI Home Finance
    suryoday.png     Suryoday Small Finance Bank
    unity.png        Unity Small Finance Bank
    utkarsh.png      Utkarsh SF Bank
    shriram.png      Shriram Finance
    mahindra.png     Mahindra Finance
    centricity.png   the Centricity wordmark

`centricity.png` sits on the share card's dark header (#17120E), so it wants
the WHITE version, not `centricity-logo-black`.

## Then

    sh tools/logos.sh

That regenerates `src/lib/logo-manifest.json`. Every tile in the film swaps to
the real mark with no code change. Anything still missing keeps its colour
tile, so a partial drop is safe and the film never breaks.
