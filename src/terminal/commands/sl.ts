import type { Command } from '../context';

const TRAIN = String.raw`
      ====        ________                ___________
  _D _|  |_______/        \__I_I_____===__|_________|
   |(_)---  |   H\________/ | |        =|___ ___|      _________________
   /     |  |   H  |  |     | |        ||_| |_||     _|                \_____A
  |      |  |   H  |__--------------------| [___] |   =|                        |
  | ________|___H__/__|_____/[][]~\_______|       |   -|                        |
  |/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_
__/ =| o |=-~~\  /~~\  /~~\  /~~\ ____Y___________|__|__________________________|_
 |/-=|___|=    ||    ||    ||    |_____/~\___/          |_D__D__D_|  |_D__D__D_|
  \_/      \O=====O=====O=====O_/      \_/               \_/   \_/    \_/   \_/
`;

export const sl: Command = {
  name: 'sl',
  summary: "you typo'd ls (steam locomotive included)",
  run(ctx) {
    const pre = document.createElement('pre');
    pre.className = 'sl-train';
    pre.textContent = TRAIN;
    ctx.mountElement(pre);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      const done = (): void => resolve();
      pre.addEventListener('animationend', done, { once: true });
      setTimeout(done, 4000);
    });
  },
};
