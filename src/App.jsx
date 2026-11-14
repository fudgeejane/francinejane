import { useEffect, useRef, useState } from 'react'
import {
  LuArrowLeft,
  LuArrowRight,
  LuArrowUpRight,
  LuGamepad2,
  LuGithub,
  LuHeart,
  LuLinkedin,
  LuMail,
  LuRotateCcw,
  LuSparkles,
  LuX,
} from 'react-icons/lu'
import './App.css'
import apploraImage from './assets/Applora.png'
import reviewHubImage from './assets/ReviewHub.png'
import facultyManagementImage from './assets/FacultyManagemenSystem.png'
import peerHiveImage from './assets/PeerHiv.png'

const profile = {
  name: 'Francine Jane',
  title: 'Full-Stack Web Developer',
  intro:
    'I’m Francine Jane, a web developer building responsive React applications and practical full-stack products for education and business.',
  email: 'francinejane.sd@gmail.com',
  github: 'https://github.com/fudgeejane',
  linkedin: 'https://www.linkedin.com/in/francine-jane-sto-domingo-680476319/',
}

const navigation = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'tools', label: 'Tools' },
  { id: 'blogs', label: 'Blogs' },
]

const experiences = [
  {
    period: 'Nov 2024 – Present',
    role: 'Freelance & Commission Software Developer',
    organization: 'Independent',
    description:
      'Help students develop systems for their research projects and review their research. Work with them to understand project requirements, build and refine system features, and provide support as their projects progress.',
    tags: ['Client collaboration', 'Software development', 'Maintenance'],
  },
  {
    period: 'Jun 2025 – Apr 2026',
    role: 'Software Developer Intern',
    organization: 'TCC — College of Computer Studies Department',
    description:
      'Developed a faculty management system for scheduling, curriculum management, and payables. Integrated frontend components with backend services and database functions, tested workflows, and delivered features to streamline department operations.',
    tags: ['React', 'Electron', 'Firebase'],
  },
]

const articles = []

const hangmanWords = [
  'DATABASE',
  'FRAMEWORK',
  'BACKEND',
  'FRONTEND',
  'ALGORITHM',
  'DEBUGGING',
  'DEPLOYMENT',
  'ENCRYPTION',
  'MIDDLEWARE',
  'REPOSITORY',
];

const keyboardRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

function chooseHangmanWord(previousWord) {
  const choices = hangmanWords.filter((candidate) => candidate !== previousWord)
  return choices[Math.floor(Math.random() * choices.length)]
}

const toolGroups = [
  {
    title: 'Languages',
    tools: ['JavaScript', 'TypeScript', 'Python', 'MySQL', 'Java', 'C#'],
  },
  {
    title: 'Frameworks',
    tools: ['React.js', 'Next.js', 'Vite', 'Express.js', 'Node.js'],
  },
  {
    title: 'Developer Tools',
    tools: [
      'Git',
      'GitHub',
      'Firebase',
      'Supabase',
      'MongoDB',
      'VS Code',
      'Postman',
      'Vercel',
      'shadcn/ui',
    ],
  },
  {
    title: 'Libraries & Services',
    tools: ['React Router', 'React Toast', 'GSAP', 'React Motion', 'Nodemailer', 'Axios', 'JWT', 'bcrypt'],
  },
]

