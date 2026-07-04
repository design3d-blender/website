export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  highlights: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Staff Software Engineer',
    org: 'WhatIf Media Group',
    period: 'current',
    highlights: [
      'React/Next.js frontends backed by Java (Spring, Vert.x) services on AWS',
      'Owns CI/CD pipelines end to end, from PR checks to deploy',
      'Builds AI agent tooling with LangChain, LangGraph, AWS Strands, and Bedrock',
    ],
  },
];
