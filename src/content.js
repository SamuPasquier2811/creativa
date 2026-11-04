export const business = {
  name: 'Creativa',
  city: 'La Paz, Bolivia',
  whatsapp: '591XXXXXXXX',
  whatsappMessage: 'Hola Creativa, quiero información sobre sus servicios.',
  socials: [
    { label: 'Instagram', url: '' },
    { label: 'Facebook', url: '' },
    { label: 'TikTok', url: '' },
  ],
}

export const nav = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'muestras', label: 'Muestras' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'contacto', label: 'Contacto' },
]

// accent: true pinta la palabra con el color de acento; br: true salta de línea
export const hero = {
  eyebrow: 'Estudio creativo · La Paz',
  title: [
    { w: 'Ideas' },
    { w: 'que' },
    { w: 'se' },
    { w: 'ven.', accent: true, br: true },
    { w: 'Marcas' },
    { w: 'que' },
    { w: 'se' },
    { w: 'mueven.', accent: true },
  ],
  text: 'Diseño, video, páginas web y apps a medida para que tu negocio avance.',
  cta: 'Escríbenos por WhatsApp',
  secondary: 'Ver servicios',
  // Barra de "idea" que escribe sola (al tocarla abre WhatsApp)
  prompt: {
    start: 'Quiero',
    words: [
      'un video que se mueva',
      'una página para mi negocio',
      'una app a mi medida',
      'contenido para mis redes',
    ],
  },
  // Mini chat de ejemplo (tu servicio de WhatsApp automático)
  chat: {
    question: 'Hola, ¿cuál es su horario?',
    answer: '¡Hola! Te compartimos nuestros horarios.',
  },
}

/* ---------------- SERVICIOS ----------------
   OJO: en la web de tu compañero, las ofertas de imágenes (US$49),
   video (US$79) y contenido mensual (US$249) decían "válidas hasta el 5 nov 2026".
   Confirma esos precios antes de publicar. */
export const servicesIntro = { eyebrow: 'Servicios', title: 'Lo que hacemos' }

export const services = [
  { n: '01', title: 'Contenido visual', text: '10 imágenes para tu marca', price: 'US$49' },
  { n: '02', title: 'Video & motion', text: '1 video vertical de hasta 30 s', price: 'US$79' },
  { n: '03', title: 'Contenido mensual', text: '20 imágenes + 4 videos', price: 'US$249' },
  { n: '04', title: 'Página web', text: 'Landing de hasta 5 secciones', price: 'US$100' },
  { n: '05', title: 'WhatsApp automático', text: 'Bienvenida y respuestas frecuentes', price: 'US$20/mes' },
  { n: '06', title: 'Apps a medida', text: 'Herramientas hechas para tu negocio', price: 'Desde US$100' },
].map((s) => ({
  ...s,
  message: `Hola Creativa, quiero información sobre: ${s.title}.`,
}))

export const servicesNote =
  'Precios en dólares. El alcance y los plazos se confirman por WhatsApp.'

/* ---------------- MUESTRAS ----------------
   Pon los videos en public/videos/ con estos nombres (o cambia las rutas).
   La ruta empieza con / y NO lleva "public": /videos/archivo.mp4
   Consejo: comprímelos (idealmente menos de 8 MB cada uno) para que carguen rápido. */
export const samplesIntro = { eyebrow: 'Muestras', title: 'El movimiento también cuenta' }

export const samples = [
  { tag: 'Identidad', title: 'Una identidad que toma forma', src: '/videos/01_brand_reel.mp4' },
  { tag: 'Web y apps', title: 'De una necesidad a una experiencia', src: '/videos/02_web_apps.mp4' },
  { tag: 'Conversaciones', title: 'Cada mensaje tiene un camino', src: '/videos/03_conversaciones.mp4' },
]

export const samplesNote = 'Muestras conceptuales propias de Creativa.'

export const process = {
  eyebrow: 'Proceso',
  title: 'Simple y con rumbo',
  steps: [
    { title: 'Conversamos', text: 'Tu negocio, tu marca y lo que necesitas.' },
    { title: 'Le damos forma', text: 'Aprobamos la idea antes de producir.' },
    { title: 'Lo hacemos realidad', text: 'Creamos, afinamos y entregamos.' },
  ],
}

export const contact = {
  title: [
    { w: 'Hagamos' },
    { w: 'algo' },
    { w: 'Creativa.', accent: true },
  ],
  text: 'Cuéntanos tu idea por WhatsApp. Te respondemos directo.',
  cta: 'Escribir por WhatsApp',
}