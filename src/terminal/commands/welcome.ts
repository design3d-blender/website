import type { Command } from '../context';

export const welcome: Command = {
  name: 'welcome',
  summary: 'show the welcome message',
  run(ctx) {
    return ctx.showWelcome();
  },
};
