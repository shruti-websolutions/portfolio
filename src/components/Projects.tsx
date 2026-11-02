/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import {
    Activity,
    ArrowRight,
    ArrowUpRight,
    Boxes,
    Code2,
    ExternalLink,
    Sparkles,
    Truck,
    TrendingUp,
    type LucideIcon,
} from 'lucide-react';

interface ProjectsProps {
    onOpenApply?: () => void;
}

/** Fill these in with the "Live Demo" and "GitHub" links from your resume. Buttons stay hidden while empty. */
const liveDemoUrl = 'https://my-stock-app-76ar.vercel.app/';
const githubUrl = 'https://github.com/Shruti01207/my-stock-app';

type Stat = { value: string; label: string };

type Project = {
    icon: LucideIcon;
    tag: string;
    title: string;
    text: string;
    flow?: string[];
    stats?: Stat[];
    proof?: string;
};

/** The headline case study: biggest, clearest result */
const featured: Project = {
    icon: Sparkles,
    tag: 'AI · Operations',
    title: 'AI Product-Matching Engine',
    text: 'Matching products by hand across a 10,000-SKU catalog took a full day. I built a hybrid engine that does it in under 5 minutes.',
    flow: ['Category filtering', 'Deterministic scoring', 'LLM re-ranking'],
    stats: [
        { value: '< 5 min', label: 'Down from a full day of manual work' },
        { value: '10,000', label: 'SKUs matched across the catalog' },
    ],
};

const projects: Project[] = [
    {
        icon: Boxes,
        tag: 'Inventory · Next.js',
        title: 'Purchase Reorder & Inventory Forecasting',
        text: 'Built for a B2B janitorial distributor to reduce recurring overstocking losses, so the team knows what to reorder, when and how much.',
        flow: ['Stock-out dates', 'Reorder points', 'Purchase quantities', 'Buffer stock'],
        proof: 'Strong client feedback in the very first demo.',
    },
    {
        icon: TrendingUp,
        tag: 'Finance · Reporting',
        title: 'Revenue Insights Report',
        text: 'Month-to-date metrics and forecasting, with a 5-level drill-down that lets teams trace financial variance from region down to a single site.',
        flow: ['Region', 'Parent group', 'Child group', 'Customer', 'Address / site'],
    },
    {
        icon: Truck,
        tag: 'Operations · Procurement',
        title: 'Procurement Workflows',
        text: 'Purchase orders, container assignment and real-time inventory synchronization, built and tested for day-to-day use.',
        stats: [
            { value: '500+', label: 'Vendors supported' },
            { value: '100+', label: 'Orders handled daily' },
        ],
    },
];

const sideProjectStack = ['WebSockets', 'Zustand', 'TanStack Query', 'Recharts', 'MongoDB', 'Inngest'];

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

/** Same side padding as every other section so edges line up */
const sidePadding = 'px-5 sm:px-10 lg:px-16 xl:px-24 2xl:px-32';

