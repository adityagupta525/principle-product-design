# Audio

**`bed.mp3` is the locked track.** 59.06s · 111.1 BPM · beat 16.202 frames ·
first downbeat at frame 9.9 · 27 bars of 64.81 frames.

Chosen for the venue, not for headphones. The film loops on a GFF booth, where
the room has a 75–85 dB crowd floor, the speakers reproduce nothing below about
100 Hz, and long reverb smears fast transients. Measured against that:

| track | DR | masked | longest gap | to full | presence 500Hz–4k |
|---|---|---|---|---|---|
| **bed.mp3** (locked) | 4.2 dB | 3% | 1.8s | 0.2s | **40.6%** |
| alt-hall-b.mp3 | 7.7 dB | 7% | 4.0s | 0.8s | 10.2% |
| alt-cinematic-online.mp3 | 36.2 dB | **52%** | **9.0s** | **16.0s** | 8.3% |

`alt-cinematic-online.mp3` is the better piece of music and the wrong one for
this room: 69% of its energy sits below 100 Hz where booth speakers produce
nothing, and its 9-second quiet passage reads as broken audio over a crowd.
Keep it for a seated screening or an online cut — it would need its own edit,
because the picture is cut to the arc of whichever track it runs on.

The cost of the locked track is honest: at 4.2 dB dynamic range it has no arc.
The picture carries the dynamics — cut rate, brightness, scale — instead of
borrowing them from the music.

Re-measure any replacement with:

    python3 tools/audit-music.py public/audio/bed.mp3
    python3 tools/audit-music.py public/audio/*.mp3   # comparison table
