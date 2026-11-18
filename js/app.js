import { config } from "./config.js";
import { preloadAssets } from "./assets.js";
import { placeAnimal } from "./animals.js";
import { createCastle, openCastleGate } from "./castle.js";
import { createProp } from "./props.js";
import { musicPlayer } from "./music.js";
import { registerBackgroundLoop } from "./loops.js";
import { createMagicEffects } from "./magic.js";
import {
  createPrincess,
  crownPrincess,
  startPrincessWalk,
} from "./princess.js";
import { startSkyStars } from "./sky.js";
import { drawBouquet } from "./bouquet.js";

const app = document.querySelector("#app");
let magicEffects = null;
try {
  magicEffects = createMagicEffects({
    playSparkle: () => musicPlayer.magicSparkle(),
    maxLiveParticles: 10,
  });
} catch {
  // Keep the story usable with the native cursor if canvas effects are unsupported.
}
const photoFallbacks = Array.from({ length: 5 }, (_, index) => ({
  url: null,
  missing: true,
  index,
}));
let assets = { photos: photoFallbacks };
let currentScene = 0;
let bgUnregister = null;
let shootingTimer = 0;
let shootingPopTimer = 0;
let shootingActive = false;
let windTimer = 0;
let windDirection = false;
let transitionActive = false;
let finaleTimers = [];
let skyCleanup = null;
let parallaxCleanup = null;
let transitionWipeNext = false;

const sleep = (milliseconds) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));
const textNode = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.textContent = text;
  return node;
};
const button = (label, action, className = "scene-button") => {
  const node = document.createElement("button");
  node.type = "button";
  node.className = className;
  node.textContent = label;
  let busy = false;
  node.addEventListener("click", async (event) => {
    if (busy) return;
    busy = true;
    node.disabled = true;
    try {
      await action(event);
    } catch (error) {
      const content = app.querySelector(".scene-content");
      if (content) errorFallback({ content }, error);
    } finally {
      if (node.isConnected) node.disabled = false;
      busy = false;
    }
  });
  return node;
};

function createShell() {
  skyCleanup?.();
  parallaxCleanup?.();
  app.replaceChildren();
  const scene = document.createElement("div");
  scene.className = "kingdom-scene scene-enter";
  const sky = document.createElement("div");
  sky.className = "sky-decoration";
  sky.setAttribute("aria-hidden", "true");
  const starCanvas = document.createElement("canvas");
  starCanvas.className = "sky-canvas";
  starCanvas.setAttribute("aria-hidden", "true");
  const moon = document.createElement("div");
  moon.className = "moon";
  const moonCraterLayer = document.createElement("div");
  moonCraterLayer.className = "moon-craters";
  moonCraterLayer.setAttribute("aria-hidden", "true");
  for (let index = 0; index < 5; index += 1) {
    const crater = document.createElement("i");
    crater.className = `moon-crater moon-crater--${index + 1}`;
    moonCraterLayer.append(crater);
  }
  const moonRays = document.createElement("div");
  moonRays.className = "moon-rays";
  moonRays.setAttribute("aria-hidden", "true");
  for (let index = 0; index < 6; index += 1) {
    const ray = document.createElement("i");
    ray.className = `moon-ray moon-ray--${index + 1}`;
    moonRays.append(ray);
  }
  const shooting = document.createElement("div");
  shooting.className = "shooting-star";
  const shootingPop = document.createElement("i");
  shootingPop.className = "shooting-pop";
  shootingPop.setAttribute("aria-hidden", "true");
  const castleMount = document.createElement("div");
  castleMount.className = "castle-mount";
  const castle = createCastle();
  castleMount.append(castle);
  const milkyWay = document.createElement("div");
  milkyWay.className = "milky-way";
  const lunarGlow = document.createElement("div");
  lunarGlow.className = "lunar-aurora";
  const crownConstellation = createCrownConstellation();
  sky.append(
    starCanvas,
    milkyWay,
    lunarGlow,
    moon,
    moonCraterLayer,
    moonRays,
    crownConstellation,
    shooting,
    shootingPop,
    castleMount,
  );
  const card = document.createElement("section");
  card.className = "story-card";
  card.setAttribute("aria-label", config.common.storyLabel);
  const scroll = document.createElement("div");
  scroll.className = "scene-scroll";
  const content = document.createElement("div");
  content.className = "scene-content";
  scroll.append(content);
  const cardSweep = document.createElement("span");
  cardSweep.className = "card-sweep";
  cardSweep.setAttribute("aria-hidden", "true");
  const corners = ["top-left", "top-right", "bottom-left", "bottom-right"].map(
    (corner) => {
      const flourish = document.createElement("span");
      flourish.className = `card-corner card-corner--${corner}`;
      flourish.setAttribute("aria-hidden", "true");
      flourish.textContent = "❧";
      return flourish;
    },
  );
  card.append(scroll, cardSweep, ...corners);
  const mute = button(
    config.common.muteIcon,
    () => {
      musicPlayer.setMuted(!musicPlayer.muted);
      mute.setAttribute(
        "aria-label",
        musicPlayer.muted ? config.common.unmute : config.common.mute,
      );
      mute.title = musicPlayer.muted
        ? config.common.unmute
        : config.common.mute;
      mute.textContent = musicPlayer.muted
        ? config.common.mutedIcon
        : config.common.muteIcon;
    },
    "mute-button",
  );
  mute.hidden = true;
  mute.setAttribute("aria-label", config.common.mute);
  mute.title = config.common.mute;
  scene.append(sky, card, mute);
  if (transitionWipeNext) {
    const wipe = document.createElement("i");
    wipe.className = "sparkle-wipe";
    wipe.setAttribute("aria-hidden", "true");
    scene.append(wipe);
    transitionWipeNext = false;
    requestAnimationFrame(() => wipe.classList.add("is-sweeping"));
  }
  app.append(scene);
  requestAnimationFrame(() => scene.classList.add("is-ready"));
  skyCleanup = startSkyStars(starCanvas, { count: 10 });
  parallaxCleanup = addSkyParallax(sky);
  return {
    scene,
    sky,
    shooting,
    shootingPop,
    castle,
    card,
    scroll,
    content,
    mute,
    moon,
    moonCraterLayer,
    starCanvas,
  };
}

