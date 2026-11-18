PRINCESS DAY WISHES WEBSITE
===========================

ABOUT
-----
This project is a standalone, mobile-first website for sharing warm wishes
on Princess Day. It presents the greeting as a short interactive story with
a moonlit castle, royal illustrations, a photo gallery, a looping soundtrack
and a celebratory finale.

The site is built with HTML, CSS and native JavaScript modules. It has no
backend, database, framework, package manager or build step. The greeting
copy, captions and button labels can be edited in js/config.js.


PROJECT FILES
-------------
index.html       Page metadata and the JavaScript entry point.
css/styles.css   Colors, responsive layout, transitions and animations.
js/app.js        The eight-scene story, navigation and interactions.
js/config.js     Greeting copy, captions, labels and scene text.
js/assets.js     Photo and illustration preloading.
js/animals.js    Inline SVG animal stickers and their placement.
js/castle.js     Inline SVG castle artwork and gate effects.
js/princess.js   Princess illustration and movement.
js/props.js      Inline SVG crowns and other story props.
js/magic.js      Pointer effects and bounded sparkle particles.
js/sky.js        Animated canvas stars and performance adjustment.
js/music.js      Local soundtrack playback and interaction sounds.
js/loops.js      Pause and resume behavior when the tab is hidden.
audio/           The Princess Day soundtrack.
picfolder/       Five local photographs used in the gallery.
assets/          Optional space for additional static assets.
vercel.json      Clean URL setting for static hosting.


STORY FLOW
-----------
The website contains eight scenes, in this order:

1. Splash: a crown animation and a start button. The first tap starts music.
2. Castle gates: open the royal gates and enter the castle.
3. Coronation: tap to crown the princess and reveal the next step.
4. Proclamations: browse five short messages with buttons or horizontal swipes.
5. Gallery: view five photographs, swipe or use the next button, and tap a
   photograph to zoom. A short end card follows the fifth photo.
6. Apology: reveal the response with the forgiveness button.
7. Letter: read the message as it types, or tap the card to finish it sooner.
8. Finale: see the castle, lanterns and animal stickers; Replay returns to
   the gates.

The exact greeting, story copy, captions and labels live in js/config.js.
Update that file to personalize the wishes without changing the scene logic.


VISUALS AND INTERACTIONS
-----------------------
The visual theme uses a twilight sky, moon, castle, parchment cards, gold
accents, falling petals, fireflies and inline SVG animal stickers. The layout
uses a centered column on larger screens and the available viewport on phones.
Safe-area insets, scrollable story cards and touch-sized buttons support
mobile use.

Motion includes scene fades and a sparkle wipe, title and crown entrances,
castle gate opening and zoom, portrait spring transitions and frame shine,
lanterns, fireworks, and gentle loops for the sky and illustrations. The sky
uses 10 canvas stars, with a lower count if rendering performance drops. The
scene also uses 24 falling petals and 10 fireflies. Interactive magic effects
share a 10-particle limit. The site honors reduced-motion preferences and
pauses background motion and music when its tab is hidden.

Gallery controls support touch and pointer input. Portraits can be zoomed by
tap or keyboard. Buttons have visible keyboard focus styles.


AUDIO
-----
The soundtrack is audio/princess.mp3. It loops at a moderate volume and starts
after the first user tap to comply with browser autoplay behavior. The music
button toggles mute. Playback pauses when the tab is hidden and resumes when
the tab becomes visible.

Web Audio is used for short sparkle, gate and crown interaction effects; it
does not generate a background melody. If the soundtrack cannot be loaded,
the story remains usable, but background music is unavailable.


PHOTOS
------
The gallery uses these local files:
  picfolder/P1.jpg
  picfolder/P2.jpeg
  picfolder/P3.jpeg
  picfolder/P4.jpeg
  picfolder/P5.webp

The loader also accepts lowercase p1 to p5 names and the .jpg, .jpeg, .png
or .webp extensions. If a photo is missing or cannot be decoded, the gallery
shows a crown placeholder instead.


RUN LOCALLY
-----------
Open a terminal in the project root, the folder containing index.html, and
start a local HTTP server:

  python -m http.server 8000

Then open http://localhost:8000. Serving the site over HTTP is needed for
JavaScript modules and local asset requests. The Google Fonts stylesheet is
optional; system font fallbacks are included if it cannot load.


STATIC DEPLOYMENT
-----------------
Publish the project root as a static website. The deployed root should contain
index.html, css/, js/, audio/, picfolder/ and vercel.json. No build command,
server process or backend is required.


VALIDATION AND SCREENSHOTS
--------------------------
The JavaScript modules and relative imports have been checked, and the local
page, scripts, stylesheet, soundtrack and gallery photos have been checked
over HTTP. The soundtrack is served as audio/mpeg.

No screenshot archive is currently included in the project. The photographs
in picfolder/ are gallery content, not screen captures.
