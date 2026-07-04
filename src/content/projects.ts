export interface Project {
  name: string;
  description: string;
  tags: string[];
  url: string;
}

export const projects: Project[] = [
  {
    name: 'InterC',
    description:
      'A C interpreter, written in C — parses and executes C source directly, no compile step.',
    tags: ['C', 'interpreters', 'compilers'],
    url: 'https://github.com/design3d-blender/interc',
  },
  {
    name: 'exploder',
    description:
      'Blender addon that auto-generates exploded views and explosion animations from any assembly.',
    tags: ['Blender', 'Python', 'addon'],
    url: 'https://github.com/design3d-blender/exploder',
  },
  {
    name: 'BlendRef',
    description:
      'Reference-image and pose-library tool for Blender, built to speed up modeling workflow.',
    tags: ['Blender', 'Python'],
    url: 'https://github.com/design3d-blender/blendref',
  },
  {
    name: 'Hibernate Populator',
    description:
      'Generates realistic test data straight from Hibernate entity mappings — no manual fixtures.',
    tags: ['Java', 'Hibernate', 'JPA'],
    url: 'https://github.com/design3d-blender/hibernate-populator',
  },
  {
    name: 'this site',
    description:
      'This portfolio: a real command shell over a typed TS/Vite build, deployed via GitHub Actions.',
    tags: ['TypeScript', 'Vite', 'Vitest', 'three.js'],
    url: 'https://github.com/design3d-blender/website',
  },
];
