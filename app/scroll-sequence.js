"use client";
import { useRef } from "react";
import { gsap,useGSAP,moveTo,motionQuery } from "./motion";
export const clamp = n => Math.max(0, Math.min(1,n));

export function useScrollSequence(apply) {
  const section = useRef(null);
  const trigger = useRef(null);
  useGSAP(() => {
    const root=section.current, media=gsap.matchMedia();
    media.add({cinema: motionQuery+" and (min-height: 640px)",always:"all"}, context => {
      const enabled=context.conditions.cinema;
      apply(root,0,enabled);
      if (!enabled) return;
      root.dataset.scroll="";
      const playhead={p:0};
      const tween=gsap.to(playhead,{p:1,ease:"none",onUpdate:()=>apply(root,playhead.p,true),
        scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.32,invalidateOnRefresh:true}});
      trigger.current=tween.scrollTrigger;
      return () => { delete root.dataset.scroll; trigger.current=null; };
    });
    return () => media.revert();
  },{scope:section,dependencies:[apply],revertOnUpdate:true});
  function jump(p) {
    const t=trigger.current;
    if (t) moveTo(t.start+p*(t.end-t.start));
    else apply(section.current,p,false);
  }
  return [section,jump];
}
