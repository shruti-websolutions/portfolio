/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import { ArrowUp, Check, Info, Mail, Phone, Send } from 'lucide-react';

const email = 'guptashruti232@gmail.com';
const phoneDisplay = '+91-7668409194';
const phoneHref = 'tel:+917668409194';

/**
 * Where form submissions are sent (a Google Apps Script web app URL that adds a row to your sheet).
 * Set it in a .env file as VITE_CONTACT_ENDPOINT. See .env.example.
 */
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

/**
 * TODO: replace each href with your own profile link.
 * They point to the site homepages for now so nothing is broken in the meantime.
 */
const socials = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { name: 'GitHub', href: 'https://github.com/' },
    { name: 'Instagram', href: 'https://www.instagram.com/' },
    { name: 'Facebook', href: 'https://www.facebook.com/' },
] as const;

type SocialName = (typeof socials)[number]['name'];

/** Mirrors the service cards so the form feels connected to the rest of the page */
const serviceOptions = [
    'Website or landing page',
    'Dashboard or web app',
    'AI integration',
    'Testing & QA',
    'Not sure yet',
];

/** Inline icons: lucide-react no longer ships brand logos in newer versions */
function SocialIcon({ name, className }: { name: SocialName; className?: string }) {
    const common = {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        'aria-hidden': true,
        className,
    };

    switch (name) {
        case 'LinkedIn':
            return (
                <svg {...common}>
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                </svg>
            );
        case 'GitHub':
            return (
                <svg {...common}>
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
            );
        case 'Instagram':
            return (
                <svg {...common}>
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
            );
        case 'Facebook':
            return (
                <svg {...common}>
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
            );
    }
}

type Status = 'idle' | 'submitting' | 'success' | 'error';
type FieldName = 'name' | 'email' | 'message';
type Errors = Partial<Record<FieldName, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: { name: string; email: string; message: string }): Errors {
    const errors: Errors = {};
    if (!values.name) errors.name = 'Please enter your name.';
    if (!values.email) errors.email = 'Please enter your email.';
    else if (!emailPattern.test(values.email)) errors.email = 'Please enter a valid email address.';
    if (!values.message) errors.message = 'Please tell me a little about your project.';
    else if (values.message.length < 10) errors.message = 'Please add a few more details (10+ characters).';
    return errors;
}

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

const inputBase =
    'w-full rounded-xl border bg-white/[0.05] px-4 py-3 text-base text-white placeholder:text-white/40 transition-colors duration-200 focus:outline-none focus:ring-2 [color-scheme:dark]';
const inputOk = 'border-white/15 focus:border-[#64CEFB] focus:ring-[#64CEFB]/40';
const inputBad = 'border-rose-400/70 focus:border-rose-400 focus:ring-rose-400/30';

