import type { Command } from '../context';
import { text } from '../segments';
import { resolveDir } from '../filesystem';

export const cd: Command = {
  name: 'cd',
  summary: 'change directory',
  run(ctx, args) {
    const target = args[0] ?? '~';
    const resolved = resolveDir(ctx.directory, target);
    if (!resolved) {
      return ctx.print([text(`cd: no such directory: ${target}\n`)]);
    }
    ctx.setDirectory(resolved);
  },
};