function addSkyParallax(sky) {
  const setOffset = (xValue, yValue) => {
    const x = Math.max(-8, Math.min(8, xValue));
    const y = Math.max(-8, Math.min(8, yValue));
    sky.style.setProperty("--parallax-x", `${x}px`);
    sky.style.setProperty("--parallax-y", `${y}px`);
  };
  const update = (event) => {
    if (
      event.pointerType &&
      !["touch", "mouse", "pen"].includes(event.pointerType)
    )
      return;
    setOffset(
      (event.clientX / Math.max(1, window.innerWidth) - 0.5) * 16,
      (event.clientY / Math.max(1, window.innerHeight) - 0.5) * 16,
    );
  };
  const tilt = (event) => {
    if (!Number.isFinite(event.gamma) || !Number.isFinite(event.beta)) return;
    setOffset(event.gamma * 0.24, (event.beta - 35) * 0.16);
  };
  window.addEventListener("pointermove", update, { passive: true });
  window.addEventListener("deviceorientation", tilt, { passive: true });
  return () => {
    window.removeEventListener("pointermove", update);
    window.removeEventListener("deviceorientation", tilt);
  };
}

function createCrownConstellation() {
  const group = document.createElement("div");
  group.className = "crown-constellation";
  group.setAttribute("aria-hidden", "true");
  group.innerHTML =
    '<svg viewBox="0 0 120 60" focusable="false"><path d="M12 42 34 18 58 38 83 15 108 42 60 49Z"/><circle cx="12" cy="42" r="2"/><circle cx="34" cy="18" r="2"/><circle cx="58" cy="38" r="2"/><circle cx="83" cy="15" r="2"/><circle cx="108" cy="42" r="2"/><circle cx="60" cy="49" r="2"/></svg>';
  return group;
}

function addSkyParticles(sky) {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < 4; index += 1) {
    const royalStar = document.createElement("i");
    royalStar.className = `royal-star royal-star--${index + 1}`;
    royalStar.style.left = `${14 + ((index * 29) % 72)}%`;
    royalStar.style.top = `${8 + ((index * 17) % 39)}%`;
    fragment.append(royalStar);
  }
  for (let index = 0; index < 24; index += 1) {
    const petal = document.createElement("i");
    const depth = (index % 3) + 1;
    const tone = index % 8 === 0 ? 3 : (index % 2) + 1;
    const duration =
      depth === 1
        ? 18 + ((index * 7) % 7)
        : depth === 2
          ? 14 + ((index * 7) % 7)
          : 10 + ((index * 7) % 7);
    petal.className = `petal petal--depth-${depth} petal--tone-${tone}`;
    petal.style.left = `${12 + ((index * 17) % 78)}%`;
    petal.style.top = `${-8 - ((index * 9) % 28)}%`;
    petal.style.animationDelay = `${-((index * 1.71) % 18)}s`;
    petal.style.setProperty("--fall-duration", `${duration}s`);
    petal.style.setProperty("--sway", `${18 + ((index * 13) % 33)}px`);
    fragment.append(petal);
  }
  for (let index = 0; index < 10; index += 1) {
    const firefly = document.createElement("i");
    firefly.className = `firefly firefly--${(index % 3) + 1}`;
    firefly.style.left = `${18 + ((index * 19) % 66)}%`;
    firefly.style.top = `${60 + ((index * 11) % 29)}%`;
    firefly.style.animationDelay = `${-((index * 1.37) % 5)}s`;
    fragment.append(firefly);
  }
  for (let index = 0; index < 2; index += 1) {
    const sparkle = document.createElement("i");
    sparkle.className = "gold-sparkle";
    sparkle.style.left = `${9 + ((index * 23) % 82)}%`;
    sparkle.style.top = `${18 + ((index * 29) % 66)}%`;
    fragment.append(sparkle);
  }
  sky.append(fragment);
}

