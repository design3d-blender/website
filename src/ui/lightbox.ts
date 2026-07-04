import type { PortfolioItem } from '../content/portfolio';

export class Lightbox {
  private readonly overlay: HTMLDivElement;
  private readonly stage: HTMLDivElement;
  private items: PortfolioItem[] = [];
  private index = 0;
  private lastFocused: HTMLElement | null = null;
  private readonly onKeydown = (e: KeyboardEvent): void => this.handleKey(e);

  constructor() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'lightbox';
    this.overlay.setAttribute('role', 'dialog');
    this.overlay.setAttribute('aria-modal', 'true');
    this.overlay.setAttribute('aria-label', 'image gallery');
    this.overlay.hidden = true;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'close');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => this.close());

    const prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-prev';
    prevBtn.setAttribute('aria-label', 'previous slide');
    prevBtn.textContent = '‹';
    prevBtn.addEventListener('click', () => this.show(this.index - 1));

    const nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-next';
    nextBtn.setAttribute('aria-label', 'next slide');
    nextBtn.textContent = '›';
    nextBtn.addEventListener('click', () => this.show(this.index + 1));

    this.stage = document.createElement('div');
    this.stage.className = 'lightbox-stage';

    this.overlay.append(closeBtn, prevBtn, this.stage, nextBtn);
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
    document.body.appendChild(this.overlay);
  }

  open(items: PortfolioItem[], startIndex: number, trigger: HTMLElement): void {
    this.items = items;
    this.lastFocused = trigger;
    this.overlay.hidden = false;
    document.addEventListener('keydown', this.onKeydown);
    this.show(startIndex);
    (this.overlay.querySelector('.lightbox-close') as HTMLElement | null)?.focus();
  }

  close(): void {
    this.overlay.hidden = true;
    this.stage.replaceChildren();
    document.removeEventListener('keydown', this.onKeydown);
    this.lastFocused?.focus();
  }

  private show(index: number): void {
    const total = this.items.length;
    this.index = ((index % total) + total) % total;
    const item = this.items[this.index];
    this.stage.replaceChildren();

    if (item.type === 'video') {
      const video = document.createElement('video');
      video.src = item.src;
      video.poster = item.poster ?? '';
      video.controls = true;
      video.autoplay = true;
      this.stage.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = '';
      this.stage.appendChild(img);
    }
  }

  private handleKey(e: KeyboardEvent): void {
    if (e.key === 'Escape') this.close();
    else if (e.key === 'ArrowLeft') this.show(this.index - 1);
    else if (e.key === 'ArrowRight') this.show(this.index + 1);
  }
}
