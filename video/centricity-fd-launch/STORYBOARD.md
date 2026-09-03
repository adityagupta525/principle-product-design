# STORYBOARD.md
### Centricity FD — Partner App · Launch Film · Shot-level redesign
**Production-ready motion-design storyboard. Derived from the approved [VIDEO_DNA.md](./VIDEO_DNA.md).**

> Scope: 1920×1080 · 30 fps · 1620 frames · 54.00s · one seamless GFF booth loop.
> **The grid is preserved.** 111.1 BPM · beat 16.202f · bar 64.81f · every cut lands **2 frames
> before its downbeat** · two-clock timing (interface 5–11f / camera whole-shot). No beat is
> added, removed, or reordered. This document redesigns *within* the existing 11-beat spine.
>
> Story arc (locked): **question → discovery → comparison → intelligence → decision → action →
> outcome → confidence.**
> `Ask`=question · `Ignite`=discovery · `Compare`=comparison · `Calculate`+`Curve`=intelligence ·
> `Assemble`=packaging · `Detach`+`Flight`+`Land`=action · `Book`=decision→outcome · `Resolve`=confidence.
>
> Conventions: **f0** = a shot's local first frame. Absolute frames in `[brackets]`. Camera in
> normalized parallax units (z push, x/y truck). "perceptual-scale" = perceptual easing on scale.
> Cuts are hard unless stated; "still moving at the cut" is mandatory on the camera.

---

## SHOT GRID (authoritative timecodes)

| # | beat | frames | time | dur | arc role | priority | intensity |
|---|---|---|---|---|---|---|---|
| 1 | Ask | 0–135 | 0.00–4.50 | 135f | question | B | 2 |
| 2 | Ignite | 135–265 | 4.50–8.83 | 130f | discovery | **A** | 3 |
| 3 | Compare | 265–524 | 8.83–17.47 | 259f | comparison | B | 4 |
| 4 | Calculate | 524–654 | 17.47–21.80 | 130f | intelligence | B | 4 |
| 5 | Curve | 654–848 | 21.80–28.27 | 194f | intelligence | B | 3 |
| 6 | Assemble | 848–978 | 28.27–32.60 | 130f | packaging | B* | 3 |
| 7 | Detach | 978–1043 | 32.60–34.77 | 65f | action | B | 3 |
| 8 | Flight | 1043–1107 | 34.77–36.90 | 64f | action | C | 3 |
| 9 | Land | 1107–1172 | 36.90–39.07 | 65f | outcome | B | 4 |
| 10 | Book | 1172–1431 | 39.07–47.70 | 259f | decision | **A** | 4 |
| 11 | Resolve | 1431–1620 | 47.70–54.00 | 189f | confidence | B | 2 |

`B*` = Assemble is B by default, escalates to A only if the 3D card slab is approved.

---

## SHOT 1 · ASK — [0–135] · 0.00–4.50s · 135f

1. **Timecode:** 0–135 (0.00–4.50s)
2. **Beat:** Ask — the recurring, unanswered question.
3. **Story purpose:** Pose the problem in the partner's own world before the product exists.
4. **Viewer takeaway:** "Clients ask this every day, and the answer was always slow or absent."
5. **Hero visual:** Three large chat bubbles typing in, floating as lit UI cards in the dark room; compact contact header "● Sneha Patel · typing…".
6. **UI state:** WhatsApp thread — incoming bubbles only, typing-dots indicator preceding each.
7. **Camera position:** Subject stack left-of-centre (x≈−300), thesis in right negative space; framed a touch low.
8. **Camera movement:** Slow push z 1.00→1.10 across 135f **+** truck x +0.35→−0.35, y ±0.12. One continuous drift, never resting.
9. **Interface movement:** Per message (launches ~f8 / f40 / f72): typing-dots bubble (3 dots, sine-bob, 8f) → message resolves — bubble rise **46px→0**, scale **0.90→1.00 perceptual**, opacity 0→1 over 16f, the send landing **2f before** the local downbeat. Older bubbles hold (do not re-flow).
10. **Typography:** Bubbles Montserrat **40/600** ink on white, real tail, tabular where numeric; header **30/700**. Thesis Urbanist **46**: "Every day." / "Same question." / "No answer." — mask-and-rise per line, 8f stagger, final line copper.
11. **Depth / parallax:** Bubble stack plane 0.14 (perspective 1800, rotateY −13° / rotateX 6°, +26px translateZ per newer bubble); haze 0.04; room field behind. Thesis on a shallow right plane.
12. **Transition IN:** Cold open from black. Room lifts 0.34→1 over 12f; first bubble already composing at f6. No fade of content — the room *arrives*, the chat *types*.
13. **Transition OUT:** Final 20f (f115–135) defocus blur 0→12px + opacity ×0.4 on the whole stack; camera still pushing → carries into Ignite's switch-on. Hard cut at [135].
14. **Secondary motion:** Haze drift; the copper key breathing (sin, ~14s period); typing-dot sine.
15. **Sound/SFX:** Bed at near-silence (deliberate). Irregular typing taps under each dots-bubble; a soft "sent" tick as each message lands; low room tone. The quiet is the setup.
16. **Motion intensity:** **2/5.**
17. **3D justified?** No true WebGL. The "3D" is CSS perspective on the bubbles — sufficient and cheaper. Real 3D here would over-dress a setup beat.
18. **What must remain still:** The thesis block once each line has landed; the right ~40% negative space; the room walls; the older bubbles after they settle.

