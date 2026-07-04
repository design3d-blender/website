import type { Command } from '../context';
import { text } from '../segments';
import { PROMPT_USER } from '../../config';
import { experience } from '../../content/experience';

export const whoami: Command = {
  name: 'whoami',
  summary: 'print current role and experience',
  run(ctx) {
    const segments = experience.flatMap((entry) => [
      text(`${entry.role}, ${entry.org} (${entry.period})\n`),
      ...entry.highlights.map((line) => text(`  - ${line}\n`)),
    ]);
    return ctx.print([text(`${PROMPT_USER}\n\n`), ...segments]);
  },
};