function startShootingLoop(shooting, shootingPop, sky) {
  const schedule = () => {
    if (!shootingActive) return;
    shootingTimer = window.setTimeout(
      () => {
        shooting.classList.remove("is-moving");
        shootingPop.classList.remove("is-popping");
        void shooting.offsetWidth;
        shooting.classList.add("is-moving");
        window.clearTimeout(shootingPopTimer);
        shootingPopTimer = window.setTimeout(
          () => shootingPop.classList.add("is-popping"),
          1050,
        );
        schedule();
      },
      8000 + Math.random() * 4000,
    );
  };
  const scheduleWind = () => {
    if (!shootingActive) return;
    windTimer = window.setTimeout(
      () => {
        windDirection = !windDirection;
        sky.classList.toggle("wind-reverse", windDirection);
        scheduleWind();
      },
      6000 + Math.random() * 2000,
    );
  };
  bgUnregister?.();
  bgUnregister = null;
  window.clearTimeout(shootingTimer);
  window.clearTimeout(shootingPopTimer);
  window.clearTimeout(windTimer);
  shootingActive = true;
  schedule();
  scheduleWind();
  bgUnregister = registerBackgroundLoop({
    pause: () => {
      shootingActive = false;
      window.clearTimeout(shootingTimer);
      window.clearTimeout(shootingPopTimer);
      window.clearTimeout(windTimer);
    },
    resume: () => {
      if (!shootingActive) {
        shootingActive = true;
        schedule();
        scheduleWind();
      }
    },
  });
}

function burstPetals(sky) {
  sky.classList.add("petal-burst");
  window.setTimeout(
    () => sky.isConnected && sky.classList.remove("petal-burst"),
    3000,
  );
}

function appendAnimal(card, name, position = "top") {
  return placeAnimal(card, name, position);
}

function appendTitle(content, title, ribbon = false) {
  const heading = textNode(
    "h1",
    `scene-title${ribbon ? "" : " card-title"}`,
    title,
  );
  heading.setAttribute("aria-label", title);
  let letterIndex = 0;
  const parts = title.match(/\s+|[^\s]+/gu) || [title];
  heading.replaceChildren(
    ...parts.map((part) => {
      if (/^\s+$/u.test(part)) return document.createTextNode(part);
      const word = document.createElement("span");
      word.className = "title-word";
      word.setAttribute("aria-hidden", "true");
      word.append(
        ...[...part].map((character) => {
          const letter = textNode("span", "title-letter", character);
          letter.style.animationDelay = `${letterIndex * 0.05}s`;
          letterIndex += 1;
          return letter;
        }),
      );
      return word;
    }),
  );
  if (ribbon) {
    const wrapper = document.createElement("div");
    wrapper.className = "ribbon";
    wrapper.append(heading);
    content.append(wrapper);
  } else content.append(heading);
  return heading;
}

function appendAction(content, label, action, className = "scene-button") {
  const actions = document.createElement("div");
  actions.className = "scene-actions";
  actions.append(button(label, action, className));
  content.append(actions);
}

function errorFallback(shell, error) {
  void error;
  shell.content.replaceChildren();
  shell.content.append(textNode("p", "body-copy", config.common.error));
  appendAction(shell.content, config.common.next, () =>
    goTo((currentScene + 1) % 8),
  );
}

async function showSplash(shell) {
  const crown = document.createElement("div");
  crown.className = "splash-crown";
  crown.innerHTML =
    '<svg viewBox="0 0 120 100" aria-hidden="true"><path class="crown-fill" d="m15 36 10 45h60l10-45-22 18-18-34-18 34z" fill="#f5d98b"/><path d="m15 36 10 45h60l10-45-22 18-18-34-18 34z" fill="none" stroke="#f5d98b" stroke-width="5" stroke-linejoin="round"/><path d="M25 71h60" stroke="#e8a99a" stroke-width="4"/></svg>';
  const line = textNode("p", "body-copy loader-copy", config.loader[0]);
  shell.content.append(crown, line);
  let active = true;
  let loaderIndex = 0;
  const loaderTimer = window.setInterval(() => {
    if (active && !document.hidden) {
      loaderIndex = (loaderIndex + 1) % config.loader.length;
      line.textContent = config.loader[loaderIndex];
    }
  }, 480);
  const startAt = performance.now();
  const preload = Promise.all([preloadAssets(), musicPlayer.detectExternal()]);
  try {
    const [loaded] = await preload;
    assets = loaded;
  } catch (error) {
    console.warn(error);
    assets = { photos: photoFallbacks };
  }
  await sleep(Math.max(0, 2000 - (performance.now() - startAt)));
  active = false;
  window.clearInterval(loaderTimer);
  crown.classList.add("is-complete");
  shell.content.replaceChildren(
    crown,
    textNode("p", "body-copy", config.loader.at(-1)),
  );
  appendAction(shell.content, config.common.splashButton, async () => {
    shell.mute.hidden = false;
    try {
      await musicPlayer.start();
    } catch (error) {
      console.warn(error);
    }
    await goTo(1);
  });
}

