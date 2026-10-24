"use client";

import Image from "next/image";
import { useId, useState } from "react";
import Reveal from "@/components/Reveal";

/** true: opening a question closes the others. false: any number can stay open. */
export const SINGLE_OPEN = true;

type FaqItem = { question: string; answer: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set());

  const toggle = (index: number) => {
    setOpen((prev) => {
      const next = new Set(SINGLE_OPEN ? [] : prev);
      if (!prev.has(index)) next.add(index);
      return next;
    });
  };

  const close = (index: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  };

  return (
    <ul className="mx-auto w-full max-w-[650px]">
      {items.map(({ question, answer }, i) => {
        const isOpen = open.has(i);
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;

        return (
          <li key={question}>
            <Reveal delay={i * 70}>
              <div className="border-b border-sand">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape" && isOpen) close(i);
                    }}
                    className="faq-question flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 py-4 text-left font-display text-statement font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <span>{question}</span>
                    <span aria-hidden="true" className="faq-star shrink-0" data-open={isOpen}>
                      <Image src="/images/objectives/star.webp" width={28} height={33} alt="" className="block h-auto w-7" />
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} className="faq-panel" data-open={isOpen}>
                  <div inert={!isOpen}>
                    <p className="pb-6 font-display text-lead text-ink/80">{answer}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
