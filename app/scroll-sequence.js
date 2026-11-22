"use client";

import { useEffect, useRef } from "react";

export const clamp = (n) => Math.max(0, Math.min(1, n));

// Scroll and chapter buttons use the same progress, including after a resize.
export function useScrollSequence(apply) {
  const section = useRef(null);
  const active = useRef(false);
  const position = useRef(0);

  useEffect(() => {
    const root = section.current;
    const query = matchMedia("(prefers-reduced-motion: no-preference) and (min-height: 640px)");
    let frame = 0;
    let lastProgress = null;
    function paint() {
      frame = 0;
      const travel = root.offsetHeight - root.firstElementChild.offsetHeight;
      const progress = active.current && travel > 0 ? clamp(-root.getBoundingClientRect().top / travel) : position.current;
      if (progress === lastProgress) return;
      lastProgress = progress;
      position.current = progress;
      apply(root, progress, active.current);
    }
    function queue() { if (!frame) frame = requestAnimationFrame(paint); }
    function configure() {
      active.current = query.matches;
      lastProgress = null;
      window.removeEventListener("scroll", queue);
      if (active.current) window.addEventListener("scroll", queue, {passive:true});
      root.toggleAttribute("data-scroll", active.current);
      paint();
    }
    const resize = new ResizeObserver(queue);
    resize.observe(root.firstElementChild);
    configure();
    query.addEventListener("change", configure);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      query.removeEventListener("change", configure);
      window.removeEventListener("scroll", queue);
    };
  }, [apply]);

  function jump(target) {
    const root = section.current;
    if (!active.current) {
      position.current = target;
      apply(root, target, false);
      return;
    }
    const start = scrollY + root.getBoundingClientRect().top;
    window.scrollTo({ top: start + target * (root.offsetHeight - root.firstElementChild.offsetHeight), behavior: "smooth" });
  }
  return [section, jump];
}
