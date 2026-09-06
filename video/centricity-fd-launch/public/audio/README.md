# Audio

**`bed.wav` is the locked track.** 54.005s · exactly **25 bars** · 1620 frames @30fps
111.1 BPM · beat 16.202 frames · first downbeat at frame 7.6 · bar 64.81 frames

Chosen by ear, then engineered for the room. The film loops on a GFF booth, where the
crowd floor is 75–85 dB, booth speakers reproduce almost nothing below 100 Hz, and long
reverb turns massed low-mids to soup.

## What was done to it

`source-hall-b.mp3` is the original. `tools/prep-track.py` fixed the two things the audit
measured against it — both engineering problems, not taste ones:

| | presence 500Hz–4k | masked | longest gap | to full | DR |
|---|---|---|---|---|---|
| source-hall-b.mp3 | 10.2% ✗ | 4.0s | 4.0s | 0.8s | 7.7 dB |
| **bed.wav** | **20.1%** ✓ | **0.0s** | **0.0s** | **0.0s** | 6.3 dB |

- **Spectrum.** −4 dB bell at 300 Hz to clear the mud reverb multiplies, +5 dB at 2.6 kHz
  into the band that survives a crowd, +2.5 dB shelf above 7 kHz for definition, and a
  70 Hz high-pass since a booth speaker cannot use anything under it. Zero-phase, done in
  the frequency domain, so nothing smears.
- **The loop seam.** The 4-second "gap" the audit flagged was not a hole in the middle —
  it was the outro fade at 55.2s, which on a booth screen is four seconds of dead air every
  minute. Trimmed to a whole 25 bars, then the track's own continuation is crossfaded over
  its head across 450 ms, equal-power. The end runs back into the start with no join.

## Why this one, over the track that measured best

`alt-hall-a.mp3` scores higher on presence (40.6%) and was the measurement winner. The
product owner preferred hall-b, and the ear caught something the metrics did not rank: it
has a **gentle rising arc** — bars 1–4 are the quietest, energy climbs steadily, and it
peaks at bar 20, frame 1231. On a loop that is worth more than raw presence, because every
cycle gets a natural swell and the peak lands exactly on the booking montage. `alt-hall-a`
is flat by comparison, with a dip.

## Alternates

- `alt-hall-a.mp3` — the measurement winner. Flat, very safe in a hall, no arc.
- `alt-cinematic-online.mp3` — the best piece of music of the three and the wrong one for
  this room: 69% of its energy sits below 100 Hz and 52% of it is masked. Keep it for a
  seated screening or an online cut, which would need its own edit.
- `source-hall-b.mp3` — the raw source of `bed.wav`. Kept so the prep can be re-run.

## Re-measure anything

    python3 tools/audit-music.py public/audio/bed.wav
    python3 tools/audit-music.py public/audio/*.mp3 public/audio/*.wav   # comparison
    python3 tools/prep-track.py <in> <out.wav>                            # re-prep
