"""
Audit a generated music bed before any frame is animated to it.

Reports the three things that decide whether a track can carry the edit:
  1. Real tempo  — measured, not the tempo we asked for. Every scene length in
     the film is a whole number of bars, so if the track is not at the tempo we
     briefed, the grid moves, not the track.
  2. Energy arc  — RMS per bar, so we can see whether the brief's shape
     (quiet open, build, mid drop, full return, decay) actually happened.
  3. Downbeat grid — where the bars land in seconds and frames at 30fps, which
     is what the Remotion timing sheet is built from.

Usage: python3 tools/audit-music.py <audio file> [fps]
"""
import sys, numpy as np, soundfile as sf

def load(path):
    """Any container soundfile can open — the generator hands back MP3."""
    x, sr = sf.read(path, dtype="float64", always_2d=True)
    return x.mean(axis=1), sr

def onset_envelope(x, sr, hop=512, win=2048):
    """Spectral flux: rectified frame-to-frame increase in magnitude spectrum."""
    frames = 1 + (len(x) - win) // hop
    window = np.hanning(win)
    mag = np.empty((frames, win // 2 + 1))
    for i in range(frames):
        seg = x[i * hop : i * hop + win] * window
        mag[i] = np.abs(np.fft.rfft(seg))
    flux = np.diff(mag, axis=0)
    flux[flux < 0] = 0
    env = flux.sum(axis=1)
    env -= env.mean()
    return env / (env.std() or 1.0), sr / hop

def tempo(env, fps_env, lo=60, hi=180):
    """Autocorrelation of the onset envelope, searched over plausible BPM."""
    ac = np.correlate(env, env, mode="full")[len(env) - 1 :]
    best = []
    for bpm in np.arange(lo, hi, 0.1):
        lag = fps_env * 60.0 / bpm
        i = int(round(lag))
        if 1 < i < len(ac):
            best.append((ac[i], bpm))
    best.sort(reverse=True)
    return best[0][1], best[:5]

def main():
    path = sys.argv[1]
    fps = float(sys.argv[2]) if len(sys.argv) > 2 else 30.0
    x, sr = load(path)
    dur = len(x) / sr
    env, fps_env = onset_envelope(x, sr)
    bpm, top = tempo(env, fps_env)

    bar = 4 * 60.0 / bpm
    bars = dur / bar

    print(f"file          {path}")
    print(f"duration      {dur:.2f}s  ({dur * fps:.0f} frames @ {fps:g}fps)")
    print(f"sample rate   {sr} Hz")
    print(f"measured BPM  {bpm:.1f}   (candidates: {', '.join(f'{b:.1f}' for _, b in top)})")
    print(f"bar length    {bar:.3f}s = {bar * fps:.2f} frames")
    print(f"whole bars    {bars:.2f}")
    print()

    # Energy per bar — the arc.
    print("bar  start    frame   RMS  shape")
    nb = int(bars)
    rms_all = []
    for b in range(nb):
        seg = x[int(b * bar * sr) : int((b + 1) * bar * sr)]
        rms_all.append(float(np.sqrt((seg ** 2).mean())) if len(seg) else 0.0)
    peak = max(rms_all) or 1.0
    for b, r in enumerate(rms_all, start=1):
        t = (b - 1) * bar
        blocks = int(round(28 * r / peak))
        print(f"{b:>3}  {t:>6.2f}s  {t * fps:>6.0f}  {r:.3f}  {'█' * blocks}")

    quiet = [b for b, r in enumerate(rms_all, 1) if r < 0.45 * peak]
    print()
    print(f"peak bar      {rms_all.index(peak) + 1}")
    print(f"quiet bars    {quiet if quiet else 'none — track is flat, no dynamic arc'}")

    # ── Phase ────────────────────────────────────────────────────────────
    # A BPM with no phase is useless to an editor. Correlate the onset
    # envelope against a pulse train at the measured period and at double
    # tempo, and report whichever aligns better plus where beat one actually
    # sits. That offset is what the timing sheet is anchored to.
    def align(period_s):
        lag = period_s * fps_env
        best_off, best_score = 0.0, -1e18
        for off in np.arange(0, lag, max(lag / 240, 0.05)):
            idx = np.arange(off, len(env), lag).astype(int)
            idx = idx[idx < len(env)]
            score = env[idx].mean() if len(idx) else -1e18
            if score > best_score:
                best_score, best_off = score, off
        return best_off / fps_env, best_score

    beat = 60.0 / bpm
    off1, sc1 = align(beat)
    off2, sc2 = align(beat / 2)
    if sc2 > sc1 * 1.02:
        beat, off, note = beat / 2, off2, f"double-time — real pulse is {bpm * 2:.1f} BPM"
    else:
        off, note = off1, "as measured"

    print()
    print(f"pulse         {60.0 / beat:.1f} BPM  ({note})")
    print(f"beat length   {beat:.4f}s = {beat * fps:.3f} frames")
    print(f"phase offset  {off:.3f}s = {off * fps:.1f} frames")
    print()
    print("cut grid (first 24 beats) — frame numbers to place cuts on, @%gfps" % fps)
    grid = []
    k = 0
    while off + k * beat < dur and k < 24:
        t = off + k * beat
        grid.append(f"{t * fps:7.1f}")
        k += 1
    for i in range(0, len(grid), 8):
        print("  " + " ".join(grid[i : i + 8]))
    print()
    print("NOTE: land cuts 2 frames BEFORE these numbers — the eye should see the")
    print("      new frame just before the ear hears the downbeat.")

if __name__ == "__main__":
    main()
