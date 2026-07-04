import type { PortfolioItem } from '../content/portfolio';
import { Lightbox } from './lightbox';

export class PortfolioGrid {
  private built = false;

  constructor(
    private readonly container: HTMLElement,
    private readonly items: PortfolioItem[],
    private readonly lightbox: Lightbox,
  ) {}

  show(): void {
    if (!this.built) this.build();
    this.container.hidden = false;
  }

  hide(): void {
    this.container.hidden = true;
  }

  private build(): void {
    this.items.forEach((item, index) => {
      const cell = document.createElement('div');
      cell.className = 'item';

      const trigger = document.createElement('button');
      trigger.className = 'item-link';
      trigger.style.background = 'none';
      trigger.style.border = 'none';
      trigger.style.padding = '0';
      trigger.setAttribute('aria-label', `open ${item.id}`);

      const img = document.createElement('img');
      img.className = 'img-fluid';
      img.src = item.type === 'video' ? (item.poster ?? '') : item.src;
      img.alt = '';
      trigger.appendChild(img);

      trigger.addEventListener('click', () => this.lightbox.open(this.items, index, trigger));
      cell.appendChild(trigger);
      this.container.appendChild(cell);
    });
    this.built = true;
  }
}