function renderGates(shell) {
  shell.card.classList.add("story-card--floating");
  const princess = createPrincess("gates");
  shell.scene.append(princess);
  appendTitle(shell.content, config.gates.title, true);
  appendAnimal(shell.card, "puppy", "peek");
  appendAction(shell.content, config.gates.btn, async () => {
    musicPlayer.gate();
    const gatePoint = appPoint(0.5, 0.62);
    magicEffects?.burstAt(gatePoint.x, gatePoint.y, 8, [
      "#f5d98b",
      "#fff1bd",
      "#e8a99a",
    ]);
    shell.castle.classList.add("is-opening");
    openCastleGate(shell.castle);
    shell.castle.classList.add("is-zooming");
    startPrincessWalk(princess);
    await sleep(3000);
    await goTo(2);
  });
}

function renderCoronation(shell) {
  const cushion = createProp("cushion", "coronation-cushion");
  const crown = createProp("crown", "coronation-crown");
  const princess = createPrincess("coronation");
  const cushionStage = document.createElement("div");
  cushionStage.className = "cushion-stage";
  if (cushion) cushionStage.append(cushion);
  if (crown) cushionStage.append(crown);
  cushionStage.append(princess);
  shell.content.append(cushionStage);
  appendTitle(shell.content, config.crown.banner, true);
  const prompt = textNode("p", "body-copy", config.crown.prompt);
  shell.content.append(prompt);
  appendAnimal(shell.card, "elephant", "peek");
  const crownBtn = button(config.crown.prompt, async () => {
    burstPetals(shell.sky);
    musicPlayer.tada();
    prompt.hidden = true;
    crownBtn.remove();
    showConfetti(18, 0.55);
    await crownPrincess(princess, crown);
    appendAction(
      shell.content,
      config.crown.btn,
      () => goTo(3),
      "scene-button crown-next",
    );
  });
  const crownActions = document.createElement("div");
  crownActions.className = "scene-actions coronation-actions";
  crownActions.append(crownBtn);
  shell.content.append(crownActions);
}

function renderSpecial(shell) {
  let index = 0;
  const cardText = textNode(
    "p",
    "body-copy proclamation-copy",
    config.special[index],
  );
  appendTitle(shell.content, config.common.proclamationTitle);
  shell.content.append(cardText);
  const progress = document.createElement("div");
  progress.className = "royal-progress";
  progress.setAttribute("aria-hidden", "true");
  const dots = config.special.map((_, dotIndex) => {
    const dot = document.createElement("span");
    if (dotIndex === 0) dot.classList.add("is-current");
    progress.append(dot);
    return dot;
  });
  shell.content.append(progress);
  const names = ["pug", "husky", "teddy", "elephant", "puppy"];
  let animal = appendAnimal(shell.card, names[0], "top");
  const update = (delta) => {
    index = (index + delta + config.special.length) % config.special.length;
    cardText.textContent = config.special[index];
    dots.forEach((dot, dotIndex) =>
      dot.classList.toggle("is-current", dotIndex === index),
    );
    animal?.remove();
    animal = appendAnimal(shell.card, names[index], "top");
    cardText.classList.remove("is-revealing");
    void cardText.offsetWidth;
    cardText.classList.add("is-revealing");
    musicPlayer.sparkle();
  };
  const controls = document.createElement("div");
  controls.className = "scene-actions spread-actions";
  controls.append(
    button(config.common.previous, () => update(-1)),
    button(config.common.next, () => {
      if (index === config.special.length - 1) return goTo(4);
      update(1);
    }),
  );
  shell.content.append(controls);
  addSwipe(shell.card, (direction) => update(direction));
}

