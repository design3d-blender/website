import type { Segment } from './segments';

export interface ShellContext {
  print(segments: Segment[], speedMs?: number): Promise<void>;
  clear(): void;
  directory: string;
  setDirectory(dir: string): void;
  showWelcome(): Promise<void>;
  showSkills(): Promise<void>;
  showPortfolio(): Promise<void>;
  showShowcase(): Promise<void>;
  showContact(): Promise<void>;
  showProjects(): Promise<void>;
  openResume(): void;
  openPortfolioItem(index: number): void;
  setTheme(name: string): void;
}

export interface Command {
  name: string;
  summary: string;
  run(ctx: ShellContext, args: string[]): Promise<void> | void;
}
