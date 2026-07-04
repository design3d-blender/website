import type { Command } from '../context';
import { text } from '../segments';
import { DIRS, HIDDEN_FILES } from '../filesystem';

export const ls: Command = {
  name: 'ls',
  summary: 'list directory contents',
  run(ctx, args) {
    const entries = DIRS[ctx.directory] ?? [];
    const hidden = args.includes('-a') ? (HIDDEN_FILES[ctx.directory] ?? []) : [];
    return ctx.print([text([...entries, ...hidden].join('  ') + '\n')]);
  },
};