---

## SHOT 2 · IGNITE — [135–265] · 4.50–8.83s · 130f · **PRIORITY A**

1. **Timecode:** 135–265 (4.50–8.83s)
2. **Beat:** Ignite — the product appears.
3. **Story purpose:** Discovery. The first bright thing in the film is the app, lit, on a real device.
4. **Viewer takeaway:** "There is now one app that answers this."
5. **Hero visual:** The FD app switching **on** inside a real device in the dark; "Fixed Deposits" resolving in the void beside it.
6. **UI state:** CompareScreen live on the device (full screen, cropped by the bottom edge).
7. **Camera position:** Device left (x≈−445), title right; slightly low, three-quarter to the phone.
8. **Camera movement:** Push z 1.03→1.11 **+** truck x +0.7→−0.7; the device also lifts (translateY 30→−10) so the frame never rests.
9. **Interface movement:** **The screen does not fade — it switches on.** f0–8 the glass is dark (a phone in a room); f8–11 glass opacity 0→1 (outQuart); spill surge 1.9→1 over f8–26 throws copper light back into the room. No fake tilt — front-on plate, cropped.
10. **Typography:** "Fixed" / "Deposits" Urbanist **122/700**, one word per line, mask-and-rise (d=26,+4/word), "Deposits" copper; kicker "CENTRICITY × BLOSTEM" label-style above, f20.
11. **Depth / parallax:** Device plane 0.13; ghost word "COMPARE" plane 0.04 drifting behind; title plane 0.22.
12. **Transition IN:** Hard cut at [135] on the downbeat. The switch-on *is* the entrance — replaces any dissolve.
13. **Transition OUT:** Hold last ~10f; hard cut to Compare at [265] with the device still rising and camera still trucking (velocity carries).
14. **Secondary motion:** Ghost-word drift; spill bloom; key light.
15. **Sound/SFX:** One hero ignition sound on switch-on (~f8): a soft low impact + short rising tone; bed re-enters underneath. The film's first "voice".
16. **Motion intensity:** **3/5.**
17. **3D justified?** **YES — this is the prime selective-3D beat.** A real rounded-body phone the camera arcs past 6–8° as the glass lights reads dramatically better than a flat plate here, and only here does the object's *form* matter as much as its screen. Requires the CompareScreen pre-rendered as a screen texture. If the 3D version doesn't clearly beat the plate, keep the plate.
18. **What must remain still:** The title block once landed; the room; the negative space between device and type.

---

## SHOT 3 · COMPARE — [265–524] · 8.83–17.47s · 259f · one continuous take

