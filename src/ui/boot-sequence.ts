const LINES = [
  'staff-eng BIOS — (C) Juan Luis Munoz Ioannidis',
  'Build: TypeScript 5 / Vite — no framework detected',
  '',
  'Running POST...',
  '  Memory         65536K OK',
  '  CPU            Staff Software Engineer',
  '  Storage        react-next.ssd, java-spring.hdd, aws-cloud.array',
  '',
  'Booting staff-eng.dev ...',
  '',
  '[ OK ] Mounted /home/juan',
  '[ OK ] Started ci-cd.service (GitHub Actions)',
  '[ OK ] Started agent-tooling.service (LangChain · LangGraph · Bedrock)',
  '[ OK ] Started three-js.service (lazy-loaded)',
  '[ OK ] Reached target multi-user.target',
  '',
  'Starting terminal shell...',
];

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Plays a fake boot log over `root`, then resolves once it's done (or skipped). */
export function runBootSequence(root: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    if (prefersReducedMotion()) {
      root.remove();
      resolve();
      return;
    }

    const list = root.querySelector('#bootLines') as HTMLElement;
    let done = false;

    const finish = (): void => {
      if (done) return;
      done = true;
      window.removeEventListener('keydown', finish);
      window.removeEventListener('pointerdown', finish);
      root.classList.add('boot-done');
      setTimeout(() => {
        root.remove();
        resolve();
      }, 250);
    };

    window.addEventListener('keydown', finish);
    window.addEventListener('pointerdown', finish);

    let i = 0;
    const next = (): void => {
      if (done) return;
      if (i >= LINES.length) {
        setTimeout(finish, 450);
        return;
      }
      const raw = LINES[i++];
      const line = document.createElement('div');
      if (raw.startsWith('[ OK ]')) {
        line.innerHTML = `<span class="boot-ok">[ OK ]</span>${raw.slice(6)}`;
      } else {
        line.textContent = raw || ' ';
      }
      list.appendChild(line);
      list.scrollTop = list.scrollHeight;
      setTimeout(next, raw ? 90 : 40);
    };
    next();
  });
}
