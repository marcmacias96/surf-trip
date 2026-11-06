export type Lang = 'en' | 'es';

export const languages: Record<Lang, string> = { en: 'EN', es: 'ES' };

export interface ImageSlot {
  src: string;
  /** Width-described candidates; `src` stays the JPEG fallback. */
  srcset: string;
  sizes: string;
  alt: string;
  width: number;
  height: number;
}

/** One photo per orientation: `mobile` fills a portrait box, `desktop` a landscape or sticky one. */
export interface ArtDirectedImage {
  mobile: ImageSlot;
  desktop: ImageSlot;
}

export interface Stop {
  id: string;
  name: string;
  tag: string;
  info: string;
  description: string;
  distance: string;
  image: ImageSlot;
}

interface Modality {
  title: string;
  description: string;
  image: ImageSlot;
}

interface PartnerArea {
  title: string;
  items: string[];
}

interface Stat {
  value: string;
  unit: string;
  caption: string;
}

interface Copy {
  meta: { title: string; description: string };
  nav: {
    route: string;
    experiences: string;
    partners: string;
    pilot: string;
    contact: string;
    cta: string;
    ctaShort: string;
    switchLabel: string;
    skip: string;
  };
  hero: {
    label: string;
    title: { ghost: string; line1: string; line2: string };
    lines: [string, string, string];
    subLines: [string, string, string];
    stickers: [string, string, string];
    intro: string;
    cta: string;
    scroll: string;
    image: ArtDirectedImage;
  };
  strip: string[];
  stats: [Stat, Stat, Stat];
  manifesto: { label: string; title: { solid: string; accent: string }; text: string };
  route: {
    label: string;
    title: string;
    intro: string;
    distanceLabel: string;
    headers: { index: string; stop: string; info: string; distance: string };
    stops: Stop[];
  };
  transport: {
    label: string;
    lines: [string, string];
    bullets: string[];
    cta: string;
    image: ArtDirectedImage;
  };
  experiences: {
    label: string;
    title: string;
    intro: string;
    capacity: string;
    modalities: [Modality, Modality];
    includedTitle: string;
    included: string[];
  };
  partners: { label: string; title: string; intro: string; areas: PartnerArea[] };
  pilot: {
    label: string;
    title: string;
    steps: string[];
    visionTitle: string;
    vision: string;
  };
  contact: {
    label: string;
    title: { solid: string; ghost: string };
    lines: [string, string];
    text: string;
    cta: string;
    secondary: string;
  };
  footer: { hub: string; smallPrint: string };
}

const widths = [640, 1024, 1600];

const unsplash = (id: string) => {
  const url = (w: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
  return { src: url(1600), srcset: widths.map((w) => `${url(w)} ${w}w`).join(', ') };
};

// Local photos: `{name}.jpg` is the fallback; `{name}-{w}.webp` variants live in public/images.
const local = (name: string, ws = widths) => ({
  src: `/images/${name}.jpg`,
  srcset: ws.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', '),
});

const sizes = {
  hero: '(min-width: 1400px) 1400px, 100vw',
  transport: '(min-width: 1024px) 50vw, 100vw',
  route: '(min-width: 1024px) 40vw, 100vw',
  card: '(min-width: 768px) 50vw, 100vw',
};

const images = {
  heroTruck: { ...local('truck-ayampe-sunset'), sizes: sizes.hero },
  // Portrait photos for phone-width boxes; only the sizes a phone can need.
  heroTruckMobile: { ...local('truck-coast-overlook', [640, 1024]), sizes: '100vw' },
  transportTruck: { ...local('truck-coast-overlook'), sizes: sizes.transport },
  transportTruckMobile: { ...local('truck-hill-lighthouse', [640, 1024]), sizes: '100vw' },
  manta: { ...local('truck-manta-towers'), sizes: sizes.route },
  santaMarianita: { ...unsplash('photo-1500375592092-40eb2168fd21'), sizes: sizes.route },
  sanMateo: { ...local('truck-hill-lighthouse'), sizes: sizes.route },
  puertoCayo: { ...unsplash('photo-1505118380757-91f5f5632de0'), sizes: sizes.route },
  ayampe: { ...unsplash('photo-1509914398892-963f53e6e2f1'), sizes: sizes.route },
  montanita: { ...unsplash('photo-1455729552865-3658a5d39692'), sizes: sizes.route },
  custom: { ...unsplash('photo-1502680390469-be75c86b636f'), sizes: sizes.card },
  group: { ...unsplash('photo-1455264745730-cb3b76250ae8'), sizes: sizes.card },
};

