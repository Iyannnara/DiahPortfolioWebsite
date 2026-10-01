import { useEffect, useRef, useState } from "react"

const projects = [
  {
    number: "01",
    title: "Building with Tech",
    type: "Software engineering journey",
    year: "NOW",
    image: "/images/diah-4.jpeg",
    className: "project--wide",
  },
  {
    number: "02",
    title: "Behind the Lens",
    type: "Photography & observation",
    year: "LIFE",
    image: "/images/diah-1.jpeg",
    className: "project--tall",
  },
  {
    number: "03",
    title: "Beyond the Screen",
    type: "Hiking, curiosity & discovery",
    year: "EXPLORE",
    image: "/images/diah-8.jpeg",
    className: "project--tall",
  },
]

const disciplines = [
  ["Software development", "Turning logic into useful digital solutions"],
  ["Web development", "Responsive, thoughtful experiences for the web"],
  ["Mobile development", "Exploring products made for everyday life"],
  ["UI / UX design", "Pairing functional systems with clear interfaces"],
  ["Quality assurance", "Caring about details that make software reliable"],
]

const experience = [
  ["PRESENT", "Software Engineering", "Applied Software Engineering student"],
  ["BEFORE", "SMK Negeri 3 Singaraja", "Information technology foundation"],
  [
    "SINCE EARLY",
    "A lasting curiosity",
    "Exploring technology since childhood",
  ],
]

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow arrow--diagonal" : "arrow"}
      viewBox="0 0 24 24"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState("")
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const setClock = () =>
      setTime(
        new Intl.DateTimeFormat("en", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Makassar",
        }).format(new Date()),
      )
    setClock()
    const timer = window.setInterval(setClock, 30000)

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible")
        }),
      { threshold: 0.12 },
    )
    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((element) => observer.observe(element))

    const moveCursor = (event: PointerEvent) => {
      cursorRef.current?.style.setProperty("--x", `${event.clientX}px`)
      cursorRef.current?.style.setProperty("--y", `${event.clientY}px`)
    }
    window.addEventListener("pointermove", moveCursor)
    return () => {
      window.clearInterval(timer)
      observer.disconnect()
      window.removeEventListener("pointermove", moveCursor)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <div className="cursor-glow" ref={cursorRef} aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Diah Permata, home">
          DP<span className="accent">.</span>
        </a>
        <div className="header-meta">
          <span>SINGARAJA, BALI</span>
          <span>{time} WITA</span>
        </div>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span>MENU</span>
          <i />
          <i />
        </button>
        <nav className={menuOpen ? "nav nav--open" : "nav"}>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#work" onClick={closeMenu}>
            Gallery
          </a>
          <a href="#journey" onClick={closeMenu}>
            Journey
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-orbit" aria-hidden="true">
          <img src="/images/diah-7.jpeg" alt="" />
          <div className="orb orb--one" />
          <div className="orb orb--two" />
        </div>
        <p className="eyebrow hero-eyebrow">
          <span />
          SOFTWARE ENGINEERING STUDENT — 2026
        </p>
        <div
          className="hero-title"
          aria-label="Diah Permata, Software Engineering Student"
        >
          <div className="title-line">
            {"DIAH".split("").map((letter, index) => (
              <span style={{ animationDelay: `${index * 70}ms` }} key={index}>
                {letter}
              </span>
            ))}
          </div>
          <div className="title-line title-line--italic">
            {"PERMATA".split("").map((letter, index) => (
              <span
                style={{ animationDelay: `${280 + index * 70}ms` }}
                key={index}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
        <div className="hero-bottom">
          <p>
            Curious about technology, design, and
            <br />
            <em>building ideas that feel useful.</em>
          </p>
          <a className="scroll-link" href="#about">
            <span>SCROLL TO EXPLORE</span>
            <Arrow />
          </a>
        </div>
        <div className="hero-index">01 — 06</div>
      </section>

      <section className="manifesto section" id="about">
        <div className="section-label" data-reveal>
          <span>01</span>
          <p>MANIFESTO</p>
        </div>
        <div className="manifesto-content">
          <p className="manifesto-lead" data-reveal>
            I’ve been drawn to the world of technology since childhood.
          </p>
          <p className="manifesto-statement" data-reveal>
            Now I’m learning to turn that curiosity into <em>software</em> that
            looks thoughtful, works clearly, and helps people.
          </p>
          <div className="manifesto-note" data-reveal>
            <span className="accent-dot" />
            <p>
              I’m Diah Permata, a student of Applied Software Engineering from
              Singaraja. I enjoy photography, hiking, reading, games, swimming,
              and discovering new things.
            </p>
          </div>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="section-heading" data-reveal>
          <div className="section-label">
            <span>02</span>
            <p>SELECTED MOMENTS</p>
          </div>
          <p className="heading-aside">
            A few frames from technology,
            <br />
            creativity, and life beyond the screen.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <a
              href={project.image}
              target="_blank"
              rel="noreferrer"
              className={`project ${project.className}`}
              key={project.title}
              data-reveal
            >
              <div className="project-image">
                <img
                  src={project.image}
                  alt={`${project.title} — a moment from Diah Permata's journey`}
                />
                <div className="project-view">
                  VIEW FRAME <Arrow diagonal />
                </div>
              </div>
              <div className="project-meta">
                <span>{project.number}</span>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.type}</p>
                </div>
                <span>{project.year}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="toolkit section">
        <div className="section-label" data-reveal>
          <span>03</span>
          <p>ASPIRATIONS</p>
        </div>
        <div className="toolkit-header" data-reveal>
          <h2>
            Learning with
            <br />
            <em>intention.</em>
          </h2>
          <p>
            I’m building a broad foundation across software, web, mobile, and
            design — always open to learning something new and unexpected.
          </p>
        </div>
        <div className="discipline-list">
          {disciplines.map(([title, description], index) => (
            <div className="discipline" key={title} data-reveal>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="discipline-icon">↗</div>
            </div>
          ))}
        </div>
      </section>

      <section className="journey section" id="journey">
        <div className="section-label" data-reveal>
          <span>04</span>
          <p>JOURNEY</p>
        </div>
        <div className="journey-layout">
          <h2 data-reveal>
            Still learning.
            <br />
            <em>Always curious.</em>
          </h2>
          <div className="timeline">
            {experience.map(([year, company, role]) => (
              <div className="timeline-row" key={year} data-reveal>
                <span>{year}</span>
                <strong>{company}</strong>
                <p>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="contact section" id="contact">
        <div className="contact-top">
          <div className="section-label" data-reveal>
            <span>05</span>
            <p>CONTACT</p>
          </div>
          <p data-reveal>LET’S CONNECT</p>
        </div>
        <a
          className="contact-cta"
          href="https://www.linkedin.com/in/i-gusti-ayu-diah-permata-sukmahartawan-2b3442425"
          target="_blank"
          rel="noreferrer"
          data-reveal
        >
          <span>Say hello,</span>
          <em>let’s connect.</em>
          <div className="cta-arrow">
            <Arrow diagonal />
          </div>
        </a>
        <div className="footer-bottom">
          <p>© 2026 DIAH PERMATA</p>
          <div>
            <a
              href="https://www.linkedin.com/in/i-gusti-ayu-diah-permata-sukmahartawan-2b3442425"
              target="_blank"
              rel="noreferrer"
            >
              LINKEDIN
            </a>
            <a
              href="https://www.instagram.com/iga.diah_permata"
              target="_blank"
              rel="noreferrer"
            >
              INSTAGRAM
            </a>
            <a
              href="https://www.tiktok.com/@diahpermata._1012"
              target="_blank"
              rel="noreferrer"
            >
              TIKTOK
            </a>
          </div>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  )
}
