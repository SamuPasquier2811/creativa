import { Fragment, useEffect, useRef, useState } from 'react'
import {
  business,
  nav,
  hero,
  servicesIntro,
  services,
  servicesNote,
  samplesIntro,
  samples,
  samplesNote,
  process,
  contact,
} from './content'

const wa = (message) => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`
const whatsappUrl = wa(business.whatsappMessage)

const calmMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- Iconos (SVG en línea, sin librerías) ---------- */
const paths = {
  chat: (
    <>
      <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z" />
      <circle cx="8.5" cy="11.5" r="0.9" fill="currentColor" />
      <circle cx="12" cy="11.5" r="0.9" fill="currentColor" />
      <circle cx="15.5" cy="11.5" r="0.9" fill="currentColor" />
    </>
  ),
  arrow: <path d="M7 17L17 7M8 7h9v9" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 8h16M4 16h16" />,
}

function Icon({ name, size = 22 }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

// "Creativa" con la "i" y la última "a" en morado (guiño a la IA)
function Brand({ text = 'Creativa' }) {
  const [head, tail = ''] = text.split('Creativa')
  return (
    <>
      {head}Creat<span className="ia">i</span>v<span className="ia">a</span>
      {tail}
    </>
  )
}

// El asterisco ✳ es el símbolo de la marca
function Asterisk({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M50 8v84M8 50h84M20 20l60 60M80 20L20 80" />
    </svg>
  )
}

/* ---------- Aparecer suavemente al hacer scroll ---------- */
function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

// Palabras que suben una por una
function Words({ words, className = '' }) {
  return (
    <>
      {words.map((t, i) => (
        <Fragment key={i}>
          <span className="word" aria-hidden="true">
            <span className={`${t.accent ? 'accent' : ''} ${className}`} style={{ '--i': i }}>
              {t.w.includes('Creativa') ? <Brand text={t.w} /> : t.w}
            </span>
          </span>
          {t.br ? <br /> : ' '}
        </Fragment>
      ))}
    </>
  )
}

/* ---------- Texto que se escribe y se borra solo ---------- */
function Typer({ words }) {
  const [text, setText] = useState(() => (calmMotion() ? words[0] : ''))

  useEffect(() => {
    if (calmMotion()) return
    let w = 0
    let n = 0
    let deleting = false
    let timer

    const tick = () => {
      const word = words[w]
      if (!deleting) {
        n += 1
        setText(word.slice(0, n))
        if (n === word.length) {
          deleting = true
          timer = setTimeout(tick, 1700)
          return
        }
        timer = setTimeout(tick, 65)
      } else {
        n -= 1
        setText(word.slice(0, n))
        if (n === 0) {
          deleting = false
          w = (w + 1) % words.length
          timer = setTimeout(tick, 350)
          return
        }
        timer = setTimeout(tick, 30)
      }
    }

    timer = setTimeout(tick, 1300)
    return () => clearTimeout(timer)
  }, [words])

  return (
    <span className="typer">
      {text}
      <i className="caret" aria-hidden="true" />
    </span>
  )
}

/* ---------- Video que se reproduce solo cuando está en pantalla ---------- */
function Clip({ src, className = '', threshold = 0.4, fallback = null }) {
  const ref = useRef(null)
  const [failed, setFailed] = useState(false)
  const [calm] = useState(calmMotion)

  useEffect(() => {
    const el = ref.current
    if (!el || calm) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [calm, failed, threshold])

  if (failed) return fallback

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      controls={calm}
      onError={() => setFailed(true)}
    />
  )
}

/* ---------- Header con menú móvil ---------- */
function Header({ solid, active }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  return (
    <header className={`header ${solid || open ? 'is-solid' : ''}`}>
      <a href="#inicio" className="logo" aria-label="Creativa" onClick={() => setOpen(false)}>
        <Brand />
        <Asterisk className="logo-star" />
      </a>

      <nav className={`nav ${open ? 'open' : ''}`} aria-label="Principal">
        {nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={active === item.id ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a className="btn btn-small header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
        Escríbenos
      </a>

      <button
        className="menu-btn"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name={open ? 'close' : 'menu'} size={26} />
      </button>
    </header>
  )
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef(null)

  // Luz que sigue al mouse + movimiento suave (solo PC). Variables CSS, sin re-renders.
  useEffect(() => {
    const el = ref.current
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!el || !fine || calmMotion()) return

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--sx', `${e.clientX - r.left}px`)
      el.style.setProperty('--sy', `${e.clientY - r.top}px`)
      el.style.setProperty('--mx', ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3))
      el.style.setProperty('--my', ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const title = hero.title.map((t) => t.w).join(' ')

  return (
    <section id="inicio" className="hero" ref={ref}>
      <div className="glow glow-a" aria-hidden="true" />
      <div className="glow glow-b" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />

      <div className="hero-text">
        <p className="hero-eyebrow">
          <span aria-hidden="true" /> {hero.eyebrow}
        </p>
        <h1 aria-label={title}>
          <Words words={hero.title} />
        </h1>
        <p className="hero-lead">{hero.text}</p>
        <div className="actions">
          <a className="btn" href={whatsappUrl} target="_blank" rel="noreferrer">
            <Icon name="chat" size={20} /> {hero.cta}
          </a>
          <a className="btn btn-ghost" href="#servicios">
            {hero.secondary}
          </a>
        </div>
      </div>

      <div className="hero-art">
        <div className="frame">
          <Clip
            src={samples[0].src}
            className="frame-media"
            threshold={0.15}
            fallback={
              <div className="frame-fallback">
                <Asterisk className="spin" />
              </div>
            }
          />
        </div>

        {/* Mini chat de ejemplo */}
        <div className="float-card chat" aria-hidden="true">
          <p className="bubble bubble-in">{hero.chat.question}</p>
          <p className="bubble bubble-out">
            {hero.chat.answer} <span>✓✓</span>
          </p>
        </div>

        {/* Barra de idea: escribe sola y abre WhatsApp */}
        <a
          className="float-card prompt"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Escribir tu idea por WhatsApp"
        >
          <svg className="spark" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2zM19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15z" />
          </svg>
          <span className="prompt-text">
            {hero.prompt.start} <Typer words={hero.prompt.words} />
          </span>
          <span className="prompt-send">
            <Icon name="arrow" size={18} />
          </span>
        </a>
      </div>

      <a href="#servicios" className="scroll-cue" aria-label="Bajar">
        <span />
      </a>
    </section>
  )
}

/* ---------- Servicios: lista con precio, cada fila abre WhatsApp ---------- */
function Services() {
  return (
    <section id="servicios" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{servicesIntro.eyebrow}</p>
          <h2>{servicesIntro.title}</h2>
        </Reveal>

        <ul className="rows">
          {services.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 70}>
              <a className="row" href={wa(s.message)} target="_blank" rel="noreferrer">
                <span className="row-n">{s.n}</span>
                <span className="row-main">
                  <strong>{s.title}</strong>
                  <span>{s.text}</span>
                </span>
                <span className="row-price">{s.price}</span>
                <span className="row-go">
                  <Icon name="arrow" size={22} />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <p className="note">{servicesNote}</p>
      </div>
    </section>
  )
}

/* ---------- Muestras en video ---------- */
function Samples() {
  return (
    <section id="muestras" className="section section-alt">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{samplesIntro.eyebrow}</p>
          <h2>{samplesIntro.title}</h2>
        </Reveal>

        <div className="clips">
          {samples.map((s, i) => (
            <Reveal key={s.src} delay={i * 120} className="clip-card">
              <div className="clip-media">
                <Clip
                  src={s.src}
                  className="clip-video"
                  fallback={
                    <div className="frame-fallback">
                      <Asterisk className="spin" />
                    </div>
                  }
                />
              </div>
              <span className="clip-tag">{s.tag}</span>
              <h3>{s.title}</h3>
            </Reveal>
          ))}
        </div>

        <p className="note">{samplesNote}</p>
      </div>
    </section>
  )
}

/* ---------- Proceso ---------- */
function Process() {
  return (
    <section id="proceso" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{process.eyebrow}</p>
          <h2>{process.title}</h2>
        </Reveal>

        <ol className="steps">
          {process.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 120}>
              <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- Contacto: directo a WhatsApp, sin formularios ---------- */
function Contact() {
  const socials = business.socials.filter((s) => s.url)

  return (
    <section id="contacto" className="section contact">
      <Asterisk className="contact-star" />
      <div className="container">
        <Reveal>
          <h2 className="contact-title" aria-label="Hagamos algo Creativa.">
            <Words words={contact.title} />
          </h2>
          <p className="lead">{contact.text}</p>
          <div className="actions">
            <a className="btn btn-big" href={whatsappUrl} target="_blank" rel="noreferrer">
              <Icon name="chat" size={24} /> {contact.cta}
            </a>
          </div>

          {socials.length > 0 && (
            <ul className="socials">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <a href="#inicio" className="logo" aria-label="Creativa">
        <Brand />
        <Asterisk className="logo-star" />
      </a>
      <span>
        © {new Date().getFullYear()} Creativa · {business.city}
      </span>
      <a href="#inicio" className="to-top">
        Volver arriba ↑
      </a>
    </footer>
  )
}

/* ---------- App ---------- */
export default function App() {
  const [solid, setSolid] = useState(false)
  const [showFab, setShowFab] = useState(false)
  const [active, setActive] = useState('')

  // Barra de progreso, header sólido y botón flotante
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const y = window.scrollY
      document.documentElement.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0)
      setSolid(y > 40)
      setShowFab(y > 500)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Marca en el menú la sección que estás viendo
  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <Header solid={solid} active={active} />
      <main>
        <Hero />
        <Services />
        <Samples />
        <Process />
        <Contact />
      </main>
      <Footer />

      <a
        className={`fab ${showFab ? 'show' : ''}`}
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Escribir por WhatsApp"
        tabIndex={showFab ? 0 : -1}
      >
        <Icon name="chat" size={28} />
      </a>
    </>
  )
}