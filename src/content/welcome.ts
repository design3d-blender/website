import type { Segment } from '../terminal/segments';
import { text, bold, prompt } from '../terminal/segments';

export const welcome: Segment[] = [
  text(
    ' _       __     __\n' +
      '| |     / /__  / /________  ____ ___  ___\n' +
      '| | /| / / _ \\/ / ___/ __ \\/ __ `__ \\/ _ \\\n' +
      '| |/ |/ /  __/ / /__/ /_/ / / / / / /  __/\n' +
      '|__/|__/\\___/_/\\___/\\____/_/ /_/ /_/\\___/\n\n',
  ),
  prompt('welcome'),
  bold('cat welcome.txt'),
  text('\n\n'),
  text("Hi, I'm Juan — a Staff Software Engineer at WhatIf Media Group.\n\n"),
  text(
    'I build production systems end to end: React/Next.js on the frontend, ' +
      'Java (Spring, Vert.x) on the backend, deployed on AWS with CI/CD ' +
      'pipelines I design myself. Lately that also means building with AI ' +
      'agent tooling (LangChain, LangGraph, AWS Strands, Bedrock).\n\n',
  ),
  text(
    'This site itself is one of my projects: a hand-built terminal shell, no framework, no black-box widgets.\n\n',
  ),
  prompt('welcome/instructions'),
  bold('cat .instructions'),
  text('\n'),
  text('Use the buttons on the bar, or type '),
  bold('help'),
  text(' below — this terminal is real, not decoration.\n\n'),
  bold('skills'),
  text('    what I work with, software first\n'),
  bold('projects'),
  text("  things I've built\n"),
  bold('resume'),
  text('    my CV\n'),
  bold('contact'),
  text('   how to reach me\n\n'),
  text('Still 3D-curious after hours — the '),
  bold('showcase'),
  text(' command has a model to play with.\n'),
];
