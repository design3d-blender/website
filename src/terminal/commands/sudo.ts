import type { Command } from '../context';
import { text, bold } from '../segments';
import { PROMPT_USER } from '../../config';

export const sudo: Command = {
  name: 'sudo',
  summary: '...',
  run(ctx, args) {
    return ctx.print([
      text(`${PROMPT_USER} is not in the sudoers file. `),
      bold('This incident will be reported.'),
      text('\n'),
      ...(args[0] ? [text(`(nice try with "${args.join(' ')}", though)\n`)] : []),
    ]);
  },
};
