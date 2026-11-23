"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
export { gsap, ScrollTrigger, useGSAP };
export const motionQuery = "(prefers-reduced-motion: no-preference)";
let scrollEngine;

export function moveTo(top) {
  if (scrollEngine) scrollEngine.scrollTo(top, {duration:.75});
  else window.scrollTo({top, behavior:matchMedia(motionQuery).matches ? "smooth" : "instant"});
}

export function ScrollClock() {
  const path = usePathname();
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(motionQuery + " and (pointer: fine)", () => {
      const engine = new Lenis({ autoRaf:false, lerp:.11, anchors:true });
      scrollEngine = engine;
      engine.on("scroll", ScrollTrigger.update);
      const tick = seconds => engine.raf(seconds * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      return () => { gsap.ticker.remove(tick); engine.destroy(); scrollEngine = undefined; };
    });
    let live = true;
    document.fonts.ready.then(() => { if (live) ScrollTrigger.refresh(); });
    return () => { live = false; media.revert(); };
  }, {dependencies:[path],revertOnUpdate:true});
  return null;
}

export function PageScene({children}) {
  const root = useRef(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(motionQuery, () => {
      const splits = [];
      for (const heading of root.current.querySelectorAll("[data-split]")) {
        splits.push(SplitText.create(heading,{type:"words",mask:"words",aria:"auto",
          onSplit(self) { return gsap.from(self.words,{yPercent:108, duration:.9, stagger:.055,ease:"power3.out",scrollTrigger:{trigger:heading,start:"top 95%",once:true}}); }
        }));
      }
      for (const frame of root.current.querySelectorAll("[data-parallax]")) {
        gsap.fromTo(frame.querySelector("img"),{yPercent:-3,scale:1.09},{yPercent:3,scale:1.09,ease:"none",scrollTrigger:{trigger:frame,start:"top bottom",end:"bottom top",scrub:true}});
      }
      for (const block of root.current.querySelectorAll("[data-reveal]")) {
        gsap.from(block,{y:24,opacity:.45,duration:.75,scrollTrigger:{trigger:block,start:"top 96%",once:true}});
      }
      return () => splits.forEach(split=>split.revert());
    });
    return () => media.revert();
  },{scope:root});
  return <div ref={root} className="route-scene">{children}</div>;
}
