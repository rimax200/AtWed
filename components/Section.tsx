import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  labelledBy?: string;
  className?: string;
};

export default function Section({ children, id, labelledBy, className = "" }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`scroll-mt-(--nav-h) py-(--section-y) ${className}`}>
      {children}
    </section>
  );
}
