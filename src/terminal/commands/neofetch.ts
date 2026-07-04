import type { Command } from '../context';
import type { Segment } from '../segments';
import { text, accent } from '../segments';
import { PROMPT_USER, PROMPT_HOST } from '../../config';
import { experience } from '../../content/experience';
import { PORTRAIT } from '../../content/portrait';

function row(label: string, value: string): Segment[] {
  return [accent(label.padEnd(9), 'accent-3'), text(`${value}\n`)];
}

export const neofetch: Command = {
  name: 'neofetch',
  summary: 'system info, in the neofetch style',
  async run(ctx) {
    const current = experience[0];
    const theme = document.documentElement.dataset.theme ?? 'dark';

    const portraitSegments: Segment[] = PORTRAIT.flatMap((line) => [
      accent(line, 'accent-2'),
      text('\n'),
    ]);
    await ctx.print(portraitSegments, 'ascii-portrait');

    const info: Segment[] = [
      accent(`${PROMPT_USER}`, 'warning'),
      accent('@', 'accent'),
      accent(`${PROMPT_HOST}`, 'accent'),
      text('\n'),
      text('-----------------\n'),
      ...row('OS:', 'staff-eng.dev (portfolio build)'),
      ...row('Host:', current.org),
      ...row('Kernel:', 'TypeScript 5.6 / Vite'),
      ...row('Shell:', 'hand-rolled, zero-framework'),
      ...row('DE:', 'Terminal Desktop Environment'),
      ...row('Theme:', theme),
      ...row('CPU:', `${current.role} @ ${current.org}`),
      ...row('GPU:', 'React / Next.js + Java (Spring, Vert.x)'),
      ...row('Memory:', 'LangChain, LangGraph, AWS Strands, Bedrock'),
      text('\n'),
    ];

    await ctx.print(info);
  },
};
