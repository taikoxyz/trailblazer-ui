import { describe, expect, it, vi } from 'vitest';

import { positionElementByTarget } from './positionElementByTarget';

function mockTargetRect(top: number, left: number, width: number, height: number) {
  return {
    top,
    left,
    width,
    height,
    right: left + width,
    bottom: top + height,
  };
}

function mockTooltipRect(width: number, height: number) {
  return {
    width,
    height,
  };
}

describe('positionElementByTarget', () => {
  // Given
  let targetElement: HTMLElement;
  let tooltipElement: HTMLElement;

  beforeEach(() => {
    targetElement = {
      getBoundingClientRect: vi.fn(() => mockTargetRect(100, 200, 50, 20)),
    } as unknown as HTMLElement;

    tooltipElement = {
      getBoundingClientRect: vi.fn(() => mockTooltipRect(100, 50)),
      style: {
        position: '',
        top: '',
        bottom: '',
        left: '',
        right: '',
        transform: '',
      } as CSSStyleDeclaration,
    } as unknown as HTMLElement;
  });

  it('should position tooltip at the top', () => {
    // When
    positionElementByTarget(tooltipElement, targetElement, 'top', 15);

    // Then
    expect(tooltipElement.style.position).toBe('absolute');
    // top = 100 (targetRect.top) - 50 (tooltip height) - 15 (gap) => 35
    expect(tooltipElement.style.top).toBe('35px');
    // left = 200 + 25 (half target width) - 50 (half tooltip width) => 175
    expect(tooltipElement.style.left).toBe('175px');
  });

  it('should position tooltip at the bottom', () => {
    positionElementByTarget(tooltipElement, targetElement, 'bottom', 15);

    expect(tooltipElement.style.position).toBe('absolute');
    // top = 120 (targetRect.bottom) + 15 => 135
    expect(tooltipElement.style.top).toBe('135px');
    // left = 200 + 25 - 50 => 175
    expect(tooltipElement.style.left).toBe('175px');
  });

  it('should position tooltip on the left', () => {
    positionElementByTarget(tooltipElement, targetElement, 'left', 15);

    expect(tooltipElement.style.position).toBe('absolute');
    // top = 100 + 10 (half target height) - 25 (half tooltip height) => 85
    expect(tooltipElement.style.top).toBe('85px');
    // left = 200 - 100 (tooltip width) - 15 => 85
    expect(tooltipElement.style.left).toBe('85px');
  });

  it('should position tooltip on the right', () => {
    positionElementByTarget(tooltipElement, targetElement, 'right', 15);

    expect(tooltipElement.style.position).toBe('absolute');
    // top = 100 + 10 - 25 => 85
    expect(tooltipElement.style.top).toBe('85px');
    // left = 250 (targetRect.right) + 15 => 265
    expect(tooltipElement.style.left).toBe('265px');
  });
});
