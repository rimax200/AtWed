"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  { id: "about", label: "About" },
  { id: "vision-mission", label: "Vision & Mission" },
  { id: "objectives", label: "Objectives" },
  { id: "join-us", label: "Join Us" },
  { id: "convener", label: "Convener" },
  { id: "gallery", label: "Gallery" },
  { id: "faq", label: "FAQ" },
];

const linkClass =
  "relative block font-display text-nav uppercase text-ink transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown aria-[current=true]:text-brown " +
  "after:absolute after:inset-x-[9px] after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-brown after:transition-transform aria-[current=true]:after:scale-x-100";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Background after ~40px of scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active link: the section crossing a thin band at the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) setActive(id);
          else setActive((current) => (current === id ? "" : current));
        }
      },
      { rootMargin: "-45% 0px -55% 0px" },
    );
    for (const { id } of links) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Mobile menu: scroll lock, Escape, focus, close on desktop resize
  useEffect(() => {
    if (!open) return;

    document.documentElement.classList.add("menu-open");
    // Visibility only flips once the transition has started, so focus a tick later
    const focusTimer = setTimeout(
      () => panelRef.current?.querySelector("a")?.focus(),
      50,
    );

    const close = () => setOpen(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        buttonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      // Keep focus inside button + panel links
      const items = [
        buttonRef.current,
        ...(panelRef.current?.querySelectorAll("a") ?? []),
      ].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = () => desktop.matches && close();

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      clearTimeout(focusTimer);
      document.documentElement.classList.remove("menu-open");
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);

  const showBackground = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-(--nav-h)">
      {/* Background fades with opacity only */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b border-sand bg-white/85 backdrop-blur-sm transition-opacity duration-300 ${
          showBackground ? "opacity-100" : "opacity-0"
        }`}
      />

      <nav aria-label="Primary" className="relative mx-auto flex h-full max-w-(--container-max) items-center justify-end px-(--gutter) md:justify-center">
        <ul className="hidden gap-x-[clamp(0.5rem,1.1vw+0.75rem,2rem)] md:flex">
          {links.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`${linkClass} px-[9px] py-2`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex size-11 items-center justify-center text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown md:hidden"
        >
          <span className="relative block h-3.5 w-6" aria-hidden="true">
            <span className={`absolute top-0 left-0 h-px w-full bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute top-[7px] left-0 h-px w-full bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute top-[14px] left-0 h-px w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {/* Backdrop: data-lenis-prevent keeps Lenis from scrolling the page behind the menu */}
      <div
        data-lenis-prevent
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-x-0 top-(--nav-h) bottom-0 bg-black/20 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="mobile-menu"
        ref={panelRef}
        data-lenis-prevent
        inert={!open}
        className={`absolute inset-x-0 top-full max-h-[calc(100dvh-var(--nav-h))] overflow-y-auto border-b border-sand bg-white transition-[opacity,transform,visibility] duration-300 md:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <ul className="px-(--gutter) py-2">
          {links.map(({ id, label }) => (
            <li key={id} className="border-b border-sand/60 last:border-b-0">
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`${linkClass} py-4 text-eyebrow after:inset-x-0 after:bottom-3`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
