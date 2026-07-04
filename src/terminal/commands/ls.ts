import type { Command } from '../context';
import { text } from '../segments';
import { DIRS } from '../filesystem';

export const ls: Command = {
  name: 'ls',
  summary: 'list directory contents',
  run(ctx) {
    const entries = DIRS[ctx.directory] ?? [];
    return ctx.print([text(entries.join('  ') + '\n')]);
  },
};