/** A small left-to-right process: what the project actually does, readable in a second */
function Flow({ steps, label }: { steps: string[]; label: string }) {
    return (
        <ol aria-label={label} className="flex flex-wrap items-center gap-x-2 gap-y-2">
            {steps.map((step, index) => (
                <li key={step} className="inline-flex items-center gap-2">
                    <span className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-sm font-medium text-white/90">
                        {step}
                    </span>
                    {index < steps.length - 1 && (
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 text-[#64CEFB]" />
                    )}
                </li>
            ))}
        </ol>
    );
}

function StatTiles({ stats, large = false }: { stats: Stat[]; large?: boolean }) {
    return (
        <dl className={`grid gap-3 ${stats.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {stats.map((stat) => (
                <div key={stat.value} className="rounded-2xl border border-white/10 bg-[#000039]/60 p-4 lg:p-5">
                    <dt
                        className={`font-bold tracking-tight text-[#64CEFB] ${large ? 'text-3xl sm:text-4xl xl:text-5xl' : 'text-2xl sm:text-3xl'
                            }`}
                    >
                        {stat.value}
                    </dt>
                    <dd className="mt-1 text-xs leading-snug text-white/70 sm:text-sm">{stat.label}</dd>
                </div>
            ))}
        </dl>
    );
}

export function Projects({ onOpenApply }: ProjectsProps) {
    const FeaturedIcon = featured.icon;

    return (
        <MotionConfig reducedMotion="user">
            <section
                id="projects"
                aria-labelledby="projects-heading"
                className="relative w-full overflow-hidden border-t border-white/10 bg-[#000039] text-white scroll-mt-0 lg:scroll-mt-20"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-[#64CEFB]/10 blur-3xl"
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
                                Selected Work
                            </motion.p>
                            <motion.h2
                                id="projects-heading"
                                variants={itemVariants}
                                className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
                            >
                                Real projects,{' '}
                                <span className="bg-gradient-to-r from-[#64CEFB] to-sky-300 bg-clip-text text-transparent">
                                    real results
                                </span>
                            </motion.h2>
                        </div>
                        <motion.p
                            variants={itemVariants}
                            className="max-w-md text-base leading-relaxed text-white/70 sm:text-lg"
                        >
                            A look at systems I’ve built for businesses, and what changed once people started
                            using them.
                        </motion.p>
                    </div>

                    <div className={`flex flex-col gap-4 pb-12 sm:gap-5 sm:pb-16 lg:pb-20 ${sidePadding}`}>
                        {/* ───────── Featured case study ───────── */}
                        <motion.article
                            variants={itemVariants}
                            className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] lg:grid-cols-[1.1fr_0.9fr]"
                        >
                            <div className="p-6 sm:p-8 lg:p-12">
                                <div className="mb-6 flex flex-wrap items-center gap-3">
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#64CEFB]/10 text-[#64CEFB]">
                                        <FeaturedIcon aria-hidden="true" className="h-6 w-6" />
                                    </span>
                                    <span className="rounded-full bg-[#64CEFB]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#64CEFB]">
                                        Featured
                                    </span>
                                </div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-sky-200">
                                    {featured.tag}
                                </p>
                                <h3 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                                    {featured.title}
                                </h3>
                                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                                    {featured.text}
                                </p>
                                {featured.flow && (
                                    <div className="mt-6">
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">
                                            How it works
                                        </p>
                                        <Flow steps={featured.flow} label="How the matching engine works" />
                                    </div>
                                )}
                            </div>

                            {/* Result panel */}
                            <div className="flex items-center border-t border-white/10 bg-[#02193d]/60 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-12">
                                <div className="w-full">
                                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
                                        The result
                                    </p>
                                    {featured.stats && <StatTiles stats={featured.stats} large />}
                                </div>
                            </div>
                        </motion.article>

                        {/* ───────── Supporting projects ───────── */}
                        <ul className="grid gap-4 sm:gap-5 lg:grid-cols-3">
                            {projects.map(({ icon: Icon, tag, title, text, flow, stats, proof }) => (
                                <motion.li key={title} variants={itemVariants} className="flex">
                                    <article className="group flex w-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#64CEFB]/40 hover:bg-white/[0.07] lg:p-8">
                                        <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#64CEFB]/10 text-[#64CEFB] transition-transform duration-200 group-hover:scale-105">
                                            <Icon aria-hidden="true" className="h-6 w-6" />
                                        </span>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-sky-200">
                                            {tag}
                                        </p>
                                        <h3 className="mt-2 text-xl font-semibold leading-snug text-white lg:text-2xl">
                                            {title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">{text}</p>

                                        <div className="mt-auto pt-6">
                                            {flow && <Flow steps={flow} label={`${title}: key capabilities`} />}
                                            {stats && <StatTiles stats={stats} />}
                                            {proof && (
                                                <p className="mt-4 rounded-lg bg-[#64CEFB]/10 px-3 py-2 text-sm font-medium text-[#64CEFB]">
                                                    {proof}
                                                </p>
                                            )}
                                        </div>
                                    </article>
                                </motion.li>
                            ))}
                        </ul>

                        {/* ───────── Personal project (with live links) ───────── */}
                        <motion.article
                            variants={itemVariants}
                            className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-10"
                        >
                            <div className="flex gap-4 lg:gap-5">
                                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#64CEFB]/10 text-[#64CEFB]">
                                    <Activity aria-hidden="true" className="h-6 w-6" />
                                </span>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-sky-200">
                                        Personal project · Live data
                                    </p>
                                    <h3 className="mt-2 text-xl font-semibold text-white lg:text-2xl">
                                        Real-Time Stock Analytics Dashboard
                                    </h3>
                                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                                        Live price updates over WebSockets, responsive charts, watchlists that update
                                        instantly, and automated email alerts in the background. API requests are
                                        proxied and cached to stay within external rate limits.
                                    </p>
                                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                                        {sideProjectStack.map((item) => (
                                            <li
                                                key={item}
                                                className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/80 sm:text-sm"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {(liveDemoUrl || githubUrl) && (
                                <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                                    {liveDemoUrl && (
                                        <a
                                            href={liveDemoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#64CEFB] to-sky-400 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-[#64CEFB]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[#64CEFB]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                        >
                                            Live demo
                                            <ExternalLink aria-hidden="true" className="h-4 w-4" />
                                        </a>
                                    )}
                                    {githubUrl && (
                                        <a
                                            href={githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:border-[#64CEFB] hover:text-[#64CEFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB]"
                                        >
                                            View code
                                            <Code2 aria-hidden="true" className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>
                            )}
                        </motion.article>
                    </div>

                    {/* ───────── Full-width closing strip ───────── */}
                    <motion.div
                        variants={itemVariants}
                        className={`flex flex-col gap-5 border-t border-white/10 bg-black/10 py-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 ${sidePadding}`}
                    >
                        <div>
                            <p className="text-lg font-semibold text-white sm:text-xl">
                                Have something similar in mind?
                            </p>
                            <p className="mt-1 text-sm text-white/65 sm:text-base">
                                Tell me what slows your team down and I’ll show you how it could be simpler.
                            </p>
                        </div>
                        <a
                            href="#contact"
                            className="group inline-flex w-fit cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#64CEFB] to-sky-400 px-7 py-3.5 text-base font-semibold text-slate-900 shadow-lg shadow-[#64CEFB]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[#64CEFB]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#000039]"
                        >
                            Start a project
                            <ArrowUpRight
                                aria-hidden="true"
                                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </a>
                    </motion.div>
                </motion.div>
            </section>
        </MotionConfig>
    );
}
