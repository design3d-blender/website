import { runMatrixRain } from './matrix-rain';

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

/** Classic Konami code (↑↑↓↓←→←→BA), listened for globally — triggers a matrix-rain takeover. */
export function initKonami(): void {
  let progress = 0;

  window.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

    if (key === SEQUENCE[progress]) {
      progress++;
      if (progress === SEQUENCE.length) {
        progress = 0;
        runMatrixRain();
      }
    } else {
      progress = key === SEQUENCE[0] ? 1 : 0;
    }
  });
}