function renderGallery(shell) {
  let index = 0;
  appendTitle(shell.content, config.common.galleryTitle);
  const stack = document.createElement("div");
  stack.className = "portrait-stack";
  const frame = document.createElement("div");
  frame.className = "royal-frame";
  const frameShine = document.createElement("span");
  frameShine.className = "frame-sweep";
  frameShine.setAttribute("aria-hidden", "true");
  const caption = textNode("p", "body-copy", config.captions[0]);
  const hint = textNode("p", "portrait-hint", config.common.zoomHint);
  const nextBtn = button(config.common.portraitNext, nextPortrait);
  stack.append(frame);
  const nextActions = document.createElement("div");
  nextActions.className = "scene-actions gallery-actions";
  nextActions.append(nextBtn);
  shell.content.append(stack, caption, hint, nextActions);
  appendAnimal(shell.card, "panda", "peek");

  function setPhoto() {
    frame.replaceChildren();
    const photo = assets.photos?.[index];
    if (photo?.url) {
      const image = new Image();
      image.src = photo.url;
      image.alt = config.captions[index];
      image.tabIndex = 0;
      const toggleZoom = () => image.classList.toggle("is-zoomed");
      image.addEventListener("click", toggleZoom);
      image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleZoom();
        }
      });
      frame.append(image);
    } else {
      const placeholder = textNode(
        "div",
        "photo-placeholder",
        config.common.crownPlaceholder,
      );
      placeholder.setAttribute("role", "img");
      placeholder.setAttribute("aria-label", config.captions[index]);
      frame.append(placeholder);
    }
    frame.append(frameShine);
    caption.textContent = config.captions[index];
    hint.textContent = config.common.zoomHint;
  }
  function animatePhotoChange() {
    stack.classList.add("is-photo-enter");
    setPhoto();
    requestAnimationFrame(() =>
      requestAnimationFrame(() => stack.classList.remove("is-photo-enter")),
    );
  }
  function nextPortrait() {
    index += 1;
    if (index >= 5) {
      shell.content.replaceChildren(
        textNode("p", "body-copy", config.portraits.end),
      );
      appendAction(shell.content, config.common.next, () => goTo(5));
      return;
    }
    animatePhotoChange();
    musicPlayer.sparkle();
  }
  setPhoto();
  let pointerX = 0;
  let pointerY = 0;
  let dragging = false;
  stack.addEventListener("pointerdown", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    dragging = true;
    stack.classList.add("is-dragging");
  });
  stack.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const dx = event.clientX - pointerX;
    const dy = event.clientY - pointerY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 6) {
      stack.style.transform = `translateX(${dx * 0.55}px) rotate(${Math.max(-7, Math.min(7, dx * 0.025))}deg)`;
    }
  });
  stack.addEventListener("pointerup", (event) => {
    dragging = false;
    stack.classList.remove("is-dragging");
    const delta = event.clientX - pointerX;
    const vertical = Math.abs(event.clientY - pointerY);
    if (Math.abs(delta) > 50 && Math.abs(delta) > vertical) {
      stack.classList.add("is-flinging");
      stack.style.transform = `translateX(${delta < 0 ? "-110%" : "110%"}) rotate(${delta < 0 ? "-7deg" : "7deg"})`;
      window.setTimeout(() => {
        stack.style.transform = "";
        stack.classList.remove("is-flinging");
        delta < 0
          ? nextPortrait()
          : ((index = Math.max(0, index - 1)), animatePhotoChange());
      }, 220);
    } else stack.style.transform = "";
  });
  stack.addEventListener("pointercancel", () => {
    dragging = false;
    stack.classList.remove("is-dragging");
    stack.style.transform = "";
  });
}

async function typeLines(container, lines, options = {}) {
  const { perCharacter = 35, commaPause = 350 } = options;
  const scrollArea = container.closest(".scene-scroll");
  for (const line of lines) {
    const paragraph = textNode("p", "body-copy parchment-line", "");
    container.append(paragraph);
    for (const character of line) {
      paragraph.textContent += character;
      if (character === ",") await sleep(commaPause);
      else await sleep(perCharacter);
      if (scrollArea) scrollArea.scrollTop = scrollArea.scrollHeight;
    }
    await sleep(220);
  }
}

