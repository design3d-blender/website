import './styles/index.css';
import type { ShellContext } from './terminal/context';
import type { Segment } from './terminal/segments';
import { text, bold, link } from './terminal/segments';
import { TypeWriter } from './terminal/renderer';
import { Shell } from './terminal/shell';
import { PromptLine } from './terminal/prompt-line';
import { welcome } from './content/welcome';
import { skills } from './content/skills';
import { contact } from './content/contact';
import { projects } from './content/projects';
import { portfolioItems, resumePdfPath } from './content/portfolio';
import { Lightbox } from './ui/lightbox';
import { PortfolioGrid } from './ui/portfolio-grid';
import { applyStoredTheme, setTheme as persistTheme } from './ui/theme';
import { initWindowChrome } from './ui/window-chrome';

applyStoredTheme();
initWindowChrome();

const output = document.getElementById('output') as HTMLElement;
const consoleEl = document.getElementById('console') as HTMLElement;
const linksEl = document.getElementById('links') as HTMLElement;
const canvas3D = document.getElementById('canvas3D') as HTMLElement;
const renderCanvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
const sliderInput = document.querySelector('#slider input') as HTMLInputElement;

const lightbox = new Lightbox();
const portfolioGrid = new PortfolioGrid(linksEl, portfolioItems, lightbox);

let modelViewer: import('./showcase/model-viewer').ModelViewer | null = null;

function scrollToBottom(): void {
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

async function printSegments(segments: Segment[]): Promise<void> {
  const p = document.createElement('p');
  output.appendChild(p);
  const typewriter = new TypeWriter(p);
  await typewriter.run(segments);
  scrollToBottom();
}

function projectsToSegments(): Segment[] {
  const out: Segment[] = [];
  for (const project of projects) {
    out.push(bold(project.name), text('\n'));
    out.push(text(`${project.description}\n`));
    out.push(text(`tags: ${project.tags.join(', ')}\n`));
    out.push(link(project.url, project.url));
    out.push(text('\n\n'));
  }
  return out;
}

const ctx: ShellContext = {
  print: printSegments,
  clear(): void {
    output.replaceChildren();
    portfolioGrid.hide();
    canvas3D.hidden = true;
  },
  directory: '~',
  setDirectory(dir: string): void {
    ctx.directory = dir;
  },
  showWelcome: () => printSegments(welcome),
  showSkills: () => printSegments(skills),
  showContact: () => printSegments(contact),
  showProjects: () => printSegments(projectsToSegments()),
  showPortfolio: async () => {
    portfolioGrid.show();
    await printSegments([text('cd portfolio\nclick any image to enter "gallery mode"\n')]);
  },
  showShowcase: async () => {
    canvas3D.hidden = false;
    if (!modelViewer) {
      const { ModelViewer } = await import('./showcase/model-viewer');
      modelViewer = new ModelViewer(renderCanvas);
      await modelViewer.load();
      sliderInput.addEventListener('input', () => {
        modelViewer?.scrubTo(Number(sliderInput.value));
      });
    } else {
      modelViewer.resize();
    }
    await printSegments([text('./showcase\nmove the slider below and see what happens\n')]);
  },
  openResume(): void {
    window.open(`${import.meta.env.BASE_URL}${resumePdfPath}`, '_blank', 'noopener');
  },
  openPortfolioItem(index: number): void {
    lightbox.open(portfolioItems, index, document.activeElement as HTMLElement);
  },
  setTheme(name: string): void {
    persistTheme(name);
  },
};

const shell = new Shell(ctx);

function spawnPrompt(): void {
  const line = new PromptLine(ctx.directory, shell, {
    onSubmit: async (value) => {
      await shell.execute(value);
      spawnPrompt();
    },
    onTabCandidates: (candidates) => {
      void printSegments([text(candidates.join('  ') + '\n')]);
    },
  });
  output.appendChild(line.element);
  line.focus();
  scrollToBottom();
}

window.addEventListener('resize', () => modelViewer?.resize());
window.addEventListener('orientationchange', () => modelViewer?.resize());

document.querySelectorAll<HTMLButtonElement>('[data-action]').forEach((button) => {
  button.addEventListener('click', async () => {
    const action = button.dataset.action;
    if (action === 'resume') {
      ctx.openResume();
      return;
    }
    ctx.clear();
    switch (action) {
      case 'welcome':
        await ctx.showWelcome();
        break;
      case 'skills':
        await ctx.showSkills();
        break;
      case 'projects':
        await ctx.showProjects();
        break;
      case 'portfolio':
        await ctx.showPortfolio();
        break;
      case 'showcase':
        await ctx.showShowcase();
        break;
      case 'contact':
        await ctx.showContact();
        break;
    }
    spawnPrompt();
  });
});

void (async () => {
  await ctx.showWelcome();
  spawnPrompt();
})();
