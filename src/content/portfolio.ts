export interface PortfolioItem {
  id: string;
  src: string;
  type: 'image' | 'video';
  poster?: string;
}

const base = 'img/portfolio';

export const portfolioItems: PortfolioItem[] = [
  { id: 'bender', src: `${base}/bender.jpg`, type: 'image' },
  { id: 'sun', src: `${base}/sun.jpg`, type: 'image' },
  { id: 'wall', src: `${base}/wall.jpg`, type: 'image' },
  { id: 'bantu2', src: `${base}/bantu2.webp`, type: 'image' },
  { id: 'bantu3', src: `${base}/bantu3.webp`, type: 'image' },
  { id: 'bantu4', src: `${base}/bantu4.webp`, type: 'image' },
  {
    id: 'bantu5',
    src: `${base}/videos/bantu5.mp4`,
    type: 'video',
    poster: `${base}/videos/thumbs/thumb2.png`,
  },
  { id: 'ger1', src: `${base}/ger1.jpg`, type: 'image' },
  { id: 'ger2', src: `${base}/ger2.jpg`, type: 'image' },
  { id: 'campo', src: `${base}/campo.jpg`, type: 'image' },
  { id: 'eva', src: `${base}/eva.jpg`, type: 'image' },
  { id: 'transistor', src: `${base}/transistor.jpg`, type: 'image' },
  {
    id: 'totoro',
    src: `${base}/videos/totoro.mp4`,
    type: 'video',
    poster: `${base}/videos/thumbs/thumb1.png`,
  },
];

export const resumePdfPath = 'cv/juan-luis-munoz-cv.pdf';
