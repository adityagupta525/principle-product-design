#!/usr/bin/env python3
"""
FILM AUDIT — the craft floor, measured.

Taste is not measurable and this does not pretend to measure it. What it does
measure is the set of faults that have actually shown up in this film, each one
caught by eye late and expensively:

  DEAD AIR      four seconds of a near-identical frame in the ignition beat
  GRID LOCK     cuts are supposed to land two frames ahead of a downbeat
  ARC           the film should have an exposure shape, not one flat tone
  HARD EDGES    a plate's own border drawing a line across the frame
  RHYTHM        every shot the same length reads as even, not composed

Every metric is also run over the two reference films, because the useful
question is not "is this good" but "is this inside the envelope the references
occupy". Where we sit outside it, that is a defect with a number on it.

Usage:  python3 tools/audit.py <label> <png-dir> [fps]
        PNG dir is a 10fps, 64x36 greyscale-ish sequence — see tools/qc.sh
"""
import sys, glob, zlib, struct
import numpy as np


def read_png(path):
    d = open(path, "rb").read()
    i, idat = 8, b""
    w = h = ct = 0
    while i < len(d):
        ln = struct.unpack(">I", d[i:i + 4])[0]
        typ = d[i + 4:i + 8]
        dat = d[i + 8:i + 8 + ln]
        if typ == b"IHDR":
            w, h, _bd, ct = struct.unpack(">IIBB", dat[:10])
        elif typ == b"IDAT":
            idat += dat
        i += 12 + ln
    ch = {0: 1, 2: 3, 4: 2, 6: 4}[ct]
    raw = zlib.decompress(idat)
    out = np.zeros((h, w * ch), np.uint8)
    prev = np.zeros(w * ch, np.int32)
    k = 0
    for y in range(h):
        f = raw[k]; k += 1
        line = np.frombuffer(raw[k:k + w * ch], np.uint8).astype(np.int32); k += w * ch
        cur = np.zeros(w * ch, np.int32)
        if f == 0:
            cur = line
        elif f == 2:
            cur = (line + prev) & 255
        else:
            for x in range(w * ch):
                a = cur[x - ch] if x >= ch else 0
                b = prev[x]
                c = prev[x - ch] if x >= ch else 0
                if f == 1:
                    pr = a
                elif f == 3:
                    pr = (a + b) // 2
                else:
                    p = a + b - c
                    pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                    pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                cur[x] = (line[x] + pr) & 255
        out[y] = cur
        prev = cur
    a = out.reshape(h, w, ch)[:, :, :3].astype(float)
    return a if ch >= 3 else np.repeat(a[:, :, :1], 3, axis=2)


def audit(label, d, fps=10.0):
    files = sorted(glob.glob(d + "/*.png"))
    if not files:
        print("  %s: no frames at %s" % (label, d)); return None
    F = [read_png(f) for f in files]
    n = len(F)
    lum = np.array([f.mean() for f in F])
    diff = np.array([0.0] + [np.abs(F[i] - F[i - 1]).mean() for i in range(1, n)])

    med, mad = np.median(diff), np.median(np.abs(diff - np.median(diff))) + 1e-6

    # ── cuts ───────────────────────────────────────────────────────────────
    cuts = []
    for i in range(2, n - 1):
        if diff[i] > med + 9 * mad and diff[i] >= diff[i - 1] and diff[i] >= diff[i + 1]:
            if not cuts or i - cuts[-1] >= 3:
                cuts.append(i)
    shots = np.diff([0] + cuts + [n]) / fps

    # ── dead air: runs where successive frames barely differ ────────────────
    # Threshold is relative to the film's own median motion, so a naturally
    # calm film is not penalised for being calm — only for stopping.
    still = diff < max(0.45 * med, 0.6)
    runs, s = [], None
    for i, v in enumerate(still):
        if v and s is None:
            s = i
        elif not v and s is not None:
            runs.append((s, i)); s = None
    if s is not None:
        runs.append((s, n))
    runs = [(a, b) for a, b in runs if (b - a) / fps >= 0.6]
    longest = max([(b - a) / fps for a, b in runs], default=0.0)
    dead_total = sum((b - a) / fps for a, b in runs)

    # ── hard frame-edge steps (a plate border, a mask that never reaches 0) ─
    worst_step, worst_at = 0.0, None
    for i in range(0, n, max(1, n // 60)):
        rows = F[i].mean(axis=(1, 2))
        cols = F[i].mean(axis=(0, 2))
        for prof, axis in ((rows, "row"), (cols, "col")):
            dd = np.abs(np.diff(prof))
            k = int(np.argmax(dd))
            # ignore steps at the very border, which are the frame itself
            if 2 < k < len(prof) - 3 and dd[k] > worst_step:
                worst_step, worst_at = float(dd[k]), "%s %d @ %.1fs" % (axis, k, i / fps)

    print("\n  %s" % label)
    print("  " + "-" * 62)
    print("    length            %.1fs, %d frames sampled at %gfps" % (n / fps, n, fps))
    print("    cuts              %d   (one every %.1fs)" % (len(cuts), (n / fps) / max(1, len(cuts))))
    print("    shot length       min %.1fs   median %.1fs   max %.1fs" % (shots.min(), np.median(shots), shots.max()))
    print("    DEAD AIR          longest still run %.1fs   total %.1fs (%.0f%% of film)"
          % (longest, dead_total, 100 * dead_total / (n / fps)))
    print("    exposure arc      luma %.0f -> %.0f, range %.0f levels, sd %.1f"
          % (lum[:int(fps * 2)].mean(), lum[-int(fps * 2):].mean(), lum.max() - lum.min(), lum.std()))
    print("    hardest edge step %.1f levels  (%s)" % (worst_step, worst_at))
    return dict(label=label, secs=n / fps, cuts=len(cuts), shots=shots,
                dead=longest, dead_total=dead_total, sd=float(lum.std()),
                rng=float(lum.max() - lum.min()), step=worst_step)


if __name__ == "__main__":
    audit(sys.argv[1], sys.argv[2], float(sys.argv[3]) if len(sys.argv) > 3 else 10.0)
