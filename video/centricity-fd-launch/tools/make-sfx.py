"""
Synthesise the film's UI sound design.

Generated rather than sourced, for one reason that matters: every hit has to
land on a frame we control. The typing taps sit under the chat's own typing
indicator, the send whoosh lands the frame each bubble pops, and the booking
ticks land with the green checks. Library sounds would need trimming to the
grid; these are born on it.

All of it is quiet and dry — the track carries the film, this only makes the
interface feel physical.

Usage: python3 tools/make-sfx.py
"""
import numpy as np, soundfile as sf, os

SR = 48000


def env(n, attack, decay, curve=2.5):
    a = int(SR * attack) or 1
    d = max(n - a, 1)
    return np.concatenate([np.linspace(0, 1, a), (1 - np.linspace(0, 1, d)) ** curve])[:n]


def noise(n, seed):
    return np.random.default_rng(seed).standard_normal(n)


def lowpass(x, cutoff, order=4):
    """One-pole cascade — gentle, no resonance, no scipy needed."""
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = x.copy()
    for _ in range(order):
        out = np.empty_like(y)
        z = 0.0
        for i, v in enumerate(y):
            z = (1 - a) * v + a * z
            out[i] = z
        y = out
    return y


def highpass(x, cutoff, order=2):
    return x - lowpass(x, cutoff, order)


def tap(seed=0):
    """A soft key press: a short filtered noise transient with a low thud."""
    n = int(SR * 0.055)
    click = highpass(noise(n, seed), 1400) * env(n, 0.0007, 0.05, 4.0)
    body = lowpass(noise(n, seed + 99), 340) * env(n, 0.001, 0.045, 3.0)
    x = click * 0.55 + body * 0.5
    return x / (np.abs(x).max() or 1) * 0.34


def whoosh():
    """Message sent: a rising filtered sweep, short and dry."""
    n = int(SR * 0.30)
    t = np.linspace(0, 1, n)
    src = noise(n, 7)
    # sweep the cutoff up by blending two filtered copies
    lo, hi = lowpass(src, 700), lowpass(src, 5200)
    x = lo * (1 - t) + hi * t
    x *= env(n, 0.008, 0.29, 2.2)
    tone = np.sin(2 * np.pi * (520 + 680 * t) * np.arange(n) / SR) * env(n, 0.01, 0.28, 3.2) * 0.18
    x = x * 0.5 + tone
    return x / (np.abs(x).max() or 1) * 0.30


def tick():
    """A confirmation tick for the booking steps — brighter, shorter."""
    n = int(SR * 0.10)
    t = np.arange(n) / SR
    tone = (np.sin(2 * np.pi * 1480 * t) * 0.6 + np.sin(2 * np.pi * 2220 * t) * 0.4)
    x = tone * env(n, 0.0015, 0.095, 4.5)
    x += highpass(noise(n, 3), 3000) * env(n, 0.0008, 0.03, 5.0) * 0.25
    return x / (np.abs(x).max() or 1) * 0.26


def chime():
    """FD Booked. One warm interval, the only pitched sound in the film."""
    n = int(SR * 1.05)
    t = np.arange(n) / SR
    x = (np.sin(2 * np.pi * 587.33 * t) * 0.5      # D5
         + np.sin(2 * np.pi * 880.00 * t) * 0.34   # A5
         + np.sin(2 * np.pi * 1174.66 * t) * 0.14) # D6
    x *= env(n, 0.004, 1.04, 3.4)
    return x / (np.abs(x).max() or 1) * 0.30


def main():
    os.makedirs("public/sfx", exist_ok=True)
    for name, x in [("tap-a", tap(1)), ("tap-b", tap(2)), ("tap-c", tap(3)),
                    ("send", whoosh()), ("tick", tick()), ("chime", chime())]:
        sf.write(f"public/sfx/{name}.wav", x.astype(np.float32), SR, subtype="PCM_16")
        print(f"{name:8} {len(x) / SR:.3f}s")


if __name__ == "__main__":
    main()
