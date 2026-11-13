---
name: Brayan Zuluaga · Portfolio
description: A hologram plate. Blue-black ink, three named lights, foil as a material, and a subject reconstructed out of interference fringes.
colors:
  void: "oklch(0.145 0.028 262)"
  void-2: "oklch(0.185 0.032 262)"
  void-3: "oklch(0.26 0.036 262)"
  line: "oklch(0.42 0.04 255 / 0.42)"
  text: "oklch(0.955 0.012 220)"
  text-2: "oklch(0.8 0.028 235)"
  text-3: "oklch(0.66 0.035 245)"
  holo: "oklch(0.88 0.15 185)"
  flare: "oklch(0.67 0.24 14)"
  flare-hover: "oklch(0.74 0.2 18)"
  sodium: "oklch(0.83 0.155 78)"
  foil-lime: "oklch(0.9 0.19 128)"
  foil-blue: "oklch(0.7 0.17 255)"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "min(12.6vw, 24svh)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 4.6vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 122"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.25
    fontVariation: "'wdth' 112"
  lead:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.375
    fontVariation: "'wdth' 100"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.06em"
    fontVariation: "'wdth' 112"
  data:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.01em"
    fontFeature: "'tnum'"
  readout:
    fontFamily: "Doto, Martian Mono, monospace"
    fontSize: "2rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.01em"
    fontFeature: "'tnum'"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(1rem, 2.8vw, 2.5rem)"
  wrap: "90rem"
  nav-h: "4.5rem"
  control-gap: "0.75rem"
  stack-gap: "1.5rem"
  column-gap: "2.5rem"
  section-y: "6rem"
  section-y-stage: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.flare}"
    textColor: "{colors.void}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 1.375rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.flare-hover}"
    textColor: "{colors.void}"
  button-quiet:
    backgroundColor: "oklch(0.145 0.028 262 / 0.55)"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 1.375rem"
    height: "3rem"
  button-quiet-hover:
    textColor: "{colors.holo}"
  button-icon:
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
    size: "2.75rem"
  button-icon-hover:
    textColor: "{colors.holo}"
  toggle-segment:
    textColor: "{colors.text-2}"
    typography: "{typography.data}"
    rounded: "{rounded.none}"
    padding: "0 0.75rem"
    height: "2.75rem"
  toggle-segment-active:
    backgroundColor: "{colors.text}"
    textColor: "{colors.void}"
  chip:
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
    padding: "0 0.75rem"
    height: "2.25rem"
  slate:
    backgroundColor: "{colors.void-2}"
    rounded: "{rounded.none}"
  link:
    textColor: "{colors.text}"
  link-hover:
    textColor: "{colors.holo}"
---

# Design System: Brayan Zuluaga · Portfolio

## Overview

**Creative North Star: "The Hologram Plate"**

A holographic plate stores an object as interference fringes and gives it back when light hits it. The whole site behaves like one: the ground behind every section is a live fringe field, and each subject (the engineer in the hero, then one product at a time) is reconstructed out of it by a scanning beam. The page is dark, sparse and typographically loud; the spectacle sits in the background and in two 3D objects, while text, controls and screenshots stay flat, sharp and readable on ink.

The system is small on purpose. One ground (blue-black ink, never pure black), three named lights with fixed jobs (Holo, Flare, Sodium), one material (Foil, the diffraction spectrum) and one container (the slate). Type is one family pushed across its width axis, plus two faces reserved for measurements and numbers. Corners are square everywhere. Nothing floats: there are no cards with shadows, no rounded panels, no gradient fills on surfaces.

The world was refused as: a neon-on-black terminal portfolio with a typing headline, a card grid of projects, a skills progress-bar wall.

**Key Characteristics:**
- Blue-black ink ground with a fixed, pointer-reactive interference-fringe shader behind all content.
- Three lights with one job each: Holo (beam, focus, live state), Flare (the primary action), Sodium (secondary data).
- Foil is a material, not a colour: it appears on the name, on slate edges and on the globe's rim, nowhere else.
- Archivo across its width axis (125 display, 122 heading, 112 titles and labels, 100 text); Martian Mono for data; Doto for numeric readouts.
- Square corners (0 radius) and 1px hairlines; the slate is the only framed container.
- Things resolve (scan, wipe, decode, converge, fade in place). They do not bounce.

### Motion grammar

Motion belongs to the world, so it is recorded here rather than per component.

