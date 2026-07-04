import type { Command } from '../context';

export const resume: Command = {
  name: 'resume',
  summary: 'open the resume PDF',
  run(ctx) {
    ctx.openResume();
  },
};
