import type { Command } from '../context';
import { text } from '../segments';

const COW = String.raw`
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
`;

function wrap(message: string, width: number): string[] {
  const words = message.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if (`${current} ${word}`.trim().length > width) {
      if (current) lines.push(current.trim());
      current = word;
    } else {
      current = `${current} ${word}`.trim();
    }
  }
  if (current) lines.push(current);
  return lines;
}

function speechBubble(message: string): string {
  const lines = wrap(message, 40);
  const width = Math.max(...lines.map((l) => l.length));
  const top = ` ${'_'.repeat(width + 2)}`;
  const bottom = ` ${'-'.repeat(width + 2)}`;
  const body = lines.map((line, i) => {
    const pad = line.padEnd(width);
    if (lines.length === 1) return `< ${pad} >`;
    if (i === 0) return `/ ${pad} \\`;
    if (i === lines.length - 1) return `\\ ${pad} /`;
    return `| ${pad} |`;
  });
  return [top, ...body, bottom].join('\n');
}

export const cowsay: Command = {
  name: 'cowsay',
  summary: 'a cow says something',
  run(ctx, args) {
    const message = args.join(' ') || "moo, I'm juan's terminal";
    return ctx.print([text(`${speechBubble(message)}${COW}\n`)]);
  },
};
