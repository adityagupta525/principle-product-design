"""
Prepare a chosen track for exhibition-hall playback and for looping.

The track is a taste decision and stays the track. This fixes the two things
the audit measured against it, which are engineering problems, not taste ones:

  1. Spectral balance. A booth speaker reproduces almost nothing below 100 Hz,
     and a reverberant hall turns massed low-mids into soup. Energy is moved
     out of the mud and into the 500 Hz - 4 kHz presence band, which is what
     actually cuts through a crowd. Zero-phase, done in the frequency domain,
     so nothing smears.

  2. The loop seam. The track ends on a fade, which on a booth screen is four
     seconds of dead air every minute. It is trimmed to a whole number of bars
     before the fade begins, then its own continuation is crossfaded over the
     head so the end runs back into the start with no join.

Usage: python3 tools/prep-track.py <in> <out.wav> [--bars N]
"""
import sys, numpy as np, soundfile as sf


def bell(f, fc, gain_db, q):
    """Smooth log-domain bell. Gentle curves only — no resonance wanted."""
    with np.errstate(divide="ignore"):
        oct_ = np.log2(np.maximum(f, 1e-6) / fc)
    return gain_db * np.exp(-(oct_ ** 2) / (2 * (1.0 / q) ** 2))


def shelf(f, fc, gain_db):
    return gain_db / (1.0 + (np.maximum(f, 1e-6) / fc) ** -3)


def highpass(f, fc):
    """-12 dB/oct below fc, expressed as gain in dB."""
    r = np.maximum(f, 1e-6) / fc
    return 20 * np.log10(r ** 2 / np.sqrt(1 + r ** 4))


def eq(x, sr):
    n = len(x)
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(n, 1 / sr)
    g = (
        highpass(f, 70)          # nothing lives below a booth speaker's floor
        + bell(f, 300, -4.0, 1.0)   # clear the mud that reverb multiplies
        + bell(f, 2600, 5.0, 0.9)   # the band that survives a crowd
        + shelf(f, 7000, 2.5)       # definition, so transients still read
    )
    return np.fft.irfft(X * (10 ** (g / 20)), n)


def tempo(x, sr):
    hop, win = 512, 2048
    frames = 1 + (len(x) - win) // hop
    w = np.hanning(win)
    mag = np.empty((frames, win // 2 + 1))
    for i in range(frames):
        mag[i] = np.abs(np.fft.rfft(x[i * hop : i * hop + win] * w))
    flux = np.diff(mag, axis=0)
    flux[flux < 0] = 0
    env = flux.sum(axis=1)
    env = (env - env.mean()) / (env.std() or 1)
    fps = sr / hop
    ac = np.correlate(env, env, "full")[len(env) - 1 :]
    best = max(
        ((ac[int(round(fps * 60 / b))], b) for b in np.arange(60, 180, 0.1)
         if 1 < int(round(fps * 60 / b)) < len(ac))
    )
    return best[1]


def fade_start(x, sr):
    """Where the outro drops below the level the room is mixed to."""
    win = int(0.2 * sr)
    n = len(x) // win
    st = np.maximum([np.sqrt((x[i * win : (i + 1) * win] ** 2).mean()) for i in range(n)], 1e-9)
    db = 20 * np.log10(st)
    floor = np.percentile(db, 90) - 12
    tail = n
    while tail > 1 and db[tail - 1] < floor:
        tail -= 1
    return tail * 0.2


def main():
    src, dst = sys.argv[1], sys.argv[2]
    x, sr = sf.read(src, dtype="float64", always_2d=True)
    mono = x.mean(axis=1)

    bpm = tempo(mono, sr)
    bar = 4 * 60.0 / bpm
    cut = fade_start(mono, sr)

    if "--bars" in sys.argv:
        bars = int(sys.argv[sys.argv.index("--bars") + 1])
    else:
        bars = int(cut // bar)
    keep = bars * bar
    print(f"tempo         {bpm:.1f} BPM   bar {bar:.3f}s = {bar * 30:.2f} frames")
    print(f"fade begins   {cut:.2f}s")
    print(f"trim to       {bars} bars = {keep:.3f}s ({keep * 30:.1f} frames)")

    y = np.stack([eq(x[:, c], sr) for c in range(x.shape[1])], axis=1)

    # Seamless loop: crossfade the track's own continuation over its head.
    xf = int(min(0.45, bar / 4) * sr)
    end = int(keep * sr)
    if end + xf <= len(y):
        t = np.linspace(0, 1, xf)[:, None]
        head, tail = y[:xf].copy(), y[end : end + xf]
        y = y[:end]
        y[:xf] = head * np.sqrt(t) + tail * np.sqrt(1 - t)   # equal power
        print(f"loop seam     {xf / sr * 1000:.0f} ms equal-power crossfade")
    else:
        y = y[:end]
        print("loop seam     no material past the trim point — hard cut")

    y /= max(np.abs(y).max(), 1e-9) / 0.891   # -1 dBFS
    sf.write(dst, y, sr, subtype="PCM_16")
    print(f"written       {dst}  {len(y) / sr:.3f}s")


if __name__ == "__main__":
    main()
