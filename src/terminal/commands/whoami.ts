import type { Command } from '../context';
import { text, bold } from '../segments';
import { PROMPT_USER } from '../../config';
import { experience } from '../../content/experience';
import { PROFILE } from '../../content/profile';

export const whoami: Command = {
  name: 'whoami',
  summary: 'print current role and experience',
  run(ctx) {
    const experienceSegments = experience.flatMap((entry) => [
      text(`${entry.role}, ${entry.org} (${entry.period})\n`),
      ...entry.highlights.map((line) => text(`  - ${line}\n`)),
      text('\n'),
    ]);

    const languages = PROFILE.languages.map((l) => `${l.name} (${l.level})`).join(', ');

    const educationSegments = PROFILE.education.flatMap((e) => [
      text(`${e.degree} — ${e.school} (${e.period})\n`),
    ]);

    return ctx.print([
      text(`${PROMPT_USER}\n\n`),
      bold(PROFILE.fullName),
      text(`\n${PROFILE.location} · ${languages}\n\n`),
      ...experienceSegments,
      bold('education'),
      text('\n'),
      ...educationSegments,
    ]);
  },
};
