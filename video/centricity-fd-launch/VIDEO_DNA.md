# VIDEO_DNA.md
### Centricity FD — Partner App · Launch Film
**Creative direction for the redesign — from "animated UI showcase" to "premium cinematic product-launch film".**

> This is the standard every frame is judged against. It does not add motion; it decides
> which motion is allowed. When a choice is unclear, the answer is the more restrained one.
>
> Format: 1920×1080 · 30fps · ~54s · one seamless GFF booth loop.
> Audience: MFD / distributor partners. Register: private banking, not consumer fintech.

---

## 0. The one-line thesis

**A quiet room, an intelligent product, one honest number.**
The film is not excited. It is *certain*. Confidence is shown by restraint — by how much
is left dark, still, and unsaid — not by how much moves. Every beat removes doubt rather
than adding spectacle.

The through-line, and the only story: **a question that used to go unanswered now has a
one-tap answer, sent in the client's own chat.**

---

## 1. Visual language

- **Premium wealth-tech, editorial.** Think the print supplement of a private bank, set in
  motion — generous margins, one idea per spread, type doing the talking.
- **The product is the set.** No illustration, no metaphor, no stock 3D props. The only
  objects that exist are the app, the device it lives on, the card it produces, and the
  light in the room. If a thing on screen is not the product or its light, it is wrong.
- **Dark neutral environment as default.** The room is near-black and warm-neutral, never
  blue-black, never "tech dark-mode". A single controlled copper key light models the space.
- **One bright thing at a time.** The eye is told where to look by *luminance*, not by
  colour or motion. The brightest object in the frame is always the subject.
- **The light act.** The film breathes once: dark → a single lit "daylight" passage for the
  proof (the growth curve + the shareable card) → back to dark for the payoff and loop.
  The brightness change *is* the emphasis; it is used exactly once, so it means something.
- **Negative space is a material.** Empty frame is not waste — it is the sound of confidence.
  A beat is allowed to be 70% empty.

---

## 2. Colour philosophy

Two grounds, one accent, ruthless discipline. All values are existing project tokens.

**The dark room (default — ~80% of runtime)**
| role | token | hex | use |
|---|---|---|---|
| void | `CINE.void` | `#0A0A0C` | the room; the true background |
| deep | `CINE.deep` | `#141417` | the faint step above void |
| key light | `CINE.key` | `#B69377` | the copper key modelling the space |
| bloom | `CINE.keyHot` | `#D9A87E` | the hottest point of the key, one accent word |
| type | `CINE.type` | `#ECE7E1` | text — **never pure white** |
| type-dim | `CINE.typeDim` | `#8C857E` | secondary text, labels |

**The light act (the proof — one passage)**
| role | token | hex |
|---|---|---|
| ground | `LIT.ground` | `#F7F2ED` — the app's own canvas, warm not clinical |
| ink | `LIT.ink` | `#2B1E19` |
| accent | `LIT.accent` | `#6B4B41` — copper that survives on cream |

**The single functional colour:** `gain` green (`#12B76A`) exists **only as a graphic** — the
rising line, the endpoint dot, the "up" rate. It is **never used as text on a light ground**
(fails contrast; logged as a DS gap). The number that matters is set in ink, not green.

**Rules**
- **One accent per frame.** Copper is a spotlight, not a paint. If two things are copper,
  one is wrong.
- **Warm-neutral only.** No blue, no violet, no teal, no cyan. The lone chromatic exception
  is `gain` green, and only as a data mark.
- **Never pure white type.** `#ECE7E1` on dark; ink on light. Pure `#FFFFFF` reads as UI, not film.
- **Colour never carries meaning motion should carry.** If a state changes, animate it;
  don't just recolour it.

---

## 3. Typography

Two families, already locked; the redesign makes the scale *authoritative* rather than ad-hoc.

- **Urbanist** — the film's voice. Headlines, kinetic type, the end card, captions.
- **Montserrat** — the product's voice and the brand. App chrome, the shareable card header,
  the co-brand lockup. It appears where the *product* speaks, never where the *film* speaks.
- **Numerals:** tabular figures, Indian grouping (`₹6,34,240`). Money never reflows.

**The ramp (enforced — no free-floating font sizes in shots):**
| role | size (px @1080) | weight | tracking | family |
|---|---|---|---|---|
| Hero display | 116–132 | 700 | −0.05em | Urbanist |
| Statement | 80–92 | 600–700 | −0.035em | Urbanist |
| Caption | 46–58 | 500 (accent 700) | −0.03em | Urbanist |
| Data hero | 64–210 | 700 | −0.02em | Urbanist tabular |
| Label / eyebrow | 15–19 | 600–700 | +0.14em, UPPERCASE | Urbanist |
| UI (inside device) | native product scale | per DS | per DS | Montserrat |

