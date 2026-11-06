export type Lang = 'en' | 'es';

export const languages: Record<Lang, string> = { en: 'EN', es: 'ES' };

export interface Stop {
  id: string;
  name: string;
  tag: string;
  description: string;
  distance: string;
  image: string;
  alt: string;
}

export interface ImageSlot {
  src: string;
  alt: string;
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

interface Copy {
  meta: { title: string; description: string };
  nav: {
    route: string;
    experiences: string;
    partners: string;
    pilot: string;
    contact: string;
    cta: string;
    switchLabel: string;
    skip: string;
  };
  hero: {
    label: string;
    lines: [string, string, string];
    intro: string;
    cta: string;
    scroll: string;
    image: ImageSlot;
  };
  manifesto: { label: string; text: string };
  route: {
    label: string;
    title: string;
    intro: string;
    distanceLabel: string;
    stops: Stop[];
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
    lines: [string, string];
    text: string;
    cta: string;
    secondary: string;
  };
  footer: { hub: string; smallPrint: string };
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=70`;

const images = {
  hero: unsplash('photo-1502933691298-84fc14542831'),
  manta: unsplash('photo-1507525428034-b723cf961d3e'),
  santaMarianita: unsplash('photo-1500375592092-40eb2168fd21'),
  sanMateo: unsplash('photo-1519046904884-53103b34b206'),
  puertoCayo: unsplash('photo-1505118380757-91f5f5632de0'),
  ayampe: unsplash('photo-1509914398892-963f53e6e2f1'),
  montanita: unsplash('photo-1455729552865-3658a5d39692'),
  custom: unsplash('photo-1502680390469-be75c86b636f'),
  group: unsplash('photo-1455264745730-cb3b76250ae8'),
};

export const ui: Record<Lang, Copy> = {
  en: {
    meta: {
      title: 'Radical Marino – Surf Trips Ecuador',
      description:
        'Custom and group surf trips along the coast of Manabí, Ecuador. Logistics hub in Manta, routes to Santa Marianita, San Mateo, Puerto Cayo, Ayampe, Montañita and Olón.',
    },
    nav: {
      route: 'Route',
      experiences: 'Experiences',
      partners: 'Partners',
      pilot: 'Pilot',
      contact: 'Contact',
      cta: 'Plan your trip',
      switchLabel: 'Language',
      skip: 'Skip to content',
    },
    hero: {
      label: 'Surf trips · Manta, Ecuador',
      lines: ['Discover Ecuador.', 'Find your wave.', 'Live the experience.'],
      intro:
        'Small-group surf trips along the Pacific coast of Manabí. We handle the logistics. You surf.',
      cta: 'Plan your trip',
      scroll: 'Scroll',
      image: {
        src: images.hero,
        alt: 'Surfer riding a wave at sunset on the Pacific coast',
      },
    },
    manifesto: {
      label: 'Why we do this',
      text: 'A surf trip with us is more than a route. It is the ocean, the villages and the people of Manabí, lived at the pace of the tide. We connect surfers with the coast of Ecuador through real experiences: sessions at local breaks, nights in small towns, food from the sea and roads that follow the shoreline. Everything is organized so that the only thing you have to think about is the next wave.',
    },
    route: {
      label: 'The route',
      title: 'Six stops along the coast',
      intro:
        'Every trip starts in Manta, our logistics hub. From there we move south, beach by beach, with boards, rooms and sessions already arranged.',
      distanceLabel: 'From Manta',
      stops: [
        {
          id: 'manta',
          name: 'Manta',
          tag: 'Hub and departure point',
          description:
            'The port city where every trip begins. Airport, boards, vehicles and the team meet here before heading down the coast.',
          distance: 'Logistics hub',
          image: images.manta,
          alt: 'Wide beach and calm sea near a port city',
        },
        {
          id: 'santa-marianita',
          name: 'Santa Marianita',
          tag: 'Water sports, coastal vibe',
          description:
            'A long open beach known for wind and water sports. A first session to settle in and read the conditions.',
          distance: 'approx. 20 km',
          image: images.santaMarianita,
          alt: 'Ocean wave breaking under a clear sky',
        },
        {
          id: 'san-mateo',
          name: 'San Mateo',
          tag: 'Local culture, surf heritage',
          description:
            'A fishing village with a long surf history. Point break, local lineup and a community that lives from the sea.',
          distance: 'approx. 12 km',
          image: images.sanMateo,
          alt: 'Palm trees on a quiet beach by a fishing village',
        },
        {
          id: 'puerto-cayo',
          name: 'Puerto Cayo',
          tag: 'Nature, calm, beaches',
          description:
            'Slow mornings and empty beaches. Space to rest, surf uncrowded waves and watch the coast change.',
          distance: 'approx. 70 km',
          image: images.puertoCayo,
          alt: 'Clear blue water along a calm shoreline',
        },
        {
          id: 'ayampe',
          name: 'Ayampe',
          tag: 'Nature, relaxed, surf culture',
          description:
            'A small town surrounded by forest and a consistent beach break. Relaxed surf culture and a close community.',
          distance: 'approx. 110 km',
          image: images.ayampe,
          alt: 'Surfer walking with a board toward the ocean',
        },
        {
          id: 'montanita-olon',
          name: 'Montañita & Olón',
          tag: 'Internationally known, lively',
          description:
            'The best-known surf towns in Ecuador. A lively point break in Montañita and a long, open beach in Olón to close the trip.',
          distance: 'approx. 140–145 km',
          image: images.montanita,
          alt: 'Surfers in the water at a busy beach town',
        },
      ],
    },
    experiences: {
      label: 'Experiences',
      title: 'Two ways to travel',
      intro:
        'Pick a trip built around you, or join a pre-organized itinerary. Either way, the group stays small.',
      capacity: 'Up to 4 participants per departure',
      modalities: [
        {
          title: 'Custom surf trips',
          description:
            'For individuals, couples and small groups. Dates, stops and pace shaped around your level and your time.',
          image: {
            src: images.custom,
            alt: 'Surfboards lined up on the sand',
          },
        },
        {
          title: 'Group surf trips',
          description:
            'Pre-organized itineraries with fixed dates along the full route. Join a small crew and share the trip.',
          image: {
            src: images.group,
            alt: 'Group of surfers watching the waves from the beach',
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
      label: 'Let us talk',
      lines: ['Build the first', 'experiences with us.'],
      text: 'Let us find the right partners, set shared goals and build the first experiences together.',
      cta: 'Get in touch',
      secondary: 'Back to top',
    },
    footer: {
      hub: 'Logistics hub: Manta, Manabí – Ecuador',
      smallPrint: 'Radical Marino. Surf trips along the coast of Ecuador.',
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
      experiences: 'Experiencias',
      partners: 'Alianzas',
      pilot: 'Piloto',
      contact: 'Contacto',
      cta: 'Planifica tu viaje',
      switchLabel: 'Idioma',
      skip: 'Ir al contenido',
    },
    hero: {
      label: 'Surf trips · Manta, Ecuador',
      lines: ['Descubre Ecuador.', 'Encuentra tu ola.', 'Vive la experiencia.'],
      intro:
        'Surf trips en grupos pequeños por la costa del Pacífico de Manabí. Nosotros nos ocupamos de la logística. Tú surfeas.',
      cta: 'Planifica tu viaje',
      scroll: 'Desplázate',
      image: {
        src: images.hero,
        alt: 'Surfista sobre una ola al atardecer en la costa del Pacífico',
      },
    },
    manifesto: {
      label: 'Por qué lo hacemos',
      text: 'Un surf trip con nosotros va más allá de un recorrido. Es el mar, los pueblos y la gente de Manabí, vividos al ritmo de la marea. Conectamos a surfistas con la costa de Ecuador a través de experiencias reales: sesiones en olas locales, noches en pueblos pequeños, comida del mar y carreteras que siguen la línea de la costa. Todo está organizado para que lo único en lo que tengas que pensar sea la siguiente ola.',
    },
    route: {
      label: 'La ruta',
      title: 'Seis paradas por la costa',
      intro:
        'Cada viaje empieza en Manta, nuestro centro logístico. Desde allí avanzamos hacia el sur, playa a playa, con tablas, alojamiento y sesiones ya organizados.',
      distanceLabel: 'Desde Manta',
      stops: [
        {
          id: 'manta',
          name: 'Manta',
          tag: 'Centro logístico y punto de salida',
          description:
            'La ciudad portuaria donde empieza cada viaje. Aeropuerto, tablas, vehículos y equipo se reúnen aquí antes de bajar por la costa.',
          distance: 'Centro logístico',
          image: images.manta,
          alt: 'Playa amplia y mar en calma cerca de una ciudad portuaria',
        },
        {
          id: 'santa-marianita',
          name: 'Santa Marianita',
          tag: 'Deportes acuáticos, ambiente costero',
          description:
            'Una playa larga y abierta conocida por el viento y los deportes acuáticos. Una primera sesión para adaptarse y leer las condiciones.',
          distance: 'aprox. 20 km',
          image: images.santaMarianita,
          alt: 'Ola rompiendo bajo un cielo despejado',
        },
        {
          id: 'san-mateo',
          name: 'San Mateo',
          tag: 'Cultura local, tradición surfista',
          description:
            'Un pueblo pesquero con una larga historia de surf. Point break, lineup local y una comunidad que vive del mar.',
          distance: 'aprox. 12 km',
          image: images.sanMateo,
          alt: 'Palmeras en una playa tranquila junto a un pueblo pesquero',
        },
        {
          id: 'puerto-cayo',
          name: 'Puerto Cayo',
          tag: 'Naturaleza, calma, playas',
          description:
            'Mañanas lentas y playas vacías. Espacio para descansar, surfear olas sin gente y ver cómo cambia la costa.',
          distance: 'aprox. 70 km',
          image: images.puertoCayo,
          alt: 'Agua azul y clara junto a una orilla tranquila',
        },
        {
          id: 'ayampe',
          name: 'Ayampe',
          tag: 'Naturaleza, relax, cultura surf',
          description:
            'Un pueblo pequeño rodeado de bosque y un beach break constante. Cultura surf relajada y una comunidad cercana.',
          distance: 'aprox. 110 km',
          image: images.ayampe,
          alt: 'Surfista caminando con su tabla hacia el mar',
        },
        {
          id: 'montanita-olon',
          name: 'Montañita y Olón',
          tag: 'Reconocidos internacionalmente, animados',
          description:
            'Los pueblos surfistas más conocidos de Ecuador. Un point break animado en Montañita y una playa larga y abierta en Olón para cerrar el viaje.',
          distance: 'aprox. 140–145 km',
          image: images.montanita,
          alt: 'Surfistas en el agua en un pueblo de playa concurrido',
        },
      ],
    },
    experiences: {
      label: 'Experiencias',
      title: 'Dos formas de viajar',
      intro:
        'Elige un viaje diseñado a tu medida o súmate a un itinerario ya organizado. En ambos casos, el grupo es pequeño.',
      capacity: 'Hasta 4 participantes por salida',
      modalities: [
        {
          title: 'Surf trips personalizados',
          description:
            'Para personas, parejas y grupos pequeños. Fechas, paradas y ritmo adaptados a tu nivel y a tu tiempo.',
          image: {
            src: images.custom,
            alt: 'Tablas de surf alineadas sobre la arena',
          },
        },
        {
          title: 'Surf trips grupales',
          description:
            'Itinerarios preorganizados con fechas fijas a lo largo de toda la ruta. Súmate a un grupo pequeño y comparte el viaje.',
          image: {
            src: images.group,
            alt: 'Grupo de surfistas observando las olas desde la playa',
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
      label: 'Hablemos',
      lines: ['Construyamos las primeras', 'experiencias juntos.'],
      text: 'Busquemos los socios adecuados, definamos objetivos compartidos y construyamos juntos las primeras experiencias.',
      cta: 'Contáctanos',
      secondary: 'Volver arriba',
    },
    footer: {
      hub: 'Centro logístico: Manta, Manabí – Ecuador',
      smallPrint: 'Radical Marino. Surf trips por la costa de Ecuador.',
    },
  },
};

export function useTranslations(lang: Lang): Copy {
  return ui[lang];
}