const projects = [
  {
    number: '01',
    name: 'Applora',
    system:
      'A centralized job application tracking system that helps users organize and monitor applications in one place. It features an ATS resume analyzer and an AI-powered assistant chatbot.',
    solutions:
      'Evaluates resume compatibility and guides users throughout the job application process.',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT'],
    image: apploraImage,
    imageAlt: 'Screenshot of Applora, an application-tracking system with AI resume analysis.',
    demoUrl: 'https://applora-seven.vercel.app/',
  },
  {
    number: '02',
    name: 'ReviewHub',
    system:
      'An online review platform that gives students centralized access to review materials and resources for board examinations.',
    solutions:
      'Provides an organized learning environment, makes study materials more accessible, and simplifies exam preparation.',
    tags: ['React.js', 'Firebase', 'Responsive UI/UX'],
    image: reviewHubImage,
    imageAlt: 'Screenshot of ReviewHub, an online board-exam review platform.',
    demoUrl: 'https://crim-edge.vercel.app/',
  },
  {
    number: '03',
    name: 'Faculty Management System',
    system:
      'A desktop application for managing schedules, curricula, student records, grades, and payables in one system.',
    solutions:
      'Reduces manual administrative tasks, improves data organization, and makes academic processes more efficient.',
    tags: ['React.js', 'Electron', 'Firebase'],
    image: facultyManagementImage,
    imageAlt: 'Screenshot of a faculty management app for schedules, curricula, and payables.',
  },
  {
    number: '04',
    name: 'PeerHive',
    system:
      'A centralized student evaluation system connecting students, evaluators, and administrators.',
    solutions:
      'Automates evaluation submissions, enables real-time data updates, and reduces manual coordination and record management.',
    tags: ['React', 'Vite', 'Node.js', 'Firebase'],
    image: peerHiveImage,
    imageAlt: 'Screenshot of PeerHive, a platform for peer evaluations.',
    demoUrl: 'https://tcc-evaluation.web.app/',
  },
]

function SocialLinks({ onGameClick }) {
  return (
    <nav className="social-links" aria-label="Social profiles">
      <a href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer">
        <LuGithub aria-hidden="true" size={18} />
      </a>
      <a href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
        <LuLinkedin aria-hidden="true" size={18} />
      </a>
      <a href={`mailto:${profile.email}`} aria-label="Email">
        <LuMail aria-hidden="true" size={18} />
      </a>
      <button className="game-launch" type="button" aria-label="Open technology word game" onClick={onGameClick}>
        <LuGamepad2 aria-hidden="true" size={17} />
      </button>
    </nav>
  )
}

