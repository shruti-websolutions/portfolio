/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BarChart3, Check, Globe, ShieldCheck, Sparkles } from 'lucide-react';

interface ServicesProps {
  onOpenApply?: () => void;
}

/**
 * Same two paths as the hero, so the story carries through the page:
 * "Get more customers" and "Run your business better".
 */
const services = [
  {
    icon: Globe,
    number: '01',
    tag: 'Get more customers',
    title: 'Websites & Landing Pages',
    text: 'Fast, modern business websites, landing pages and portfolios with clean, premium UI/UX.',
    points: ['Responsive and high-speed', 'Modern, polished UI/UX', 'React · Next.js · Tailwind CSS'],
  },
  {
    icon: Sparkles,
    number: '02',
    tag: 'Run your business better',
    title: 'AI & LLM Integrations',
    text: 'Smart AI and LLM features inside your web app to automate workflows, search and data matching.',
    points: ['Smart prompting and workflows', 'LLMs · Automation · Embeddings'],
    proof: 'Cut a full day of manual work to under 5 minutes.',
  },
  {
    icon: BarChart3,
    number: '03',
    tag: 'Run your business better',
    title: 'Business Tools & Dashboards',
    text: 'Automated workflows, large-scale reporting systems and real-time dashboards that replace your spreadsheets.',
    points: ['Real-time data and analytics', 'Dashboards · Reports · Workflows'],
  },
  {
    icon: ShieldCheck,
    number: '04',
    tag: 'Ship with confidence',
    title: 'Testing & Quality Assurance',
    text: 'Careful manual testing across devices and browsers to catch bugs, fix errors and keep everything running smoothly.',
    points: ['Cross-device and cross-browser', 'Responsive and polished'],
  },
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

/** Same side padding as the hero and About sections so edges line up */
const sidePadding = 'px-5 sm:px-10 lg:px-16 xl:px-24 2xl:px-32';

export function Services({ onOpenApply }: ServicesProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="services"
        aria-labelledby="services-heading"
        className="relative w-full overflow-hidden border-t border-white/10 bg-[#02193d] text-white scroll-mt-0 lg:scroll-mt-20"
      >
        {/* One soft glow to add depth without clutter */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-[10%] h-96 w-96 rounded-full bg-[#64CEFB]/10 blur-3xl"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative flex flex-col"
        >
          {/* ───────── Header ───────── */}
          <div
            className={`flex flex-col gap-6 pb-10 pt-16 sm:pb-12 sm:pt-20 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:pb-14 lg:pt-28 ${sidePadding}`}
          >
            <div>
              <motion.p
                variants={itemVariants}
                className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-200 sm:text-sm"
              >
                What I Offer
              </motion.p>
              <motion.h2
                id="services-heading"
                variants={itemVariants}
                className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
              >
                What I can build{' '}
                <span className="bg-gradient-to-r from-[#64CEFB] to-sky-300 bg-clip-text text-transparent">
                  for you
                </span>
              </motion.h2>
            </div>

            <motion.p
              variants={itemVariants}
              className="max-w-md text-base leading-relaxed text-white/70 sm:text-lg"
            >
              From a single landing page to a full business system, built with care, speed and a
              clean user experience.
            </motion.p>
          </div>

          {/* ───────── Service cards ───────── */}
          <ul className={`grid gap-4 pb-12 sm:grid-cols-2 sm:gap-5 sm:pb-16 lg:pb-20 2xl:grid-cols-4 ${sidePadding}`}>
            {services.map(({ icon: Icon, number, tag, title, text, points, proof }) => (
              <motion.li key={title} variants={itemVariants} className="flex">
                <article className="group relative flex w-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#64CEFB]/40 hover:bg-white/[0.07] lg:p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#64CEFB]/10 text-[#64CEFB] transition-transform duration-200 group-hover:scale-105">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <span aria-hidden="true" className="text-sm font-semibold tracking-widest text-white/30">
                      {number}
                    </span>
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-widest text-sky-200">
                    {tag}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug text-white lg:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">{text}</p>

                  <ul className="mt-5 space-y-2.5">
                    {points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-white/80">
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#64CEFB]" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {proof && (
                    <p className="mt-5 rounded-lg bg-[#64CEFB]/10 px-3 py-2 text-sm font-medium text-[#64CEFB]">
                      {proof}
                    </p>
                  )}

                  {/* Action pinned to the bottom so all four cards line up */}
                  {/* <div className="mt-auto pt-6">
                    <div className="border-t border-white/10 pt-4">
                      <button
                        type="button"
                        onClick={onOpenApply}
                        className="group/btn inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#64CEFB] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB]"
                      >
                        Get started
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                        />
                      </button>
                    </div>
                  </div> */}
                </article>
              </motion.li>
            ))}
          </ul>

          {/* ───────── Full-width closing strip ───────── */}
          <motion.div
            variants={itemVariants}
            className={`flex flex-col gap-5 border-t border-white/10 bg-black/10 py-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 ${sidePadding}`}
          >
            <div>
              <p className="text-lg font-semibold text-white sm:text-xl">
                Not sure what you need?
              </p>
              <p className="mt-1 text-sm text-white/65 sm:text-base">
                Tell me about your project and I’ll suggest the right fit.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex w-fit cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#64CEFB] to-sky-400 px-7 py-3.5 text-base font-semibold text-slate-900 shadow-lg shadow-[#64CEFB]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[#64CEFB]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#02193d]"
            >
              Start a project
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
