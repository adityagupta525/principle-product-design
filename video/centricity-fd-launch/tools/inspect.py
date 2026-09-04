#!/usr/bin/env python3
"""
FRAME INSPECTOR — every frame, no sampling.

tools/audit.py samples at 10fps / 48x27. That is the right resolution for the
questions it asks (arc, rhythm, dead air across the whole film) and the wrong
one for everything else: two thirds of the frames are never looked at, and at
48x27 a caption is thinner than a pixel. It measured this film as unchanged
after two captions were added to it, because it genuinely could not see them.

This looks at EVERY frame at 480x270 and reports what moved between each one
and the last. Nothing is skipped and nothing is averaged over a window.

What it answers:
  MOTION       per-frame delta, so any frame where nothing moved is visible
  HOLDS        every run of frames with no motion, with its start and length
  JUMPS        every frame whose delta is far above its local neighbourhood
  BLACK        every frame below a luma floor
  REGIONS      the frame split 3x3, so motion confined to one area is not
               hidden by nine cells' worth of averaging
  PER SHOT     all of the above bucketed by the cut list in lib/beat.ts

Usage:
    python3 tools/inspect.py <video> [--shots] [--csv out.csv] [--quiet-holds N]

    --shots         group the report by the shot boundaries in lib/beat.ts
    --csv           write the full per-frame table (every frame, every column)
    --quiet-holds   only report holds at least N frames long (default 6)

Frames are extracted to a temporary directory and deleted afterwards, so this
costs disk only while it runs.
"""

import sys, os, glob, subprocess, tempfile, shutil, argparse
import numpy as np
from audit import read_png

# The cut list, mirrored from lib/beat.ts. Kept as data rather than imported
# because this is a Python tool reading a TypeScript constant; if the grid
# changes there, change it here — the boundary check below will disagree loudly
# if they drift apart.
BEAT, PHASE = 16.202, 7.6
BAR = BEAT * 4
cut = lambda n: round(PHASE + (n - 1) * BAR - 2)
SHOTS = [
    ("ask", 0, cut(3)), ("ignite", cut(3), cut(5)), ("compare", cut(5), cut(9)),
    ("calculate", cut(9), cut(11)), ("curve", cut(11), cut(14)),
    ("assemble", cut(14), cut(16)), ("detach", cut(16), cut(17)),
    ("flight", cut(17), cut(18)), ("land", cut(18), cut(19)),
    ("book", cut(19), cut(23)), ("resolve", cut(23), 1620),
]

FFMPEG = os.path.join(os.path.dirname(__file__), "..", "node_modules", ".bin", "remotion")


def extract(video, into, width=480, height=270):
    """Every frame, no -r and no fps filter — those would resample."""
    subprocess.run(
        [FFMPEG, "ffmpeg", "-v", "error", "-i", video,
         "-vf", f"scale={width}:{height}", "-y", os.path.join(into, "%05d.png")],
        check=True,
    )
    return sorted(glob.glob(os.path.join(into, "*.png")))


def grey(path):
    a = read_png(path).astype(np.float64)
    return a if a.ndim == 2 else a[..., :3].mean(axis=2)


def measure(files):
    """Stream the frames: one in memory at a time plus its predecessor."""
    n = len(files)
    luma = np.zeros(n)
    delta = np.zeros(n)          # mean |this - previous|
    peak = np.zeros(n)           # the single most-changed pixel
    region = np.zeros((n, 9))    # 3x3, so localised motion survives averaging

    prev = None
    for i, f in enumerate(files):
        cur = grey(f)
        luma[i] = cur.mean()
        if prev is not None:
            d = np.abs(cur - prev)
            delta[i] = d.mean()
            peak[i] = d.max()
            h, w = d.shape
            for r in range(3):
                for c in range(3):
                    region[i, r * 3 + c] = d[
                        r * h // 3:(r + 1) * h // 3, c * w // 3:(c + 1) * w // 3
                    ].mean()
        prev = cur
    return luma, delta, peak, region


