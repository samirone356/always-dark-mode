import { useEffect, useRef, useState, type ReactNode } from "react";
import type { DotLottie } from "@lottiefiles/dotlottie-react";

/**
 * Performance-first Lottie wrapper.
 *
 * - The player bundle *and* the animation JSON are code-split and only fetched
 *   once the element is close to the viewport (IntersectionObserver, 200px margin).
 * - Playback pauses whenever the element scrolls out of view or the tab is hidden,
 *   so an idle animation never burns a rAF loop.
 * - `prefers-reduced-motion` short-circuits everything: we render the static
 *   fallback and never download the animation at all.
 * - SSR-safe: nothing loads during render, so there is no hydration mismatch.
 */
export function LottieIcon({
  src,
  loop = true,
  className,
  fallback = null,
  speed = 1,
  playOnce = false,
}: {
  /** URL of the animation JSON/.lottie, e.g. `import url from "@/assets/lottie/x.json?url"` */
  src: string;
  loop?: boolean;
  className?: string;
  /** Static visual shown before load, and permanently when motion is reduced. */
  fallback?: ReactNode;
  speed?: number;
  /** Play a single time when first revealed (no loop, no replay). */
  playOnce?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<DotLottie | null>(null);
  const playedRef = useRef(false);
  const [Player, setPlayer] = useState<
    typeof import("@lottiefiles/dotlottie-react").DotLottieReact | null
  >(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible && !loadingRef.current) {
          loadingRef.current = true;
          void import("@lottiefiles/dotlottie-react").then((lib) => {
            if (!cancelled) setPlayer(() => lib.DotLottieReact);
          });
        }
        const p = playerRef.current;
        if (!p) return;
        if (visible) {
          if (playOnce && playedRef.current) return;
          playedRef.current = true;
          p.play();
        } else {
          p.pause();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(host);

    const onVisibility = () => {
      const p = playerRef.current;
      if (!p) return;
      document.hidden ? p.pause() : p.play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [playOnce]);

  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      {Player ? (
        <Player
          src={src}
          loop={playOnce ? false : loop}
          autoplay
          speed={speed}
          dotLottieRefCallback={(d) => {
            playerRef.current = d;
          }}
          className="size-full"
          renderConfig={{ autoResize: true, freezeOnOffscreen: true }}
        />
      ) : (
        fallback
      )}
    </div>
  );
}
