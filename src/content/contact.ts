import type { Segment } from '../terminal/segments';
import { text, link, prompt } from '../terminal/segments';
import { GITHUB_URL, LINKEDIN_URL } from '../config';

export const contact: Segment[] = [
  prompt(),
  text('figlet GitHub\n'),
  text(
    '  ____ _ _   _   _       _\n' +
      ' / ___(_) |_| | | |_   _| |__\n' +
      "| |  _| | __| |_| | | | | '_ \\\n" +
      '| |_| | | |_|  _  | |_| | |_) |\n' +
      ' \\____|_|\\__|_| |_|\\__,_|_.__/\n\n',
  ),
  text('Username: design3d-blender\n'),
  text('Link: '),
  link(GITHUB_URL, 'Click Here!'),
  text('\n\n'),
  prompt(),
  text('figlet LinkedIn\n'),
  text(
    ' _     _       _            _ ___\n' +
      '| |   (_)_ __ | | _____  __| |_ _|_ __\n' +
      "| |   | | '_ \\| |/ / _ \\/ _` || || '_ \\\n" +
      '| |___| | | | |   <  __/ (_| || || | | |\n' +
      '|_____|_|_| |_|_|\\_\\___|\\__,_|___|_| |_|\n\n',
  ),
  text('Link: '),
  link(LINKEDIN_URL, 'Click Here!'),
  text('\n'),
];
