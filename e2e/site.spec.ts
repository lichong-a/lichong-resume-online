import { expect, test } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

const chineseMobilePattern = /1[3-9]\d{9}/;

async function expectNoHorizontalOverflow(page: import('@playwright/test').Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

test.describe('personal site smoke validation', () => {
  test('desktop page renders key content, contact links, privacy, and accessibility', async ({ page }, testInfo) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/李冲/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('AI Agent');
    await expect(page.getByRole('link', { name: /发送合作/ })).toHaveAttribute('href', 'mailto:mail@lichong.work');
    await expect(page.getByText('太原理工大学 · 软件工程本科')).toBeVisible();
    const agentLoopInsight = page.locator('.hero-insight').filter({ hasText: 'Agent Loop' });
    const tooltip = agentLoopInsight.locator('.insight-tooltip');
    await agentLoopInsight.getByRole('button').hover();
    await expect(tooltip).toContainText('AI 参与真实研发闭环');
    await expect.poll(() => tooltip.evaluate((element) => getComputedStyle(element).opacity)).toBe('1');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toMatch(chineseMobilePattern);
    await expectNoHorizontalOverflow(page);

    const results = await new AxeBuilder({ page }).analyze();
    const seriousViolations = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''));
    expect(seriousViolations).toEqual([]);

    await page.screenshot({ path: testInfo.outputPath('desktop-home.png'), fullPage: false });
  });

  test('mobile layout keeps content readable without horizontal overflow', async ({ page }, testInfo) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: '技能不是清单，而是可交付系统' })).toBeVisible();

    if (testInfo.project.name === 'mobile-chrome') {
      const firstInsight = page.locator('.hero-insight').first();
      const tooltip = firstInsight.locator('.insight-tooltip');

      await firstInsight.getByRole('button').tap();
      await expect(tooltip).toContainText('企业级平台全链路交付');
      await expect.poll(() => tooltip.evaluate((element) => getComputedStyle(element).opacity)).toBe('1');

      const tooltipState = await firstInsight.evaluate((element) => {
        const tooltipElement = element.querySelector<HTMLElement>('.insight-tooltip');
        const nextInsight = element.nextElementSibling as HTMLElement | null;
        const tooltipRect = tooltipElement?.getBoundingClientRect();
        const nextRect = nextInsight?.getBoundingClientRect();
        const backgroundColor = tooltipElement ? getComputedStyle(tooltipElement).backgroundColor : '';
        const alphaMatch = backgroundColor.match(/rgba?\(([^)]+)\)/);
        const alphaParts = alphaMatch?.[1].split(',').map((part) => Number.parseFloat(part.trim()));

        return {
          backgroundAlpha: alphaParts && alphaParts.length === 4 ? alphaParts[3] : 1,
          tooltipBottom: tooltipRect?.bottom ?? 0,
          nextTop: nextRect?.top ?? Number.POSITIVE_INFINITY,
        };
      });

      expect(tooltipState.backgroundAlpha).toBeGreaterThan(0.94);
      expect(tooltipState.tooltipBottom).toBeLessThanOrEqual(tooltipState.nextTop + 1);
    }

    await expectNoHorizontalOverflow(page);
    await page.screenshot({ path: testInfo.outputPath('mobile-home.png'), fullPage: false });
  });

  test('reduced motion preserves information while disabling long-running motion', async ({ browser }, testInfo) => {
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();

    await page.goto('http://127.0.0.1:4173/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Design Agent')).toBeVisible();

    const animationDuration = await page.locator('.tech-orbit').evaluate((element) => getComputedStyle(element).animationDuration);
    const durationInSeconds = animationDuration.endsWith('ms')
      ? Number.parseFloat(animationDuration) / 1000
      : Number.parseFloat(animationDuration);
    expect(durationInSeconds).toBeLessThan(0.01);

    await page.screenshot({ path: testInfo.outputPath('reduced-motion.png'), fullPage: false });
    await context.close();
  });
});
