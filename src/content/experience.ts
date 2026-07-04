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
    period: '2026 – present',
    highlights: [
      'React/Next.js frontends backed by Java (Spring, Vert.x) services on AWS',
      'Owns CI/CD pipelines end to end, from PR checks to deploy',
      'Builds AI agent tooling with LangChain, LangGraph, AWS Strands, and Bedrock',
    ],
  },
  {
    role: 'Senior Software Development Engineer',
    org: 'WhatIf Media Group',
    period: '2023 – 2026',
    highlights: [
      'Built a Next.js app standardizing frontend experiences around reusable components',
      'Integrated headless Strapi CMS with Next.js, replacing legacy WordPress sites',
      'Launched a Neo4j-powered digital-offer recommendation system',
    ],
  },
  {
    role: 'Software Development Engineer II',
    org: 'WhatIf Media Group',
    period: '2022 – 2023',
    highlights: [
      'Maintained an internal React CMS and a Java Vert.x backend with linked microservices',
      'Adopted Vert.x and Spring WebFlux for reactive backend implementations',
      'Frontend work in React, Redux, and Bootstrap',
      'Scaled infra on AWS ECS, EKS, SQS, and S3',
    ],
  },
  {
    role: 'Technical Leader',
    org: 'Technisys',
    period: '2022 – present',
    highlights: [
      "Led integration of VU's AI-powered fraud detection into HSBC Argentina's home banking platform",
    ],
  },
  {
    role: 'Sr. Full-Stack Developer',
    org: 'Technisys',
    period: '2022',
    highlights: [
      'Expanded scope after integrating MODO, a virtual-wallet service, into the core banking platform',
    ],
  },
  {
    role: 'Ssr. Full-Stack Developer',
    org: 'Technisys',
    period: '2021 – 2022',
    highlights: [
      'Integrated SOAP/REST services into the core banking platform',
      'Designed CI/CD pipelines with Azure DevOps',
      'Frontend in React with Redux-Saga',
      'Wrapped React apps with Cordova for native mobile builds',
    ],
  },
  {
    role: 'Ssr. Full-Stack Developer',
    org: 'Judicial Branch of the Nation',
    period: '2020 – 2021',
    highlights: [
      'Built a DDD-compliant, service-oriented app replacing a legacy system with a modern UI',
      'Stack: Quarkus/Spring Boot, Java 11, Spring Data JPA, REST, React, Redux, Material UI, TypeScript',
    ],
  },
  {
    role: 'Junior Developer',
    org: 'Judicial Branch of the Nation',
    period: '2019 – 2020',
    highlights: [
      'Migrated legacy systems to a service-oriented architecture',
      'Stack: Java EE 8/11, Spring Data JPA, CDI, WildFly, Oracle, H2, JAX-RS, JUnit/Arquillian, Quarkus, Hibernate, Maven, OpenAPI/Swagger',
    ],
  },
  {
    role: 'Software Developer & 3D Designer',
    org: 'Freelance',
    period: '2017 – present',
    highlights: ['3D content for printing, architectural visualization, animation, and publicity'],
  },
];