- **Two curves.** `resolve` = `cubic-bezier(0.23, 1, 0.32, 1)`, the strong ease-out (CSS `--ease-out-strong`; GSAP default ease, default duration 0.6s). `travel` = `cubic-bezier(0.77, 0, 0.175, 1)`, the in-out used when something crosses the screen (CSS `--ease-in-out-strong`). Opacity-only resolves use `power1.out`; values tweened for the shaders use `power2.out`.
- **UI feedback, 150 to 200ms.** Button colour and press 160ms; toggles, index buttons and icon buttons 150ms; nav bar state, lightbox fade and icon nudge 200ms. Press is `scale(0.97)` on buttons and thumbs, `scale(0.95)` on square icon buttons.
- **Drawn feedback, 260ms.** Link underline (`scaleX` from the left) and the screenshot swap (`opacity 0` and `blur(3px)` to rest).
- **Reconstruction beam.** A 2px Holo line crosses a surface while its content wipes in behind it with a `clip-path: inset()` reveal. Name: 1.1s `travel`, bottom to top. Project plate: 0.75s `travel`, in the scroll direction, text out 0.15s then in 0.4s with 0.05s stagger. Role list: 1.1s `power1.inOut`, each row fading in 0.35s as the beam passes. The beam fades out in 0.2s.
- **Other resolves.** Contact headline wipes left to right, 1.1s `travel`. Stack groups fade in 0.45s with 0.09s stagger. Hero text fades in 0.5s with 0.08s stagger. The mono location line decodes in 0.9s through the characters `01/<>_`. All scroll-triggered resolves run once.
- **Scroll scenes.** The project stage is pinned and snaps one product per step (snap 0.2 to 0.55s, `power2.out`); the hero portrait dissolves on a 0.4 scrub. Smooth scroll is Lenis at `lerp 0.1`; programmatic scrolls take 1.2s.
- **Pointer response.** Foil band follows the pointer in 0.7s; the fringe field eases toward the pointer at 4.5% per frame; the project plate turns at most 2.5 degrees on Y and 1.75 on X (perspective 1400, 0.8s `power3.out`); the portrait turns up to 0.26rad. Touch pointers are ignored by all of these.
- **Field retune.** Entering a section or product retunes the fringe field (hue, source position, gain, density) over 1.4s `power2.out`.
- **Preloader.** A Doto counter and a 1px bar: to 82 in 0.8s, to 100 in 0.3s once fonts and the portrait are in (network wait capped at 2.2s), fade 0.45s. A CSS failsafe removes it at 5s if scripts never run.

### Accessibility as implemented

- Visible focus on everything: `2px solid` Holo, `3px` offset. A skip link (primary button style) slides in on focus.
- `prefers-reduced-motion: reduce`: all CSS animations and transitions collapse to 0.01ms; the preloader is skipped; Lenis is not started; the portrait is shown fully formed; the pinned stage becomes a plain list; field retunes are instant; the fringe field's clock is frozen (it still follows scroll, pointer and section hue); the portrait and the globe render on a frozen clock and ignore the pointer.
- Hover effects are gated behind `(hover: hover) and (pointer: fine)`. On touch the foil band crosses the name once (2.8s, after a 2.6s delay) and rests.
- Content does not depend on WebGL: all canvases are `aria-hidden`, the field canvas carries a CSS gradient fallback, the hero reads without the portrait, and the split display headings carry the full text in `aria-label`.
- The lightbox is a native `<dialog>` (focus trap, Esc, arrow keys, backdrop click); the mobile menu is `inert` when closed and closes on Esc.
- Interactive targets are at least 2.75rem (44px) for icon buttons and index buttons and 3rem for buttons.

## Colors

A near-black blue ink carrying three saturated lights; everything else is a cool neutral. All values are authored in OKLCH and that is the source of truth.

### Primary
- **Holo** (`oklch(0.88 0.15 185)`, cyan-mint): the reconstruction beam. Focus ring, link and quiet-control hover, the active project index, the progress hairline, the current-role dot, role titles, slate registration ticks, the selected thumbnail outline, the preloader counter, the text caret and the scrollbar thumb on hover. Holo means "live" or "under the beam".

### Secondary
- **Flare** (`oklch(0.67 0.24 14)`, hot magenta-red): the one primary action per view (filled button, Void text on top) and the text selection colour. Hover lifts it to `oklch(0.74 0.2 18)`.

