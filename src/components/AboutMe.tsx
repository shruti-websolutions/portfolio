/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import { ArrowUpRight, Palette, Zap, ThumbsUp } from 'lucide-react';
import myImage from '../assets/my-image.png';

/** What clients actually buy (shown as chips) */
const services = [
  'Business Websites',
  'Landing Pages',
  'Portfolios',
  'Dashboards & Web Apps',
  'AI Integration',
];

/** Tech stack, shown as one muted line instead of competing chips */
const stackLine = 'React · Next.js · TypeScript · Tailwind CSS';

/** Proof points, pulled out of the paragraph so they can be scanned in a second */
const stats = [
  { value: '2+', label: 'Years building production web apps' },
  { value: '< 5 min', label: 'Down from a full day of manual work, with an AI matching engine' },
];

/** The three promises, previously one bold sentence buried in a paragraph */
const principles = [
  { icon: Palette, title: 'Clean design', text: 'Clear, polished interfaces.' },
  { icon: Zap, title: 'Fast performance', text: 'Quick to load, smooth to use.' },
  { icon: ThumbsUp, title: 'Easy to use', text: 'Software people pick up fast.' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Same side padding as the hero so both sections line up on every screen size */
const sidePadding = 'px-5 sm:px-10 lg:px-16 xl:px-24 2xl:px-32';

export function AboutMe() {
  return (
    // MotionConfig makes every animation respect the user's "reduce motion" setting
    <MotionConfig reducedMotion="user">
      <section
        id="about"
        aria-labelledby="about-heading"
        className="relative w-full overflow-hidden bg-[#000039] scroll-mt-0 lg:scroll-mt-20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col"
        >
          {/* ───────── Edge-to-edge split (mirrors the hero) ───────── */}
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            {/* Left: full-height panel running to the left edge of the screen */}
            <div className="relative flex items-center justify-center overflow-hidden border-b border-white/10 bg-white/[0.04] px-5 py-16 sm:px-10 sm:py-20 lg:border-b-0 lg:border-r lg:px-14 lg:py-28 xl:px-20 2xl:px-28">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[#64CEFB]/10 blur-3xl"
              />

              <motion.div
                variants={itemVariants}
                className="relative w-full max-w-[300px] sm:max-w-sm lg:max-w-md"
              >
                <div className="group relative">
                  {/* Gradient frame */}
                  <div className="rounded-[2rem] bg-gradient-to-br from-[#64CEFB] via-[#64CEFB]/30 to-white/10 p-[3px] shadow-xl shadow-[#64CEFB]/10">
                    <div className="aspect-square overflow-hidden rounded-[calc(2rem-3px)] bg-white">
                      <img
                        src={myImage}
                        alt="Shruti Gupta, frontend developer"
                        width={480}
                        height={480}
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Availability pill overlapping the frame */}
                  <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-[#000039]/90 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur">
                    <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </span>
                    Open to new projects
                  </div>
                </div>

                {/* Stat tiles */}
                <dl className="mt-10 grid grid-cols-2 gap-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.value}
                      className="rounded-2xl border border-white/10 bg-[#000039]/60 p-4"
                    >
                      <dt className="text-2xl font-bold tracking-tight text-[#64CEFB] sm:text-3xl">
                        {stat.value}
                      </dt>
                      <dd className="mt-1 text-xs leading-snug text-white/70 sm:text-sm">
                        {stat.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </div>

            {/* Right: story + focus */}
            <div
              className={`flex flex-col justify-center py-16 sm:py-20 lg:py-28 ${sidePadding} lg:pl-14 xl:pl-20 2xl:pl-24`}
            >
              <div className="max-w-3xl">
                <motion.p
                  variants={itemVariants}
                  className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-200 sm:text-sm"
                >
                  About Me
                </motion.p>

                <motion.h2
                  id="about-heading"
                  variants={itemVariants}
                  className="mb-6 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl xl:text-6xl"
                >
                  Hey there, I'm{' '}
                  <span className="relative inline-block">
                    Shruti
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-[#64CEFB] to-sky-400"
                    />
                  </span>
                  .
                </motion.h2>

                {/* Lead paragraph: one bigger statement, then supporting detail */}
                <motion.p
                  variants={itemVariants}
                  className="text-lg leading-relaxed text-white/90 sm:text-xl lg:text-2xl lg:leading-snug xl:text-3xl xl:leading-snug"
                >
                  I’m a frontend engineer with 2+ years of experience building production web apps,
                  from client-facing websites to complex business tools.
                </motion.p>

                <motion.p
                  variants={itemVariants}
                  className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg"
                >
                  Whether you need a landing page that turns visitors into enquiries or a dashboard
                  that replaces your spreadsheets, I focus on the same three things:
                </motion.p>

                {/* Principles as three scannable cards */}
                <motion.ul
                  variants={itemVariants}
                  className="mt-5 grid gap-3 sm:grid-cols-3 lg:gap-4"
                  aria-label="What I focus on"
                >
                  {principles.map(({ icon: Icon, title, text }) => (
                    <li
                      key={title}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 lg:p-5"
                    >
                      <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#64CEFB]/10 text-[#64CEFB]">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <p className="font-semibold text-white">{title}</p>
                      <p className="mt-1 text-sm leading-snug text-white/65">{text}</p>
                    </li>
                  ))}
                </motion.ul>

                <motion.p
                  variants={itemVariants}
                  className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg"
                >
                  I’ve built inventory forecasting systems, reporting systems for revenue insights,
                  and an AI product-matching engine. I bring that same care to every project, big or
                  small.
                </motion.p>
              </div>
            </div>
          </div>

          {/* ───────── Full-width services + CTA strip ───────── */}
          <motion.div
            variants={itemVariants}
            className={`flex flex-col gap-8 border-t border-white/10 bg-black/10 py-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 ${sidePadding}`}
          >
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">
                What I build
              </p>
              <ul className="flex flex-wrap gap-2.5" aria-label="What I build">
                {services.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-3.5 py-1.5 text-sm font-medium text-white/90"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#64CEFB]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-white/60">
                <span className="text-white/45">Built with </span>
                {stackLine}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#64CEFB] to-sky-400 px-7 py-3.5 text-base font-semibold text-slate-900 shadow-lg shadow-[#64CEFB]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[#64CEFB]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Start a project
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full px-2 py-2 text-base font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:text-[#64CEFB] hover:decoration-[#64CEFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB]"
              >
                See my work
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