async function renderApology(shell) {
  appendTitle(shell.content, config.common.apologyTitle);
  const textBox = document.createElement("div");
  textBox.className = "typed-copy";
  shell.content.append(textBox);
  const cat = appendAnimal(shell.card, "cat", "top");
  cat?.classList.add("apology-cat");
  let heldBouquet = null;
  try {
    heldBouquet = document.createElement("div");
    heldBouquet.className = "apology-bouquet apology-bouquet--held";
    heldBouquet.innerHTML = drawBouquet(110, "held");
    heldBouquet.setAttribute("aria-hidden", "true");
    shell.card.classList.add("has-apology-bouquet");
    shell.card.append(heldBouquet);
  } catch {
    heldBouquet = null;
    shell.card.classList.remove("has-apology-bouquet");
  }
  await typeLines(textBox, config.sorry.lines);
  await sleep(550);
  const pardonActions = document.createElement("div");
  pardonActions.className = "scene-actions apology-actions";
  let giftStarted = false;
  const pauseAwareDelay = (duration, animation = null) =>
    new Promise((resolve) => {
      let remaining = duration;
      let timer = 0;
      let startedAt = 0;
      const finish = () => {
        timer = 0;
        document.removeEventListener("visibilitychange", onVisibility);
        resolve();
      };
      const schedule = () => {
        if (document.hidden || timer || remaining <= 0) {
          if (remaining <= 0 && !document.hidden) finish();
          return;
        }
        startedAt = performance.now();
        timer = window.setTimeout(finish, remaining);
      };
      const onVisibility = () => {
        if (document.hidden) {
          if (timer) {
            window.clearTimeout(timer);
            timer = 0;
            remaining = Math.max(
              0,
              remaining - (performance.now() - startedAt),
            );
          }
          try {
            animation?.pause();
          } catch {
            /* An optional animation may have ended. */
          }
        } else {
          try {
            animation?.play();
          } catch {
            /* The static bouquet remains available. */
          }
          schedule();
        }
      };
      document.addEventListener("visibilitychange", onVisibility);
      if (document.hidden) {
        try {
          animation?.pause();
        } catch {
          /* The static bouquet remains available. */
        }
      } else schedule();
    });

  const createBouquetPuff = (x, y) => {
    const puff = document.createElement("div");
    puff.className = "bouquet-puff";
    puff.setAttribute("aria-hidden", "true");
    puff.style.left = `${x}px`;
    puff.style.top = `${y}px`;
    const petalColors = ["#f4a9b8", "#fff3e6", "#b9a7ff"];
    for (let index = 0; index < 14; index += 1) {
      const angle = (Math.PI * 2 * index) / 14 - Math.PI / 2;
      const petal = document.createElement("i");
      petal.className = "bouquet-puff-petal";
      petal.style.setProperty(
        "--puff-x",
        `${Math.cos(angle) * (48 + (index % 3) * 15)}px`,
      );
      petal.style.setProperty(
        "--puff-y",
        `${Math.sin(angle) * (34 + (index % 2) * 14) + 26}px`,
      );
      petal.style.setProperty(
        "--puff-turn",
        `${(index % 2 ? 1 : -1) * (80 + index * 9)}deg`,
      );
      petal.style.setProperty(
        "--puff-color",
        petalColors[index % petalColors.length],
      );
      petal.style.animationDelay = `${(index % 4) * 18}ms`;
      puff.append(petal);
    }
    for (let index = 0; index < 6; index += 1) {
      const angle = (Math.PI * 2 * index) / 6;
      const sparkle = document.createElement("i");
      sparkle.className = "bouquet-puff-sparkle";
      sparkle.style.setProperty("--puff-x", `${Math.cos(angle) * 68}px`);
      sparkle.style.setProperty("--puff-y", `${Math.sin(angle) * 45}px`);
      sparkle.style.animationDelay = `${index * 35}ms`;
      puff.append(sparkle);
    }
    document.body.append(puff);
    void pauseAwareDelay(2500).then(() => puff.remove());
  };

  const revealLine = async (line) => {
    await pauseAwareDelay(180);
    line.classList.add("is-visible");
    await pauseAwareDelay(450);
  };

  const btn = button(config.sorry.btn, async () => {
    if (giftStarted) return;
    giftStarted = true;
    btn.classList.add("is-fading");
    await pauseAwareDelay(300);
    btn.remove();
    pardonActions.remove();

    if (cat) {
      cat.classList.add("apology-cat--offering");
      await pauseAwareDelay(400);
    }

    let delivered = false;
    let giftStage = null;
    try {
      if (!heldBouquet) throw new Error("Bouquet art is unavailable.");
      const heldRect = heldBouquet.getBoundingClientRect();
      const heldWidth = heldBouquet.offsetWidth || 110;
      const heldHeight = heldBouquet.offsetHeight || 130;
      const giftMarkup = drawBouquet(160, "gift");
      giftStage = document.createElement("div");
      giftStage.className = "apology-gift-stage";
      giftStage.setAttribute("aria-hidden", "true");
      textBox.after(giftStage);
      shell.scroll.scrollTop = shell.scroll.scrollHeight;
      const targetRect = giftStage.getBoundingClientRect();
      const startX = heldRect.left + heldRect.width / 2;
      const startY = heldRect.top + heldRect.height / 2;
      const targetX = targetRect.left + targetRect.width / 2;
      const targetY = targetRect.top + targetRect.height / 2;
      const dx = targetX - startX;
      const dy = targetY - startY;
      const reducedMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const canArc =
        !reducedMotion && typeof heldBouquet.animate === "function";

      if (canArc) {
        let angle = -12;
        try {
          const parsedAngle = Number.parseFloat(
            getComputedStyle(heldBouquet).rotate,
          );
          if (Number.isFinite(parsedAngle)) angle = parsedAngle;
        } catch {
          /* Keep the bouquet's default held tilt. */
        }
        heldBouquet.className = "apology-bouquet apology-bouquet--flight";
        document.body.append(heldBouquet);
        Object.assign(heldBouquet.style, {
          position: "fixed",
          left: `${startX}px`,
          top: `${startY}px`,
          width: `${heldWidth}px`,
          height: `${heldHeight}px`,
          margin: "0",
          transformOrigin: "50% 50%",
          zIndex: "30",
        });
        const scale = Math.min(1.6, 160 / heldWidth);
        const flight = heldBouquet.animate(
          [
            { transform: `translate(-50%, -50%) rotate(${angle}deg) scale(1)` },
            {
              transform: `translate3d(${dx * 0.48}px, ${dy * 0.42 - 28}px, 0) translate(-50%, -50%) rotate(${angle * 0.45}deg) scale(1.18)`,
            },
            {
              transform: `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%) rotate(0deg) scale(${scale})`,
            },
          ],
          {
            duration: 900,
            easing: "cubic-bezier(.45, 0, .55, 1)",
            fill: "forwards",
          },
        );
        await pauseAwareDelay(900, flight);
        flight.cancel();
        heldBouquet.remove();
      } else {
        const gift = document.createElement("span");
        gift.innerHTML = giftMarkup;
        const giftArt = gift.firstElementChild;
        giftArt.style.opacity = "0";
        giftArt.style.transition = "opacity .35s ease-out";
        giftStage.append(giftArt);
        requestAnimationFrame(() => {
          giftArt.style.opacity = "1";
        });
        heldBouquet.style.transition = "opacity .35s ease-out";
        heldBouquet.style.opacity = "0";
        await pauseAwareDelay(350);
        heldBouquet.remove();
      }
      const art = document.createElement("span");
      art.innerHTML = giftMarkup;
      const finalBouquet = art.firstElementChild;
      finalBouquet.classList.add("bouquet-art--landed");
      if (giftStage.firstElementChild) giftStage.replaceChildren(finalBouquet);
      else giftStage.append(finalBouquet);
      giftStage.classList.add("is-arrived");
      heldBouquet = null;
      delivered = true;
    } catch {
      heldBouquet?.remove();
      heldBouquet = null;
      giftStage?.remove();
    }

    if (delivered) {
      try {
        const landing = giftStage.getBoundingClientRect();
        createBouquetPuff(
          landing.left + landing.width / 2,
          landing.top + landing.height / 2,
        );
      } catch {
        /* Celebration is optional. */
      }
      try {
        showConfetti(40, 0.55, ["#f5d98b", "#f4a9b8", "#b9a7ff"]);
      } catch {
        /* The gift still lands without canvas effects. */
      }
      try {
        musicPlayer.tada();
      } catch {
        /* Sound is an optional enhancement. */
      }
    }

    const responseLine = textNode(
      "p",
      "body-copy pardon-after apology-reveal-line",
      config.sorry.after,
    );
    shell.content.append(responseLine);
    if (delivered)
      shell.content.append(
        textNode(
          "p",
          "body-copy apology-gift-line apology-reveal-line",
          config.sorry.gift,
        ),
      );
    const nextActions = document.createElement("div");
    nextActions.className =
      "scene-actions apology-next-actions apology-reveal-line";
    nextActions.setAttribute("aria-hidden", "true");
    nextActions.inert = true;
    const nextButton = button(config.common.next, () => goTo(6));
    nextButton.disabled = true;
    nextActions.append(nextButton);
    shell.content.append(nextActions);
    shell.scroll.scrollTop = shell.scroll.scrollHeight;

    await revealLine(responseLine);
    const giftLine = delivered
      ? shell.content.querySelector(".apology-gift-line")
      : null;
    if (giftLine) await revealLine(giftLine);
    await pauseAwareDelay(180);
    nextActions.removeAttribute("aria-hidden");
    nextActions.inert = false;
    nextButton.disabled = false;
    nextActions.classList.add("is-visible");
    await pauseAwareDelay(350);
  });
  pardonActions.append(btn);
  shell.content.append(pardonActions);
}

