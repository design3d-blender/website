import { describe, it, expect, vi } from 'vitest';
import { Shell, parseLine } from './shell';
import type { Command, ShellContext } from './context';

function makeCtx(): ShellContext {
  return {
    print: vi.fn().mockResolvedValue(undefined),
    clear: vi.fn(),
    directory: '~',
    setDirectory: vi.fn(),
    showWelcome: vi.fn().mockResolvedValue(undefined),
    showSkills: vi.fn().mockResolvedValue(undefined),
    showPortfolio: vi.fn().mockResolvedValue(undefined),
    showShowcase: vi.fn().mockResolvedValue(undefined),
    showContact: vi.fn().mockResolvedValue(undefined),
    showProjects: vi.fn().mockResolvedValue(undefined),
    openResume: vi.fn(),
    openPortfolioItem: vi.fn(),
    setTheme: vi.fn(),
  };
}

describe('parseLine', () => {
  it('splits command name and args', () => {
    expect(parseLine('cat  projects/foo.txt')).toEqual({
      name: 'cat',
      args: ['projects/foo.txt'],
    });
  });

  it('handles empty input', () => {
    expect(parseLine('   ')).toEqual({ name: '', args: [] });
  });
});

describe('Shell', () => {
  it('runs a matching command with its args', async () => {
    const ctx = makeCtx();
    const run = vi.fn();
    const echo: Command = { name: 'echo', summary: 'test', run };
    const shell = new Shell(ctx, [echo]);

    await shell.execute('echo hello world');

    expect(run).toHaveBeenCalledWith(ctx, ['hello', 'world']);
  });

  it('reports unknown commands without throwing', async () => {
    const ctx = makeCtx();
    const shell = new Shell(ctx, []);

    await shell.execute('doesnotexist');

    expect(ctx.print).toHaveBeenCalledTimes(1);
  });

  it('ignores blank input', async () => {
    const ctx = makeCtx();
    const shell = new Shell(ctx, []);

    await shell.execute('   ');

    expect(ctx.print).not.toHaveBeenCalled();
  });

  it('navigates history back and forward', async () => {
    const ctx = makeCtx();
    const noop: Command = { name: 'noop', summary: '', run: vi.fn() };
    const shell = new Shell(ctx, [noop]);

    await shell.execute('noop 1');
    await shell.execute('noop 2');

    expect(shell.historyPrev()).toBe('noop 2');
    expect(shell.historyPrev()).toBe('noop 1');
    expect(shell.historyPrev()).toBe('noop 1');
    expect(shell.historyNext()).toBe('noop 2');
    expect(shell.historyNext()).toBe('');
  });

  it('completes command names by prefix', () => {
    const ctx = makeCtx();
    const shell = new Shell(ctx, [
      { name: 'skills', summary: '', run: vi.fn() },
      { name: 'showcase', summary: '', run: vi.fn() },
      { name: 'contact', summary: '', run: vi.fn() },
    ]);

    expect(shell.complete('s')).toEqual(['showcase', 'skills']);
    expect(shell.complete('c')).toEqual(['contact']);
    expect(shell.complete('')).toEqual([]);
    expect(shell.complete('z')).toEqual([]);
  });
});