**Typographic laws**
- **One idea per frame.** A statement is one line, or two short lines. If it needs three, the
  beat is doing two jobs — split it.
- **Two-tone headline.** Lead words in `type`/ink, the final operative word in copper. Exactly
  one coloured word per line.
- **Type sets in the void beside the product, never on it.** No text over a live UI screen.
- **Kinetic type is legible first.** If a word cannot be read at booth distance for at least
  0.5s at rest, it is decoration, not typography — cut it.
- **Weight is animated, not swapped.** Urbanist is variable; the accent word pulls 500→800 on
  the beat. No font-file swaps mid-word.

---

## 4. Spacing & composition

- **A 12-column feel with fat margins.** Nothing important lives in the outer 8% of frame.
- **Rule-of-thirds, deliberately.** Subject on a third-line; the opposing negative space is
  where a single caption or number sits. Never both halves full.
- **The split-footer / split-frame instinct** from the product's own North Star: a small
  fixed element (a device, a label) against a large open field, `space/3` gap logic.
- **Vertical rhythm from the type ramp**, not eyeballed. Baselines relate by the scale steps.
- **One focal object.** If the composition has two competing subjects, rack focus or restage —
  do not shrink both to fit.
- **Booth-safe.** Legible at 3m on a bright floor: minimum on-screen type ~40px; key contrast
  ≥ 4.5:1 for anything that must be read; the important number is never in the outer margin.

---

## 5. Camera language

The camera is a **rig on a dolly**, never a handheld and never a game engine. It behaves like
mass on rails.

- **One move per shot.** A push, a truck, or a pull — never two. Chosen for meaning:
  push = *look closer / this matters*; pull = *step back / see the whole*; truck = *move on*.
- **Always still running at the cut.** The camera never fully comes to rest before a cut; it
  eases through the boundary so the next shot inherits momentum. Rest reads as "screenshot".
- **Slow.** World/camera speed is the slow clock (see §9). A hero move travels for the whole
  shot, not in a burst.
- **Parallax, not zoom.** Depth changes come from planes moving at different rates
  (`useCamera` × `Plane` depth), not from a lens punch.
- **Perceptual scale.** Every scale move uses perceptual-scale easing so large scales don't
  appear to decelerate. Growth should feel linear to the eye.
- **The macro is a statement.** A 2–3× crop onto a single interaction is reserved for the one
  thing the beat is about — the rate, the tap, the tick. Never macro on filler.

---

## 6. Depth language

- **Three planes, always.** Foreground subject · product/panel · room field, at roughly
  0.30 / 0.12 / 0.04 parallax. No shot is flat.
- **Depth of field is a pointer.** Usually one plane is sharp. A rack from panel to card is a
  cut we don't have to make — use it instead of a hard cut when two ideas share a beat.
- **Light models depth.** The copper key, the contact shadow under a floated object, and the
  bloom behind a lit screen are what make a rectangle read as an object in a room.
- **Haze for distance.** A single drifting haze plane separates the subject from the void;
  it never reads as fog or "atmosphere for its own sake".
- **Selective 3D** (see §11) is the deepest tool — spent only where a flat plate can't sell
  the object.

---

## 7. UI motion language ("realistic UI motion")

The UI must move like the *real product under a real finger*, not like a motion-graphics
mock. This is the difference the audience (partners who use the app) will feel instantly.

- **Interface speed is the fast clock.** A row arrives in ~270ms, a tap depresses in ~160ms,
  a sheet rises in ~370ms. Anything slower reads as fake.
- **Real interaction, real consequence.** A chip is tapped → the number recomputes. A card is
  sent → the delivery tick evolves clock→sent→delivered→read. State changes are *caused*,
  never ambient.
