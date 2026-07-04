import type { Command } from '../context';
import { text, bold } from '../segments';
import { PROMPT_USER } from '../../config';

const RM_RF = /rm\s+-[rf]{2}\s*\/?/i;

export const sudo: Command = {
  name: 'sudo',
  summary: '...',
  async run(ctx, args) {
    const joined = args.join(' ');
    const isDestructive = RM_RF.test(joined);

    if (isDestructive) {
      await ctx.print([
        text('Deleting /...\n'),
        text('Deleting /usr...\n'),
        text('Deleting /home/juan...\n'),
        text('rm: cannot remove '),
        bold("'/'"),
        text(': you wish.\n\n'),
      ]);
    }

    await ctx.print([
      text(`${PROMPT_USER} is not in the sudoers file. `),
      bold('This incident will be reported.'),
      text('\n'),
      ...(args[0] && !isDestructive ? [text(`(nice try with "${joined}", though)\n`)] : []),
    ]);
  },
};