function Sidebar({ activeSection, isProjectsPage, onGameClick }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <header className="intro">
       
          <div className="intro-copy">
            <p className="eyebrow">Hello, I’m</p>
            <h1>{profile.name}</h1>
            <h2>{profile.title}</h2>
            <p className="intro-description">{profile.intro}</p>
          </div>
        </header>

        <nav className="side-nav" aria-label="Main navigation">
          {navigation.map((item, index) => {
            const href = isProjectsPage ? `/#${item.id}` : `#${item.id}`
            return (
              <a
                className={`nav-link ${!isProjectsPage && activeSection === item.id ? 'active' : ''}`}
                href={href}
                key={item.id}
                aria-current={!isProjectsPage && activeSection === item.id ? 'location' : undefined}
              >
                <span className="nav-index">0{index + 1}</span>
                <span className="nav-rule" />
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>

        <div className="sidebar-bottom">
          <SocialLinks onGameClick={onGameClick} />
        </div>
      </div>
    </aside>
  )
}

function HangmanGame({ onClose, previousWord, onWordChange }) {
  const [word, setWord] = useState(() => chooseHangmanWord(previousWord))
  const [guessedLetters, setGuessedLetters] = useState([])
  const lives = 5 - guessedLetters.filter((letter) => !word.includes(letter)).length
  const won = [...word].every((letter) => guessedLetters.includes(letter))
  const gameOver = lives === 0
  const finished = won || gameOver

  useEffect(() => {
    onWordChange(word)
  }, [word, onWordChange])

  function guessLetter(letter) {
    if (finished || guessedLetters.includes(letter)) return
    setGuessedLetters((current) => [...current, letter])
  }

  function playAgain() {
    setWord(chooseHangmanWord(word))
    setGuessedLetters([])
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      } else if (/^[a-z]$/i.test(event.key)) {
        guessLetter(event.key.toUpperCase())
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  return (
    <div className="game-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section
        className="game-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-title"
        aria-describedby="game-description"
      >
        <header className="game-header">
          <div>
            <p className="game-eyebrow">A little brain break</p>
            <h2 id="game-title">Tech word game</h2>
          </div>
          <button className="game-close" type="button" onClick={onClose} aria-label="Close game">
            <LuX aria-hidden="true" size={18} />
          </button>
        </header>

        <p className="game-description" id="game-description">
          Guess the word, one letter at a time. You have five lives.
        </p>

        <div className="game-lives" aria-label={`${lives} of 5 lives remaining`}>
          <span className="game-lives-label">LIVES</span>
          <div className="game-hearts" key={5 - lives} aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => (
              <span className={index < lives ? 'heart-active' : 'heart-inactive'} key={index}>
                <LuHeart aria-hidden="true" size={16} fill="currentColor" />
              </span>
            ))}
          </div>
          <span className="game-lives-count">{lives} / 5</span>
        </div>

        <div className={`game-word ${won ? 'word-complete' : ''}`} aria-label="Hidden word">
          {[...word].map((letter, index) => (
            <span className={`game-letter ${guessedLetters.includes(letter) ? 'letter-revealed' : ''}`} key={`${index}-${letter}`}>
              {guessedLetters.includes(letter) || gameOver ? letter : ''}
            </span>
          ))}
        </div>

        {finished ? (
          <div className={`game-result ${won ? 'result-win' : 'result-loss'}`} role="status">
            <p>{won ? 'Brilliant! You got it!' : 'Game over — the word was:'} {!won && <strong>{word}</strong>}</p>
            <button className="game-again" type="button" onClick={playAgain}>
              Play again <LuRotateCcw aria-hidden="true" size={14} />
            </button>
          </div>
        ) : (
          <>
            <p className="game-keyboard-label">Choose a letter</p>
            <div className="game-keyboard" aria-label="Letter keyboard">
              {keyboardRows.map((row) => (
                <div className="game-keyboard-row" key={row}>
                  {[...row].map((letter) => {
                    const guessed = guessedLetters.includes(letter)
                    const correct = guessed && word.includes(letter)
                    return (
                      <button
                        className={`game-key ${guessed ? (correct ? 'key-correct' : 'key-incorrect') : ''}`}
                        type="button"
                        key={letter}
                        disabled={guessed || finished}
                        onClick={() => guessLetter(letter)}
                        aria-label={`${letter}${guessed ? (correct ? ', correct' : ', incorrect') : ''}`}
                      >
                        {letter}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

function SectionHeading({ number, children }) {
  return (
    <div className="section-heading">
      <span className="section-number">{number}</span>
      <h2>{children}</h2>
      <span className="heading-rule" />
    </div>
  )
}

function AboutSection() {
  return (
    <section className="content-section about-section" id="about">
      <SectionHeading number="01">A little about me</SectionHeading>
      <div className="about-copy">
        <p>
          Hi! I'm <strong>Francine Jane M. Sto Domingo</strong>, a Web Developer with a degree in
          Bachelor of Science in Computer Science. I'm passionate about building modern, responsive,
          and user-friendly web applications. I mainly work with the MERN stack and Firebase, with a
          strong interest in front-end development, UI/UX design, and turning creative ideas into
          engaging digital experiences.
        </p>
        <p>
          I enjoy designing and implementing intuitive interfaces, creating seamless user experiences,
          and building functional solutions that bring ideas to life. I'm always open to learning new
          technologies and expanding my skills as a developer.
        </p>
        <p>
          Throughout my academic journey, I've received several recognitions, including
          <strong> Best in Web Development, Research Excellence Award, Digital Technology Excellence
          Award, and Gawad Tomas Claudio Award (2026)</strong>, reflecting my dedication to technology,
          creativity, and continuous learning.
        </p>
      </div>
      <div className="about-note">
        <span className="note-dot" />
        <p><strong>Have an idea in mind? Let's turn it into something amazing. Let's build something together!</strong></p>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section className="content-section" id="experience">
      <SectionHeading number="02">Experience & learning</SectionHeading>
      <p className="section-lead">
        Freelance development and hands-on software experience in higher education.
      </p>
      <div className="timeline">
        {experiences.map((item) => (
          <article className="experience-entry" key={item.role}>
            <p className="experience-period">{item.period}</p>
            <div className="experience-detail">
              <h3>{item.role}</h3>
              <p className="experience-org">{item.organization}</p>
              <p className="entry-description">{item.description}</p>
              <div className="tag-list">
                {item.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
            </div>
            <span className="timeline-marker" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  )
}

function ToolsSection() {
  return (
    <section className="content-section" id="tools">
      <SectionHeading number="04">Technologies & tools</SectionHeading>
      <p className="section-lead">
        Technologies I use to build interfaces, applications, and connected data workflows.
      </p>
      <div className="tool-groups">
        {toolGroups.map((group) => (
          <div className="tool-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="tool-grid">
              {group.tools.map((tool) => <span className="tool-card" key={tool}>{tool}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectVisual({ project }) {
  return (
    <div className="project-visual">
      <img
        className="project-image"
        src={project.image}
        alt={project.imageAlt}
        width="1200"
        height="675"
        loading="lazy"
      />
    </div>
  )
}

function ProjectCard({ project, featured = true }) {
  return (
    <article className="project-card">
      <ProjectVisual project={project} />
      <div className="project-card-body">
        <div className="project-meta"><span>{featured ? 'FEATURED PROJECT' : 'PROJECT'}</span><span>{project.number}</span></div>
        <h3>{project.name}</h3>
        <p>
          {project.system}{' '}
          {project.solutions}
        </p>
        <div className="tag-list" aria-label={`${project.name} technologies`}>
          {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        {(project.repositoryUrl || project.demoUrl) && (
          <div className="project-links">
            {project.repositoryUrl && (
              <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                {project.name} source code <LuArrowUpRight aria-hidden="true" size={15} />
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noreferrer">
                {project.name} live demo <LuArrowUpRight aria-hidden="true" size={15} />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

function ProjectsSection() {
  return (
    <section className="content-section" id="projects">
      <SectionHeading number="03">Selected projects</SectionHeading>
      <p className="section-lead">
        Showcasing the projects I've worked on and the solutions I've built.
      </p>
      <div className="projects-list">
        {projects.slice(0, 3).map((project) => <ProjectCard project={project} key={project.number} />)}
      </div>
      <a className="text-link view-all-link" href="/projects">
        View all projects <LuArrowRight aria-hidden="true" size={17} />
      </a>
    </section>
  )
}

function BlogsSection() {
  return (
    <section className="content-section blogs-section" id="blogs">
      <SectionHeading number="05">Blogs</SectionHeading>
      <p className="section-lead">
        A space for the things I learn, the ideas I’m exploring, and the occasional useful discovery.
      </p>
      {articles.length > 0 ? (
        <div className="article-list">
          {articles.map((article) => (
            <article className="article-card" key={article.title}>
              <span className="article-date">{article.date}</span>
              <div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <div className="tag-list">
                  {article.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                </div>
              </div>
              <a className="text-link" href={article.url}>Read article <LuArrowUpRight aria-hidden="true" size={15} /></a>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-articles">
          <span className="empty-mark" aria-hidden="true"><LuSparkles size={19} /></span>
          <div>
            <h3>Stories are taking shape.</h3>
            <p>There are no published articles just yet. Check back soon for notes from my learning journey.</p>
          </div>
        </div>
      )}
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>Open to meaningful collaborations.</span>
      <span>© 2026 {profile.name}. All rights reserved.</span>
    </footer>
  )
}

function ProjectsPage() {
  return (
    <div className="projects-page">
      <a className="back-link" href="/"><LuArrowLeft aria-hidden="true" size={17} /> Back to home</a>
      <p className="eyebrow">A closer look at my work</p>
      <h2 className="page-title">All projects<span className="accent-text">.</span></h2>
      <p className="page-intro">
        Software built to support learning, academic operations, and better evaluation workflows.
      </p>
      <div className="projects-list all-projects-list">
        {projects.map((project) => <ProjectCard project={project} featured={false} key={project.number} />)}
      </div>
      <Footer />
    </div>
  )
}

function CursorSpotlight() {
  const spotlightRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frameId = null
    let mouseX = 0
    let mouseY = 0

    const handlePointerMove = (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
      if (frameId !== null) return

      frameId = window.requestAnimationFrame(() => {
        spotlightRef.current?.style.setProperty('--mouse-x', `${mouseX}px`)
        spotlightRef.current?.style.setProperty('--mouse-y', `${mouseY}px`)
        frameId = null
      })
    }

    const syncPointerTracking = () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
        frameId = null
      }

      if (finePointer.matches && !reducedMotion.matches) {
        window.addEventListener('pointermove', handlePointerMove, { passive: true })
      }
    }

    syncPointerTracking()
    finePointer.addEventListener('change', syncPointerTracking)
    reducedMotion.addEventListener('change', syncPointerTracking)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      finePointer.removeEventListener('change', syncPointerTracking)
      reducedMotion.removeEventListener('change', syncPointerTracking)
      if (frameId !== null) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return <div ref={spotlightRef} className="cursor-spotlight" aria-hidden="true" />
}

function App({ pathname = typeof window === 'undefined' ? '/' : window.location.pathname }) {
  const isProjectsPage = pathname.replace(/\/+$/, '') === '/projects'
  const [activeSection, setActiveSection] = useState('about')
  const [isGameOpen, setIsGameOpen] = useState(false)
  const [lastGameWord, setLastGameWord] = useState(null)

  useEffect(() => {
    const pageUrl = `https://francinejane-jet.vercel.app${isProjectsPage ? '/projects' : '/'}`
    const title = isProjectsPage
      ? 'Projects | Francine Jane M. Sto Domingo'
      : 'Francine Jane M. Sto Domingo | Full-Stack Web Developer'
    const description = isProjectsPage
      ? 'Explore web and desktop applications built by Francine Jane M. Sto Domingo for learning, academic operations, and student evaluation.'
      : 'Francine Jane M. Sto Domingo is a full-stack web developer building responsive web applications with React, Node.js, and Firebase.'

    document.querySelector('link[rel="canonical"]')?.setAttribute('href', pageUrl)
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', pageUrl)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description)
  }, [isProjectsPage])

  useEffect(() => {
    if (isProjectsPage) return undefined

    const scrollContainer = document.querySelector('.main-scroll')
    const desktop = window.matchMedia('(min-width: 861px)')
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section) => section)

    const updateActiveSection = () => {
      const isDesktop = desktop.matches
      const rootTop = isDesktop ? scrollContainer.getBoundingClientRect().top : 0
      const rootHeight = isDesktop ? scrollContainer.clientHeight : window.innerHeight
      const activationLine = rootTop + rootHeight * 0.35
      let activeId = sections[0]?.id

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= activationLine) activeId = section.id
      })

      const atBottom = isDesktop
        ? scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 1
        : window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1

      setActiveSection(atBottom ? sections[sections.length - 1]?.id : activeId)
    }

    scrollContainer.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    desktop.addEventListener('change', updateActiveSection)
    updateActiveSection()

    return () => {
      scrollContainer.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
      desktop.removeEventListener('change', updateActiveSection)
    }
  }, [isProjectsPage])

  function handleNavigation(event, id) {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(id)
  }

  return (
    <div className="app-frame">
      <CursorSpotlight />
      <Sidebar
        activeSection={activeSection}
        isProjectsPage={isProjectsPage}
        onGameClick={() => setIsGameOpen(true)}
      />
      <nav className="mobile-nav" aria-label="Section navigation">
        {navigation.map((item) => (
          <a
            href={isProjectsPage ? `/#${item.id}` : `#${item.id}`}
            className={!isProjectsPage && activeSection === item.id ? 'active' : ''}
            key={item.id}
            onClick={isProjectsPage ? undefined : (event) => handleNavigation(event, item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <main className="main-scroll">
        {isProjectsPage ? (
          <div className="content-inner projects-content"><ProjectsPage /></div>
        ) : (
          <div className="content-inner">
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <ToolsSection />
            <BlogsSection />
            <Footer />
          </div>
        )}
      </main>
      {isGameOpen && (
        <HangmanGame
          onClose={() => setIsGameOpen(false)}
          previousWord={lastGameWord}
          onWordChange={setLastGameWord}
        />
      )}
    </div>
  )
}

export default App
