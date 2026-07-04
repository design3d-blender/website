export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
}

export interface LanguageEntry {
  name: string;
  level: string;
}

export const PROFILE = {
  fullName: 'Juan Luis Muñoz Ioannidis',
  location: 'CABA, Argentina',
  languages: [
    { name: 'Spanish', level: 'native' },
    { name: 'English', level: 'fluent' },
  ] satisfies LanguageEntry[],
  education: [
    { degree: 'Engineer in Applied Computing', school: 'UTN-INSPT', period: '2016 – 2019' },
    {
      degree: 'Electromechanical Technician',
      school: 'Instituto Privado León XIII',
      period: '2009 – 2015',
    },
  ] satisfies EducationEntry[],
};