### Tertiary
- **Sodium** (`oklch(0.83 0.155 78)`, amber): secondary data in Archivo 112, semibold: a product's kind and year, stack group titles.

### Neutral
- **Void** (`oklch(0.145 0.028 262)`): page ground, text on Flare, nav bar at 80% with blur once scrolled, quiet-button fill at 55%.
- **Void 2** (`oklch(0.185 0.032 262)`): the slate plate.
- **Void 3** (`oklch(0.26 0.036 262)`): idle tracks and markers (progress track, past-role dot, scrollbar thumb).
- **Line** (`oklch(0.42 0.04 255 / 0.42)`): every hairline, border and divider. It is the default `border-color`.
- **Text** (`oklch(0.955 0.012 220)`): headings, lead copy, control labels. 17.4:1 on Void.
- **Text 2** (`oklch(0.8 0.028 235)`): running copy and nav links. 10.7:1 on Void.
- **Text 3** (`oklch(0.66 0.035 245)`): labels, captions, footer. 6.4:1 on Void; it is the floor, nothing dimmer carries text.

### Foil (material)
The diffraction spectrum, in this order at 100deg: Holo, lime `oklch(0.9 0.19 128)`, Sodium, Flare, blue `oklch(0.7 0.17 255)`, Holo. Lime and blue exist only inside Foil. Foil is used in exactly three places: the 1px slate edge, the diffraction band on the name, and the thin-film globe in the contact section.

### Field hues
The fringe field leans toward one named hue per section or product (linear RGB, `lib/scene.ts`): holo, flare, sodium, lime, azure, green, ember. These tint the background only; they are not UI colours.

### Named Rules
**The One Job Rule.** Each light has one job. Holo is state and beam, Flare is the primary action, Sodium is secondary data. A second Flare button in the same view, or Sodium on a control, breaks the code.

**The Foil Is A Material Rule.** The spectrum never fills a surface, a button or body text. It is an edge, a band crossing solid type, or a 3D film.

**The Ink Rule.** No pure black and no pure white. The ground is Void; the lightest text is Text.

## Typography