1. **Timecode:** 265–524 (8.83–17.47s) — longest UI beat.
2. **Beat:** Compare — six issuers, one screen, one winner.
3. **Story purpose:** Comparison. Establish that every rate lives in one place and the best is unmistakable.
4. **Viewer takeaway:** "One screen shows every issuer, and 8.25% is obviously the winner."
5. **Hero visual:** The list dealing in as the camera travels down it; then the winning **8.25%** lifting *out* of the screen at ~10× while the device recedes.
6. **UI state:** CompareScreen; rows populate one per beat (~16f apart); then `focusAt` rate-lift.
7. **Camera position:** Macro on the list; the frame travels top→bottom of the screen.
8. **Camera movement:** Macro zoom 4.5→3.4 (× (1−lift·0.34)); fy travels 300→545 (+26 after); x +0.5→−0.5. Coupled to the deal — each row lands near frame-centre as the frame reaches it.
9. **Interface movement:** Each row enters translateX **−18→+3** (overshoot) then settle **+3→0** over 4f, opacity 0→1, a check-tick at +4f. At **LIFT** (≈ last-row + 26f): the Utkarsh rate detaches — figure scale **0.82→1.00 perceptual** + drift up 46px then a slow continued settle; the device blurs 0→11, opacity ×(1−0.66), and slides **right +360px** so the lifted number owns the frame.
10. **Typography:** On-device native (Montserrat). Lifted "8.25%" data-hero **210/800 gain-green** (a *graphic*, not text) with "Utkarsh SF Bank · 3Y" **27** label; caption "Six issuers, one screen." **50**, "one screen" copper, appears LIFT+16 in the right/left negative space with a linear scrim behind it.
11. **Depth / parallax:** Device plane 0.12; lifted figure on a nearer plane; scrim gradient between them.
12. **Transition IN:** Hard cut from Ignite at [265]; camera already travelling down the list.
13. **Transition OUT:** Hard cut to Calculate at [524]; the lifted figure still drifting, device gone right.
14. **Secondary motion:** Continuous camera travel (never stops); per-row overshoot; the lifted figure's slow settle-drift after it lands.
15. **Sound/SFX:** A low, soft deal-in tick per row (well under the bed); a low swell on the lift.
16. **Motion intensity:** **4/5.**
17. **3D justified?** No. A flat macro on the real screen is correct — 3D would tilt the list away from the eye and fight legibility. Keep 2D.
18. **What must remain still:** Column headers while rows deal; the lifted figure holds long enough to read before the cut; the caption once set.

---

## SHOT 4 · CALCULATE — [524–654] · 17.47–21.80s · 130f

1. **Timecode:** 524–654 (17.47–21.80s)
2. **Beat:** Calculate — the product computes.
3. **Story purpose:** Intelligence. It doesn't just list rates — it computes exact returns, live.
4. **Viewer takeaway:** "Change the amount, and every return recalculates instantly and correctly."
5. **Hero visual:** The calculator; the amount steps through the real chips ₹1L→₹5L→₹10L→₹25L; all six maturities recompute together; the camera pushes in as the money grows.
6. **UI state:** CalculatorScreen live; a chip lights every 2 beats; amount rolls; each row's maturity = amount×(1+rate)^tenure, recomputed every frame.
7. **Camera position:** Macro holding the amount field + chips + top three rows.
8. **Camera movement:** Push z 2.72→3.02 macro (× (1+growth·0.03), coupled to value); fy 228→276; y drift 0.55→−0.55.
9. **Interface movement:** Chip idle→active — background to headerInk, scale 1.06 — on tap (2f pre-downbeat); amount digit-roll over 11f (outQuart); all six maturity figures re-tally **simultaneously**, tabular, **no reflow**. The push accelerates a hair with each step so growth is felt.
10. **Typography:** On-device native. Caption "Exact returns, instantly." **58**, "instantly." copper, foot-left over the base vignette.
11. **Depth / parallax:** Device plane 0.12; foot caption over the falloff gradient.
12. **Transition IN:** Hard cut from Compare at [524].
13. **Transition OUT:** Hard cut to Curve at [654] — this cut **is the tone flip** into the light act (see Shot 5 IN). Camera still pushing.
14. **Secondary motion:** Chip pulse; the value-coupled camera push; digit roll.
15. **Sound/SFX:** A soft click per chip tap; a low count-shimmer under the digit roll.
16. **Motion intensity:** **4/5.**
17. **3D justified?** No — legibility of the recompute is the whole point.
18. **What must remain still:** "Top 6 FDs" header and column layout; the caption once set; the row order (only the figures change).

---