async function renderLetter(shell) {
  appendTitle(shell.content, config.common.letterTitle);
  const scroll = createProp("scroll", "letter-scroll-prop");
  if (scroll) shell.content.append(scroll);
  const textBox = document.createElement("div");
  textBox.className = "typed-copy letter-copy";
  shell.content.append(textBox);
  appendAnimal(shell.card, "bunny", "peek");
  let finished = false;
  let finishRequested = false;
  const completeTyping = () => {
    if (!finished) finishRequested = true;
  };
  shell.card.addEventListener("click", completeTyping, { once: true });
  const typing = (async () => {
    for (const line of config.message) {
      const paragraph = textNode("p", "body-copy parchment-line", "");
      textBox.append(paragraph);
      for (const character of line) {
        if (finishRequested) {
          paragraph.textContent = line;
          break;
        }
        paragraph.textContent += character;
        shell.scroll.scrollTop = shell.scroll.scrollHeight;
        await sleep(character === "," ? 350 : 35);
      }
      if (finishRequested) {
        const paragraphs = [...textBox.querySelectorAll(".parchment-line")];
        const lineIndex = paragraphs.indexOf(paragraph);
        paragraphs.slice(lineIndex + 1).forEach((node) => node.remove());
        paragraph.textContent = line;
        for (const remaining of config.message.slice(lineIndex + 1))
          textBox.append(textNode("p", "body-copy parchment-line", remaining));
        break;
      }
      await sleep(180);
    }
    finished = true;
    appendAction(shell.content, config.common.messageButton, () => goTo(7));
    shell.scroll.scrollTop = shell.scroll.scrollHeight;
  })();
  await typing;
}

