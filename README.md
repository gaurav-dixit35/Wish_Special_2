# Princess Day Wishes

A warm, illustrated greeting for Princess Day, presented as an eight-scene interactive story. The experience combines a moonlit castle, royal illustrations, a photo gallery, a soundtrack, and a small bouquet-giving moment in the apology scene.

## Experience

1. **Welcome** — A crown animation introduces the story.
2. **Castle gates** — Open the gates to enter the kingdom.
3. **Coronation** — Crown the princess and continue into the story.
4. **Proclamations** — Browse five short celebratory messages.
5. **Gallery** — Browse five photographs, swipe between them, and tap a portrait to zoom.
6. **Apology** — Read a playful apology and tap **Forgive** to see the cat offer a bouquet.
7. **Letter** — Read a note that types onto the page; tap to finish it sooner.
8. **Finale** — Enjoy the closing scene and choose **Replay** to return to the castle gates.

## Highlights

- Responsive, mobile-first layout with safe-area support and touch-friendly controls.
- Custom castle, princess, animal stickers, story props, and bouquet drawn as inline SVG.
- Animated skies, petals, sparkles, scene transitions, and story moments.
- Local soundtrack with a mute control and short interaction sounds.
- Reduced-motion support and background animation/audio that pauses when the tab is hidden.
- Static hosting: no backend, database, dependency installation, or build step.

## Project structure

```text
.
├── index.html             Page shell and metadata
├── css/
│   └── styles.css         Layout, visual theme, and animations
├── js/
│   ├── app.js             Story scenes, navigation, and interactions
│   ├── config.js          Story copy, captions, and interface labels
│   ├── assets.js          Font, sticker, and photo loading
│   ├── animals.js         Inline SVG animal illustrations
│   ├── bouquet.js         Inline SVG bouquet artwork
│   ├── castle.js          Castle illustration and gate effects
│   ├── princess.js        Princess illustration and movement
│   ├── props.js           Crowns and other story props
│   ├── sky.js             Animated sky and stars
│   ├── magic.js           Bounded pointer and sparkle effects
│   ├── music.js           Soundtrack and interaction audio
│   └── loops.js           Hidden-tab pause and resume handling
├── audio/
│   └── princess.mp3       Local looping soundtrack
├── picfolder/             Five photographs used by the gallery
└── vercel.json            Static-hosting URL configuration
```

## Run locally

Serve the project root over HTTP so JavaScript modules and local media load correctly:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Content and media

- **Story text and labels:** edit `js/config.js`.
- **Page title and sharing metadata:** edit the corresponding tags in `index.html`.
- **Gallery photographs:** replace `picfolder/P1.jpg`, `P2.jpeg`, `P3.jpeg`, `P4.jpeg`, and `P5.webp`. If a file is missing or unreadable, the gallery shows a placeholder. Update the matching filenames in `js/assets.js` when changing the set or extensions.
- **Soundtrack:** replace `audio/princess.mp3` with another MP3 at the same path. Playback begins after a user interaction to comply with browser autoplay rules.

Google Fonts provide the display and body typefaces when available. System font fallbacks keep the site readable if the font service cannot be reached.

## Deploy

Deploy the project root as a static site. The published root should include `index.html`, `css/`, `js/`, `audio/`, `picfolder/`, and `vercel.json`. No build command or server process is required; `vercel.json` enables clean URLs.

## License

See [LICENSE](LICENSE) for the project license.