- **Physics the OS would use.** Sheets use the drawer curve; lists stagger 30–80ms per row
  with a small overshoot-and-settle (a real row lands, it doesn't glide).
- **Nothing appears from `scale(0)`.** UI elements enter from 0.9–0.94, with opacity — things
  in the world do not materialise from nothing.
- **Exits are faster than entrances** (~2:3). Leaving is decisive.
- **The device is honest.** Screen content is aligned to the real glass to the pixel; the
  mockup and its content must never disagree. If the whole screen shows, it sits in a device;
  a tight macro drops the chrome (we are *inside* the screen).

---

## 8. Kinetic typography rules

- **Reveal, don't fly.** Type enters by mask-and-rise (clipped container, word rises into it)
  or by a resolve (letterform pull-back). No spinning, no bouncing, no character scatter.
- **Per-word, small stagger.** 2 frames (~65ms) between words. The line assembles; it does not
  cascade.
- **Directional motion blur on the move only.** A word carries a smear proportional to its
  velocity, and only while moving; it is crisp at rest. This is the single biggest "cinematic
  vs template" tell for type.
- **The letterform-zoom transition** (open inside one glyph of the headline, pull back to the
  full line) is the one *showpiece* type move — used once, for the film's central claim.
- **Scale contrast between beats.** A frame-filling word followed by a small centred line is a
  legitimate rhythm tool; use it once so it reads as intent, not inconsistency.
- **Type never competes with UI.** When a screen is live, type waits or sits in the void beside
  it — never both animating at once.

---

## 9. Easing rules

No springs on the brand/type layer — "expensive things don't bounce". Springs are permitted
*only* inside the device, for genuine UI feedback, and even there sparingly.

| curve | bezier | use |
|---|---|---|
| `out` | `0.23, 1, 0.32, 1` | anything entering |
| `outExpo` | `0.16, 1, 0.3, 1` | hero reveals, the strongest snap-in |
| `outQuint` / `outQuart` | `0.22,1,0.36,1` / `0.25,1,0.5,1` | settles, camera, secondary |
| `inOut` | `0.77, 0, 0.175, 1` | things already on screen, moving |
| `drawer` | `0.32, 0.72, 0, 1` | sheets and panels (the iOS drawer feel) |

- **Never ease-in on an entrance.** It delays the first movement — the exact moment the eye is
  watching — and reads as sluggish at any duration.
- **Two clocks, held far apart.** Interface (fast, 5–11f) vs camera/world (slow, whole-shot).
  The *gap* between them is what sells the film; collapsing them makes the UI look like a mockup.
- **Scale ⇒ perceptual-scale easing**, always.
- **Motion blur is tied to velocity**, never to a fixed amount.

---

## 10. Transition rules

- **Hard cuts are the default,** and they land on the grid: every cut sits **2 frames before
  the downbeat** (measured: 111.1 BPM, beat 16.202f, bar 64.81f). The eye takes the new frame
  just before the ear takes the beat — the hit lands harder than a simultaneous cut.
- **No dissolves, no wipes, no slides, no flips, no page-turns.** Those are template moves.
- **Motion carries across the cut.** The outgoing camera is still moving; the incoming shot
  starts already in motion in a compatible direction. Continuity of velocity, not of content.
- **Match-cuts where the product allows** — a shape, a position, or the accent word carried
  from one shot to the next.
- **Rack focus is the only "soft" transition,** used within a beat, not between beats.
- **The loop seam is invisible by construction.** The film ends dark and begins dark; the next
  client's message is already arriving as it turns over. Never end bright — it would flash.

---

## 11. 3D rules ("selective 3D")

3D is a scalpel, not a world. The film is 2D compositing with parallax; 3D appears only where a
flat plate cannot sell the object.

- **Where 3D is earned:** the hero device (a genuine rounded-body phone the camera can orbit
  and light), and possibly the shareable card as a real slab that turns. Nowhere else.
- **How:** a real mesh (rounded-box body, `meshPhongMaterial`), the **screen as a texture** —
  the app screen pre-rendered and mapped on — lit by the same one copper key + soft ambient as
  the room. It must sit in the *same* light as the 2D beats or it will read as pasted-in.
- **Motion of a 3D object is still one slow move** — a few degrees of orbit, a settle. No
  tumbling, no full spins, no turntable. The template's constant multi-rotation is a *demo*
  behaviour and is explicitly rejected.
- **3D must survive the booth loop and the render budget.** WebGL (`angle`) on, but no scene so
  heavy it can't render deterministically. If a 3D beat isn't clearly better than the plate,
  keep the plate.
- **No 3D text, no extruded logos, no floating geometry, no particles.**

---

## 12. Sound-design direction

The track is locked and measured; sound design serves the picture, never the reverse.

- **The bed** (`bed.wav`, 111.1 BPM) is the spine. Every visual accent already derives from it.
- **Interface foley, low in the mix.** Typing under the chat, a soft whoosh the frame a bubble
  or card moves, a click on a tap, ticks with the delivery checks. These make the product feel
  *physical*; they sit well under the music and never announce themselves.
- **Booth-aware.** Mixed for an exhibition floor: 500 Hz–4 kHz presence carries over crowd
  noise; nothing critical lives below ~100 Hz (booth speakers roll it off).
- **Silence is a tool.** The setup beat (the unanswered questions) can drop to near-silence so
  the answer lands louder.
- **One hero sound per act,** at most — the ignition, the send. No wall of risers, no
  braaam, no ticking-clock cliché.
- **The loop is seamless in audio too** — the bed's tail equal-power crossfades into its head.

---

## 13. Motion grammar — Reveal → Focus → Transform → Resolve

Every beat is one pass of this four-stroke grammar. If a beat can't be described in these four
strokes, it is doing too much. Not every stroke is equal length — most of the time lives in
**Focus**; **Transform** is the shortest and sharpest.

**REVEAL** — *the subject arrives.*
- One object enters the dark: a lit screen, a card, a headline. Mask-and-rise for type; a
  screen switches *on* rather than fading in. Camera already drifting. ~15–25% of the beat.

**FOCUS** — *the eye is directed and held.*
- The camera closes or the frame racks to the one thing that matters. The UI does its real
  work here (a row deals in, a number recomputes, a tap lands). Longest stroke. This is where
  restraint lives — the frame is allowed to breathe. ~40–55% of the beat.

**TRANSFORM** — *the beat's single change happens.*
- The one consequential move: the rate lifts out of the screen, the amount recomputes, the card
  detaches, the message sends, the tick turns blue. Fast, on the downbeat, with motion blur.
  The shortest, sharpest stroke. ~10–20% of the beat.

**RESOLVE** — *it settles and hands off.*
- The result holds just long enough to read, the caption names the benefit (never narrates the
  UI), and the camera is still moving as the cut arrives — carrying velocity into the next
  Reveal. ~15–25% of the beat.

Mapped to the current 11 beats:
| beat | Reveal | Focus | Transform | Resolve |
|---|---|---|---|---|
| Ask | question bubbles type in | three questions sit unanswered | — (deliberately no transform: the *lack* is the point) | "No answer." holds, dark |
| Ignite | screen switches on in the device | product reads on the lit phone | title resolves beside it | holds into the compare |
| Compare | list deals in | six issuers, camera travels down | 8.25% lifts out of the screen | figure holds, device recedes |
| Calculate | calculator appears | chips, camera pushes | amount recomputes across all rows | best return holds |
| Curve (light) | ground lifts to daylight | two paths draw | the gap fills, "₹87,877 more" | number holds |
| Assemble (light) | card builds | annotations tick on | — (the card *is* the transform of the data) | card holds, back to dark |
| Detach | card lit in the room | rim rakes across it | it lifts off the screen | airborne |
| Flight | card crosses dark space | the arc | — | approaches the phone |
| Land | client's WhatsApp opens | the thread | the card sends; ticks evolve | "Sent by: Ashish Gupta" |
| Book | booking sheet | client selected | booked → confirmations | "Booked in under 3 minutes" |
| Resolve | pull back | lockup fades up | — | next client's message arrives; loop |

---

## 14. What NOT to do

Hard "no" list. Any of these is a defect regardless of how good it looks in isolation.

- ❌ **No generic AI neon** — no electric blue/violet/cyan glows, no synthwave, no HUD sci-fi.
- ❌ **No excessive glassmorphism** — no frosted panels stacked for their own sake. One honest
  surface per object.
- ❌ **No excessive gradients** — gradients model light (a bloom, a falloff) or they don't
  exist. No decorative mesh gradients, no rainbow sweeps.
- ❌ **No random particles, sparkles, bokeh, confetti, dust fields.**
- ❌ **No over-animation** — if everything moves, nothing is emphasised. Most of the frame is
  still most of the time.
- ❌ **No spinning / bouncing / elastic brand type.** No spring on headlines or the logo.
- ❌ **No dissolves, wipes, slides, flips, light-sweeps as transitions.**
- ❌ **No pure white, no pure black-blue tech dark-mode.**
- ❌ **No two accent colours in a frame; no accent used as decoration.**
- ❌ **No text over live UI; no three-line captions; no narrating what the screen already shows.**
- ❌ **No 3D turntables, extruded logos, floating geometry, or 3D that doesn't share the room's light.**
- ❌ **No motion without cause** — every movement is a reveal, a focus, a transform, or a resolve.
- ❌ **No unverified numbers on screen at release** — rates need compliance sign-off + "as on ⟨date⟩";
  logos must be the real marks, not colour tiles.

---

## 15. The test for every frame

Before any shot ships, it must pass all five:
1. **Is there exactly one subject, and is it the brightest thing?**
2. **Could a partner tell what the product just did — without the caption?**
3. **Is the camera still moving, and is only what matters moving with it?**
4. **Would this frame look wrong in a bank's boardroom?** (If yes, it's too much.)
5. **Does it read at 3 metres on a bright floor?**

If a frame fails one, it is not finished — no matter how much motion it contains.
