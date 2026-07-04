import type { Command } from '../context';

export const contact: Command = {
  name: 'contact',
  summary: 'show contact info',
  run(ctx) {
    return ctx.showContact();
  },
};
