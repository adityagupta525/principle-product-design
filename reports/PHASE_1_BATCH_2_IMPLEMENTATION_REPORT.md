# Phase 1 — Batch 2 Implementation Report

**Module:** Authentication & Identity (Phase 1)
**Batch:** 2 · **A03 Login** + **A04 PAN Verification**
**Product file:** Figma "Centricity App — Product Screens" (`lONlOopWl7kSMJJVopppg8`), page *Batch 2 · Auth & Identity (A03–A04)*
**Date:** 2026-07-17
**Status:** Screens built and screenshot-validated. Batch gate still blocked on LG-01/LG-02 promotion (Phase-level exit criterion).

---

## 1. Mobbin references (fintech-only rule — searched by app name)

All five named fintech apps surfaced; **no substitution**: Revolut (passcode re-auth; personalized returning-user), Wise (minimal two-field login; "security check" step-up with disabled CTA), N26 (brand-led login), CRED (mono uppercase eyebrow + OTP + bottom-pinned CTA), Monzo (PIN + inline "Use Face ID next time"). Adopted **layout patterns only**: Wise's two-field minimalism and step-up support line; CRED's mono meta discipline; Monzo/Revolut's biometric step-up as a dedicated hero state.

## 2. Screens built (19 frames, all redlines baked in from frame one)

**A03 · Login (10):** Default (disabled CTA) · Loading · Empty (required-field errors) · Error (enumeration-safe generic failure) · Session expired (info, safe-return) · **Step-up (BiometricPrompt rim-glow hero — the screen's one glow; OTP/another-way exits)** · Success (session secured → routing) · Offline · Suspended (rate-limited + mono `TRY AGAIN IN 4:59`) · Restricted (app-version update).
Components: IconButton+caret PageHeader, TextInput (identifier), **PasswordInput** (FR03, v1.5 state×visibility), Button, Alert, BiometricPrompt, StatusBar.

**A04 · PAN Verification (9):** Default (consent-gated disabled CTA) · Loading · Error—format · Success ("PAN verification completed" — explicitly *not* KYC) · Error—mismatch · **Pending—unknown (timeout → UNKNOWN, refresh; never success/failure by inference)** · Offline ("nothing was submitted") · Restricted · Suspended (review hold).
Components: 3-segment stepper + mono `STEP 3 OF 3`, **MaskedSensitiveInput** (FR04) as focal anchor, Checkbox (consent, wrapped label), Button, Alert, StatusBar.

## 3. Contract compliance highlights

- Enumeration-safe copy on auth failure (one generic message; recovery links as exits).
- Auth state machine coverage: `CHALLENGE_PENDING → AUTHENTICATED / STEP_UP_REQUIRED / AUTH_FAILED / RATE_LIMITED / AUTH_SUSPENDED / SESSION_EXPIRED` all have frames.
- Invariant §2.4 honored on A04: timeout renders as **Pending—unknown**, never failure/success.
- PAN masked by default everywhere; consent explicit and gating; security states never color-alone (Alert icon + title + text).
- Type/rhythm/anchor rules: 24/30 headlines, one support line, mono meta, 32/16/8 rhythm, ≤5 blocks, single-caption footers, one glow (step-up state only).

## 4. Next

Batch 3 — A16 Forgot Email + A17 Forgot Mobile (A17 consumes the staged CountrySelector; Mobbin pull for recovery flows first).
