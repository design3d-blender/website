import type { Segment } from './segments';
import { PROMPT_USER, PROMPT_HOST } from '../config';

type Atom = { kind: 'char'; ch: string; bold: boolean } | { kind: 'node'; node: () => Node };

export function promptNode(directory?: string): Node {
  const wrap = document.createElement('span');
  wrap.innerHTML =
    '<span class="bracket">[</span>' +
    `<span class="user">${PROMPT_USER}</span>` +
    '<span class="at">@</span>' +
    `<span class="host">${PROMPT_HOST} </span>` +
    `<span class="directory">~${directory ? '/' + directory : ''}</span>` +
    '<span class="bracket">]</span>$ ';
  return wrap;
}

function linkNode(href: string, label: string): Node {
  const a = document.createElement('a');
  a.className = 'links';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.href = href;
  a.textContent = label;
  return a;
}

function toAtoms(segments: Segment[]): Atom[] {
  const atoms: Atom[] = [];
  for (const segment of segments) {
    switch (segment.type) {
      case 'text':
        for (const ch of segment.value) atoms.push({ kind: 'char', ch, bold: false });
        break;
      case 'bold':
        for (const ch of segment.value) atoms.push({ kind: 'char', ch, bold: true });
        break;
      case 'link':
        atoms.push({ kind: 'node', node: () => linkNode(segment.href, segment.label) });
        break;
      case 'prompt':
        atoms.push({ kind: 'node', node: () => promptNode(segment.directory) });
        break;
    }
  }
  return atoms;
}

function charNode(ch: string, bold: boolean): Node {
  if (ch === '\n') return document.createElement('br');
  const value = ch === ' ' ? ' ' : ch;
  if (!bold) return document.createTextNode(value);
  const span = document.createElement('span');
  span.className = 'bold';
  span.textContent = value;
  return span;
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export class TypeWriter {
  private cancelled = false;

  constructor(private readonly container: HTMLElement) {}

  cancel(): void {
    this.cancelled = true;
  }

  /** Renders `segments` into the container, one atom at a time, at `speedMs` per atom. */
  async run(segments: Segment[], speedMs = 0): Promise<void> {
    this.cancelled = false;
    this.container.textContent = '';
    const atoms = toAtoms(segments);
    const instant = prefersReducedMotion();

    for (const atom of atoms) {
      if (this.cancelled) return;
      const node = atom.kind === 'char' ? charNode(atom.ch, atom.bold) : atom.node();
      this.container.appendChild(node);
      if (!instant && speedMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, speedMs));
      }
    }
  }
}
