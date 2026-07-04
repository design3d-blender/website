import type { Command } from '../context';
import { text } from '../segments';
import { PROMPT_USER } from '../../config';

export const whoami: Command = {
  name: 'whoami',
  summary: 'print current user',
  run(ctx) {
    return ctx.print([text(`${PROMPT_USER} — Staff Software Engineer, WhatIf Media Group\n`)]);
  },
};