export function Contact() {
    const [status, setStatus] = useState<Status>('idle');
    const [errors, setErrors] = useState<Errors>({});
    const [firstName, setFirstName] = useState('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const read = (key: string) => String(data.get(key) ?? '').trim();

        const values = {
            name: read('name'),
            email: read('email'),
            phone: read('phone'),
            service: read('service'),
            message: read('message'),
            website: read('website'), // honeypot: real people never fill this in
        };

        const nextErrors = validate(values);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) {
            // Move focus to the first field with a problem
            const firstInvalid = (['name', 'email', 'message'] as FieldName[]).find((f) => nextErrors[f]);
            if (firstInvalid) form.elements.namedItem(firstInvalid)?.focus?.();
            return;
        }

        // Bots fill the hidden field: pretend it worked and send nothing
        if (values.website) {
            setStatus('success');
            return;
        }

        if (!endpoint) {
            console.warn('Contact form: VITE_CONTACT_ENDPOINT is not set, so nothing was sent.');
            setStatus('error');
            return;
        }

        setStatus('submitting');
        try {
            // Apps Script web apps don't answer CORS preflights, so this is sent as a "simple"
            // request (text/plain, no-cors). The response can't be read, so any network error
            // is the only failure we can detect.
            await fetch(endpoint, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(values),
            });
            setFirstName(values.name.split(' ')[0]);
            form.reset();
            setStatus('success');
        } catch {
            setStatus('error');
        }
    }

    const fieldClass = (field: FieldName) => `${inputBase} ${errors[field] ? inputBad : inputOk}`;

    return (
        <MotionConfig reducedMotion="user">
            <section
                id="contact"
                aria-labelledby="contact-heading"
                className="relative w-full overflow-hidden border-t border-white/10 bg-[#000039] text-white scroll-mt-0 lg:scroll-mt-20"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-0 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-[#64CEFB]/10 blur-3xl"
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="relative flex flex-col"
                >
                    {/* ───────── Centered header ───────── */}
                    <div
                        className={`flex flex-col items-center pb-10 pt-16 text-center sm:pb-12 sm:pt-20 lg:pb-14 lg:pt-28 ${sidePadding}`}
                    >
                        <motion.div
                            variants={itemVariants}
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-sm font-medium text-white/80"
                        >
                            <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            </span>
                            Available for freelance projects
                        </motion.div>

                        <motion.p
                            variants={itemVariants}
                            className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-200 sm:text-sm"
                        >
                            Contact
                        </motion.p>

                        <motion.h2
                            id="contact-heading"
                            variants={itemVariants}
                            className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
                        >
                            Let’s build something{' '}
                            <span className="bg-gradient-to-r from-[#64CEFB] to-sky-300 bg-clip-text text-transparent">
                                that works for you
                            </span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
                        >
                            Tell me what you’re working on, whether it’s a single landing page or a full business
                            system, and I’ll help you find the right fit.
                        </motion.p>
                    </div>

                    {/* ───────── Info card + form ───────── */}
                    <div
                        className={`grid gap-4 pb-12 sm:gap-5 sm:pb-16 lg:grid-cols-[0.8fr_1.2fr] lg:pb-20 ${sidePadding}`}
                    >
                        {/* Contact details */}
                        <motion.aside
                            variants={itemVariants}
                            aria-label="Contact details"
                            className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10"
                        >
                            <h3 className="text-xl font-semibold text-white lg:text-2xl">Get in touch</h3>
                            <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-base">
                                Prefer to reach out directly? Email or call me, or find me on the platforms below.
                            </p>

                            <ul className="mt-8 space-y-5">
                                <li>
                                    <a
                                        href={`mailto:${email}`}
                                        className="group inline-flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB]"
                                    >
                                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#64CEFB]/10 text-[#64CEFB]">
                                            <Mail aria-hidden="true" className="h-5 w-5" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-xs font-semibold uppercase tracking-widest text-white/50">
                                                Email
                                            </span>
                                            <span className="block break-all text-base font-medium text-white transition-colors group-hover:text-[#64CEFB]">
                                                {email}
                                            </span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={phoneHref}
                                        className="group inline-flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB]"
                                    >
                                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#64CEFB]/10 text-[#64CEFB]">
                                            <Phone aria-hidden="true" className="h-5 w-5" />
                                        </span>
                                        <span>
                                            <span className="block text-xs font-semibold uppercase tracking-widest text-white/50">
                                                Phone
                                            </span>
                                            <span className="block text-base font-medium text-white transition-colors group-hover:text-[#64CEFB]">
                                                {phoneDisplay}
                                            </span>
                                        </span>
                                    </a>
                                </li>
                            </ul>

                            <div className="mt-auto border-t border-white/10 pt-6 lg:mt-10">
                                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
                                    Find me online
                                </p>
                                <ul className="flex flex-wrap gap-3">
                                    {socials.map(({ name, href }) => (
                                        <li key={name}>
                                            <a
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`${name} (opens in a new tab)`}
                                                title={name}
                                                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#64CEFB]/50 hover:bg-[#64CEFB]/10 hover:text-[#64CEFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB]"
                                            >
                                                <SocialIcon name={name} className="h-5 w-5" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.aside>

                        {/* Form */}
                        <motion.div
                            variants={itemVariants}
                            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10"
                        >
                            {status === 'success' ? (
                                <div
                                    role="status"
                                    className="flex min-h-[24rem] flex-col items-center justify-center text-center"
                                >
                                    <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
                                        <Check aria-hidden="true" className="h-7 w-7" />
                                    </span>
                                    <h3 className="text-2xl font-semibold text-white">
                                        Thanks{firstName ? `, ${firstName}` : ''}! Your message is in.
                                    </h3>
                                    <p className="mt-3 max-w-md text-base leading-relaxed text-white/70">
                                        I’ve received your details and will get back to you by email soon.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setStatus('idle')}
                                        className="mt-6 cursor-pointer text-base font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:text-[#64CEFB] hover:decoration-[#64CEFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB]"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                                    <h3 className="text-xl font-semibold text-white lg:text-2xl">
                                        Send me a message
                                    </h3>
                                    <p className="mt-2 text-sm text-white/65 sm:text-base">
                                        Fields marked with <span className="text-[#64CEFB]">*</span> are required.
                                    </p>

                                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-white/85">
                                                Name <span className="text-[#64CEFB]">*</span>
                                            </label>
                                            <input
                                                id="contact-name"
                                                name="name"
                                                type="text"
                                                autoComplete="name"
                                                maxLength={100}
                                                placeholder="Your name"
                                                aria-invalid={Boolean(errors.name)}
                                                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                                                className={fieldClass('name')}
                                            />
                                            {errors.name && (
                                                <p id="contact-name-error" className="mt-1.5 text-sm text-rose-300">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-white/85">
                                                Email <span className="text-[#64CEFB]">*</span>
                                            </label>
                                            <input
                                                id="contact-email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                maxLength={150}
                                                placeholder="you@example.com"
                                                aria-invalid={Boolean(errors.email)}
                                                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                                                className={fieldClass('email')}
                                            />
                                            {errors.email && (
                                                <p id="contact-email-error" className="mt-1.5 text-sm text-rose-300">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-white/85">
                                                Phone <span className="text-white/45">(optional)</span>
                                            </label>
                                            <input
                                                id="contact-phone"
                                                name="phone"
                                                type="tel"
                                                autoComplete="tel"
                                                maxLength={30}
                                                placeholder="+91 00000 00000"
                                                className={`${inputBase} ${inputOk}`}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="contact-service" className="mb-2 block text-sm font-medium text-white/85">
                                                What do you need? <span className="text-white/45">(optional)</span>
                                            </label>
                                            <select
                                                id="contact-service"
                                                name="service"
                                                defaultValue=""
                                                className={`${inputBase} ${inputOk}`}
                                            >
                                                <option value="" className="bg-[#02193d]">
                                                    Select a service
                                                </option>
                                                {serviceOptions.map((option) => (
                                                    <option key={option} value={option} className="bg-[#02193d]">
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-white/85">
                                                Tell me about your project <span className="text-[#64CEFB]">*</span>
                                            </label>
                                            <textarea
                                                id="contact-message"
                                                name="message"
                                                rows={6}
                                                maxLength={2000}
                                                placeholder="What are you looking to build, and what would a great result look like?"
                                                aria-invalid={Boolean(errors.message)}
                                                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                                                className={`${fieldClass('message')} resize-y`}
                                            />
                                            {errors.message && (
                                                <p id="contact-message-error" className="mt-1.5 text-sm text-rose-300">
                                                    {errors.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Honeypot: hidden from people and screen readers, bots tend to fill it in */}
                                        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                                            <label htmlFor="contact-website">Leave this field empty</label>
                                            <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                                        </div>
                                    </div>

                                    {status === 'error' && (
                                        <div
                                            role="alert"
                                            className="mt-6 flex items-start gap-3 rounded-xl border border-rose-400/40 bg-rose-400/10 p-4 text-sm text-rose-100"
                                        >
                                            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                                            <p>
                                                Sorry, your message couldn’t be sent. Please try again, or email me directly at{' '}
                                                <a href={`mailto:${email}`} className="font-semibold underline underline-offset-2">
                                                    {email}
                                                </a>
                                                .
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-sm text-white/50">
                                            Your details are only used to reply to your message.
                                        </p>
                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#64CEFB] to-sky-400 px-7 py-3.5 text-base font-semibold text-slate-900 shadow-lg shadow-[#64CEFB]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[#64CEFB]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#000039] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                                        >
                                            {status === 'submitting' ? (
                                                <>
                                                    <span
                                                        aria-hidden="true"
                                                        className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900/30 border-t-slate-900 motion-reduce:animate-none"
                                                    />
                                                    Sending…
                                                </>
                                            ) : (
                                                <>
                                                    Send message
                                                    <Send
                                                        aria-hidden="true"
                                                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                                                    />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </div>

                    {/* ───────── Full-width footer strip ───────── */}
                    <motion.div
                        variants={itemVariants}
                        className={`flex flex-col gap-3 border-t border-white/10 bg-black/10 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between ${sidePadding}`}
                    >
                        <p>© {new Date().getFullYear()} Shruti Gupta. All rights reserved.</p>
                        <a
                            href="#home"
                            className="group inline-flex w-fit items-center gap-2 font-medium text-white/70 transition-colors hover:text-[#64CEFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB]"
                        >
                            Back to top
                            <ArrowUp
                                aria-hidden="true"
                                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                            />
                        </a>
                    </motion.div>
                </motion.div>
            </section>
        </MotionConfig>
    );
}
