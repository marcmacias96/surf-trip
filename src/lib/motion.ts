import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Strong ease-out for entrances; scrubbed motion stays linear.
CustomEase.create('outStrong', '0.23, 1, 0.32, 1');

const q = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) =>
  root.querySelector<T>(selector);
const all = (selector: string, root: ParentNode = document) =>
  gsap.utils.toArray<HTMLElement>(selector, root);

function startLenis() {
  const lenis = new Lenis({ autoRaf: false, anchors: { offset: -80 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

function initNav() {
  const nav = q('[data-nav]');
  if (!nav) return;
  ScrollTrigger.create({
    start: 80,
    end: 'max',
    toggleClass: { targets: nav, className: 'is-scrolled' },
  });
}

function revealLines(lines: Element[], trigger?: Element) {
  gsap.to(lines, {
    y: 0,
    duration: 0.7,
    ease: 'outStrong',
    stagger: 0.06,
    delay: trigger ? 0 : 0.15,
    scrollTrigger: trigger ? { trigger, start: 'top 70%', once: true } : undefined,
  });
}

function initHero() {
  const hero = q('[data-hero]');
  if (!hero) return;
  revealLines(all('[data-line]', hero));

  const img = q('[data-hero-img]', hero);
  const pic = q('[data-hero-pic]', hero);
  if (img && pic) {
    gsap.from(img, { scale: 1.08, duration: 1.2, ease: 'outStrong' });
    gsap.fromTo(
      img,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: pic, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  }

  // Stickers keep their static tilt from CSS `rotate`; GSAP's rotation composes on top.
  gsap.fromTo(
    all('[data-sticker]', hero),
    { opacity: 0, scale: 0.6, rotation: -8 },
    { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: 'outStrong', stagger: 0.08, delay: 0.6 },
  );
}

function initStats() {
  all('[data-count]').forEach((el) => {
    gsap.from(el, {
      textContent: 0,
      snap: { textContent: 1 },
      duration: 1.2,
      ease: 'outStrong',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

function initManifesto() {
  const block = q('[data-manifesto]');
  if (!block) return;
  gsap.to(all('[data-word]', block), {
    opacity: 1,
    ease: 'none',
    stagger: 0.04,
    scrollTrigger: { trigger: block, start: 'top 75%', end: 'bottom 55%', scrub: true },
  });
}

const LIFT_SHADOW = 'rgba(0, 0, 0, 0.7) 0px 30px 56px -14px';

function initRoute(isDesktop: boolean, reduceMotion: boolean): (() => void) | undefined {
  const section = q('[data-route]');
  if (!section) return;

  const table = q('[data-route-table]', section) ?? section;
  const line = q('[data-route-line]', section);
  if (line && !reduceMotion) {
    gsap.to(line, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: table, start: 'top 70%', end: 'bottom 70%', scrub: true },
    });
  }

  // Collage: every stop after the first drops its print onto the pile as its row
  // crosses the activation line, and peels it back off when scrolling up past it.
  const pile = q('[data-route-pile]', section);
  const prints = all('[data-print]', section);
  const slots = prints.map((print) => print.parentElement as HTMLElement);
  const rows = all('[data-stop]', section);
  if (!prints.length) return;
  const restShadow = getComputedStyle(prints[0]).boxShadow;
  // Reduced motion (and no JS) shows every print from the start; otherwise only Manta.
  const dropped = prints.map((_, index) => reduceMotion || index === 0);

  // Off-board pose; the tilt offset alternates so neighbouring prints swing in from opposite sides.
  // autoAlpha also hides waiting prints from the pointer, so they never catch a hover.
  const away = (index: number) => ({
    y: -120,
    rotation: index % 2 ? 14 : -14,
    scale: 1.12,
    autoAlpha: 0,
    boxShadow: restShadow,
  });

  const drop = (index: number) => {
    const print = prints[index];
    const below = prints[index - 1];
    dropped[index] = true;
    gsap.killTweensOf(print, 'y,rotation,scale,opacity,visibility,boxShadow');
    gsap.to(print, { autoAlpha: 1, duration: 0.2, ease: 'outStrong' });
    gsap.to(print, { y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.6)' });
    gsap.to(print, { rotation: 0, duration: 0.7, ease: 'expo.out' });
    // The slap: on landing, the print underneath gives a little and the pile settles.
    // yPercent is a separate transform channel, so it never fights the drop's y.
    if (below) {
      gsap.fromTo(
        below,
        { yPercent: 0 },
        { yPercent: 1.2, duration: 0.09, delay: 0.16, ease: 'power1.out', yoyo: true, repeat: 1 },
      );
    }
    if (pile) {
      gsap.fromTo(
        pile,
        { rotation: 0 },
        { rotation: 1, duration: 0.12, delay: 0.16, ease: 'power1.out', yoyo: true, repeat: 1, overwrite: true },
      );
    }
  };

  const peel = (index: number) => {
    const print = prints[index];
    dropped[index] = false;
    // A raised print goes back to its DOM stacking, so it lands normally when it drops again.
    slots[index].style.zIndex = '';
    gsap.killTweensOf(print, 'y,rotation,scale,opacity,visibility,boxShadow');
    gsap.to(print, { ...away(index), duration: 0.35, ease: 'power2.in' });
  };

  // "Top of pile" is a running z-index on the static slot; z-index is never animated.
  let topZ = prints.length;
  const raise = (index: number) => {
    slots[index].style.zIndex = String(++topZ);
  };

  // Lift eases the slot tilt a few degrees toward level, then settles back to it.
  const lift = (index: number) => {
    const tilt = parseFloat(slots[index].style.getPropertyValue('--r')) || 0;
    gsap.to(prints[index], {
      scale: 1.04,
      rotation: -gsap.utils.clamp(-4, 4, tilt),
      boxShadow: LIFT_SHADOW,
      duration: 0.25,
      ease: 'outStrong',
      overwrite: 'auto',
    });
  };
  const settle = (index: number, delay = 0) => {
    gsap.to(prints[index], {
      scale: 1,
      rotation: 0,
      boxShadow: restShadow,
      duration: 0.3,
      delay,
      ease: 'outStrong',
      overwrite: 'auto',
    });
  };

  // Row button (click, tap, or keyboard focus): bring its print to the top of the pile,
  // dropping it in first if its row has not reached the activation line yet.
  const show = (index: number) => {
    raise(index);
    if (reduceMotion) return;
    if (!dropped[index]) {
      drop(index);
      return;
    }
    lift(index);
    settle(index, 0.35);
  };

  const listeners = new AbortController();
  const { signal } = listeners;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (finePointer) {
    prints.forEach((print, index) => {
      print.addEventListener(
        'mouseenter',
        () => {
          raise(index);
          if (!reduceMotion) lift(index);
        },
        { signal },
      );
      // The print keeps its z-index on leave: it stays on top until another is raised.
      if (!reduceMotion) print.addEventListener('mouseleave', () => settle(index), { signal });
    });
  }

  rows.forEach((row, index) => {
    const button = q<HTMLButtonElement>('[data-stop-button]', row);
    if (!button || !prints[index]) return;
    button.addEventListener('click', () => show(index), { signal });
    // Keyboard focus raises too; pointer focus is left to the click handler.
    button.addEventListener('focus', () => button.matches(':focus-visible') && show(index), { signal });
  });

  if (!reduceMotion) {
    prints.forEach((print, index) => {
      // The first print (Manta) is on the board from the start, so it is never empty.
      if (index === 0 || !rows[index]) return;
      gsap.set(print, away(index));
      ScrollTrigger.create({
        trigger: rows[index],
        // Desktop: mid-viewport. Mobile: just below the sticky board at the top.
        start: isDesktop ? 'top 60%' : 'top 70%',
        onEnter: () => !dropped[index] && drop(index),
        onLeaveBack: () => dropped[index] && peel(index),
      });
    });
  }

  // Tweens started from callbacks are not recorded by the matchMedia context,
  // so clear them and the stacking by hand when the breakpoint changes.
  return () => {
    listeners.abort();
    const targets = pile ? [...prints, pile] : prints;
    gsap.killTweensOf(targets);
    gsap.set(targets, { clearProps: 'transform,opacity,visibility,boxShadow' });
    slots.forEach((slot) => (slot.style.zIndex = ''));
  };
}

function initFadeUps() {
  const reveal = (batch: Element[]) =>
    gsap.to(batch, { opacity: 1, y: 0, duration: 0.5, ease: 'outStrong', stagger: 0.05 });
  ScrollTrigger.batch('[data-fade]', { start: 'top 85%', onEnter: reveal, onEnterBack: reveal });
}

function initPilot() {
  const steps = q('[data-pilot-steps]');
  if (!steps) return;
  const segments = all('[data-pilot-line]', steps);
  const dots = all('[data-pilot-dot]', steps);
  // Fill each step's segment in reading order so progress runs 1 to 8 across both desktop rows.
  const timeline = gsap.timeline({
    scrollTrigger: { trigger: steps, start: 'top 75%', end: 'bottom 55%', scrub: true },
  });
  segments.forEach((segment, index) => {
    timeline
      .to(segment, { scaleX: 1, scaleY: 1, ease: 'none', duration: 1 }, index)
      .to(dots[index], { opacity: 1, scale: 1, ease: 'none', duration: 0.3 }, index);
  });
}

function initContact() {
  const section = q('[data-contact]');
  if (!section) return;
  revealLines(all('[data-line]', section), section);
}

export function initMotion() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) startLenis();
  initNav();

  gsap.matchMedia().add(
    {
      isDesktop: '(min-width: 1024px)',
      // gsap.matchMedia only runs the callback when at least one condition matches.
      isMobile: '(max-width: 1023px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { isDesktop, reduceMotion } = context.conditions as {
        isDesktop: boolean;
        reduceMotion: boolean;
      };
      // The route collage stays interactive under reduced motion (instant raise, no tweens).
      const cleanupRoute = initRoute(isDesktop, reduceMotion);
      // Reduced motion: global.css already renders every element in its final state.
      if (reduceMotion) return () => cleanupRoute?.();

      initHero();
      initStats();
      initManifesto();
      initFadeUps();
      initPilot();
      initContact();
      return () => cleanupRoute?.();
    },
  );
}