const stripStops = ['Manta', 'Santa Marianita', 'San Mateo', 'Puerto Cayo', 'Ayampe', 'Montañita', 'Olón'];

export const ui: Record<Lang, Copy> = {
  en: {
    meta: {
      title: 'Radical Marino – Surf Trips Ecuador',
      description:
        'Custom and group surf trips along the coast of Manabí, Ecuador. Logistics hub in Manta, routes to Santa Marianita, San Mateo, Puerto Cayo, Ayampe, Montañita and Olón.',
    },
    nav: {
      route: 'Route',
      experiences: 'Transport',
      partners: 'Partners',
      pilot: 'Pilot',
      contact: 'Contact',
      cta: 'Get in the truck',
      ctaShort: 'Book',
      switchLabel: 'Language',
      skip: 'Skip to content',
    },
    hero: {
      label: 'Surf trips · Manta, Ecuador · Boards on the roof',
      title: { ghost: 'Find', line1: 'your', line2: 'wave' },
      lines: ['Discover Ecuador.', 'Find your wave.', 'Live the experience.'],
      subLines: ['6 stops, 145 km of coast', '4 to 8 surfers per trip', 'we drive, you surf'],
      stickers: ['Depart Manta 05:30', 'Radical', 'Boards · Wax · Fuel'],
      intro:
        'Small-group surf trips along the Pacific coast of Manabí. We handle the logistics. You surf.',
      cta: 'Get in the truck',
      scroll: 'Scroll',
      image: {
        mobile: {
          ...images.heroTruckMobile,
          alt: 'Radical Marino double-cab truck with board rack parked at a coastal overlook',
          width: 1080,
          height: 1920,
        },
        desktop: {
          ...images.heroTruck,
          alt: 'Radical Marino double-cab truck with board rack, side profile on the beach at sunset in Ayampe',
          width: 1920,
          height: 1279,
        },
      },
    },
    strip: stripStops,
    stats: [
      { value: '6', unit: 'stops', caption: 'One base. One road.' },
      { value: '145', unit: 'km', caption: 'Manta to Olón, approx.' },
      { value: '8', unit: 'max', caption: '4 in the cab, up to 8 with the canopy on' },
    ],
    manifesto: {
      label: 'Why we do this',
      title: { solid: 'The route is the', accent: 'trip.' },
      text: 'A surf trip with us is more than a route. It is the ocean, the villages and the people of Manabí, lived at the pace of the tide. We connect surfers with the coast of Ecuador through real experiences: sessions at local breaks, nights in small towns, food from the sea and roads that follow the shoreline. Everything is organized so that the only thing you have to think about is the next wave.',
    },
    route: {
      label: 'The route',
      title: 'Six stops along the coast',
      intro:
        'Every trip starts in Manta, our logistics hub. From there we move south, beach by beach, with boards, rooms and sessions already arranged.',
      distanceLabel: 'From Manta',
      headers: { index: '#', stop: 'Stop', info: "What's there", distance: 'From Manta (approx.)' },
      stops: [
        {
          id: 'manta',
          name: 'Manta',
          tag: 'Hub and departure point',
          info: 'Logistics hub · departure',
          description:
            'The port city where every trip begins. Airport, boards, vehicles and the team meet here before heading down the coast.',
          distance: '0 km',
          image: {

            ...images.manta,

            alt: 'Radical Marino double-cab truck with board rack in front of the Manta skyline',

            width: 1920,

            height: 1080,

          },
        },
        {
          id: 'santa-marianita',
          name: 'Santa Marianita',
          tag: 'Water sports, coastal vibe',
          info: 'Wind, water sports',
          description:
            'A long open beach known for wind and water sports. A first session to settle in and read the conditions.',
          distance: '20 km',
          image: {

            ...images.santaMarianita,

            alt: 'Ocean wave breaking under a clear sky',

            width: 1600,

            height: 1067,

          },
        },
        {
          id: 'san-mateo',
          name: 'San Mateo',
          tag: 'Local culture, surf heritage',
          info: 'Point break · fishing village',
          description:
            'A fishing village with a long surf history. Point break, local lineup and a community that lives from the sea.',
          distance: '12 km',
          image: {

            ...images.sanMateo,

            alt: 'Radical Marino double-cab truck with board rack on a hill by the San Mateo lighthouse',

            width: 1080,

            height: 1920,

          },
        },
        {
          id: 'puerto-cayo',
          name: 'Puerto Cayo',
          tag: 'Nature, calm, beaches',
          info: 'Quiet beaches · nature',
          description:
            'Slow mornings and empty beaches. Space to rest, surf uncrowded waves and watch the coast change.',
          distance: '70 km',
          image: {

            ...images.puertoCayo,

            alt: 'Clear blue water along a calm shoreline',

            width: 1600,

            height: 1067,

          },
        },
        {
          id: 'ayampe',
          name: 'Ayampe',
          tag: 'Nature, relaxed, surf culture',
          info: 'Beach break · surf town',
          description:
            'A small town surrounded by forest and a consistent beach break. Relaxed surf culture and a close community.',
          distance: '110 km',
          image: {

            ...images.ayampe,

            alt: 'Surfer walking with a board toward the ocean',

            width: 1600,

            height: 1067,

          },
        },
        {
          id: 'montanita-olon',
          name: 'Montañita / Olón',
          tag: 'Internationally known, lively',
          info: 'Point + long beach · nightlife',
          description:
            'The best-known surf towns in Ecuador. A lively point break in Montañita and a long, open beach in Olón to close the trip.',
          distance: '140–145 km',
          image: {

            ...images.montanita,

            alt: 'Surfers in the water at a busy beach town',

            width: 1600,

            height: 1067,

          },
        },
      ],
    },
    transport: {
      label: 'Transport & logistics',
      lines: ['We drive.', 'You surf.'],
      bullets: [
        'Truck, boards and gear from the Manta hub',
        'Routes change with the swell, not the schedule',
        'Private or shared rooms, full board',
        'Local instructors and crew on every stop',
      ],
      cta: 'Plan your trip',
      image: {
        mobile: {
          ...images.transportTruckMobile,
          alt: 'Radical Marino double-cab truck with board rack on a hill by the San Mateo lighthouse',
          width: 1080,
          height: 1920,
        },
        desktop: {
          ...images.transportTruck,
          alt: 'Radical Marino double-cab truck with board rack parked at a coastal overlook',
          width: 1080,
          height: 1920,
        },
      },
    },
    experiences: {
      label: 'Trips',
      title: 'Two ways to travel',
      intro:
        'Pick a trip built around you, or join a pre-organized itinerary. Either way, the group stays small.',
      capacity: '4 participants in the cab, up to 8 with the canopy on',
      modalities: [
        {
          title: 'Custom surf trips',
          description:
            'For individuals, couples and small groups. Dates, stops and pace shaped around your level and your time.',
          image: {
            ...images.custom,
            alt: 'Surfboards lined up on the sand',
            width: 1600,
            height: 1067,
          },
        },
        {
          title: 'Group surf trips',
          description:
            'Pre-organized itineraries with fixed dates along the full route. Join a small crew and share the trip.',
          image: {
            ...images.group,
            alt: 'Group of surfers watching the waves from the beach',
            width: 1600,
            height: 1067,
          },
        },
      ],
      includedTitle: 'What is included',
      included: [
        'Transport and logistics for people and boards',
        'Beach-hopping along the route',
        'Private or shared rooms',
        'Full board',
        'Surf sessions',
        'Local instructors',
        'Cultural and nature activities',
        'Guided support throughout the trip',
      ],
    },
    partners: {
      label: 'Alliances',
      title: 'Open to partners',
      intro:
        'We are building Radical Marino with agencies, brands and operators. These are the areas where we want to work together.',
      areas: [
        {
          title: 'International sales and distribution',
          items: [
            'Travel agencies and tour operators',
            'Booking channels in the US, Canada and Europe',
            'Surf schools and camps abroad',
          ],
        },
        {
          title: 'Promotion and positioning',
          items: [
            'Media and content partners',
            'Surf communities and ambassadors',
            'Destination campaigns for Manabí',
          ],
        },
        {
          title: 'Operations and tourism development',
          items: [
            'Local lodging and food providers',
            'Transport and safety partners',
            'Public and private tourism bodies',
          ],
        },
        {
          title: 'Sponsorships and brand collaborations',
          items: [
            'Surf and outdoor brands',
            'Equipment and apparel partners',
            'Co-branded experiences and events',
          ],
        },
      ],
    },
    pilot: {
      label: 'Pilot phase',
      title: 'How we start',
      steps: [
        'Define the first packages',
        'Select local providers',
        'Organize the routes from Manta',
        'Set service, safety and operations protocols',
        'Produce promotional and audiovisual material',
        'Activate sales channels',
        'Welcome the first travelers',
        'Evaluate and optimize',
      ],
      visionTitle: 'Where this goes',
      vision:
        'After the pilot: more destinations and providers, alliances with international agencies, premium experiences, and Manta positioned as the strategic surf-tourism hub of Ecuador.',
    },
    contact: {
      label: 'Open to partners · agencies · brands',
      title: { solid: 'Get in', ghost: 'the truck.' },
      lines: ['Build the first', 'experiences with us.'],
      text: 'Let us find the right partners, set shared goals and build the first experiences together.',
      cta: 'Book my spot',
      secondary: 'Back to top',
    },
    footer: {
      hub: 'Hub: Manta, Manabí – Ecuador',
      smallPrint: 'Radical Marino — Surf trips Ecuador',
    },
  },
  es: {
    meta: {
      title: 'Radical Marino – Surf Trips Ecuador',
      description:
        'Surf trips personalizados y grupales por la costa de Manabí, Ecuador. Centro logístico en Manta, rutas a Santa Marianita, San Mateo, Puerto Cayo, Ayampe, Montañita y Olón.',
    },
    nav: {
      route: 'Ruta',
      experiences: 'Transporte',
      partners: 'Alianzas',
      pilot: 'Piloto',
      contact: 'Contacto',
      cta: 'Súbete a la camioneta',
      ctaShort: 'Reservar',
      switchLabel: 'Idioma',
      skip: 'Ir al contenido',
    },
    hero: {
      label: 'Surf trips · Manta, Ecuador · Tablas en el techo',
      title: { ghost: 'Encuentra', line1: 'tu', line2: 'ola' },
      lines: ['Descubre Ecuador.', 'Encuentra tu ola.', 'Vive la experiencia.'],
      subLines: ['6 paradas, 145 km de costa', 'de 4 a 8 surfistas por viaje', 'nosotros conducimos, tú surfeas'],
      stickers: ['Salida Manta 05:30', 'Radical', 'Tablas · Cera · Gasolina'],
      intro:
        'Surf trips en grupos pequeños por la costa del Pacífico de Manabí. Nosotros nos ocupamos de la logística. Tú surfeas.',
      cta: 'Súbete a la camioneta',
      scroll: 'Desplázate',
      image: {
        mobile: {
          ...images.heroTruckMobile,
          alt: 'Camioneta doble cabina de Radical Marino con parrilla para tablas en un mirador de la costa',
          width: 1080,
          height: 1920,
        },
        desktop: {
          ...images.heroTruck,
          alt: 'Camioneta doble cabina de Radical Marino con parrilla para tablas, de perfil en la playa de Ayampe al atardecer',
          width: 1920,
          height: 1279,
        },
      },
    },
    strip: stripStops,
    stats: [
      { value: '6', unit: 'paradas', caption: 'Una base. Una carretera.' },
      { value: '145', unit: 'km', caption: 'De Manta a Olón, aprox.' },
      { value: '8', unit: 'máx.', caption: '4 en cabina, hasta 8 con la carpa puesta' },
    ],
    manifesto: {
      label: 'Por qué lo hacemos',
      title: { solid: 'La ruta es el', accent: 'viaje.' },
      text: 'Un surf trip con nosotros va más allá de un recorrido. Es el mar, los pueblos y la gente de Manabí, vividos al ritmo de la marea. Conectamos a surfistas con la costa de Ecuador a través de experiencias reales: sesiones en olas locales, noches en pueblos pequeños, comida del mar y carreteras que siguen la línea de la costa. Todo está organizado para que lo único en lo que tengas que pensar sea la siguiente ola.',
    },
    route: {
      label: 'La ruta',
      title: 'Seis paradas por la costa',
      intro:
        'Cada viaje empieza en Manta, nuestro centro logístico. Desde allí avanzamos hacia el sur, playa a playa, con tablas, alojamiento y sesiones ya organizados.',
      distanceLabel: 'Desde Manta',
      headers: { index: '#', stop: 'Parada', info: 'Qué hay', distance: 'Desde Manta (aprox.)' },
      stops: [
        {
          id: 'manta',
          name: 'Manta',
          tag: 'Centro logístico y punto de salida',
          info: 'Centro logístico · salida',
          description:
            'La ciudad portuaria donde empieza cada viaje. Aeropuerto, tablas, vehículos y equipo se reúnen aquí antes de bajar por la costa.',
          distance: '0 km',
          image: {

            ...images.manta,

            alt: 'Camioneta doble cabina de Radical Marino con parrilla para tablas frente a los edificios de Manta',

            width: 1920,

            height: 1080,

          },
        },
        {
          id: 'santa-marianita',
          name: 'Santa Marianita',
          tag: 'Deportes acuáticos, ambiente costero',
          info: 'Viento, deportes acuáticos',
          description:
            'Una playa larga y abierta conocida por el viento y los deportes acuáticos. Una primera sesión para adaptarse y leer las condiciones.',
          distance: '20 km',
          image: {

            ...images.santaMarianita,

            alt: 'Ola rompiendo bajo un cielo despejado',

            width: 1600,

            height: 1067,

          },
        },
        {
          id: 'san-mateo',
          name: 'San Mateo',
          tag: 'Cultura local, tradición surfista',
          info: 'Point break · pueblo pesquero',
          description:
            'Un pueblo pesquero con una larga historia de surf. Point break, lineup local y una comunidad que vive del mar.',
          distance: '12 km',
          image: {

            ...images.sanMateo,

            alt: 'Camioneta doble cabina de Radical Marino con parrilla para tablas en una colina junto al faro de San Mateo',

            width: 1080,

            height: 1920,

          },
        },
        {
          id: 'puerto-cayo',
          name: 'Puerto Cayo',
          tag: 'Naturaleza, calma, playas',
          info: 'Playas tranquilas · naturaleza',
          description:
            'Mañanas lentas y playas vacías. Espacio para descansar, surfear olas sin gente y ver cómo cambia la costa.',
          distance: '70 km',
          image: {

            ...images.puertoCayo,

            alt: 'Agua azul y clara junto a una orilla tranquila',

            width: 1600,

            height: 1067,

          },
        },
        {
          id: 'ayampe',
          name: 'Ayampe',
          tag: 'Naturaleza, relax, cultura surf',
          info: 'Beach break · pueblo surfero',
          description:
            'Un pueblo pequeño rodeado de bosque y un beach break constante. Cultura surf relajada y una comunidad cercana.',
          distance: '110 km',
          image: {

            ...images.ayampe,

            alt: 'Surfista caminando con su tabla hacia el mar',

            width: 1600,

            height: 1067,

          },
        },
        {
          id: 'montanita-olon',
          name: 'Montañita / Olón',
          tag: 'Reconocidos internacionalmente, animados',
          info: 'Point + playa larga · vida nocturna',
          description:
            'Los pueblos surfistas más conocidos de Ecuador. Un point break animado en Montañita y una playa larga y abierta en Olón para cerrar el viaje.',
          distance: '140–145 km',
          image: {

            ...images.montanita,

            alt: 'Surfistas en el agua en un pueblo de playa concurrido',

            width: 1600,

            height: 1067,

          },
        },
      ],
    },
    transport: {
      label: 'Transporte y logística',
      lines: ['Nosotros conducimos.', 'Tú surfeas.'],
      bullets: [
        'Camioneta, tablas y equipo desde el hub de Manta',
        'Las rutas cambian con el swell, no con el horario',
        'Habitaciones privadas o compartidas, pensión completa',
        'Instructores y equipo local en cada parada',
      ],
      cta: 'Planifica tu viaje',
      image: {
        mobile: {
          ...images.transportTruckMobile,
          alt: 'Camioneta doble cabina de Radical Marino con parrilla para tablas en una colina junto al faro de San Mateo',
          width: 1080,
          height: 1920,
        },
        desktop: {
          ...images.transportTruck,
          alt: 'Camioneta doble cabina de Radical Marino con parrilla para tablas en un mirador de la costa',
          width: 1080,
          height: 1920,
        },
      },
    },
    experiences: {
      label: 'Viajes',
      title: 'Dos formas de viajar',
      intro:
        'Elige un viaje diseñado a tu medida o súmate a un itinerario ya organizado. En ambos casos, el grupo es pequeño.',
      capacity: '4 participantes en cabina, hasta 8 con la carpa puesta',
      modalities: [
        {
          title: 'Surf trips personalizados',
          description:
            'Para personas, parejas y grupos pequeños. Fechas, paradas y ritmo adaptados a tu nivel y a tu tiempo.',
          image: {
            ...images.custom,
            alt: 'Tablas de surf alineadas sobre la arena',
            width: 1600,
            height: 1067,
          },
        },
        {
          title: 'Surf trips grupales',
          description:
            'Itinerarios preorganizados con fechas fijas a lo largo de toda la ruta. Súmate a un grupo pequeño y comparte el viaje.',
          image: {
            ...images.group,
            alt: 'Grupo de surfistas observando las olas desde la playa',
            width: 1600,
            height: 1067,
          },
        },
      ],
      includedTitle: 'Qué incluye',
      included: [
        'Transporte y logística de personas y tablas',
        'Beach-hopping a lo largo de la ruta',
        'Habitaciones privadas o compartidas',
        'Pensión completa',
        'Sesiones de surf',
        'Instructores locales',
        'Actividades culturales y de naturaleza',
        'Acompañamiento guiado durante todo el viaje',
      ],
    },
    partners: {
      label: 'Alianzas',
      title: 'Abiertos a colaborar',
      intro:
        'Estamos construyendo Radical Marino junto a agencias, marcas y operadores. Estas son las áreas en las que queremos trabajar en conjunto.',
      areas: [
        {
          title: 'Ventas y distribución internacional',
          items: [
            'Agencias de viajes y tour operadores',
            'Canales de reserva en Estados Unidos, Canadá y Europa',
            'Escuelas y campamentos de surf en el exterior',
          ],
        },
        {
          title: 'Promoción y posicionamiento',
          items: [
            'Medios y socios de contenido',
            'Comunidades de surf y embajadores',
            'Campañas de destino para Manabí',
          ],
        },
        {
          title: 'Operación y desarrollo turístico',
          items: [
            'Proveedores locales de alojamiento y alimentación',
            'Socios de transporte y seguridad',
            'Entidades turísticas públicas y privadas',
          ],
        },
        {
          title: 'Patrocinios y colaboraciones con marcas',
          items: [
            'Marcas de surf y outdoor',
            'Socios de equipamiento y ropa',
            'Experiencias y eventos co-brandeados',
          ],
        },
      ],
    },
    pilot: {
      label: 'Fase piloto',
      title: 'Cómo empezamos',
      steps: [
        'Definir los primeros paquetes',
        'Seleccionar proveedores locales',
        'Organizar las rutas desde Manta',
        'Establecer protocolos de servicio, seguridad y operación',
        'Producir material promocional y audiovisual',
        'Activar canales de venta',
        'Recibir a los primeros viajeros',
        'Evaluar y optimizar',
      ],
      visionTitle: 'Hacia dónde vamos',
      vision:
        'Después del piloto: más destinos y proveedores, alianzas con agencias internacionales, experiencias premium y Manta posicionada como el hub estratégico del turismo de surf en Ecuador.',
    },
    contact: {
      label: 'Abiertos a socios · agencias · marcas',
      title: { solid: 'Súbete a la', ghost: 'camioneta.' },
      lines: ['Construyamos las primeras', 'experiencias juntos.'],
      text: 'Busquemos los socios adecuados, definamos objetivos compartidos y construyamos juntos las primeras experiencias.',
      cta: 'Reserva tu lugar',
      secondary: 'Volver arriba',
    },
    footer: {
      hub: 'Hub: Manta, Manabí – Ecuador',
      smallPrint: 'Radical Marino — Surf trips Ecuador',
    },
  },
};

export function useTranslations(lang: Lang): Copy {
  return ui[lang];
}