function renderFinale(shell) {
  burstPetals(shell.sky);
  shell.card.classList.add("story-card--floating");
  appendTitle(shell.content, config.finale.title, true);
  shell.content.append(
    textNode("p", "body-copy finale-sign", config.finale.sign),
  );
  shell.scene.append(createPrincess("finale"));
  const lanterns = document.createDocumentFragment();
  for (let index = 0; index < 5; index += 1) {
    const lantern = document.createElement("i");
    lantern.className = "sky-lantern";
    lantern.style.left = `${12 + index * 19}%`;
    lantern.style.animationDelay = `${-index * 2.4}s`;
    lanterns.append(lantern);
  }
  shell.sky.append(lanterns);
  const trio = document.createElement("div");
  trio.className = "finale-animals";
  ["elephant", "panda", "puppy"].forEach((name) =>
    appendAnimal(trio, name, "finale"),
  );
  shell.scene.append(trio);
  appendAction(shell.content, config.common.replay, () => goTo(1));
  fireworkShow();
}

function appPoint(xRatio, yRatio) {
  const bounds = app.getBoundingClientRect();
  return {
    x: bounds.left + bounds.width * xRatio,
    y: bounds.top + bounds.height * yRatio,
  };
}

function showConfetti(
  particleCount = 20,
  spread = 0.55,
  colors = ["#f5d98b", "#ffc9d9", "#b9a7ff"],
) {
  const { x: centerX, y: centerY } = appPoint(0.5, 0.58);
  void spread;
  magicEffects?.burstAt(centerX, centerY, Math.min(10, particleCount), colors);
}

function fireworkShow() {
  const colors = ["#f5d98b", "#ffc9d9", "#b9a7ff"];
  const bursts = [
    [0.24, 0.38],
    [0.76, 0.38],
    [0.5, 0.29],
    [0.18, 0.5],
    [0.82, 0.5],
  ];
  bursts.forEach(([x, y], index) => {
    finaleTimers.push(
      window.setTimeout(() => {
        if (!document.hidden) {
          const point = appPoint(x, y);
          magicEffects?.burstAt(point.x, point.y, 8, colors);
        }
      }, index * 560),
    );
  });
}

function addSwipe(element, callback) {
  let startX = 0;
  let startY = 0;
  let activePointer = null;
  element.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
    startY = event.clientY;
    activePointer = event.pointerId;
  });
  element.addEventListener("pointerup", (event) => {
    if (activePointer !== event.pointerId) return;
    activePointer = null;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy))
      callback(dx < 0 ? 1 : -1);
  });
  element.addEventListener("pointercancel", () => {
    activePointer = null;
  });
}

async function renderScene(index) {
  currentScene = index;
  const shell = createShell();
  try {
    setSceneAtmosphere(shell, index);
    addSkyParticles(shell.sky);
    startShootingLoop(shell.shooting, shell.shootingPop, shell.sky);
    shell.mute.hidden = index === 0;
    switch (index) {
      case 0:
        await showSplash(shell);
        break;
      case 1:
        renderGates(shell);
        break;
      case 2:
        renderCoronation(shell);
        break;
      case 3:
        renderSpecial(shell);
        break;
      case 4:
        renderGallery(shell);
        break;
      case 5:
        await renderApology(shell);
        break;
      case 6:
        await renderLetter(shell);
        break;
      case 7:
        renderFinale(shell);
        break;
      default:
        renderGates(shell);
    }
  } catch (error) {
    errorFallback(shell, error);
  }
}

function setSceneAtmosphere(shell, index) {
  const classes = [
    "scene-splash",
    "scene-gates",
    "scene-hall",
    "scene-proclamations",
    "scene-gallery",
    "scene-balcony",
    "scene-letter",
    "scene-finale",
  ];
  shell.scene.classList.add(classes[index] || classes[1]);
  if (index === 2) {
    [
      "curtain curtain--left",
      "curtain curtain--right",
      "hall-candle hall-candle--left",
      "hall-candle hall-candle--right",
    ].forEach((className) => {
      const detail = document.createElement("i");
      detail.className = className;
      detail.setAttribute("aria-hidden", "true");
      shell.scene.append(detail);
    });
  }
  if (index === 4) {
    ["wall-lamp wall-lamp--left", "wall-lamp wall-lamp--right"].forEach(
      (className) => {
        const lamp = document.createElement("i");
        lamp.className = className;
        lamp.setAttribute("aria-hidden", "true");
        shell.scene.append(lamp);
      },
    );
  }
  if (index === 5) {
    const rail = document.createElement("i");
    rail.className = "balcony-rail";
    rail.setAttribute("aria-hidden", "true");
    shell.scene.append(rail);
  }
}

async function goTo(index) {
  if (transitionActive) return;
  transitionActive = true;
  finaleTimers.forEach(window.clearTimeout);
  finaleTimers = [];
  const previous = app.querySelector(".kingdom-scene");
  previous?.classList.add("scene-leave");
  await sleep(500);
  transitionWipeNext = true;
  try {
    await renderScene(index);
  } finally {
    transitionActive = false;
  }
}

const initialShell = createShell();
setSceneAtmosphere(initialShell, 0);
addSkyParticles(initialShell.sky);
startShootingLoop(
  initialShell.shooting,
  initialShell.shootingPop,
  initialShell.sky,
);
showSplash(initialShell).catch((error) => errorFallback(initialShell, error));