## SHOT 5 · CURVE — [654–848] · 21.80–28.27s · 194f · **the light act opens**

1. **Timecode:** 654–848 (21.80–28.27s)
2. **Beat:** Curve — the proof.
3. **Story purpose:** Intelligence made visible: the same money grows meaningfully more.
4. **Viewer takeaway:** "Same money, ₹87,877 more — and here's the shape of it."
5. **Hero visual:** A letterform pull-back opens **inside the ₹ glyph** → "Same money. ₹87,877 more." → two compounding paths draw on cream; the gap between them fills.
6. **UI state:** None — pure data-viz + kinetic type on the light-act ground.
7. **Camera position:** Diagram centre-left, endpoint labels right (paddingRight reserved).
8. **Camera movement:** Push z 1.0→1.15 + x 0.55→−0.55.
9. **Interface movement (diagram):** Grid fades f[D..D+18]; LOW line (savings 3.0%) draws over ~1.6 beats via stroke-offset; HIGH line (8.25%) draws starting a beat later; endpoint dots land last; gap fill 0→0.14 alpha; a short **white sheen runs the winning line on a loop** (the frame never fully rests).
10. **Typography:** Opener `LetterZoom` scale ~14→1 over f2–15, headline leaves upward ~beat 2.6; endpoint labels "₹6,34,240 / AT 8.25%" (ink) and "₹5,46,364 / IN SAVINGS" (secondary); axis "TODAY·1·2·3 YEARS" secondary; centre "Same money. **₹87,877** more." (amount gain-green as graphic).
11. **Depth / parallax:** Single diagram plane 0.1; `DayRoom` soft light-field drifting behind; warm floor. Body settles then continues −14px through the shot.
12. **Transition IN:** Hard cut at [654] landing on an **overexposure bloom 1→0 over 10f** — the film's single tone flip to daylight.
13. **Transition OUT:** Hard cut to Assemble at [848] (still light).
14. **Secondary motion:** Sheen travel on the winning line; body settle-drift; light-field drift.
15. **Sound/SFX:** Bed continues; a soft rising tone as the gap fills; **no UI foley** (no UI here).
16. **Motion intensity:** **3/5.**
17. **3D justified?** No — flat data-viz is the correct, honest register. 3D would cheapen the proof.
18. **What must remain still:** The grid and axis labels once drawn; the endpoint figures once landed (they must be read); the empty upper-left of frame.

---

## SHOT 6 · ASSEMBLE — [848–978] · 28.27–32.60s · 130f · **light act payoff** · B* (→A if 3D card)

1. **Timecode:** 848–978 (28.27–32.60s)
2. **Beat:** Assemble — the partner's shareable artifact.
3. **Story purpose:** Packaging the intelligence into a branded comparison card — *with the partner's name on it*.
4. **Viewer takeaway:** "The partner turns all this into a card they can send — their brand, their name."
5. **Hero visual:** The share card held past life size on cream; three annotation labels tick on with leader lines; the card yaws a few degrees to keep a highlight travelling its face.
6. **UI state:** ShareCard at scale ~2.24; DownloadScreen receding, soft, behind.
7. **Camera position:** Card left, annotation column right.
8. **Camera movement:** z 1.0→1.17 + x −0.75→+0.75.
9. **Interface movement:** Card builds strip-by-strip (delay 20); annotations at f34 / f52 / f66 — leader draws over 12f (outQuart), tether-dot pops (outExpo), label rises 10px→0; final ~7f the ground falls to void for the cut.
10. **Typography:** Annotations label-style ink: "Live rates, not a screenshot" / "Four issuers, one view" / "Your name on it"; card content native.
11. **Depth / parallax:** Card plane 0.30 (scale 2.24, perspective 2400, yaw ±4.5°); background panel plane 0.07, dimmed and soft.
12. **Transition IN:** Hard cut from Curve at [848] (still light).
13. **Transition OUT:** Final ~7f the light-act ground drops to void → hard cut into Detach lands on **dark** (no white flash). [978].
14. **Secondary motion:** Slow card yaw (highlight rakes its face); label leaders; light-field.
15. **Sound/SFX:** Soft tick per annotation; a low tone; the light act's closing settle.
16. **Motion intensity:** **3/5.**
17. **3D justified?** **Candidate #2.** The card as a real turning slab (shared room light) would be the second 3D object and would rhyme with Detach/Flight. But a CSS-perspective yaw already reads well — escalate to real 3D only if the flat version looks pasted-in. Default 2.5D.
18. **What must remain still:** The card body (it is held to be read); the labels once set; the negative space.

