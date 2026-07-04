import type { Segment } from '../terminal/segments';
import { text, prompt } from '../terminal/segments';

export const skills: Segment[] = [
  prompt(),
  text('tree skills\n'),
  text(
    'skills\n' +
      '├── Software Engineering\n' +
      '│   ├── Languages\n' +
      '│   │   ├── TypeScript / JavaScript\n' +
      '│   │   ├── Java\n' +
      '│   │   └── C\n' +
      '│   ├── Frontend\n' +
      '│   │   ├── React\n' +
      '│   │   ├── Next.js\n' +
      '│   │   └── Vue.js\n' +
      '│   ├── Backend\n' +
      '│   │   ├── Spring / SpringData\n' +
      '│   │   ├── Vert.x\n' +
      '│   │   ├── Hibernate / JPA\n' +
      '│   │   └── REST\n' +
      '│   ├── Cloud & DevOps\n' +
      '│   │   ├── AWS\n' +
      '│   │   ├── CI/CD (GitHub Actions)\n' +
      '│   │   └── Docker\n' +
      '│   ├── AI & Agent Tooling\n' +
      '│   │   ├── LangChain\n' +
      '│   │   ├── LangGraph\n' +
      '│   │   ├── AWS Strands\n' +
      '│   │   └── AWS Bedrock\n' +
      '│   └── Data\n' +
      '│       ├── MongoDB\n' +
      '│       ├── MySQL\n' +
      '│       └── SQL\n' +
      '└── 3D Design (hobby)\n' +
      '    ├── Blender\n' +
      '    ├── Substance\n' +
      '    └── Three.js\n\n' +
      '31 directories\n',
  ),
  prompt('skills'),
];
