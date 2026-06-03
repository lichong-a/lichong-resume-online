# Agent Loop

This project is maintained through a design, development, testing, validation, and repair loop. The loop is intentionally documented because the site itself presents AI Agent workflow as a core capability.

## 1. Design Agent

Inputs:

- Source resume: `D:\Download\直聘简历-未命名.pdf`
- Privacy defaults: email and social homepage are public; phone number is hidden
- Target: recruiting conversion

Outputs:

- Section order and visible copy hierarchy
- Visual direction and design tokens
- Motion and responsive behavior rules
- Privacy constraints for downstream agents

## 2. Implementation Agent

Responsibilities:

- Keep content in `src/content/profile.ts`
- Compose the page through section components
- Implement motion through reusable CSS primitives and tokenized styles
- Preserve real semantic HTML for all resume content
- Avoid unnecessary runtime dependencies

## 3. Test Agent

Required checks:

- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run test`
- `pnpm run build`
- `pnpm run test:e2e`
- Source and build privacy scan

Focus areas:

- No phone number leakage
- Email and social link are present
- Education is brief
- No horizontal overflow on mobile
- Accessibility has no serious or critical automated violations

## 4. Visual QA Agent

Viewports:

- Desktop: 1440 x 900
- Compact desktop: 1280 x 800
- Mobile: 390 x 844

Ledger fields:

- Expected design evidence
- Rendered evidence
- Mismatch, if any
- Fix applied or intentional deviation
- Retest command or screenshot

## 5. Repair Agent

Fix order:

1. Build, type, lint, and test failures
2. Privacy leaks or content inaccuracies
3. Mobile layout breakage and horizontal overflow
4. Accessibility failures
5. Performance regressions
6. Visual drift from the design spec

After every repair, run the smallest useful check first, then rerun the full gate before handoff.
