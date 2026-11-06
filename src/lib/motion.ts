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

function initRoute(isDesktop: boolean): (() => void) | undefined {
  const section = q('[data-route]');
  if (!section) return;

  const table = q('[data-route-table]', section) ?? section;
  const line = q('[data-route-line]', section);
  if (line) {
    gsap.to(line, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: table, start: 'top 70%', end: 'bottom 70%', scrub: true },
    });
  }

  // The sticky photo column only exists on desktop.
  if (!isDesktop) return;
  const rows = all('[data-stop]', section);
  const images = all('[data-route-img]', section);
  const setActive = (id: string) => {
    rows.forEach((row) => row.classList.toggle('is-active', row.dataset.stop === id));
    images.forEach((img) => img.classList.toggle('is-active', img.dataset.routeImg === id));
  };

  const listeners = new AbortController();
  rows.forEach((row) => {
    const id = row.dataset.stop ?? '';
    row.addEventListener('mouseenter', () => setActive(id), { signal: listeners.signal });
    ScrollTrigger.create({
      trigger: row,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => self.isActive && setActive(id),
    });
  });
  return () => listeners.abort();
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
      // Reduced motion: global.css already renders every element in its final state.
      if (reduceMotion) return;

      initHero();
      initStats();
      initManifesto();
      initFadeUps();
      initPilot();
      initContact();
      const cleanupRoute = initRoute(isDesktop);
      return () => cleanupRoute?.();
    },
  );
}
