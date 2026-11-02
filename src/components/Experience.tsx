/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import { Check } from 'lucide-react';

type Role = {
    title: string;
    company: string;
    period: string;
    note?: string;
    points: string[];
    tags?: string[];
};

/** Written around what was delivered, since that is what clients care about */
const roles: Role[] = [
    {
        title: 'Software Developer',
        company: 'Scrrum Labs (Remote)',
        period: 'Dec 2024 – May 2026',
        points: [
            'Built a Revenue Insights report with month-to-date metrics, forecasting and a 5-level drill-down for financial variance analysis.',
            'Created a hybrid AI product-matching engine across a 10,000-SKU catalog, cutting manual matching from a full day to under 5 minutes.',
            'Built a Purchase Reorder & Inventory Forecasting module for a B2B janitorial distributor, working directly with the founder. The client gave strong feedback in the first demo.',
            'Developed procurement workflows supporting 500+ vendors and 100+ daily orders, with real-time inventory sync.',
            'Connected a vendor billing app to Bluetooth thermal printers for automated, instant bill printing.',
        ],
        tags: ['React', 'Next.js', 'TypeScript', 'LLM integration'],
    },
    {
        title: 'Angular Developer',
        company: 'Qloron Private Limited (Remote)',
        period: 'Dec 2023 – Feb 2024 · Jun 2024 – Nov 2024',
        note: 'Started as a college internship. Rejoined after graduation on referral.',
        points: [
            'Developed, tested and debugged responsive client-facing web applications using Angular 14, TypeScript and Angular Material.',
        ],
        tags: ['Angular', 'TypeScript', 'Angular Material'],
    },
    {
        title: 'Tech Intern',
        company: 'Minvik Technologies Private Limited (Remote)',
        period: 'Apr 2023 – Aug 2023',
        points: [
            'Built IoT dashboards for remote monitoring of urban infrastructure, including a chiller dashboard showing temperature, pressure and flow rate in real time.',
            'Improved app performance by migrating an Angular app to standalone components with lazy loading.',
            'Built backend features in ASP.NET Core MVC for an image quiz app, with server-side search and filtering using SQL Server and REST APIs.',
        ],
        tags: ['Angular', 'ASP.NET Core', 'SQL Server'],
    },
];

const stats = [
    { value: '2+', label: 'Years building production apps' },
    { value: '3', label: 'Teams worked with, all remote' },
];

const skills = [
    {
        group: 'Core',
        items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Angular', 'Zustand', 'TanStack Query'],
    },
    {
        group: 'Working knowledge',
        items: ['Tailwind CSS', 'Recharts', 'SQL Server', 'LLM Integration', 'MCP Servers'],
    },
];

