import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
import './styles/index.css';
import type { ShellContext } from './terminal/context';
import type { Segment } from './terminal/segments';
import { text, bold, link, prompt, accent } from './terminal/segments';
import { PORTRAIT } from './content/portrait';
import { WORDMARK } from './content/wordmark';
import { TypeWriter } from './terminal/renderer';
import { Shell } from './terminal/shell';
import { PromptLine } from './terminal/prompt-line';
import { welcome } from './content/welcome';
import { init } from './content/init';
import { skills } from './content/skills';
import { contact } from './content/contact';
import { projects } from './content/projects';
import { portfolioItems, resumePdfPath } from './content/portfolio';
import { Lightbox } from './ui/lightbox';
import { PortfolioGrid } from './ui/portfolio-grid';
import { applyStoredTheme, setTheme as persistTheme } from './ui/theme';
import { initWindowChrome } from './ui/window-chrome';
import { initOsbar, setOsbarDirectory, setOsbarCommandCount } from './ui/osbar';
import { initDock } from './ui/dock';
import { initMonitorWidget } from './ui/monitor-widget';
import { runBootSequence } from './ui/boot-sequence';
import { initKonami } from './ui/konami';
import { initHelpPanel } from './ui/help-panel';

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

function scrollToTop(): void {
  consoleEl.scrollTop = 0;
}

function setActiveNav(action: string): void {
  document.querySelectorAll<HTMLButtonElement>('[data-action]').forEach((btn) => {
    btn.classList.toggle('button-active', btn.dataset.action === action);
  });
}

async function printSegments(segments: Segment[], className?: string): Promise<void> {
  const p = document.createElement('p');
  if (className) p.className = className;
  output.appendChild(p);
  const typewriter = new TypeWriter(p);
  await typewriter.run(segments);
  scrollToBottom();
}

function portraitSegments(): Segment[] {
  return PORTRAIT.flatMap((line) => [accent(line, 'accent-2'), text('\n')]);
}

async function printSideBySide(
  leftSegments: Segment[],
  leftClassName: string,
  rightSegments: Segment[],
): Promise<void> {
  const wrapper = document.createElement('div');
  wrapper.className = 'side-by-side';
  const leftP = document.createElement('p');
  leftP.className = leftClassName;
  const rightP = document.createElement('p');
  wrapper.append(leftP, rightP);
  output.appendChild(wrapper);
  await Promise.all([
    new TypeWriter(leftP).run(leftSegments),
    new TypeWriter(rightP).run(rightSegments),
  ]);
  scrollToBottom();
}

async function printWelcomeHeader(): Promise<void> {
  await printSideBySide(portraitSegments(), 'ascii-portrait', WORDMARK);
}

function projectsToSegments(): Segment[] {
  const out: Segment[] = [prompt(), text('cat projects.json\n\n')];
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
  mountElement(el: HTMLElement): void {
    output.appendChild(el);
    scrollToBottom();
  },
  clear(): void {
    output.replaceChildren();
    portfolioGrid.hide();
    canvas3D.hidden = true;
  },
  directory: '~',
  setDirectory(dir: string): void {
    ctx.directory = dir;
    setOsbarDirectory(dir);
  },
  showWelcome: async () => {
    await printSegments(init);
    await printWelcomeHeader();
    await printSegments(welcome);
  },
  showSkills: () => printSegments(skills),
  showContact: () => printSegments(contact),
  showProjects: () => printSegments(projectsToSegments()),
  showPortfolio: async () => {
    portfolioGrid.show();
    await printSegments([
      prompt(),
      bold('cd portfolio\n'),
      text('click any image to enter "gallery mode"\n'),
    ]);
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
    await printSegments([
      prompt(),
      text('./showcase\nmove the slider below and see what happens\n'),
    ]);
  },
  async openResume(): Promise<void> {
    await printSegments([prompt(), text('open resume.pdf\nopening in a new tab…\n')]);
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

let commandCount = 0;
function bumpCommandCount(): void {
  commandCount += 1;
  setOsbarCommandCount(commandCount);
}

// coarse pointer = touch device with a virtual keyboard; auto-focusing here
// would pop it open on every command/section change, so leave focus to an
// explicit tap on touch devices instead.
const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;

function spawnPrompt(): void {
  const line = new PromptLine(ctx.directory, shell, {
    onSubmit: async (value) => {
      if (value.trim()) bumpCommandCount();
      await shell.execute(value);
      spawnPrompt();
    },
    onTabCandidates: (candidates) => {
      void printSegments([text(candidates.join('  ') + '\n')]);
    },
  });
  output.appendChild(line.element);
  if (!isTouchDevice()) line.focus();
  scrollToBottom();
}

window.addEventListener('resize', () => modelViewer?.resize());
window.addEventListener('orientationchange', () => modelViewer?.resize());

document.querySelectorAll<HTMLButtonElement>('[data-action]').forEach((button) => {
  button.addEventListener('click', async () => {
    const action = button.dataset.action;
    bumpCommandCount();
    setActiveNav(action ?? '');
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
      case 'resume':
        await ctx.openResume();
        break;
      case 'contact':
        await ctx.showContact();
        break;
    }
    spawnPrompt();
    scrollToTop();
  });
});

void (async () => {
  await runBootSequence(document.getElementById('bootScreen') as HTMLElement);

  applyStoredTheme();
  initDock();
  initWindowChrome();
  initMonitorWidget();
  initOsbar();
  initKonami();
  initHelpPanel();

  await ctx.showWelcome();
  spawnPrompt();
})();
