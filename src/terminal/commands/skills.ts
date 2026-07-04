import type { Command } from '../context';

export const skills: Command = {
  name: 'skills',
  summary: 'list skills, software first',
  run(ctx) {
    return ctx.showSkills();
  },
};
