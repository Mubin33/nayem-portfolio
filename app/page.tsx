"use client";

import React, { useState, useEffect } from "react";
import ArtisanTerminal from "./components/ArtisanTerminal";
import PerformanceOptimizer from "./components/PerformanceOptimizer";

export default function Home() {
  // Roles for Typing effect
  const roles = [
    "Laravel Specialist",
    "Backend Architect",
    "PHP Full-Stack Engineer",
    "API & Database Optimizer",
  ];
  const [currentRoleIdx, setCurrentRoleIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roles[currentRoleIdx];

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          // Pause at end
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentRoleIdx((prev) => (prev + 1) % roles.length);
          setTypingSpeed(100);
          return;
        }
      }

      setTypingSpeed(isDeleting ? 50 : 100);
      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIdx, typingSpeed]);

  // Project expansion state
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  // Mobile menu open state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form submission simulated state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 4000);
  };

  // Scroll Reveal IntersectionObserver hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "ValrPro Veteran Admin Portal",
      description:
        "A highly secure portal handling automated VA disability claims, task allocation queues, and analytics tracking.",
      longDescription:
        "Designed and implemented the core REST API handling complex document ingestion, user authentication, and rule-based workflow pipelines. Leveraged Laravel Queues with Redis for offloading PDF generation and notification dispatches, reducing API response times by 84%. Built full-featured reporting dashboards with Next.js frontend binding.",
      tech: ["Laravel 11", "PostgreSQL", "Redis Queues", "Next.js", "Tailwind CSS"],
      stats: "84% faster PDF exports | 10k+ active cases processed",
      github: "#",
      demo: "#",
    },
    {
      id: 2,
      title: "Multi-Tenant SaaS E-Commerce Engine",
      description:
        "High-performance e-commerce engine supporting subdomains, custom checkout flows, and Stripe cashier integrations.",
      longDescription:
        "Developed a custom single-database multi-tenant routing engine in Laravel. Overhauled the Eloquent model scoping to isolate merchant data efficiently. Engineered dynamic checkout pipeline using Laravel Service Providers and Spatie packages, allowing modular discount codes, taxation rules, and automatic webhooks syncing with Stripe.",
      tech: ["PHP 8.2", "Laravel Nova", "Stripe API", "MySQL", "Docker"],
      stats: "0.2ms tenant lookup latency | 25+ merchants onboarded",
      github: "#",
      demo: "#",
    },
    {
      id: 3,
      title: "Real-Time WebSocket Chat Infrastructure",
      description:
        "Low-latency messaging server optimized for real-time collaboration with status presence and message caching.",
      longDescription:
        "Architected real-time communications backend combining Laravel WebSockets with custom Redis pub/sub. Programmed optimized database indexing schemas for instant historical message retrieval. Built presence channels to keep track of user online states, handling thousands of concurrent open socket connections securely.",
      tech: ["Laravel WebSockets", "Redis Pub/Sub", "React", "MySQL Indexing", "Nginx"],
      stats: "< 15ms message delivery latency | 2,500 active socket connections",
      github: "#",
      demo: "#",
    },
  ];

  return (
    <div className="flex-1 dot-grid relative overflow-hidden">
      {/* Background Glowing Spotlights */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[130px] pointer-events-none bg-spotlight-top opacity-75 -z-10"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full blur-[130px] pointer-events-none bg-spotlight-bottom opacity-55 -z-10" style={{ animationDelay: '-3s' }}></div>
      <div className="fixed bottom-[20%] right-[-15%] w-[40vw] h-[40vw] rounded-full blur-[150px] pointer-events-none bg-spotlight-cyan opacity-40 -z-10" style={{ animationDelay: '-6s' }}></div>
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6">
          <a href="#home" className="flex items-center gap-2 group">
            <span className="font-mono text-red-500 font-bold text-lg leading-none select-none">&lt;</span>
            <span className="font-bold text-white tracking-wider group-hover:text-shine transition duration-300">NAYEM.DEV</span>
            <span className="font-mono text-red-500 font-bold text-lg leading-none select-none">/&gt;</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-red-500 transition duration-300">About</a>
            <a href="#skills" className="hover:text-red-500 transition duration-300">Skills</a>
            <a href="#projects" className="hover:text-red-500 transition duration-300">Projects</a>
            <a href="#labs" className="hover:text-red-500 transition duration-300">Interactive Labs</a>
            <a href="#experience" className="hover:text-red-500 transition duration-300">Experience</a>
            <a href="#contact" className="hover:text-red-500 transition duration-300">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden sm:inline-block px-4 py-2 text-xs font-semibold rounded-full border border-red-500/30 text-white bg-red-950/20 hover:bg-red-500 hover:border-red-500 transition duration-300 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
            >
              Hire Me
            </a>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded text-zinc-400 hover:text-white transition duration-300 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-900 bg-black/95 backdrop-blur-lg animate-slide-down">
            <nav className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium text-zinc-400">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">About</a>
              <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Skills</a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Projects</a>
              <a href="#labs" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Interactive Labs</a>
              <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Experience</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Contact</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-center text-xs font-semibold rounded bg-red-600 text-white hover:bg-red-500 transition">Hire Me</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="reveal revealed relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left copy column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-950/80 bg-red-950/20 text-red-400 text-xs font-mono">
            {/* <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span> */}
            Available for PHP Laravel Contracts & Core Backend Architecting
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
            Crafting Scalable {' '}
            <span className="block mt-2 text-glow text-shine">
              {currentText}
              <span className="inline-block w-1.5 md:w-2 h-8 md:h-12 bg-red-500 ml-1 animate-pulse font-normal"></span>
            </span>
          </h1>

          <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Hi, I&apos;m Nayem. I engineer backend systems that never sleep. Leveraging Laravel ecosystems, PHP 8.x optimizations, Swoole concurrency, and robust databases to convert complex software specifications into smooth, blazing-fast web platforms.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg text-sm font-semibold btn-gradient text-white"
            >
              Explore My Projects
            </a>
            <a
              href="#labs"
              className="px-6 py-3 rounded-lg text-sm font-semibold border border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:border-red-500/40 hover:text-white transition duration-300"
            >
              Interactive Console Demo
            </a>
          </div>
        </div>

        {/* Right Animation Visual column */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          {/* Glowing blur ball behind */}
          <div className="absolute w-72 h-72 bg-red-900/10 rounded-full blur-[80px]"></div>

          {/* Interactive Laravel flow visual */}
          <div className="w-full max-w-md p-6 glass-panel border border-zinc-900 rounded-2xl relative select-none">
            <div className="text-xs font-mono text-zinc-500 mb-4 flex justify-between items-center">
              <span>LARAVEL_LIFECYCLE.svg</span>
              <span className="text-red-500/50 animate-pulse">● STABLE</span>
            </div>

            <svg viewBox="0 0 460 320" className="w-full h-auto text-zinc-700">
              {/* Nodes definitions */}
              <g className="font-mono text-[9.5px] fill-zinc-400">
                {/* Horizontal flow lines */}
                <path d="M 50 70 H 410 V 170 H 50 V 270 H 410" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 5" />
                
                {/* Custom animated flow path */}
                <path d="M 50 70 H 410 V 170 H 50 V 270 H 410" fill="none" strokeWidth="1.8" strokeDasharray="40 220" strokeDashoffset="0" className="active-flow-path" />

                {/* Row 1 Nodes & Labels */}
                <circle cx="50" cy="70" r="6" fill="#0d0d0d" stroke="#ef4444" strokeWidth="2" />
                <text x="70" y="52" fill="#ffffff" textAnchor="start" className="font-semibold">HTTP Request</text>

                <circle cx="230" cy="70" r="6" fill="#0d0d0d" stroke="#3b82f6" strokeWidth="2" />
                <text x="230" y="52" textAnchor="middle">Routing Engine</text>

                <circle cx="410" cy="70" r="6" fill="#0d0d0d" stroke="#a855f7" strokeWidth="2" />
                <text x="390" y="52" textAnchor="end">Middleware auth</text>

                {/* Row 2 Nodes & Labels */}
                <circle cx="410" cy="170" r="6" fill="#0d0d0d" stroke="#f59e0b" strokeWidth="2" />
                <text x="390" y="152" textAnchor="end">Controller dispatch</text>

                <circle cx="230" cy="170" r="6" fill="#0d0d0d" stroke="#10b981" strokeWidth="2" />
                <text x="230" y="152" textAnchor="middle">Eloquent Model</text>

                <circle cx="50" cy="170" r="6" fill="#0d0d0d" stroke="#06b6d4" strokeWidth="2" />
                <text x="70" y="152" textAnchor="start">Database Cache</text>

                {/* Row 3 Nodes & Labels */}
                <circle cx="50" cy="270" r="6" fill="#0d0d0d" stroke="#d946ef" strokeWidth="2" />
                <text x="70" y="252" textAnchor="start">Service Provider</text>

                <circle cx="230" cy="270" r="6" fill="#0d0d0d" stroke="#14b8a6" strokeWidth="2" />
                <text x="230" y="252" textAnchor="middle">Blade/JSON view</text>

                <circle cx="410" cy="270" r="6" fill="#0d0d0d" stroke="#ef4444" strokeWidth="2" />
                <text x="390" y="252" fill="#ffffff" textAnchor="end" className="font-semibold">Response Out</text>
              </g>
            </svg>

            <div className="mt-4 flex gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono">kernel.php</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono">web.php</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono">DatabaseSeeder.php</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="reveal relative z-10 border-y border-zinc-900 bg-zinc-950/40 py-10">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-extrabold text-glow text-shine">4+</div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest mt-2">Years Work Experience</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-glow text-shine">35+</div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest mt-2">Projects Completed</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-glow text-shine">150K+</div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest mt-2">Lines of PHP/JS Code</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-glow text-shine">99%</div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest mt-2">Client Satisfaction</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="reveal mx-auto max-w-5xl px-6 py-20 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold tracking-tight text-white uppercase text-red-500">Core Developer Philosophy</h2>
          <p className="text-zinc-400 text-sm max-w-lg mx-auto">
            I don&apos;t just write PHP scripts. I solve bottlenecks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-3 hover:border-red-900/40 transition duration-300">
            <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
              ⚡
            </div>
            <h3 className="text-base font-bold text-white">Database Optimization</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Database calls are almost always the biggest bottleneck. I design strict third-normal-form relational databases, write clean database indexing schemas, and use Laravel Eloquent eager-loading to minimize database lookups.
            </p>
          </div>

          <div className="p-6 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-3 hover:border-red-900/40 transition duration-300">
            <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
              🛠️
            </div>
            <h3 className="text-base font-bold text-white">Robust Architecture</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Clean coding practices conforming to SOLID design patterns, Composer-driven dependencies structure, customized Service Providers, repository patterns, and granular test coverage to facilitate long-term maintenance.
            </p>
          </div>

          <div className="p-6 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-3 hover:border-red-900/40 transition duration-300">
            <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
              🚀
            </div>
            <h3 className="text-base font-bold text-white">Swoole & Concurrency</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Accelerating applications to native performance with Laravel Octane running on Swoole or RoadRunner. Skipping standard request bootstraps, keeping singletons in memory, and resolving requests in milliseconds.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Skill Grid */}
      <section id="skills" className="reveal relative z-10 mx-auto max-w-7xl px-6 py-20 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white">Advanced Technical Matrix</h2>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            Tools, libraries, and frameworks I use on a daily basis to build production systems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="glass-panel-red gradient-border-glow p-6 rounded-xl space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-zinc-800 pb-2 flex justify-between items-center">
              <span>Laravel Ecosystem</span>
              <span className="text-xs text-red-500 font-mono">Expert</span>
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400 font-mono">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                Eloquent ORM
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                Service Providers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                Artisan Console & CLI
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                Queues & Job Workers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                Filament Admin Panels
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                Laravel Sanctum / Passport
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="glass-panel-red gradient-border-glow p-6 rounded-xl space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-zinc-800 pb-2 flex justify-between items-center">
              <span>Languages & SQL</span>
              <span className="text-xs text-red-500 font-mono">Advanced</span>
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400 font-mono">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                PHP 8.2 / 8.3
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                MySQL & PostgreSQL
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                RESTful API Design
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                GraphQL API Schema
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                OOP Design Patterns
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                Composer Dependency Mgr
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="glass-panel-red gradient-border-glow p-6 rounded-xl space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-zinc-800 pb-2 flex justify-between items-center">
              <span>DevOps & Latency</span>
              <span className="text-xs text-red-500 font-mono">Intermediate</span>
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400 font-mono">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                Redis Cache Systems
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                Docker Containers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                Laravel Octane (Swoole)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                Git versioning & Flow
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                GitHub Actions CI/CD
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                Nginx Config & Setup
              </li>
            </ul>
          </div>

          {/* Card 4 */}
          <div className="glass-panel-red gradient-border-glow p-6 rounded-xl space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-zinc-800 pb-2 flex justify-between items-center">
              <span>Frontend Binding</span>
              <span className="text-xs text-red-500 font-mono">Full-Stack</span>
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400 font-mono">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                React & TSX
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                Next.js App Router
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                Tailwind CSS
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                Livewire & Alpine.js
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                TypeScript
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full pulsing-bullet"></span>
                Vite Bundler setup
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="reveal relative z-10 mx-auto max-w-7xl px-6 py-20 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white">Production Case Studies</h2>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            Click on any project to view architectural implementation details and optimization achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {projects.map((project, idx) => {
            const isExpanded = expandedProject === idx;
            return (
              <div
                key={project.id}
                className="bg-[#090909] border border-zinc-900 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-500/30"
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-400 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="text-sm text-zinc-400">{project.description}</p>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right hidden sm:block">
                      <span className="text-xs font-mono text-zinc-500 uppercase block">OUTCOME</span>
                      <span className="text-xs font-mono font-bold text-shine">{project.stats}</span>
                    </div>

                    <button
                      onClick={() => setExpandedProject(isExpanded ? null : idx)}
                      className="px-4 py-2 rounded text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700 transition duration-200"
                    >
                      {isExpanded ? "Hide Architecture" : "View Architecture ➜"}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-zinc-900 bg-black/60 px-6 py-6 md:px-8 md:py-8 space-y-6 text-sm text-zinc-300">
                    <div className="space-y-2">
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider text-red-500">
                        Detailed Engineering Log
                      </h4>
                      <p className="leading-relaxed text-zinc-400">{project.longDescription}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="bg-zinc-950/80 p-3.5 rounded border border-zinc-900">
                        <span className="text-zinc-500 block mb-1">METRICS & SCALING:</span>
                        <span className="text-emerald-400 font-bold">{project.stats}</span>
                      </div>
                      <div className="bg-zinc-950/80 p-3.5 rounded border border-zinc-900 flex justify-between items-center">
                        <div>
                          <span className="text-zinc-500 block mb-1">CODE ACCESSIBILITY:</span>
                          <span className="text-zinc-300 font-bold">Confidential Internal Repository</span>
                        </div>
                        <span className="text-red-500 text-lg">🔒</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Laser Divider */}
      <div className="laser-divider"></div>

      {/* Interactive Labs (Artisan & Optimizer widgets) */}
      <section id="labs" className="reveal relative z-10 mx-auto max-w-7xl px-6 py-20 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-950/80 bg-red-950/20 text-red-400 text-xs font-mono">
            🎛️ Sandbox Labs
          </div>
          <h2 className="text-3xl font-extrabold text-white">Interactive Laravel Sandbox</h2>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            Test my simulated automation capabilities. Compile caches, optimize queries, and run mock shell scripts below.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          <ArtisanTerminal />
          <PerformanceOptimizer />
        </div>
      </section>

      {/* Laser Divider */}
      <div className="laser-divider"></div>

      {/* Experience Timeline */}
      <section id="experience" className="reveal relative z-10 mx-auto max-w-5xl px-6 py-20 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white">Professional Trajectory</h2>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            My career timeline showcasing backend specialization roles.
          </p>
        </div>

        <div className="relative border-l border-red-500/25 pl-6 ml-4 space-y-12">
          {/* Job 1 */}
          <div className="relative">
            {/* Glowing active red point */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-red-500 border-4 border-black animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
            <div className="space-y-2">
              <span className="text-xs font-mono text-red-500 font-semibold uppercase">2024 - PRESENT</span>
              <h3 className="text-lg font-bold text-white">Lead Laravel & Full-Stack Architect</h3>
              <h4 className="text-xs text-zinc-400">ValrPro Admin Portal</h4>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl">
                Engineering backend core workflows using Laravel, PostgreSQL, and custom job pipelines. Responsible for database optimization, caching logic, and integrating client dashboard modules on Next.js. Lead technical reviews on scalability barriers.
              </p>
            </div>
          </div>

          {/* Job 2 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-zinc-700 border-4 border-black"></div>
            <div className="space-y-2">
              <span className="text-xs font-mono text-zinc-500 uppercase">2022 - 2024</span>
              <h3 className="text-lg font-bold text-white">Backend Engineer</h3>
              <h4 className="text-xs text-zinc-400">DevCorp Solutions</h4>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl">
                Architected multi-tenant architectures, decoupled complex monolithic backends into specialized REST APIs, managed job queues executing millions of daily database operations, and configured Redis messaging hubs.
              </p>
            </div>
          </div>

          {/* Job 3 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-zinc-700 border-4 border-black"></div>
            <div className="space-y-2">
              <span className="text-xs font-mono text-zinc-500 uppercase">2020 - 2022</span>
              <h3 className="text-lg font-bold text-white">PHP Laravel Specialist</h3>
              <h4 className="text-xs text-zinc-400">Independent Freelancer</h4>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl">
                Customized bespoke CRM/ERP systems, optimized database queries for scaling e-commerce platforms, developed API bindings for payment gateways, and wrote robust packages for Laravel frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Laser Divider */}
      <div className="laser-divider"></div>

      {/* Contact Section */}
      <section id="contact" className="reveal relative z-10 mx-auto max-w-7xl px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left side text/info */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Initiate a Project</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Need a scalable backend database designed? Got a slow Laravel codebase that needs emergency optimization? Or looking to bring a SaaS dashboard to life? Shoot me a message and I&apos;ll check your system requirements.
          </p>

          <div className="space-y-4 text-sm font-mono text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="text-red-500">✉</span>
              <a href="mailto:mubin.nayem.dev@gmail.com" className="hover:text-red-400 transition">mubin.nayem.dev@gmail.com</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-red-500">📍</span>
              <span>Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-red-500">🕒</span>
              <span>GMT+6 Timezone</span>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <a href="#" className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-red-500 transition duration-300">
              GH
            </a>
            <a href="#" className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-red-500 transition duration-300">
              LN
            </a>
            <a href="#" className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-red-500 transition duration-300">
              TW
            </a>
          </div>
        </div>

        {/* Right side form */}
        <div className="lg:col-span-7 bg-[#090909] border border-zinc-900 rounded-xl p-6 md:p-8 relative">
          {formSubmitted ? (
            <div className="h-[300px] flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl font-bold">
                ✓
              </div>
              <h3 className="text-lg font-bold text-white">Transmission Successful</h3>
              <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                Thank you. Your project request packet has been received by my server queue. I will follow up via email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-mono text-zinc-400">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-mono text-zinc-400">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono text-zinc-400">Message / Core Requirements</label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 rounded bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200 resize-none"
                  placeholder="Describe your tech stack, goals, and database optimization needs..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded text-sm font-semibold btn-gradient text-white cursor-pointer"
              >
                Send Request Packet
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-950 bg-black py-8 text-center text-xs text-zinc-600 font-mono">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Nayem Islam. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Powered by Laravel Octane</span>
            <span className="text-red-500">●</span>
            <span>Tailwind v4</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
