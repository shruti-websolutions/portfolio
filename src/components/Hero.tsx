/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import { ArrowRight, ArrowUpRight, LayoutDashboard, LayoutTemplate } from 'lucide-react';

type HeroProps = {
    onOpenApply?: () => void;
};

/** Full-width proof strip along the bottom of the hero */
const proofStrip = [
    { value: '2+ years', label: 'Building production web apps' },
    { value: 'React · Next.js · TypeScript', label: 'A fast, modern stack' },
    { value: 'Small to large', label: 'Landing pages to full business systems' },
];

/**
 * Two paths so both kinds of client see themselves in one glance:
 * quick, affordable web presence vs. larger business systems.
 */
const paths = [
    {
        icon: LayoutTemplate,
        label: 'Get more customers',
        title: 'Websites & landing pages',
        text: 'Business websites, landing pages and portfolios that look sharp, load fast and turn visitors into enquiries.',
    },
    {
        icon: LayoutDashboard,
        label: 'Run your business better',
        title: 'Web apps & dashboards',
        text: 'Dashboards, workflow tools and AI integrations that replace spreadsheets and repetitive manual work.',
        proof: 'Cut a full day of manual work to under 5 minutes.',
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

export function Hero({ onOpenApply }: HeroProps) {
    return (
        <MotionConfig reducedMotion="user">
            <section
                id="home"
                aria-labelledby="hero-heading"
                className="relative flex min-h-[640px] w-full flex-col overflow-hidden bg-gradient-to-b from-[#02193d] to-[#000039] text-white scroll-mt-0 lg:min-h-screen lg:scroll-mt-20"
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-1 flex-col"
                >
                    {/* ───────── Edge-to-edge split ───────── */}
                    <div className="grid flex-1 lg:grid-cols-[1.1fr_0.9fr]">
                        {/* Left: message + actions */}
                        <div className="flex flex-col justify-center px-5 pb-12 pt-28 sm:px-10 sm:pt-32 lg:px-16 lg:pb-16 lg:pt-36 xl:px-24 2xl:px-32">
                            <motion.div
                                variants={itemVariants}
                                className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-sm font-medium text-white/80"
                            >
                                <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                </span>
                                Available for freelance projects
                            </motion.div>

                            <motion.h1
                                id="hero-heading"
                                variants={itemVariants}
                                className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
                            >
                                Websites that win customers.{' '}
                                <span className="bg-gradient-to-r from-[#64CEFB] to-sky-300 bg-clip-text text-transparent">
                                    Web apps that run your business.
                                </span>
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl xl:max-w-2xl xl:text-2xl xl:leading-relaxed"
                            >
                                I’m Shruti, a React and Next.js developer. I build fast, polished websites and
                                landing pages, plus dashboards and workflow tools when you need more.
                            </motion.p>

                            <motion.div
                                variants={itemVariants}
                                className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 lg:mt-10"
                            >
                                <a
                                    href="#contact"
                                    className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#64CEFB] to-sky-400 px-7 py-3.5 text-base font-semibold text-slate-900 shadow-lg shadow-[#64CEFB]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[#64CEFB]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#02193d]"
                                >
                                    Start a project
                                    <ArrowRight
                                        aria-hidden="true"
                                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                </a>
                                <a
                                    href="#services"
                                    className="inline-flex items-center justify-center rounded-full px-2 py-2 text-base font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:text-[#64CEFB] hover:decoration-[#64CEFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB]"
                                >
                                    See what I build
                                </a>
                            </motion.div>
                        </div>

                        {/* Right: full-height panel running to the right edge of the screen */}
                        <div className="relative flex items-center overflow-hidden border-t border-white/10 bg-white/[0.04] px-5 py-12 sm:px-10 lg:border-l lg:border-t-0 lg:px-14 lg:pb-16 lg:pt-36 xl:px-20 2xl:px-28">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[#64CEFB]/10 blur-3xl"
                            />

                            <motion.div
                                variants={itemVariants}
                                className="relative flex w-full flex-col gap-4 lg:gap-5"
                            >
                                {paths.map(({ icon: Icon, label, title, text, proof }) => (
                                    <a
                                        key={title}
                                        href="#services"
                                        className="group relative block rounded-2xl border border-white/10 bg-[#02193d]/60 p-6 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-[#64CEFB]/40 hover:bg-[#02193d]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB] lg:p-8"
                                    >
                                        <div className="flex items-start gap-4 lg:gap-5">
                                            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#64CEFB]/10 text-[#64CEFB]">
                                                <Icon aria-hidden="true" className="h-6 w-6" />
                                            </span>
                                            <div className="min-w-0 pr-6">
                                                <p className="text-xs font-semibold uppercase tracking-widest text-sky-200">
                                                    {label}
                                                </p>
                                                <h2 className="mt-1 text-xl font-semibold text-white lg:text-2xl">
                                                    {title}
                                                </h2>
                                                <p className="mt-2 text-sm leading-relaxed text-white/70 sm:text-base">
                                                    {text}
                                                </p>
                                                {proof && (
                                                    <p className="mt-4 inline-flex rounded-full bg-[#64CEFB]/10 px-3 py-1 text-sm font-medium text-[#64CEFB]">
                                                        {proof}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <ArrowUpRight
                                            aria-hidden="true"
                                            className="absolute right-5 top-5 h-5 w-5 text-white/40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#64CEFB]"
                                        />
                                    </a>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* ───────── Full-width proof strip ───────── */}
                    <motion.dl
                        variants={itemVariants}
                        aria-label="Why work with me"
                        className="grid border-t border-white/10 bg-black/10 sm:grid-cols-3 sm:divide-x sm:divide-white/10"
                    >
                        {proofStrip.map(({ value, label }) => (
                            <div
                                key={value}
                                className="px-5 py-5 sm:px-10 sm:py-6 lg:px-16 xl:px-24 2xl:px-32"
                            >
                                <dt className="text-lg font-semibold text-white sm:text-xl">{value}</dt>
                                <dd className="mt-0.5 text-sm text-white/60">{label}</dd>
                            </div>
                        ))}
                    </motion.dl>
                </motion.div>
            </section>
        </MotionConfig>
    );
}
