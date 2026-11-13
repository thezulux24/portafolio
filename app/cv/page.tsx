"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { useLang } from "@/lib/store";
import { contact, experience, hero, ui } from "@/lib/content";

const PDF = "/Brayan_Zuluaga_CV.pdf";

export default function CvPage() {
    const lang = useLang((state) => state.lang);

    return (
        <main className="wrap pt-[calc(var(--nav-h)+2rem)] pb-24">
            <Link href="/" className="link text-sm text-text-2">
                <ArrowLeft />
                {ui.cv.back[lang]}
            </Link>

            <header className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-b border-line pb-10">
                <div className="flex max-w-2xl flex-col gap-4">
                    <h1 className="heading text-[clamp(2.5rem,5.4vw,4.75rem)]">Brayan David Zuluaga Meléndez</h1>
                    <p className="text-lg leading-snug text-text-2">{hero.line[lang]}</p>
                    <p className="text-sm text-text-3">
                        {hero.base[lang]} · {contact.email}
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <a href={PDF} download="Brayan_Zuluaga_CV.pdf" className="btn btn-primary">
                        {ui.cv.download[lang]}
                        <Download className="icon-down" />
                    </a>
                    <a href={PDF} target="_blank" rel="noopener noreferrer" className="btn btn-quiet">
                        {ui.cv.open[lang]}
                        <ArrowUpRight />
                    </a>
                </div>
            </header>

            <div className="mt-12 grid gap-12 stage:grid-cols-12 stage:gap-10">
                <section aria-labelledby="cv-experience" className="stage:col-span-6">
                    <h2 id="cv-experience" className="heading text-3xl">
                        {ui.experience.title[lang]}
                    </h2>
                    <ol className="mt-6 border-b border-line">
                        {experience.roles.map((role) => (
                            <li key={role.company} className="role-row grid gap-1 border-t border-line py-5">
                                <p className="data flex items-center gap-2 text-text-3">
                                    <span aria-hidden="true" className={"size-1.5 " + (role.current ? "bg-holo" : "bg-void-3")} />
                                    {role.period[lang]}
                                </p>
                                <h3 className="text-lg font-semibold leading-tight [font-variation-settings:'wdth'_112]">{role.company}</h3>
                                <p className="text-sm text-holo">{role.title[lang]}</p>
                                <p className="text-[0.9375rem] text-text-2">{role.line[lang]}</p>
                            </li>
                        ))}
                    </ol>
                    <dl className="mt-8 grid gap-4 text-[0.9375rem] text-text-2">
                        <div className="grid gap-1">
                            <dt className="text-[0.8125rem] text-text-3">{ui.experience.education[lang]}</dt>
                            <dd>{experience.education[lang]}</dd>
                        </div>
                        <div className="grid gap-1">
                            <dt className="text-[0.8125rem] text-text-3">{ui.experience.languages[lang]}</dt>
                            <dd>{experience.languages[lang]}</dd>
                        </div>
                    </dl>
                </section>

                <section aria-labelledby="cv-document" className="stage:col-span-6">
                    <h2 id="cv-document" className="heading text-3xl">
                        {ui.cv.document[lang]}
                    </h2>
                    {/* A rendered first page instead of an embedded viewer: phones do not inline PDFs. */}
                    <a
                        href={PDF}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={ui.cv.open[lang]}
                        className="slate slate-ticks group mt-6 block overflow-hidden"
                    >
                        <Image
                            src="/cv/page-1.webp"
                            alt={ui.cv.pageAlt[lang]}
                            width={1100}
                            height={1555}
                            sizes="(min-width: 64rem) 45vw, 100vw"
                            priority
                            className="block h-auto w-full origin-top transition-transform duration-500 ease-out-strong group-hover:scale-[1.01]"
                        />
                    </a>
                    <p className="mt-4 text-[0.8125rem] text-text-3">{ui.cv.pages[lang]}</p>
                </section>
            </div>
        </main>
    );
}
