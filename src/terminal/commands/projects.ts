import type { Command } from '../context';

export const projectsCommand: Command = {
  name: 'projects',
  summary: 'list projects',
  run(ctx) {
    return ctx.showProjects();
  },
};
