import type { Command } from '../context';
import { text } from '../segments';
import { commands } from './index';

export const help: Command = {
  name: 'help',
  summary: 'list available commands',
  run(ctx) {
    const lines = commands
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((c) => `  ${c.name.padEnd(10)} ${c.summary}`)
      .join('\n');
    return ctx.print([text(`Available commands:\n${lines}\n`)]);
  },
};
