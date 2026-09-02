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

Also reports how a track will behave in a noisy exhibition hall, which is a
different problem from how it behaves in headphones:

  • Dynamic range — a hall has a 75-85 dB noise floor. Anything more than about
    12 dB below the track's loud level is simply not there.
  • Spectral balance — booth speakers roll off below ~100 Hz, so energy spent on
    sub-bass is energy the audience never hears. What cuts through a crowd is
    the 500 Hz - 4 kHz presence band.
  • Masked time — seconds of the track that will be inaudible in that room.
  • Time to hook — people walk past. How long before the track is at full
    strength decides whether they ever hear it.

Usage: python3 tools/audit-music.py <audio file> [<audio file> ...] [--fps N]
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

def hall_report(x, sr, label):
    """How the track behaves in an exhibition hall, not in headphones."""
    win = int(0.20 * sr)                       # 200 ms short-term windows
    n = len(x) // win
    st = np.array([np.sqrt((x[i * win : (i + 1) * win] ** 2).mean()) for i in range(n)])
    st = np.maximum(st, 1e-9)
    db = 20 * np.log10(st)

    loud = np.percentile(db, 90)               # the level the room is set to
    quiet = np.percentile(db, 10)
    dr = loud - quiet

    # A hall swallows anything much under the level it is mixed to.
    floor = loud - 12.0
    masked = float((db < floor).sum()) * 0.20
    longest = 0.0
    run = 0
    for v in db < floor:
        run = run + 1 if v else 0
        longest = max(longest, run * 0.20)

    # Time until the track first reaches 70% of its peak short-term energy.
    thresh = loud - 3.0
    hit = np.argmax(db >= thresh) * 0.20 if (db >= thresh).any() else float("nan")

    # Spectral balance, averaged over the file.
    nfft = 8192
    step = nfft
    acc = np.zeros(nfft // 2 + 1)
    cnt = 0
    w = np.hanning(nfft)
    for i in range(0, len(x) - nfft, step):
        acc += np.abs(np.fft.rfft(x[i : i + nfft] * w)) ** 2
        cnt += 1
    acc /= max(cnt, 1)
    freq = np.fft.rfftfreq(nfft, 1 / sr)
    total = acc.sum() or 1.0
    band = lambda lo, hi: 100.0 * acc[(freq >= lo) & (freq < hi)].sum() / total

    sub, lowmid, presence, air = band(0, 100), band(100, 500), band(500, 4000), band(4000, sr / 2)

    print()
    print(f"── hall behaviour · {label} " + "─" * max(0, 44 - len(label)))
    print(f"dynamic range     {dr:5.1f} dB   " + ("TOO WIDE for a hall" if dr > 15 else "workable" if dr > 9 else "tight — holds up"))
    print(f"masked time       {masked:5.1f} s    ({100 * masked / (len(x) / sr):.0f}% of the track inaudible over crowd noise)")
    print(f"longest gap       {longest:5.1f} s    " + ("a hole this long reads as a fault" if longest >= 2.5 else "acceptable"))
    print(f"time to full      {hit:5.1f} s    (how long a passer-by waits to hear the hook)")
    print(f"spectrum          sub<100Hz {sub:4.1f}%  |  low-mid {lowmid:4.1f}%  |  "
          f"presence 500-4k {presence:4.1f}%  |  air {air:4.1f}%")
    print(f"                  " + ("presence band is thin — will disappear in a crowd" if presence < 12
                                   else "presence band carries — cuts through"))
    return dict(label=label, dr=dr, masked=masked, longest=longest, hit=hit,
                sub=sub, presence=presence, dur=len(x) / sr)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    fps = 30.0
    if "--fps" in sys.argv:
        fps = float(sys.argv[sys.argv.index("--fps") + 1])

    if len(args) > 1:
        rows = []
        for path in args:
            x, sr = load(path)
            rows.append(hall_report(x, sr, path.split("/")[-1]))
        print()
        print("── verdict " + "─" * 58)
        print(f"{'track':<22}{'dur':>7}{'DR dB':>8}{'masked':>9}{'gap':>7}{'to full':>9}{'presence':>10}")
        for r in rows:
            print(f"{r['label']:<22}{r['dur']:>6.1f}s{r['dr']:>8.1f}{r['masked']:>8.1f}s"
                  f"{r['longest']:>6.1f}s{r['hit']:>8.1f}s{r['presence']:>9.1f}%")
        return

    path = args[0]
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

    hall_report(x, sr, path.split("/")[-1])


if __name__ == "__main__":
    main()
