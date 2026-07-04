import type { Segment } from '../terminal/segments';
import { bold, prompt } from '../terminal/segments';

export const init: Segment[] = [prompt(''), bold('init && cd welcome')];
