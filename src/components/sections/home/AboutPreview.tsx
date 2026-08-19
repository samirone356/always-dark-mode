import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import portraitAsset from "@/assets/portrait-cutout.png.asset.json";

export function AboutPreview() {
  return (
    <section className="w-full bg-background py-16 px-4 sm:px-8 md:px-12 text-foreground select-none">
      <div className="mx-auto max-w-6xl">
        <div className="relative rounded-2xl bg-card p-8 sm:p-12 md:p-14 border border-border shadow-[var(--shadow-glow)] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column (5 cols) */}
            <div className="md:col-span-5 flex flex-col justify-center items-start">
              {/* Logo Prefix */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-end gap-[2px] opacity-90">
                  <span className="size-1 rounded-full bg-foreground mb-[1px]" />
                  <div className="flex flex-col gap-[2px]">
                    <span className="size-1 rounded-full bg-foreground" />
                    <span className="size-1 rounded-full bg-foreground" />
                  </div>
                </div>
                <div className="grid place-items-center rounded-[6px] bg-foreground px-2.5 py-0.5 shadow-sm">
                  <span className="font-['Oswald',sans-serif] text-sm font-bold text-background">
                    MS
                  </span>
                </div>
                <div className="flex flex-col text-start font-sans text-[9px] font-black tracking-[0.2em] text-foreground leading-tight uppercase">
                  <span>MOSTAFA</span>
                  <span>SAMIR</span>
                </div>
              </div>

              {/* Headline */}
              <h2 className="font-['Oswald',sans-serif] text-4xl sm:text-5xl font-bold text-card-foreground leading-[1.0] mb-4">
                4+ Years of
                <br />
                Full Stack Excellence
              </h2>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-card-foreground/85 leading-relaxed mb-6 max-w-sm">
                Senior Full Stack Engineer specializing in scaling marketplace throughput by 300%
                using .NET 8, Clean Architecture & Next.js.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3 text-primary-foreground shadow-md transition-transform hover:scale-105"
                >
                  <span className="font-sans text-xs font-black tracking-[0.2em] uppercase">
                    ABOUT ME
                  </span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </Link>
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-3 rounded-xl bg-background px-6 py-3 shadow-md border border-border transition-transform hover:scale-105"
                >
                  <span className="font-sans text-xs font-black tracking-[0.2em] text-foreground uppercase">
                    VIEW CASES
                  </span>
                  <ArrowRight className="size-4 text-foreground transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </Link>
              </div>
            </div>

            {/* Right Column portrait (7 cols) */}
            <div className="md:col-span-7">
              <div className="relative mx-auto flex max-w-md items-end justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-primary/20 via-background to-background shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
                <div className="pointer-events-none absolute inset-x-6 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
                <img
                  src={portraitAsset.url}
                  alt="Portrait of Mostafa Samir"
                  width={861}
                  height={768}
                  loading="lazy"
                  className="relative z-10 w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
