import type { Command } from '../context';
import { text } from '../segments';

const FORTUNES = [
  'There are only two hard things in computer science: cache invalidation and naming things.',
  'It works on my machine.',
  "A staff engineer's job is to make good decisions cheap to reverse.",
  'The best code is the code you never had to write.',
  'Ctrl+Z is the closest thing to a time machine you get today.',
  '99 little bugs in the code, 99 little bugs. Take one down, patch it around — 127 little bugs in the code.',
  'Weeks of coding can save you hours of planning.',
  "There's no cloud. It's just someone else's computer, deployed by CI/CD you wrote.",
];

export const fortune: Command = {
  name: 'fortune',
  summary: 'print a random one-liner',
  run(ctx) {
    const line = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    return ctx.print([text(`${line}\n`)]);
  },
};
