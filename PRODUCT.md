# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Technical hiring managers, CTOs, founders and agency leads in the US and LATAM who are deciding whether to interview or contract Brayan Zuluaga. They arrive from a LinkedIn profile, a CV link or a referral, usually on a laptop, and give the page a minute or two. (Inferred from the existing site and CV; not interviewed.)

## Product Purpose

Personal portfolio of Brayan David Zuluaga Meléndez, software architect and backend / systems / AI engineer. It exists to show shipped products quickly and get the visitor to open a project, download the CV or write an email. Success: the visitor understands what he builds and sees real running software within the first two screens.

## Positioning

He ships whole products end to end (backend architecture, data extraction, AI agents, and the interface on top), and the portfolio proves it with real screenshots of running systems rather than descriptions.

## Operating Context

- Bilingual: Spanish (default) and English, switchable in the nav.
- `/` is the showcase; `/cv` is the résumé view with the official PDF (`public/Brayan_Zuluaga_CV.pdf`).
- Deployed on Vercel (Speed Insights is wired in).

## Capabilities and Constraints

- Next.js 16 App Router, React 19, Tailwind CSS 4, three.js / React Three Fiber, GSAP, Lenis.
- Some client work is private: screenshots must use demo data or have identifying client data masked; private projects carry no code link.
- Copy stays short: the owner explicitly asked for less text and only the most important facts.

## Brand Commitments

- Owner-pinned visual direction (Nov 2026): holographic cyberpunk, 3D, interesting backgrounds, GSAP motion, high technical quality.
- The portrait is shown as a cut-out / re-creation, not as the original studio photo.
- Name as shown: "Brayan Zuluaga". Contact: thezulux24@gmail.com, github.com/thezulux24, linkedin.com/in/brayanzz24, apify.com/knowten.

## Evidence on Hand

- Portrait: `assets-src/fotoperfil.jpg` (cut-out and depth map derived in `public/holo/`).
- Project screenshots shipped by the site: `public/shots/<slug>/`; source captures and how each was made: `assets-src/README.md`.
- Knowten Suite source screenshots: `assets-src/knowten/`.
- Roles, dates and figures: `lib/content.ts` (carried over from the previous site and the CV).
- No testimonials, client logos or press exist; none may be invented.

## Product Principles

1. The work leads: real screens of real software before any self-description.
2. One fact, one wording: every number appears once and is verifiable in a repo or the CV.
3. Say less: a project gets one sentence, three facts and its stack.
4. Spectacle never costs legibility or speed: text stays readable, motion respects reduced-motion, WebGL pauses off screen.

## Accessibility & Inclusion

WCAG AA contrast for text, full keyboard access with visible focus, `prefers-reduced-motion` honored, content readable without WebGL.
