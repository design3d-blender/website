import type { Segment } from '../terminal/segments';
import { text } from '../terminal/segments';

// figlet-style "Welcome" wordmark, shown beside the portrait on the welcome screen
export const WORDMARK: Segment[] = [
  text(
    ' _       __     __\n' +
      '| |     / /__  / /________  ____ ___  ___\n' +
      '| | /| / / _ \\/ / ___/ __ \\/ __ `__ \\/ _ \\\n' +
      '| |/ |/ /  __/ / /__/ /_/ / / / / / /  __/\n' +
      '|__/|__/\\___/_/\\___/\\____/_/ /_/ /_/\\___/\n',
  ),
];
