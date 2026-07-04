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
      '│   │   ├── Python\n' +
      '│   │   ├── Go\n' +
      '│   │   ├── PHP\n' +
      '│   │   ├── C / C++\n' +
      '│   │   └── ClojureScript\n' +
      '│   ├── Frontend\n' +
      '│   │   ├── React\n' +
      '│   │   ├── Redux / Redux Toolkit\n' +
      '│   │   ├── Next.js\n' +
      '│   │   ├── Vue.js\n' +
      '│   │   └── React SSR\n' +
      '│   ├── Backend\n' +
      '│   │   ├── Spring / Spring WebFlux\n' +
      '│   │   ├── Vert.x\n' +
      '│   │   ├── Quarkus\n' +
      '│   │   ├── Django\n' +
      '│   │   ├── Hibernate / JPA\n' +
      '│   │   └── REST / OpenAPI & Swagger\n' +
      '│   ├── Cloud & DevOps\n' +
      '│   │   ├── AWS (Bedrock, EKS, ECS, SQS, S3)\n' +
      '│   │   ├── Docker / Kubernetes\n' +
      '│   │   ├── CI/CD (GitHub Actions, Azure DevOps)\n' +
      '│   │   └── Redis\n' +
      '│   ├── AI & Agent Tooling\n' +
      '│   │   ├── LangChain\n' +
      '│   │   ├── LangGraph\n' +
      '│   │   ├── AWS Strands\n' +
      '│   │   └── AWS Bedrock\n' +
      '│   ├── Data\n' +
      '│   │   ├── MongoDB\n' +
      '│   │   ├── MySQL / SQL\n' +
      '│   │   └── Neo4j\n' +
      '│   └── Architecture\n' +
      '│       ├── Microservices / SOA\n' +
      '│       ├── Headless CMS\n' +
      '│       └── Front-end standardization\n' +
      '└── 3D Design (hobby)\n' +
      '    ├── Blender\n' +
      '    ├── Substance\n' +
      '    ├── Three.js / Babylon.js\n' +
      '    └── Architectural visualization\n\n' +
      '45 directories\n',
  ),
  prompt('skills'),
];
