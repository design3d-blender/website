import type { Shell } from './shell';
import { promptNode } from './renderer';

export interface PromptLineCallbacks {
  onSubmit(line: string): void;
  onTabCandidates(candidates: string[]): void;
}

export class PromptLine {
  readonly element: HTMLParagraphElement;
  readonly input: HTMLInputElement;

  constructor(
    directory: string,
    private readonly shell: Shell,
    private readonly callbacks: PromptLineCallbacks,
  ) {
    this.element = document.createElement('p');
    this.element.appendChild(
      promptNode(directory === '~' ? undefined : directory.replace(/^~\/?/, '')),
    );

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.className = 'shell-input';
    this.input.autocomplete = 'off';
    this.input.spellcheck = false;
    this.input.setAttribute('aria-label', 'terminal command input');
    this.element.appendChild(this.input);

    this.input.addEventListener('keydown', (e) => this.handleKey(e));
  }

  focus(): void {
    // preventScroll: focusing a freshly-appended input at the bottom of #console
    // otherwise makes the browser scroll the *page* (not just #console) into
    // view, which shifts #osbar/#topbar off-screen above the viewport.
    this.input.focus({ preventScroll: true });
  }

  private handleKey(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = this.input.value;
      this.freeze(value);
      this.callbacks.onSubmit(value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = this.shell.historyPrev();
      if (prev !== undefined) this.input.value = prev;
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.input.value = this.shell.historyNext();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      this.handleTab();
    }
  }

  private handleTab(): void {
    const candidates = this.shell.complete(this.input.value);
    if (candidates.length === 1) {
      this.input.value = `${candidates[0]} `;
    } else if (candidates.length > 1) {
      this.callbacks.onTabCandidates(candidates);
    }
  }

  private freeze(value: string): void {
    this.input.disabled = true;
    this.input.replaceWith(document.createTextNode(value));
  }
}