---

## SHOT 7 · DETACH — [978–1043] · 32.60–34.77s · 65f

1. **Timecode:** 978–1043 (32.60–34.77s)
2. **Beat:** Detach — the card lifts off the screen.
3. **Story purpose:** Action begins — the artifact becomes a thing that can leave.
4. **Viewer takeaway:** "This isn't a screenshot — it's a real object the partner sends."
5. **Hero visual:** The card lit in the dark room; a rim light rakes across its face as it lifts off the download screen; the contact shadow separates.
6. **UI state:** DownloadScreen behind; the card detaches from it.
7. **Camera position:** Card foreground, panel behind.
8. **Camera movement:** Slow push z 1.0→1.06.
9. **Interface movement:** Card scales up a few %, lifts off the panel (translateY up); a rim highlight sweeps **left→right across its face over ~40f**; the contact shadow drops and softens as it rises.
10. **Typography:** None (or a faint continuation of the card's own label).
11. **Depth / parallax:** Card foreground plane; panel recedes and blurs.
12. **Transition IN:** Hard cut from Assemble at [978] — onto dark.
13. **Transition OUT:** Hard cut to Flight at [1043]; the card is already moving up-right.
14. **Secondary motion:** Rim rake; shadow release; key light.
15. **Sound/SFX:** A soft "peel / whoosh" as it detaches, on the downbeat.
16. **Motion intensity:** **3/5.**
17. **3D justified?** Marginal. If Assemble's card went 3D, this is the *same* slab lifting (continuity → keep 3D). Otherwise a 2.5D rim-rake is enough.
18. **What must remain still:** The room; the receding panel (only blurs, doesn't drift).

---

## SHOT 8 · FLIGHT — [1043–1107] · 34.77–36.90s · 64f · **PRIORITY C**

1. **Timecode:** 1043–1107 (34.77–36.90s) — longest single continuous move.
2. **Beat:** Flight — the card crosses to the client.
3. **Story purpose:** Action in transit.
4. **Viewer takeaway:** "It's on its way to the client, now."
5. **Hero visual:** The card crossing dark space on an arc, tilted into travel, a motion-blur trail behind it.
6. **UI state:** Card only (ShareCard), no screen chrome.
7. **Camera position:** Wide on the dark room.
8. **Camera movement:** Slight pull z 1.06→1.0.
9. **Interface movement:** Card travels x **−600→+600** (inOut), y = −sin arc (peak −120px), scale **1.42→0.92**, rotateZ **−12°→+12°**; 4 ghost trail frames at lag 0/5/10/15 with fading opacity; directional smear along velocity; carries its own bloom.
10. **Typography:** None.
11. **Depth / parallax:** Single travel plane 0.26; room behind.
12. **Transition IN:** Hard cut from Detach at [1043]; card enters already moving.
13. **Transition OUT:** Hard cut to Land at [1107]; card approaching the phone position off-left.
14. **Secondary motion:** Bloom follows the card; trail ghosts.
15. **Sound/SFX:** One sustained low whoosh across the whole shot (the track keeps time here — it does not drop away).
16. **Motion intensity:** **3/5.**
17. **3D justified?** No — the arc + trail is a 2D compositing move; real 3D adds nothing and costs render.
18. **What must remain still:** The room. (This is the film's most kinetic shot by design — everything else moves.)

---

## SHOT 9 · LAND — [1107–1172] · 36.90–39.07s · 65f

1. **Timecode:** 1107–1172 (36.90–39.07s)
2. **Beat:** Land — delivered on WhatsApp.
3. **Story purpose:** Action → outcome. The card lands in the client's own chat, sent by the partner.
4. **Viewer takeaway:** "Delivered — in the client's WhatsApp, with the partner's name on it."
5. **Hero visual:** The client's WhatsApp thread in the real device; the card **sends** from the compose bar into the thread; the delivery tick evolves.
6. **UI state:** ChatScreen — empty thread → card lifts from compose (flyY 230→0, scale 0.62→1) → settles; tick **clock→sent→delivered→read**; follow-up "Ye comparison dekh lijiye." arrives; send-button pulse.
7. **Camera position:** Device left, "SENT BY: Ashish Gupta" caption in right negative space.
8. **Camera movement:** Push z 1.04→1.14 + x 0.3→−0.3.
9. **Interface movement:** Bubble rise+settle 18f; tick states at f+30 / +40 / +50; second message f+20/+34; send-button scale-pulse (1→0.86→1) at launch.
10. **Typography:** "SENT BY:" label **19** + "Ashish Gupta" **68/700** copper, glow up f40–60.
11. **Depth / parallax:** Device plane 0.12; caption plane right.
12. **Transition IN:** Hard cut from Flight at [1107]; the card "re-originates" from the compose bar — that *is* the send action.
13. **Transition OUT:** Hard cut to Book at [1172]; ticks read blue, name held.
14. **Secondary motion:** Device spill; send pulse.
15. **Sound/SFX:** A send-whoosh on launch; soft "delivered" then "read" ticks; a low tone under the name reveal.
16. **Motion intensity:** **4/5.**
17. **3D justified?** No — the WhatsApp UI must read dead-on; a 3D tilt would angle the chat away from the eye. Keep the flat DevicePlate.
18. **What must remain still:** The WhatsApp header; the name once landed; the empty lower thread.

---

## SHOT 10 · BOOK — [1172–1431] · 39.07–47.70s · 259f · **PRIORITY A** · the montage

1. **Timecode:** 1172–1431 (39.07–47.70s) — longest beat; fastest cutting.
2. **Beat:** Book — the client books, fast.
3. **Story purpose:** Decision → outcome. From comparison to a booked FD in minutes.
4. **Viewer takeaway:** "The client acts, and it's booked in under three minutes."
5. **Hero visual:** A booking montage — select client → Invest now → verifying/placing/confirming → **FD Booked** → My FDs — all on the winning issuer (Utkarsh 8.25%, consistent with the argument).
6. **UI state:** BookScreen across sub-beats; macro on the sheet for the tight ones, whole-phone (device plate) for the wide ones.
7. **Camera position:** Per sub-beat; macro on the sheet, stepping back for the whole-phone frames.
8. **Camera movement:** Small per-sub-beat pushes z 1.0→1.08 that **do not stop between ticks** — a continuous slow drift across the whole montage kills the residual stillness measured here.
9. **Interface movement:** One event per beat (~16f): "Select client" sheet rises (drawer curve) → "Invest now" button depress 160ms → three status rows land one-per-beat (Verifying / Placing / Confirming), each with a check-tick → "FD Booked" success panel scales 0.94→1 perceptual → My FDs stats settle.
10. **Typography:** Caption "Booked in under 3 minutes." **58**, "under 3 minutes." copper, appears late over the success; on-device native.
11. **Depth / parallax:** Device / sheet plane; macro crops are bare (inside the screen); whole-phone frames sit in the device plate.
12. **Transition IN:** Hard cut from Land at [1172].
13. **Transition OUT:** Hard cut to Resolve at [1431]; the success held.
14. **Secondary motion:** The continuous camera drift; status ticks; the button press.
15. **Sound/SFX:** A tap on Invest; three soft confirm ticks landing with the checks; a warm success chime on **FD Booked** — the montage's single hero sound.
16. **Motion intensity:** **4/5.**
17. **3D justified?** No — booking clarity is paramount; 3D would obscure the flow.
18. **What must remain still:** The sheet frame between ticks (only the ticks move); the success panel once shown; the caption once set.

> **Why A:** this is the weakest-*moving* long beat today — it holds near-static across the three
> checkmarks. The redesign is a choreography pass (continuous camera drift + beat-locked tick
> cadence), not new content.

---

## SHOT 11 · RESOLVE — [1431–1620] · 47.70–54.00s · 189f · the loop seam

1. **Timecode:** 1431–1620 (47.70–54.00s)
2. **Beat:** Resolve — the brand statement, and the hand-back.
3. **Story purpose:** Confidence. Close the argument, and turn the loop over invisibly.
4. **Viewer takeaway:** "Centricity × Blostem. Fixed Deposits, reimagined."
5. **Hero visual:** The booked device dims; the "CENTRICITY | BLOSTEM" lockup and "Fixed Deposits, reimagined." rise; an angled device sits far back, defocused; the next client's message is already arriving as the loop turns.
6. **UI state:** BookScreen dims (dim 1→0, blur 0→16); AskChatScreen re-enters at the very end (the seam).
7. **Camera position:** Centre, pulling back.
8. **Camera movement:** Pull z 1.1→0.94; slow, coming toward rest but never fully still until the seam.
9. **Interface movement:** Panel dims + blurs f0–70; lockup fades up (never scales) f26–56; tagline f70–92; everything fades out f(len−46→len−12); next-ask fades up f(len−30→len−2).
10. **Typography:** Lockup Montserrat **26/700** +0.22em with copper divider; "Fixed Deposits, reimagined." Urbanist **82**, "reimagined." copper, mask-rise; "TOGETHER FORWARD" label **27**.
11. **Depth / parallax:** Dimming device plane 0.1; DeviceProp (angled, defocused) far back plane 0.04; type centre.
12. **Transition IN:** Hard cut from Book at [1431].
13. **Transition OUT:** **The loop seam** — the film ends dark with the next question already arriving; the head equal-power crossfades in audio. **Never bright** (a white end would flash on every loop).
14. **Secondary motion:** Device-prop drift; type mask-rise; the dim.
15. **Sound/SFX:** The bed resolves; a final soft tone under the lockup; the audio loop crossfade at the seam.
16. **Motion intensity:** **2/5.**
17. **3D justified?** No — the angled device is a defocused plate prop, not a live 3D object.
18. **What must remain still:** The lockup once set; the tagline; the dark negative space; the whole frame settles to near-rest before the seam.

---

# MOTION OPPORTUNITIES
*The 12 highest-impact moments — where craft investment changes the film's class. Ordered by leverage.*

1. **Ignite · 3D device switch-on** *(3D device / camera choreography)* — a real rounded phone the camera arcs 6–8° past as the glass lights. The single biggest lever from "showcase" to "film". [135–265]
2. **Compare · the rate lift-out** *(UI transformation / macro)* — 8.25% detaches from its row at 10× while the device recedes and slides off. Refine with perceptual-scale + a longer settle. [≈470–524]
3. **Curve · the letterform pull-back** *(kinetic typography — showpiece)* — open inside the ₹ glyph, retreat to the full claim. The one type set-piece; use exactly once. [654–670]
4. **Curve · compounding lines + gap fill + sheen** *(data visualization)* — two paths draw, the gap fills, a sheen travels the winner. The film's proof, and its only abstraction. [700–848]
5. **Calculate · live recompute** *(micro-interaction / data)* — chips drive all six maturities at once; camera push coupled to the growing value. [524–654]
6. **Land · WhatsApp send + tick evolution** *(micro-interaction / product choreography)* — card lifts from compose to thread; clock→sent→delivered→read. The payoff made tangible. [1107–1172]
7. **Book · confirmation-checklist choreography** *(UI transformation / camera)* — three ticks land on beats under a continuous camera drift; removes the montage's dead stillness. [1172–1431]
8. **Detach → Flight · the physical send** *(spatial transition)* — rim-rake detach → arc with a velocity motion-blur trail. A tactile hand-off, not a slide. [978–1107]
9. **Assemble · annotation leaders** *(product choreography)* — labels tether to card parts with drawn leaders; the film explaining itself without a voice-over. [848–978]
10. **Curve IN · the tone-flip exposure cut** *(camera / exposure choreography)* — the one brightness change, landed on an overexposure bloom into the light act. [654]
11. **Ask · large 3D typing bubbles** *(kinetic typography)* — perspective bubbles + typing dots make the setup legible and cinematic at booth distance. [0–135]
12. **Resolve · the invisible loop seam** *(spatial / temporal transition)* — dark-to-dark hand-back with an audio equal-power crossfade; the seam is the idea. [≈1590–1620 → 0]

**Two global opportunities** (apply across all shots, highest ROI of all):
- **Perceptual-scale on every scale move** — the cheapest single quality lift in the film.
- **Velocity-tied directional motion blur on every fast move** — the clearest "cinematic vs template" tell.

---

# DO NOT ANIMATE
*Deliberately quiet. Restraint is the product. Adding motion here makes the film cheaper, not richer.*

- **The unanswered pause in Ask** — after the three questions land, nothing moves. The *absence* of an answer is the beat. (No transform stroke — by design.)
- **The thesis and every caption once landed** — "No answer.", "Six issuers, one screen.", "instantly.", "reimagined." hold dead-still to be read. A caption is not a place for motion.
- **Curve's grid, axis labels, and endpoint figures once drawn** — the reference and the numbers are static; only the sheen moves.
- **The Resolve lockup + tagline once set** — stillness *is* the confidence. Do not drift, glow, or breathe them.
- **Column headers in Compare and Calculate** while rows/figures move — the frame of reference must not move with its contents.
- **The WhatsApp header in Land**, and **the sheet frame between ticks in Book** — the container is still; only the event moves.
- **The room walls** — only the copper key breathes. Never animate the environment for its own sake.
- **Colour** — never animate hue to add life. A second animated accent is always wrong.
- **The final ~1 second before the loop seam** — the frame comes to near-rest; only the next incoming message stirs.
- **Anything that is already legible and calm** — if a frame reads and holds, leave it. Empty, still frames are the premium.

---

# REFERENCE LANGUAGE
*The register we are aiming for, per technique. Not a copy of any brand or film — a description of the language.*

- **Premium SaaS launch** — the confidence of a flagship enterprise keynote film: one claim per beat, the product as the sole hero, generous whitespace, nothing hurried. The film assumes the viewer is intelligent and does not shout.
- **Editorial motion** — a broadsheet supplement set in motion: type-led, gridded, wide margins, hierarchy over decoration. Motion serves reading order, not spectacle.
- **Cinematic UI** — the interface photographed as a physical object in a lit room: rim light, contact shadow, shallow depth of field, macro inserts, real parallax. The screen is a *thing*, not a layer.
- **Product choreography** — the UI moves like the real app under a real finger: caused state changes, OS-grade physics (drawer curves, list overshoot, tick evolution), honest device alignment. The audience uses this app — it must feel true.
- **Restrained 3D** — one real device (and possibly the card) as lit 3D objects sharing the room's exact light: a few degrees of orbit, a settle, then still. Never a turntable, never extruded type, never floating geometry.
- **Kinetic typography** — mask-and-rise, per-word micro-stagger (~65ms), velocity-tied motion blur, and a single letterform-zoom set-piece. Legibility first, always; type that can't be read is not typography.

---

# SHOT_PRIORITY
*Where the redesign effort goes. A = major redesign · B = meaningful polish · C = leave mostly intact.*

| shot | priority | rationale |
|---|---|---|
| **Ignite** | **A** | Selective 3D device switch-on — the largest single lever to "cinematic". New capability (3D). |
| **Book** | **A** | The montage holds near-static across three checkmarks; needs a full choreography + camera-drift pass. |
| Ask | B | Already rebuilt as 3D bubbles; polish easing, perceptual-scale, sound, and the defocus hand-off. |
| Compare | B | Strong take already; refine the lift with perceptual-scale + longer settle, and the deal-in cadence. |
| Calculate | B | Recompute is good; add value-coupled camera push, chip micro-interaction, perceptual-scale. |
| Curve | B | Letterform + lines land; refine the sheen, the tone-flip exposure, and enforce the type ramp. |
| Assemble | B* | Annotations work; polish leaders + yaw. **Escalates to A only if the 3D card slab is approved.** |
| Detach | B | Rim-rake is right; tie its object continuity to Assemble/Flight (esp. if the card goes 3D). |
| Land | B | The send is new and strong; refine tick timing, device light, and the name reveal. |
| Resolve | B | End card + loop seam; enforce type ramp, verify dark-to-dark seam and audio crossfade. |
| Flight | C | Arc + trail already reads well; only minor blur/timing tuning. Leave the choreography intact. |

**Global refactors that precede shot work** (from VIDEO_DNA §7 gating):
`perceptual-scale helper` → `velocity motion-blur audit` → `type-ramp enforcement`, then the two
A-shots, then the B polish in beat order. **No code yet** — this document is the brief the build works from.
