# Phase 1 — Batch 3 Implementation Report

**Module:** Authentication & Identity (Phase 1)
**Batch:** 3 · **A16 Forgot Email** + **A17 Forgot Mobile**
**Product file:** Figma "Centricity App — Product Screens" (`lONlOopWl7kSMJJVopppg8`), page *Batch 3 · Credential Recovery (A16–A17)*
**Date:** 2026-07-17
**Status:** Built and screenshot-validated. Paused for review before Batch 4. Phase gate still blocked on LG-01/LG-02 promotion.

---

## 1. Mobbin references (fintech-only, searched by app name — all five surfaced, no substitution)

- **Revolut** — escape link under the field ("Lost access to my phone number") → adopted as the →A21 ghost exit under every recovery CTA; Tabular resend cooldown ("Request another one in 00:18").
- **Wise** — security-forced reset with calm explanation → adopted for the reassuring one-liner under headlines.
- **N26** — "Forgot your password? No problem, we'll send instructions…" → adopted as the "No problem —" headline voice.
- **Monzo** — "I didn't receive my email" ghost escape; "we need to check it's really you" procedural framing → adopted for challenge context copy.
- **CRED** — mono uppercase eyebrow discipline (already our datalabel law).
Layout patterns only; identity 100% Centricity.

## 2. Screens built (19 frames)

**A16 · Forgot Email (9):** Default (masked trusted mobile ••90 — focal anchor) · Challenge sent (OTP first-box active + Tabular resend) · Loading · Error (`error.otp` verbatim) · **Success — masked email `a•••@c•••••••y.com` (reveal requires device unlock; never unmasked by default)** · Empty (no trusted factor → **Start account recovery** = A21 route) · Offline · Restricted (→A21) · Suspended (mono `TRY AGAIN IN 14:59`).

**A17 · Forgot Mobile (10):** Default (masked trusted email — focal anchor) · Challenge sent · Loading · Success (proof passed; boundary explicit: "It only becomes trusted after it's verified") · **New mobile — staged CountrySelector instance (flag slot hidden per R5) + TextInput + "What changes" impact notice (sessions may sign out; old+new contacts notified)** · Error (enumeration-safe "That number can't be used right now") · Empty (→A21) · Offline · Restricted (change blocked) · **Suspended — SIM risk (mono `UNDER REVIEW`)**.

Every frame carries a Figma **annotation naming its focal anchor** (e.g. "FOCAL ANCHOR: OTP row (first box active)").

## 3. Recovery-specific compliance

- **Voice:** reassuring + next-action-led throughout ("No problem — let's find it"; "Take a breather"); zero blame.
- **Enumeration-safe:** account existence never confirmed — every frame's footer states "For security, we can't confirm whether details match an account"; the A17 duplicate-number error avoids revealing ownership; all identity confirmations masked via MaskedSensitiveInput (•••• patterns).
- **Lifecycle contract routing:** insufficient evidence → A21 on both screens (Empty + Restricted states); SIM-risk → Suspended per Device Trust SM; challenge states use OTPInput resend-timer/error; cooldowns and review labels in Tabular mono.
- A17's high-risk boundary (alternate proof → new mobile) is an explicit separate state with its own consent-style impact notice — per the spec's design note.

## 4. Redlines verification

24/30 headlines · one support line · mono meta cooldowns · 32/16/8 rhythm · ≤5 blocks · single-caption footers · materials + StatusBar + safe areas from frame one · flag slot stays hidden on the CountrySelector instance (assets pending in `_staging`).

## 5. Next

Paused for review. Batch 4 on approval — A18 Device Recovery, A19 Active Sessions, A20 Trusted Devices (ALI `trailing=chip` security rows; BottomSheet revoke confirms; Mobbin pull for device/session management flows first).

---

## 6. Binding audit + pixel fixes (A01–A17, pre-Batch-4)

**Binding law — product file now passes** (walk excludes DS instance internals, which are library-bound):

| Page (frames) | Gaps bound (after) | Gaps snapped | Gap exceptions | Text bound | Text raw (after) | Paint bound | Paint raw |
|---|---|---|---|---|---|---|---|
| Batch 1 · A01+A02 (19) | 190 | 0 | 38 | 67 | 0 | 95 | 0 |
| Batch 2 · A03+A04 (19) | 229 | 0 | 38 | 68 | 0 | 87 | 0 |
| Batch 3 · A16+A17 (19) | 192 | 0 | 38 | 78 | 0 | 97 | 0 |
| **Total (57)** | **611** | **0** | **114** | **213** | **0** | **279** | **0** |

- **Zero snapping** on spacing — every gap/padding was already an exact `space/*` value; all now bound.
- **Only 3 raw text nodes** existed (11px mono cooldowns "TRY AGAIN IN 4:59" / "14:59" / "UNDER REVIEW") — bound to the nearest `font-size/*` token.
- **Documented exceptions = 114** (2 per frame): `paddingTop=50` (status-bar safe-area clearance) and `paddingBottom=34` (home-indicator inset) — device constants, not design spacing.
- After: **0 raw values** outside documented exceptions across all 57 frames.

**Pixel fixes:** P1 OTP boxes render native 48×56 (HUG, gap `space/2`); P2 filled boxes quieted (cream digit + hairline, copper reserved for active) — logged **CS-01**; P3 A04 gains the "Verify identity" back+title header; P4 all 38 Alert intent borders dropped to 20% alpha — logged **CS-02**. See `DS_CODE_SYNC_BACKLOG.md`.
