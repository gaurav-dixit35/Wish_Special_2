PRINCESS DAY FOR RIDDHI
=======================

PROJECT GUIDE AND VISUAL RECORD
This guide describes the static Princess Day website, its source files,
screen sequence, interaction design, motion, assets, audio, deployment, and
the mobile screenshots captured from the running site.


1. PROJECT AT A GLANCE
----------------------
Princess Day is a standalone, static, mobile-first story website for Riddhi.
It uses HTML, CSS, vanilla JavaScript ES modules, inline SVG art, five local
photos, and browser-generated Web Audio. There is no backend, database,
form, analytics, framework, package manager, or build command.

The intended journey has eight scenes and lasts about 90 to 120 seconds when
read at a relaxed pace. The user advances with calm taps and swipes. Music
starts only after the first user tap, as required by browser autoplay rules.

Root files:
  index.html       Page metadata, fonts, stylesheet and script entry point.
  vercel.json      Enables Vercel clean URLs.
  README.txt       This project and screen guide.
  css/styles.css   Palette, layout, responsive rules and CSS animation.
  js/config.js     User-facing copy and labels.
  js/app.js        Scene construction, navigation and interactions.
  js/assets.js     Font, SVG sprite and photo preloading.
  js/animals.js    Eight inline SVG animal illustrations and placement helper.
  js/castle.js     Inline SVG kingdom scene and gate-opening helper.
  js/props.js      Inline SVG crowns and other royal objects.
  js/music.js      Generated lullaby, optional MP3, mute and sound effects.
  js/loops.js      Visibility-aware pause and resume for background motion.
  picfolder/       The five personal photos used by the gallery.
  audio/           Optional user-supplied music file location.
  assets/          Reserved for static project assets; illustration art is SVG
                   embedded in the JavaScript modules.
  screenshots/     Captured mobile screenshots for this visual record.