**Display Font:** Archivo, variable width axis (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Archivo at normal width (same stack)
**Label/Mono Font:** Martian Mono 400 for data (with ui-monospace, monospace); Doto 900 for numeric readouts (falls back to Martian Mono)

**Character:** One grotesque stretched from text width to an expanded black, so hierarchy comes from width and weight rather than from a second family. The mono and the dot-matrix face are instruments: they appear only where something is being measured or counted.

### Hierarchy
- **Display** (900, `wdth` 125, uppercase, -0.02em, line-height 0.86): the name and the contact headline only. Sized in viewport units so it fills the width: 14.1vw on small screens and `min(12.6vw, 24svh)` from the stage breakpoint for the name; the contact headline is tuned per language (11.2vw / `min(11.3vw, 25svh)` in Spanish, 19vw / `min(13.2vw, 25svh)` in English). Also the "BZ" mark in the nav at 1.25rem.
- **Headline** (800, `wdth` 122, -0.015em, line-height 0.98, sentence case): section titles at `clamp(2.5rem, 4.6vw, 4.25rem)`, product names at `clamp(2rem, 3.3vw, 3.25rem)`, the résumé name at `clamp(2.5rem, 5.4vw, 4.75rem)`, résumé section titles at 1.875rem, mobile menu items at 2.25rem.
- **Title** (600, `wdth` 112, 1.125rem, tight leading): company names in role rows. The same 112 semibold setting at 0.875rem to 1rem in Sodium carries product kind and stack group titles.
- **Lead** (400, `wdth` 100, 1.125rem rising to 1.375rem, line-height 1.375): the one-line statement under a display heading. The experience statement uses 1.5rem rising to 1.75rem at max 30ch.
- **Body** (400, `wdth` 100, 1rem, line-height 1.55): default. Observed steps: 1.0625rem for a product sentence (max 46ch), 0.9375rem for role lines (max 58ch), 0.875rem for links and chips, 0.8125rem for labels, captions and the footer.
- **Label** (700, `wdth` 112, 0.8125rem, 0.06em, uppercase): button text only. Text links are 0.875rem semibold, sentence case, no tracking.
- **Data** (Martian Mono 400, 0.75rem, line-height 1.5, 0.01em, tabular figures): locations, dates and periods, stack lists, index numbers, counters, the ES/EN toggle.
- **Readout** (Doto 900, tabular figures, line-height 1): the three facts per product at 2rem and the preloader counter at 3.75rem.

### Named Rules
**The Width Is The Voice Rule.** Hierarchy is set with Archivo's `wdth` axis: 125 display, 122 heading, 112 titles and labels, 100 text. Do not add a display family; do not set running text wider than 100.

**The Instruments Rule.** Martian Mono is for data and Doto is for numbers. Neither sets a sentence, a heading or a button label.

**The Solid Letter Rule.** Foil-stamped type is solid Text crossed by a narrow band. The band is a bright first order (blue, cyan, lime, amber, red) between two faint orders mixed 30% into Text, ruled by a fine grating (`0.034em` gap, `0.014em` line, 100deg). The band never covers the word; most of the name stays plain Text at every pointer position.

## Layout

One centred column: `max-width: 90rem` with a fluid gutter of `clamp(1rem, 2.8vw, 2.5rem)`. The nav is a fixed bar `4.5rem` tall; anchored sections offset by that height. Content is left-aligned throughout; display headings start at the gutter and run toward the right edge, where a 3D object (portrait, globe) overlaps them.

Sections stack vertically with `6rem` of vertical padding, `8rem` from the stage breakpoint. The hero and the contact section are full-height (`min-height: 100svh`) with their text block pushed to the bottom at `max-width: 36rem`. From the stage breakpoint, sections use a 12-column grid with a `2.5rem` gap: 4 + 8 for a product (text, plate), 5 + 7 for experience, 3 + 9 for stack rows, 6 + 6 on the résumé. Below it everything is a single column and paired buttons share the row equally.

Rhythm inside a block is `1.5rem` between stacked elements, `0.75rem` between sibling controls, `0.5rem` between chips and thumbnails. Lists are ruled, not boxed: rows are separated by a 1px Line on top with a closing rule at the bottom.

Two thresholds, both called "stage" in the code:
- **Stage layout**, `min-width: 64rem` (Tailwind `stage:`): the 12-column grid, the desktop nav, the absolute portrait.
- **Pinned stage**, `(min-width: 75rem) and (min-height: 44rem)` and motion allowed (`STAGE` in `lib/gsap.ts`): the project section pins to one viewport, shows one product at a time on a fixed 16:10 plate capped at `calc(100svh - 19.5rem)`, and gains the numbered index. Anywhere else the products are a plain vertical list, `6rem` apart. The list is the default; the stage is an enhancement applied by script.

Text measures are capped in `ch` (30, 44, 46, 58) rather than by column width.

## Elevation & Depth

Flat. There are no drop shadows and no raised surfaces; depth comes from three places only. First, layering: the fringe field is fixed at the back (z 0), content sits above it (z 1), the nav above that (z 50), the preloader and skip link on top. Second, real 3D: the depth-displaced portrait and the globe are WebGL objects that overlap the display type. Third, a small perspective tilt on the active project plate.

The single glow in the system belongs to the reconstruction beam, because the beam is light: `box-shadow: 0 0 0 1px oklch(0.88 0.15 185 / 0.25), 0 6px 28px 6px oklch(0.88 0.15 185 / 0.35)` on a 2px Holo line. The single backdrop blur belongs to the nav bar once scrolled (Void at 80%, medium blur) so the field does not fight the links. The lightbox is an opaque sheet (`oklch(0.1 0.025 262 / 0.985)`), not a floating panel.

### Named Rules
**The Only The Beam Glows Rule.** Glow is reserved for the moving beam. Panels, buttons, text and icons never carry a halo or a shadow.

**The Plate Stays Ink Rule.** Surfaces above the field are opaque or near-opaque Void. No frosted cards.

## Shapes

Square. No element has a border radius. Borders are 1px in Line; emphasis is a colour change of that hairline to Holo, never a thicker stroke. The one cut shape is the primary button's chamfer: a `0.625rem` 45-degree notch on the bottom-right corner. Slates add registration ticks: two 14px by 1px Holo strokes forming an open corner, set 7px outside each of the four corners at 90% opacity. State markers are 6px Holo or Void 3 squares. Progress is a 1px hairline that scales from the left.

## Components

Controls are flat, square and quiet until touched; the only filled element in a view is the Flare button.

### Buttons
- **Shape:** square, `min-height: 3rem`, padding `0 1.375rem`, `0.625rem` gap to a 1rem icon. Label in Archivo 112, 700, 0.8125rem, 0.06em, uppercase, no wrap.
- **Primary:** Flare fill, Void text, chamfered bottom-right corner. One per view. Hover lifts the fill to `oklch(0.74 0.2 18)`.
- **Quiet:** 1px Line border, Text label, Void at 55% behind it. Hover turns border and label Holo. The nav uses a narrower version (`min-height: 2.75rem`, padding `0 1rem`).
- **Hover / Press:** icon nudges 2px up and right (a down arrow nudges 2px down) in 200ms; press is `scale(0.97)`; colour changes take 160ms.
- **Copy button:** the email button keeps sentence case and no tracking so the address reads as an address; on copy the label cross-fades (200ms, 2px blur) to a confirmation for 1.8s and the icon becomes a check, announced through a `role="status"` region.
- **Icon button:** 2.75rem square, 1px Line border, 1.25rem icon; hover turns border and icon Holo; press `scale(0.95)`. Used for menu, close, previous and next.

### Links
Text colour, 0.875rem, usually semibold, with an optional 0.875rem trailing icon. On hover the text turns Holo, a 1px underline draws from the left in 260ms, and the icon nudges 2px up and right. Nav links use Text 2 at regular weight.

### Segmented toggle (language)
Two mono segments inside a 1px Line frame, `min-height: 2.75rem`. The active segment inverts to Text fill with Void text; the idle one is Text 2 and turns Holo on hover. State is carried by `aria-pressed`.

### Chips
Static labels for the stack: 1px Line border, `min-height: 2.25rem`, padding `0 0.75rem`, 0.875rem Text, optional 1.125rem brand mark. Brand marks are mixed 38% toward white so dark logos stay legible on ink; marks whose brand colour is near-black fall back to Text. Chips are not interactive.

### Slate (the one container)
- **Corner Style:** square.
- **Background:** Void 2 plate.
- **Border:** 1px Foil edge: the spectrum runs along the border while the plate stays ink.
- **Ticks:** Holo registration ticks outside the four corners (see Shapes).
- **Shadow Strategy:** none.
- **Use:** frames evidence, meaning a product screenshot or the résumé page. Text blocks, lists and rows are never wrapped in a slate.
- **Beam:** a slate (or a list, or the name) may host a beam, the 2px Holo line that scans it while its content resolves.

### Project plate, thumbnails and index
The plate is a slate holding one screenshot at 16:10, cropped from the top and from the side that carries the subject; it opens the lightbox and scales 1.5% on hover over 500ms. Phone products show up to four portrait screens side by side instead. Under a desktop plate sits a row of 5.6rem by 3.5rem thumbnails: 55% opacity with a Line outline at rest, full opacity on hover, full opacity with a Holo outline when current. Changing screen swaps the image with a 260ms fade from 3px blur. On the pinned stage a mono index (`01` to `06`) sits beside the section title; the active number is Holo and is followed by the product name, and a 1px Holo progress hairline runs under the header.

### Facts
Three facts per product in a row ruled top and bottom by Line with 1px Line dividers between them: the value in Doto 900 at 2rem, the label under it in 0.8125rem Text 3. Metadata pairs (Base, Rol, Stack) are a 3rem Text 3 label column followed by the value; mono values use the Data voice.

### Role rows
A ruled list. Each row: a mono period with a 6px square marker (Holo for the current role, Void 3 otherwise) in a 9.5rem column, then company (Title), role title in Holo at 0.875rem, and one line in Text 2. Hover washes the row with Holo at 5%.

### Navigation
A fixed bar, transparent over the hero; after 24px of scroll it gains a Line bottom border, Void at 80% and a backdrop blur (200ms). Left: the "BZ" mark in Display. Centre (stage layout): four text links in Text 2. Right: language toggle, compact quiet CV button, and below the stage breakpoint a menu icon button. The mobile menu is a full-height opaque Void sheet under the bar with the links set as 2.25rem headings.

### Lightbox
A full-viewport native dialog on an opaque ink sheet, fading in 200ms. Top row at nav height: product name and a mono counter (`02 / 07` pattern) with a close icon button. The image is contained and centred; previous and next icon buttons sit centred below.

### Foil text
Reserved for the name. Solid Text crossed by the diffraction band described under Typography. The band position is the custom property `--foil-x` (rest 41%); it follows the pointer between 25% and 75%.

### WebGL materials
- **Fringe field** (`components/gl/FringeField.tsx`): one fixed full-viewport fragment shader, raw WebGL2, one draw call. Interference fringes between a wave centred on the pointer and one centred on a per-section source, dispersed into the spectrum and mixed 58% toward the section hue, over an ink gradient with a vignette and 1-bit dither. Tuned per section through `tuneField` (hue, source x/y, gain 0.7 to 1.1, density 0.8 to 1.3). Fringe light is scaled to 0.42 so text stays readable over it.
- **Hologram portrait** (`components/gl/HoloPortrait.tsx`): a cut-out portrait displaced by its depth map (0.34 units), rendered in Holo with lifted shadows, scanlines about 3.4px apart, a slow refresh sweep, occasional band dropouts, chromatic split and a dispersed rim. An additive point layer assembles the figure on load (points converge, then a bottom-up scan resolves the image), stays as faint grain at rest, and carries the break-up as the hero scrolls away. It stands on three thin projector rings.
- **Holographic globe** (`components/gl/HoloGlobe.tsx`): about 13,800 additive Holo dots on land (`public/holo/land.bin`), facing the Americas, over a dark glass sphere so the far side reads faintly. A scan band climbs it, the rim disperses like foil, and a Holo arc with a travelling Sodium pulse joins Sodium markers at Cali and Naples, FL. The dots fall into place the first time it is seen; it swings slowly and leans toward the pointer; under reduced motion it holds one pose.

**Performance rules, as built:**
- Device pixel ratio is capped: 1.5 for the field (it is soft by nature), 1.75 for the portrait and the globe.
- The portrait and the globe stop their frame loop when off screen (IntersectionObserver, 80px and 120px margins); the field stops when the tab is hidden.
- Motion state lives in plain objects (`lib/scene.ts`) that GSAP tweens and the shaders read each frame; React does not re-render for motion.
- The 3D canvases are loaded client-side only and never take pointer events; touch pointers do not drive them.
- Scatter is seeded, so the assembly looks the same on every visit.

## Do's and Don'ts

### Do:
- **Do** build on Void (`oklch(0.145 0.028 262)`) and let the fringe field show through; keep text blocks unboxed and ruled with 1px Line.
- **Do** give each view exactly one Flare button, with Void text and the `0.625rem` chamfer; make every other action quiet or a text link.
- **Do** use Holo for focus (`2px solid`, `3px` offset), hover on quiet controls and links, and anything current or live.
- **Do** set hierarchy with Archivo's width axis: 125 / 900 uppercase for display, 122 / 800 for headings, 112 / 600 to 700 for titles and labels, 100 for text.
- **Do** put measurements in Martian Mono at 0.75rem and counted numbers in Doto 900, with tabular figures.
- **Do** frame screenshots and documents, and only those, in a slate: Void 2 plate, 1px Foil edge, Holo registration ticks.
- **Do** bring content in by resolving it: a beam with a `clip-path` wipe, a fade in place, a decode. Use `resolve` (`0.23, 1, 0.32, 1`) for exits to rest and `travel` (`0.77, 0, 0.175, 1`) for crossings; keep control feedback at 150 to 200ms.
- **Do** gate hover behind `(hover: hover) and (pointer: fine)`, wrap GSAP work in `gsap.matchMedia()` with the reduced-motion query, and give every enhanced layout a plain default that works without script.
- **Do** cap canvas DPR (1.5 field, 1.75 objects), stop frame loops off screen, and keep every canvas `aria-hidden` with content that reads without it.
- **Do** keep text at Text 3 or lighter on Void (6.4:1 is the floor) and interactive targets at 2.75rem or more.

### Don't:
- **Don't** use pure black or pure white, or introduce a hue outside Holo, Flare, Sodium and the neutrals for UI. The seven field hues tint the background only.
- **Don't** use Foil as a fill, a button colour or a text gradient that covers the word. It is an edge, a narrow band, or the globe.
- **Don't** round a corner. The system has no radius; the only shaped corner is the primary button's chamfer.
- **Don't** add shadows, halos or glow to panels, buttons, text or icons. Only the moving beam glows.
- **Don't** build glass or frosted cards. The one backdrop blur is the scrolled nav bar.
- **Don't** lay products out as a card grid, show skills as progress bars, or type a headline out letter by letter. These are the refused forms of this world.
- **Don't** set sentences, headings or button labels in Martian Mono or Doto.
- **Don't** bounce, spring or overshoot. No elastic eases.
- **Don't** wrap text, lists or rows in a slate, or nest slates.
- **Don't** let the pointer drive anything on touch, and don't make any content depend on WebGL having loaded.
