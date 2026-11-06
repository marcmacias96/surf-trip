import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Strong ease-out for entrances; scrubbed motion stays linear.
CustomEase.create('outStrong', '0.23, 1, 0.32, 1');

const q = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) =>
  root.querySelector<T>(selector);

function startLenis() {
  const lenis = new Lenis({ autoRaf: false, anchors: true });
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
    duration: 1.1,
    ease: 'outStrong',
    stagger: 0.08,
    delay: trigger ? 0 : 0.2,
    scrollTrigger: trigger ? { trigger, start: 'top 70%', once: true } : undefined,
  });
}

function initHero() {
  const hero = q('[data-hero]');
  if (!hero) return;
  revealLines(gsap.utils.toArray<Element>('[data-line]', hero));
  gsap.fromTo(
    q('[data-hero-img]', hero),
    { yPercent: -10 },
    {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    },
  );
}

function initManifesto() {
  const block = q('[data-manifesto]');
  if (!block) return;
  gsap.to(gsap.utils.toArray<Element>('[data-word]', block), {
    opacity: 1,
    ease: 'none',
    stagger: 0.04,
    scrollTrigger: { trigger: block, start: 'top 75%', end: 'bottom 55%', scrub: true },
  });
}

function initRoute(): (() => void) | undefined {
  const section = q('[data-route]');
  const track = q('[data-route-track]');
  const progress = q('[data-route-progress]');
  if (!section || !track || !progress) return;

  section.classList.add('route--horizontal');
  const distance = () => track.scrollWidth - window.innerWidth;

  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })
    .to(track, { x: () => -distance(), ease: 'none' }, 0)
    .to(progress, { scaleX: 1, ease: 'none' }, 0);

  return () => section.classList.remove('route--horizontal');
}

function initFadeUps() {
  const reveal = (batch: Element[]) =>
    gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, ease: 'outStrong', stagger: 0.06 });
  ScrollTrigger.batch('[data-fade]', { start: 'top 85%', onEnter: reveal, onEnterBack: reveal });
}

function initPilot() {
  const section = q('[data-pilot]');
  if (!section) return;
  const scrollTrigger = { trigger: section, start: 'top 70%', end: 'bottom 70%', scrub: true };
  gsap.to(q('[data-pilot-line]', section), { scaleX: 1, scaleY: 1, ease: 'none', scrollTrigger });
  gsap.to(gsap.utils.toArray<Element>('[data-pilot-dot]', section), {
    opacity: 1,
    scale: 1,
    ease: 'none',
    stagger: 0.12,
    scrollTrigger,
  });
}

function initContact() {
  const section = q('[data-contact]');
  if (!section) return;
  revealLines(gsap.utils.toArray<Element>('[data-line]', section), section);
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
      initManifesto();
      initFadeUps();
      initPilot();
      initContact();
      const cleanupRoute = isDesktop ? initRoute() : undefined;
      return () => cleanupRoute?.();
    },
  );
}
