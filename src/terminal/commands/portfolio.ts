import type { Command } from '../context';

export const portfolio: Command = {
  name: 'portfolio',
  summary: 'open the image/video portfolio grid',
  run(ctx) {
    return ctx.showPortfolio();
  },
};
