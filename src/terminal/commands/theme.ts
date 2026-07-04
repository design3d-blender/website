import type { Command } from '../context';
import { text } from '../segments';

const THEMES = ['dark', 'light', 'matrix'];

export const theme: Command = {
  name: 'theme',
  summary: 'switch terminal theme (dark | light | matrix)',
  run(ctx, args) {
    const name = args[0];
    if (!name || !THEMES.includes(name)) {
      return ctx.print([text(`usage: theme <${THEMES.join('|')}>\n`)]);
    }
    ctx.setTheme(name);
  },
};