def runs_below(delta, thr, start=1):
    """Every maximal run of frames whose delta is under thr."""
    out, i, n = [], start, len(delta)
    while i < n:
        if delta[i] < thr:
            j = i
            while j < n and delta[j] < thr:
                j += 1
            out.append((i, j - i))
            i = j
        else:
            i += 1
    return out


def shot_of(f):
    for name, a, b in SHOTS:
        if a <= f < b:
            return name
    return "?"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("--shots", action="store_true")
    ap.add_argument("--csv")
    ap.add_argument("--quiet-holds", type=int, default=6)
    ap.add_argument("--still", type=float, default=0.05,
                    help="delta below this counts as no motion (default 0.05)")
    a = ap.parse_args()

    tmp = tempfile.mkdtemp(prefix="inspect-")
    try:
        files = extract(a.video, tmp)
        n = len(files)
        print(f"\n  {os.path.basename(a.video)} — {n} frames, every one measured\n"
              f"  {'-' * 68}")
        luma, delta, peak, region = measure(files)

        moving = delta[1:]
        print(f"    motion            mean {moving.mean():7.3f}   median {np.median(moving):7.3f}"
              f"   max {moving.max():7.3f} @ f{int(moving.argmax()) + 1}")
        print(f"    luma              min {luma.min():6.2f}   max {luma.max():6.2f}"
              f"   mean {luma.mean():6.2f}")

        black = np.where(luma < 3)[0]
        print(f"    black frames      {len(black)}"
              + (f"   first at f{black[0]}" if len(black) else ""))

        holds = [(s, L) for s, L in runs_below(delta, a.still) if L >= a.quiet_holds]
        held = sum(L for _, L in holds)
        print(f"    frozen frames     {held} of {n} ({100 * held / n:.1f}%)"
              f"   in {len(holds)} runs of >= {a.quiet_holds}f")

        # A jump is a frame far above its own neighbourhood, which is what a cut
        # is — and also what an unintended pop is. Both deserve to be listed.
        med = np.median(moving)
        mad = np.median(np.abs(moving - med)) or 1e-6
        jumps = [int(i) for i in np.where(delta > med + 12 * mad)[0] if i > 0]
        print(f"    jumps             {len(jumps)}   (delta > median + 12 MAD)")

        boundaries = {b for _, _, b in SHOTS if b < n} | {b for _, b, _ in SHOTS if b > 0}
        unexplained = [j for j in jumps if not any(abs(j - b) <= 1 for b in boundaries)]
        if unexplained:
            print(f"    ⚠ jumps NOT on a cut: {unexplained[:20]}"
                  + (" …" if len(unexplained) > 20 else ""))
        else:
            print(f"    ✓ every jump lands on a shot boundary")

        if holds:
            print(f"\n    HOLDS >= {a.quiet_holds}f — where the film stops moving")
            print(f"      {'start':>6} {'len':>5} {'sec':>6}  shot")
            for s, L in sorted(holds, key=lambda x: -x[1])[:24]:
                print(f"      {s:>6} {L:>5} {L / 30:>6.2f}  {shot_of(s)}")

        if a.shots:
            print(f"\n    PER SHOT")
            print(f"      {'shot':<10} {'frames':>7} {'motion':>8} {'still%':>7} {'peakΔ':>8}")
            for name, s, e in SHOTS:
                e = min(e, n)
                d = delta[s + 1:e]
                if not len(d):
                    continue
                still = 100 * (d < a.still).sum() / len(d)
                print(f"      {name:<10} {e - s:>7} {d.mean():>8.3f} {still:>6.1f}% {d.max():>8.2f}")

        if a.csv:
            with open(a.csv, "w") as fh:
                fh.write("frame,shot,luma,delta,peak," + ",".join(f"r{i}" for i in range(9)) + "\n")
                for i in range(n):
                    fh.write(f"{i},{shot_of(i)},{luma[i]:.4f},{delta[i]:.4f},{peak[i]:.2f},"
                             + ",".join(f"{v:.4f}" for v in region[i]) + "\n")
            print(f"\n    per-frame table → {a.csv}  ({n} rows, nothing sampled out)")
        print()
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    main()
