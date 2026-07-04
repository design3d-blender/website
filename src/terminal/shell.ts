import type { Command, ShellContext } from './context';
import { commands as defaultCommands } from './commands/index';
import { text } from './segments';

export function parseLine(line: string): { name: string; args: string[] } {
  const parts = line.trim().split(/\s+/).filter(Boolean);
  return { name: parts[0] ?? '', args: parts.slice(1) };
}

export class Shell {
  private readonly history: string[] = [];
  private historyIndex = 0;

  constructor(
    private readonly ctx: ShellContext,
    private readonly registry: Command[] = defaultCommands,
  ) {}

  async execute(line: string): Promise<void> {
    if (!line.trim()) return;
    this.history.push(line);
    this.historyIndex = this.history.length;

    const { name, args } = parseLine(line);
    const command = this.registry.find((c) => c.name === name);
    if (!command) {
      await this.ctx.print([text(`command not found: ${name} (try 'help')\n`)]);
      return;
    }
    await command.run(this.ctx, args);
  }

  historyPrev(): string | undefined {
    if (this.historyIndex > 0) this.historyIndex--;
    return this.history[this.historyIndex];
  }

  historyNext(): string {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      return this.history[this.historyIndex];
    }
    this.historyIndex = this.history.length;
    return '';
  }

  complete(partial: string): string[] {
    if (!partial) return [];
    return this.registry
      .filter((c) => !c.hidden)
      .map((c) => c.name)
      .filter((name) => name.startsWith(partial))
      .sort();
  }

  commandList(): Command[] {
    return this.registry;
  }
}
