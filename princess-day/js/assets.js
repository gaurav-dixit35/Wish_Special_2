import { animals, createAnimalSprite } from './animals.js';

const PHOTO_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

export async function preloadAssets() {
  const tasks = [];
  if (document.fonts) {
    tasks.push(document.fonts.load('400 32px "Great Vibes"').catch(() => []));
    tasks.push(document.fonts.load('700 16px "Quicksand"').catch(() => []));
    tasks.push(document.fonts.ready.catch(() => {}));
  }

  const animalSprite = createAnimalSprite();
  document.body.append(animalSprite);
  const spriteReady = Promise.resolve().then(() => {
    const names = Object.keys(animals);
    if (names.length !== 8) throw new Error('Animal sprite is incomplete');
    return animalSprite;
  });
  tasks.push(spriteReady);

  const photos = await Promise.all(Array.from({ length: 5 }, async (_, index) => {
    const number = index + 1;
    for (const base of [`p${number}`, `P${number}`]) {
      for (const extension of PHOTO_EXTENSIONS) {
        const url = `./picfolder/${base}.${extension}`;
        try {
          const response = await fetch(url, { method: 'HEAD', cache: 'no-store' });
          if (!response.ok) continue;
          const image = new Image();
          image.src = url;
          await image.decode();
          return { url, image, missing: false };
        } catch {
          // Try the next supported name and extension.
        }
      }
    }
    console.warn(`Photo p${number} is missing; a placeholder will be shown.`);
    return { url: null, image: null, missing: true };
  }));
  tasks.push(...photos.filter((photo) => photo.image).map((photo) => photo.image.decode().catch(() => {})));

  const results = await Promise.allSettled(tasks);
  return { photos, animalSprite, results };
}
