import type { Command } from '../context';

export const showcase: Command = {
  name: 'showcase',
  summary: 'load the interactive 3D model viewer',
  run(ctx) {
    return ctx.showShowcase();
  },
};
