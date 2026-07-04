import { projects } from '../content/projects';
import { portfolioItems, type PortfolioItem } from '../content/portfolio';

export const slug = (name: string): string => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const portfolioFilename = (item: PortfolioItem): string =>
  item.src.split('/').pop() ?? item.id;

export const DIRS: Record<string, string[]> = {
  '~': ['welcome.txt', 'skills.txt', 'contact.txt', 'resume.pdf', 'projects/', 'portfolio/'],
  '~/projects': projects.map((p) => `${slug(p.name)}.txt`),
  '~/portfolio': portfolioItems.map(portfolioFilename),
};

export function resolveDir(current: string, target: string): string | null {
  if (target === '~' || target === '/') return '~';
  if (target === '..') {
    if (current === '~') return '~';
    return '~';
  }
  const clean = target.replace(/\/$/, '');
  const candidate = current === '~' ? `~/${clean}` : `${current}/${clean}`;
  return candidate in DIRS ? candidate : null;
}
