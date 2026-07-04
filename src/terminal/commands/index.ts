import type { Command } from '../context';
import { help } from './help';
import { ls } from './ls';
import { cd } from './cd';
import { cat } from './cat';
import { whoami } from './whoami';
import { clear } from './clear';
import { theme } from './theme';
import { welcome } from './welcome';
import { skills } from './skills';
import { portfolio } from './portfolio';
import { showcase } from './showcase';
import { contact } from './contact';
import { projectsCommand } from './projects';
import { resume } from './resume';
import { sudo } from './sudo';
import { neofetch } from './neofetch';
import { snake } from './snake';
import { cowsay } from './cowsay';
import { fortune } from './fortune';
import { sl } from './sl';

export const commands: Command[] = [
  help,
  ls,
  cd,
  cat,
  whoami,
  clear,
  theme,
  welcome,
  skills,
  portfolio,
  showcase,
  contact,
  projectsCommand,
  resume,
  sudo,
  neofetch,
  snake,
  cowsay,
  fortune,
  sl,
];