2. VISUAL DIRECTION
-------------------
Theme: Twilight Royal Kingdom. The sky moves vertically from deep royal navy
(#0b1640), through indigo (#3a3f9a) and lavender (#b9a7ff), to rose-gold
twilight (#f2b5b0). A soft moon, stars, petals and small gold sparkles frame
the story. The distant castle uses layered navy silhouettes and warm windows.

Cards use a warm parchment color (#fff8ef), a thin double champagne border,
rounded corners and dark navy copy. Buttons use a blush-to-rose-gold pill
gradient with cream text. Great Vibes is used for large titles; Quicksand is
used for body copy and controls. Both are loaded from Google Fonts with
system fallbacks.

The CSS keeps the story centered in a column up to 480 CSS pixels on larger
screens. Phone layouts use the full dynamic viewport, safe-area insets and
vertical card scrolling. Main controls are at least 48px tall and body text
starts at 16px.


3. SCENE FLOW AND INTERACTIONS
-----------------------------
1. Splash. A gold crown fills with light while fonts, photos, SVG animals and
   optional audio are checked. Loader lines rotate. "Tap to begin" is the
   first audio gesture and reveals the mute control.

2. Castle gates. Riddhi's Princess Day title appears on a ribbon. The puppy
   sits at the parchment card's lower corner. Tapping the gate button plays a
   gate chime and creak, opens the gate, spills warm light and zooms toward
   the castle before entering the Great Hall.

3. Coronation. The Great Hall has curtains and candle lights. A crown rests
   above a velvet cushion. One tap raises the crown, plays a soft tada, and
   releases a small gold, blush and lavender confetti burst. The elephant
   holds the scene corner. The next button opens the proclamations.

4. Royal proclamations. Five parchment messages appear one at a time. Next,
   previous and horizontal swipe change the message; progress dots show the
   current position. A small animal changes with each card. Next from card
   five advances to the gallery.

5. Royal gallery. Five 4:5 photos appear in a CSS golden frame on a palace
   wall with small lamps. Tap a photo to zoom and tap again to close. Swipe,
   drag or use Next portrait to move through the stack. The panda peeks from
   the lower corner. After photo five, a short end card leads to the apology.

6. Royal apology. A cat holds a white flag above the card. The apology types
   line by line. One forgiveness button reveals a gentle response and a small
   confetti burst, then Next advances to the letter.

7. Royal letter. The message is displayed on parchment with a curled bunny.
   Copy types line by line; tapping the card finishes typing immediately.
   Continue advances to the finale.

8. Grand finale. The castle glows beneath floating lanterns. Two confetti
   bursts and six small fireworks run once on entry. The elephant, panda and
   puppy sit along the lower edge. Replay returns to the castle gates and
   leaves the music playing.


4. MOTION AND EFFECTS CATALOG
-----------------------------
CSS animation lives in css/styles.css. JavaScript adds or removes classes and
creates bounded decorative elements. Motion primarily uses transform and
opacity. Gradients, blur and shadow are static artwork treatments.

Scene transitions:
  scene-leave     Outgoing scene fades and drifts upward by 20px over 0.5s.
  scene-enter     Incoming scene begins 20px below its final position.
  is-ready        Incoming scene fades and settles over 0.7s.

Title and object motion:
  letter-rise     Title letters rise and fade in; each has a 0.05s stagger.
  crown-fill      Splash crown fills with warm gold over 2s.
  crown-glow      Gentle opacity pulse on the splash crown.
  coronation      Crown translates upward and scales down with a soft bounce.
  gate opening    Door panels scale and rotate; warm light expands and fades.
  castle zoom     Castle layer scales to 1.4 during entry to the hall.
  scroll-reveal   Proclamation text gently unfolds from its top edge.

Ambient loops:
  star-twinkle    40 stars on a phone, 80 on desktop; opacity and scale pulse.
  shooting-star   One short diagonal streak scheduled every 10 to 15 seconds.
  petal-drift     Six petals drift down slowly with a slight rotation.
  sparkle-twinkle Two small gold sparkles pulse; celebration adds at most 10,
                  keeping the total under the 12 sparkle limit.
  flag-sway       Castle flags move by a small rotation.
  animal-bob      Animal stickers make a small 3.6 second bob and tilt.
  candle-glow     Hall lights vary gently in opacity.
  button shimmer  A soft highlight sweeps over buttons every four seconds.
  lantern-rise    Five warm lantern shapes rise slowly in the finale.

Scene-specific effects:
  Gallery drag uses pointer movement to translate and tilt the photo stack;
  a completed fling carries it offscreen briefly before the next image scales
  into place. Photo zoom uses a small scale transform.
  Coronation and apology use bounded canvas-confetti bursts. The finale uses
  two confetti bursts and six small fireworks; each burst stays under the
  90-particle ceiling. All confetti uses champagne, blush and lavender.
  The sparkle, gate creak/chime and tada sounds are generated with Web Audio.

The page pauses CSS motion when document.hidden changes. The shooting-star
timer and music scheduler also pause and resume. Reduced-motion preferences
shorten animations and transitions.


5. AUDIO DESIGN
---------------
js/music.js creates an original music-box lullaby using the Web Audio API:
70 BPM, a C-major pentatonic melody, alternating sine and triangle plucks,
quiet sine chord pads, and a generated noise impulse for light reverb. A
look-ahead scheduler uses the AudioContext clock. The master gain is 0.45.
The same AudioContext generates the sparkle, gate chime/creak and tada.

Before the splash completes, the site checks once for audio/music.mp3 using a
HEAD request. If present, an HTMLAudioElement loops it at volume 0.45. If
missing, generated music is ready. The first tap creates or resumes the audio
context and starts playback. The top-right music button toggles mute. Music
continues across scene changes and replay.


6. PHOTOS AND ASSET LOADING
---------------------------
Five local photos are currently present in picfolder/:
  P1.jpg, P2.jpeg, P3.jpeg, P4.jpeg, P5.webp

The loader accepts lower-case or upper-case p1 to p5 names with .jpg, .jpeg,
.png or .webp extensions. It checks each candidate once during the splash,
loads the first match and awaits img.decode(). A missing image logs a warning
and the gallery shows a soft gradient crown placeholder.

During splash, the page waits for Google Fonts where available, validates the
eight animal SVG entries, preloads each available photo and checks optional
music. This keeps the visible story from showing partially decoded photos.


7. SCREENSHOTS
--------------
All images below were captured from the running site at a 390 x 844 CSS pixel
mobile viewport with the five supplied photos. The additional crowned and
forgiveness images document interaction states between the eight main scenes.

01. Splash
![Splash](screenshots/01-splash.png)

02. Castle gates
![Castle gates](screenshots/02-castle-gates.png)

03. Coronation, before the crown tap
![Coronation](screenshots/03-coronation.png)

03a. Coronation, after the crown tap
![Crown raised](screenshots/04-coronation-crowned.png)

04. Royal proclamations, card 1
![Proclamation 1](screenshots/05-proclamation-1.png)

04. Royal proclamations, card 2
![Proclamation 2](screenshots/05-proclamation-2.png)

04. Royal proclamations, card 3
![Proclamation 3](screenshots/05-proclamation-3.png)

04. Royal proclamations, card 4
![Proclamation 4](screenshots/05-proclamation-4.png)

04. Royal proclamations, card 5
![Proclamation 5](screenshots/05-proclamation-5.png)

05. Royal gallery, photo 1
![Portrait 1](screenshots/10-portrait-1.png)

05. Royal gallery, photo 2
![Portrait 2](screenshots/10-portrait-2.png)

05. Royal gallery, photo 3
![Portrait 3](screenshots/10-portrait-3.png)

05. Royal gallery, photo 4
![Portrait 4](screenshots/10-portrait-4.png)

05. Royal gallery, photo 5
![Portrait 5](screenshots/10-portrait-5.png)

05a. Gallery ending card
![Gallery ending](screenshots/15-gallery-end.png)

06. Royal apology
![Apology](screenshots/16-apology.png)

06a. After the forgiveness tap
![Forgiveness response](screenshots/17-forgiveness.png)

07. Royal letter, fully typed
![Royal letter](screenshots/18-royal-letter.png)

08. Grand finale
![Grand finale](screenshots/19-grand-finale.png)


8. LOCAL RUN AND VERCEL DEPLOYMENT
----------------------------------
Run locally from this princess-day folder:
  python3 -m http.server

Then visit http://localhost:8000. A local HTTP server is needed because the
site uses ES modules and browser fetch requests.

To deploy on Vercel:
  1. Import the princess-day folder or its repository.
  2. Set Framework Preset to Other.
  3. Leave the Build Command empty.
  4. Deploy the static root containing index.html and vercel.json.


9. ACCEPTANCE REVIEW RECORD
---------------------------
JavaScript modules parsed successfully with Node's module syntax checker.
vercel.json parsed successfully as JSON. The screenshot run visited the splash,
gates, coronation, all five proclamation cards, all five portraits, gallery end,
apology, forgiveness response, letter and finale. No JavaScript console errors
or uncaught exceptions were recorded during that browser run.

The site is a static project. It has no build step or provider configuration
outside Vercel's static deployment settings.
