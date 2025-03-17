export function positionElementByTarget(tooltipEl: HTMLElement, targetEl: HTMLElement, pos: Position, gap: number) {
  if (!tooltipEl || !targetEl) return;

  const targetRect = targetEl.getBoundingClientRect();
  const tooltipRect = tooltipEl.getBoundingClientRect();
  const { style } = tooltipEl;
  style.position = 'absolute';

  switch (pos) {
    case 'top':
      style.top = `${targetRect.top - tooltipRect.height - gap + window.scrollY}px`;
      style.left = `${targetRect.left + targetRect.width / 2 - tooltipRect.width / 2}px`;
      break;
    case 'bottom':
      style.top = `${targetRect.bottom + gap + window.scrollY}px`;
      style.left = `${targetRect.left + targetRect.width / 2 - tooltipRect.width / 2}px`;
      break;
    case 'left':
      style.top = `${targetRect.top + targetRect.height / 2 - tooltipRect.height / 2 + window.scrollY}px`;
      style.left = `${targetRect.left - tooltipRect.width - gap}px`;
      break;
    case 'right':
      style.top = `${targetRect.top + targetRect.height / 2 - tooltipRect.height / 2 + window.scrollY}px`;
      style.left = `${targetRect.right + gap}px`;
      break;
  }
}
