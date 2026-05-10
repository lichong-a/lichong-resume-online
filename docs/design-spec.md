# Design Spec

## Direction

The site uses a Future Technology Lab / Agentic Command Center direction. It should feel like a practical engineer's operating console rather than a generic portfolio template: deep green-black background, phosphor cyan signal lines, amber proof highlights, orbit diagrams, code streams, timeline rails, and glassy platform panels.

The design is code-native. UI text, cards, links, and lists must remain semantic HTML, while 3D/particle/topology effects are implemented with CSS and SVG-like layout primitives rather than screenshots.

## Audience And Conversion

Primary audience: recruiters, engineering managers, and technical interviewers.

Primary conversion: start a conversation via `mail@lichong.work` or inspect the social homepage. The first viewport must communicate AI-native full-stack capability, delivery bias, and platform engineering depth within a few seconds.

## Section Order

1. Hero: compact headline, short summary, hover/focus insight prompts, CTAs, metrics, orbit visual, signal cards.
2. Skill Radar: six skill clusters with evidence-oriented descriptions.
3. Work Timeline: three companies summarized by impact and outcomes.
4. Project Samples: five selected projects with role, period, stack, and outcomes.
5. Agent Loop: design, develop, test, verify, repair process.
6. Contact: email, social homepage, brief education, proof points.

## Design Tokens

- Background: near-black green `#05090b` / `#071014` with grid and radial light fields.
- Accent: phosphor cyan `#42ffd2` for signals and CTAs.
- Secondary accent: warm amber `#f4d35e` for proof and orbit contrast.
- Alert accent: coral `#ff7a59` used sparingly for depth.
- Typography: display uses `Space Grotesk`-style geometry; body uses clean Chinese/Latin sans; code labels use `JetBrains Mono`-style mono.
- Surfaces: translucent dark panels with cyan borders, large radii, and blurred backdrops.

## Motion Rules

- Page load: hero copy slides up, orbit fades/scales in.
- Ambient: particles float, orbit rings rotate, code stream moves slowly.
- Interaction: buttons/cards lift slightly on hover/focus; hero insight prompts reveal glowing detail tooltips on hover or keyboard focus.
- Reduced motion: all animations and transitions collapse to near-zero duration while preserving layout and information.

## Responsive Rules

- Desktop: two-column hero, three-column skill grid, two-column project grid, two-column agent loop.
- Tablet: hide dense nav, collapse hero and loop to one column, keep two-column content grids.
- Mobile: single-column everything, hide small decorative signal cards/code stream, keep orbit simplified and readable.

## Visual QA Ledger

Use these comparison points for each validation pass:

- Copy: headline, CTA labels, skill/project titles, education line, contact links.
- Layout: first viewport balance, section order, grid collapse, timeline alignment.
- Typography: display scale, mono labels, body line height, mobile wrapping.
- Color: cyan/amber signal palette, dark background, readable contrast.
- Motion: ambient motion is present by default and reduced under `prefers-reduced-motion`.
- Privacy: phone number is not present in source, build output, or rendered page.
