import type { Segment } from './segments';

export interface ShellContext {
  /** className, if given, is added to the paragraph the segments render into (e.g. for a smaller-scale ASCII-art block). */
  print(segments: Segment[], className?: string): Promise<void>;
  /** Appends a raw DOM node to the output stream (for things print()'s typewriter can't render, like a game canvas). */
  mountElement(el: HTMLElement): void;
  clear(): void;
  directory: string;
  setDirectory(dir: string): void;
  showWelcome(): Promise<void>;
  showSkills(): Promise<void>;
  showPortfolio(): Promise<void>;
  showShowcase(): Promise<void>;
  showContact(): Promise<void>;
  showProjects(): Promise<void>;
  openResume(): Promise<void>;
  openPortfolioItem(index: number): void;
  setTheme(name: string): void;
}

export interface Command {
  name: string;
  summary: string;
  /** Hidden commands still run when typed exactly, but are left out of `help` and tab-completion. */
  hidden?: boolean;
  run(ctx: ShellContext, args: string[]): Promise<void> | void;
}
