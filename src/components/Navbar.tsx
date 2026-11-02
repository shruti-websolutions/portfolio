import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useScroll } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
interface NavbarProps {
  onOpenModal?: (type: string) => void;
  onOpenApply?: () => void;
}

/** "Contact" is the Let's Talk button, so it isn't repeated in the link list */
const navLinks = [
  { label: 'Home', targetId: 'home' },
  { label: 'About', targetId: 'about' },
  { label: 'Services', targetId: 'services' },
  { label: 'Projects', targetId: 'projects' },
  { label: 'Experience', targetId: 'experience' },
];

/** Every section in page order, used to work out which one is on screen */
const sectionIds = [...navLinks.map((link) => link.targetId), 'contact'];

/** Height of the bar once it has shrunk on scroll. Sections stop just below it. */
const NAV_OFFSET = 68;

/** Same side padding as every section so the logo and button line up with the content */
const sidePadding = 'px-5 sm:px-10 lg:px-16 xl:px-24 2xl:px-32';

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();

  // Work out which section is on screen
  useEffect(() => {
    const update = () => {
      setIsScrolled(window.scrollY > 20);

      // At the very bottom the last section can be too short to reach the top of the screen
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActiveSection('contact');
        return;
      }

      const position = window.scrollY + NAV_OFFSET + 48;
      let current = 'home';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= position) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Close the mobile menu with Escape or by tapping outside the header
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, { passive: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (targetId: string) => {
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleNavClick = (targetId: string) => {
    scrollToSection(targetId);
    setMobileMenuOpen(false);
  };

  const isContactActive = activeSection === 'contact';

  return (
    <MotionConfig reducedMotion="user">
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-in-out ${isScrolled || mobileMenuOpen
            ? 'border-b border-white/10 bg-[#000039]/80 py-3 shadow-lg shadow-black/20 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent py-5 sm:py-6'
          }`}
      >
        <div className={`flex min-h-[44px] items-center justify-between gap-4 ${sidePadding}`}>
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="group flex cursor-pointer items-center gap-3 rounded-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB]"
            aria-label="Shruti Gupta, scroll to top"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#64CEFB] to-sky-400 text-sm font-bold text-slate-900 shadow-lg shadow-[#64CEFB]/20 transition-transform duration-200 group-hover:scale-105">
              SG
            </span>
            <span className="hidden text-base font-semibold tracking-tight text-white transition-colors group-hover:text-[#64CEFB] sm:block">
              Shruti Gupta
            </span>
          </button>

          {/* Desktop links */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] p-1.5 backdrop-blur-md lg:flex"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.targetId;
              return (
                <button
                  key={link.targetId}
                  type="button"
                  onClick={() => handleNavClick(link.targetId)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`cursor-pointer rounded-full px-4 py-1.5 text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB] ${isActive
                      ? 'bg-[#64CEFB]/15 font-semibold text-white'
                      : 'font-medium text-white/70 hover:bg-white/[0.06] hover:text-white'
                    }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex">
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              aria-current={isContactActive ? 'location' : undefined}
              className={`group inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#64CEFB] to-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[#64CEFB]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#000039] ${isContactActive ? 'shadow-[#64CEFB]/40' : 'shadow-[#64CEFB]/20'
                }`}
            >
              Let’s talk
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white/85 transition-colors hover:border-[#64CEFB]/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={`absolute inset-x-0 top-full border-b border-white/10 bg-[#000039]/95 pb-6 pt-3 shadow-2xl shadow-black/30 backdrop-blur-xl lg:hidden ${sidePadding}`}
            >
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.targetId;
                  return (
                    <button
                      key={link.targetId}
                      type="button"
                      onClick={() => handleNavClick(link.targetId)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-left text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB] ${isActive
                          ? 'bg-[#64CEFB]/15 font-semibold text-white'
                          : 'font-medium text-white/80 hover:bg-white/[0.06] hover:text-white'
                        }`}
                    >
                      {link.label}
                      <ArrowRight
                        aria-hidden="true"
                        className={`h-4 w-4 ${isActive ? 'text-[#64CEFB]' : 'text-white/40'}`}
                      />
                    </button>
                  );
                })}
              </nav>

              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#64CEFB] to-sky-400 px-6 py-3.5 text-base font-semibold text-slate-900 shadow-lg shadow-[#64CEFB]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Let’s talk
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reading progress line along the bottom edge of the bar */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="absolute -bottom-px left-0 h-[2px] w-full origin-left bg-gradient-to-r from-[#64CEFB] to-sky-400"
        />
      </header>
    </MotionConfig>
  );
};
