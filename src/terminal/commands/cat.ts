import type { Command } from '../context';
import { text, bold, link } from '../segments';
import { projects } from '../../content/projects';
import { portfolioItems } from '../../content/portfolio';
import { slug, DIRS, HIDDEN_FILES, portfolioFilename } from '../filesystem';

export const cat: Command = {
  name: 'cat',
  summary: 'print a file / open it',
  async run(ctx, args) {
    const file = args[0];
    if (!file) {
      await ctx.print([text('usage: cat <file>\n')]);
      return;
    }

    const entries = DIRS[ctx.directory] ?? [];
    const hiddenEntries = HIDDEN_FILES[ctx.directory] ?? [];
    if (!entries.includes(file) && !hiddenEntries.includes(file)) {
      await ctx.print([text(`cat: ${file}: no such file\n`)]);
      return;
    }

    if (ctx.directory === '~') {
      if (file === 'welcome.txt') return ctx.showWelcome();
      if (file === 'skills.txt') return ctx.showSkills();
      if (file === 'contact.txt') return ctx.showContact();
      if (file === 'resume.pdf') return ctx.openResume();
      if (file === '.snake') {
        await ctx.print([
          text('someone left a game lying around here. try running '),
          bold('snake'),
          text('.\n'),
        ]);
        return;
      }
    }

    if (ctx.directory === '~/projects') {
      const project = projects.find((p) => `${slug(p.name)}.txt` === file);
      if (project) {
        await ctx.print([
          text(`${project.name}\n`),
          text(`${project.description}\n`),
          text(`tags: ${project.tags.join(', ')}\n`),
          link(project.url, project.url),
          text('\n'),
        ]);
        return;
      }
    }

    if (ctx.directory === '~/portfolio') {
      const index = portfolioItems.findIndex((item) => portfolioFilename(item) === file);
      if (index >= 0) {
        ctx.openPortfolioItem(index);
        return;
      }
    }

    await ctx.print([text(`cat: ${file}: no such file\n`)]);
  },
};