/** Credentials strip along the bottom, same pattern as the hero's proof strip */
const credentials = [
    { value: 'B.Tech, 2024', label: 'Dayalbagh Educational Institute, Agra' },
    { value: 'CodeChef Global Rank 51', label: 'Out of 11,493 (SEP SHORT 2023)' },
    { value: 'Certificate of Excellence', label: 'Data Structures & Algorithms (C++), Coding Ninjas' },
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

/** Same side padding as every other section so edges line up */
const sidePadding = 'px-5 sm:px-10 lg:px-16 xl:px-24 2xl:px-32';

export function Experience() {
    return (
        <MotionConfig reducedMotion="user">
            <section
                id="experience"
                aria-labelledby="experience-heading"
                className="relative w-full overflow-hidden border-t border-white/10 bg-[#02193d] text-white scroll-mt-0 lg:scroll-mt-20"
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="flex flex-col"
                >
                    {/* ───────── Edge-to-edge split ───────── */}
                    <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                        {/* Left: full-height panel with a sticky summary */}
                        <div className="relative overflow-hidden border-b border-white/10 bg-white/[0.04] px-5 py-16 sm:px-10 sm:py-20 lg:border-b-0 lg:border-r lg:px-14 lg:py-28 xl:px-20 2xl:px-28">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -left-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[#64CEFB]/10 blur-3xl"
                            />

                            <div className="relative lg:sticky lg:top-28">
                                <motion.p
                                    variants={itemVariants}
                                    className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-200 sm:text-sm"
                                >
                                    Experience
                                </motion.p>
                                <motion.h2
                                    id="experience-heading"
                                    variants={itemVariants}
                                    className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                                >
                                    Experience you can{' '}
                                    <span className="bg-gradient-to-r from-[#64CEFB] to-sky-300 bg-clip-text text-transparent">
                                        rely on
                                    </span>
                                </motion.h2>
                                <motion.p
                                    variants={itemVariants}
                                    className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg"
                                >
                                    I’ve worked directly with founders and remote teams to turn business requirements
                                    into software people actually use.
                                </motion.p>

                                <motion.dl variants={itemVariants} className="mt-8 grid max-w-md grid-cols-2 gap-3">
                                    {stats.map((stat) => (
                                        <div
                                            key={stat.value}
                                            className="rounded-2xl border border-white/10 bg-[#02193d]/60 p-4"
                                        >
                                            <dt className="text-2xl font-bold tracking-tight text-[#64CEFB] sm:text-3xl">
                                                {stat.value}
                                            </dt>
                                            <dd className="mt-1 text-xs leading-snug text-white/70 sm:text-sm">
                                                {stat.label}
                                            </dd>
                                        </div>
                                    ))}
                                </motion.dl>

                                <motion.div variants={itemVariants} className="mt-8 max-w-md space-y-5">
                                    {skills.map(({ group, items }) => (
                                        <div key={group}>
                                            <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-white/50">
                                                {group}
                                            </p>
                                            <ul className="flex flex-wrap gap-2" aria-label={group}>
                                                {items.map((item) => (
                                                    <li
                                                        key={item}
                                                        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-3 py-1 text-sm font-medium text-white/90"
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className="h-1.5 w-1.5 rounded-full bg-[#64CEFB]"
                                                        />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* Right: timeline */}
                        <div className={`py-16 sm:py-20 lg:py-28 ${sidePadding} lg:pl-14 xl:pl-20 2xl:pl-24`}>
                            <ol className="relative max-w-3xl space-y-8 border-l border-white/15 pl-7 sm:pl-9">
                                {roles.map((role) => (
                                    <motion.li key={role.title + role.period} variants={itemVariants} className="relative">
                                        {/* Timeline dot */}
                                        <span
                                            aria-hidden="true"
                                            className="absolute -left-[34px] top-7 h-2.5 w-2.5 rounded-full bg-[#64CEFB] ring-4 ring-[#02193d] sm:-left-[42px]"
                                        />

                                        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-200 hover:border-[#64CEFB]/30 hover:bg-white/[0.06] lg:p-8">
                                            <p className="inline-flex rounded-full bg-[#64CEFB]/10 px-3 py-1 text-xs font-semibold tracking-wide text-[#64CEFB]">
                                                {role.period}
                                            </p>
                                            <h3 className="mt-3 text-xl font-semibold text-white lg:text-2xl">
                                                {role.title}
                                            </h3>
                                            <p className="mt-1 text-sm font-medium text-white/60 sm:text-base">
                                                {role.company}
                                            </p>

                                            {role.note && (
                                                <p className="mt-3 text-sm italic text-sky-200/90">{role.note}</p>
                                            )}

                                            <ul className="mt-5 space-y-3">
                                                {role.points.map((point) => (
                                                    <li
                                                        key={point}
                                                        className="flex items-start gap-3 text-sm leading-relaxed text-white/80 sm:text-base"
                                                    >
                                                        <Check
                                                            aria-hidden="true"
                                                            className="mt-1 h-4 w-4 shrink-0 text-[#64CEFB]"
                                                        />
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>

                                            {role.tags && (
                                                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                                                    {role.tags.map((tag) => (
                                                        <li
                                                            key={tag}
                                                            className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/75 sm:text-sm"
                                                        >
                                                            {tag}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </article>
                                    </motion.li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* ───────── Full-width credentials strip ───────── */}
                    <motion.dl
                        variants={itemVariants}
                        aria-label="Education and achievements"
                        className="grid border-t border-white/10 bg-black/10 sm:grid-cols-3 sm:divide-x sm:divide-white/10"
                    >
                        {credentials.map(({ value, label }) => (
                            <div key={value} className="px-5 py-5 sm:px-10 sm:py-6 lg:px-12 xl:px-20 2xl:px-28">
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
