"use client";

import { useRef, useState } from "react";
import {gsap,useGSAP,moveTo,motionQuery} from "./motion";
import { details, rooms } from "./project";

function ProjectImage({ item, sizes }) {
  return <img src={`/images/${item.file}-1080.webp`}
    srcSet={`/images/${item.file}-540.webp 540w, /images/${item.file}-1080.webp 1080w`}
    sizes={sizes} alt={item.alt} loading="lazy" decoding="async" style={{objectPosition: item.position}} />;
}

export function RoomGallery() {
  const scene = useRef(null);
  const viewport = useRef(null);
  const track = useRef(null);
  const [limits, setLimits] = useState({ start: true, end: false });

  const pin=useRef(null);
  useGSAP(()=>{
    const root=scene.current, view=viewport.current, strip=track.current;
    const media=gsap.matchMedia();
    media.add({wide:motionQuery+" and (min-width:980px) and (min-height:680px)",always:"all"},({conditions})=>{
      const distance=()=>Math.max(0,strip.scrollWidth-view.clientWidth);
      function status(value){root.style.setProperty("--travel",value);const start=value<.002,end=value>.998;setLimits(old=>old.start===start&&old.end===end?old:{start,end});}
      if(conditions.wide){
        root.dataset.pinned=""; view.scrollLeft=0;
        const animation=gsap.to(strip,{x:()=>-distance(),ease:"none",scrollTrigger:{
          trigger:root,pin:root.firstElementChild,start:"top top",end:()=>"+="+distance(),scrub:.35,invalidateOnRefresh:true,anticipatePin:1,onUpdate:t=>status(t.progress)
        }});
        pin.current=animation.scrollTrigger;status(pin.current.progress);
        return ()=>{pin.current=null;delete root.dataset.pinned;};
      }
      const update=()=>status(view.scrollLeft/Math.max(1,distance()));
      const observer=new ResizeObserver(update);observer.observe(view);view.addEventListener("scroll",update,{passive:true});update();
      return ()=>{observer.disconnect();view.removeEventListener("scroll",update);};
    });
    return ()=>media.revert();
  },{scope:scene});

  function step(direction) {
    const root = scene.current, view = viewport.current, strip = track.current;
    const advance = strip.children[1].offsetLeft - strip.children[0].offsetLeft;
    const options = { behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" };
    if (root.hasAttribute("data-pinned")) {
      const top = pin.current.start;
      const distance = strip.scrollWidth - view.clientWidth;
      const current = Math.min(distance, Math.max(0, window.scrollY - top));
      const travel = Math.min(distance, Math.max(0, current + direction * advance));
      moveTo(top + travel);
    } else view.scrollBy({left: direction * advance, ...options});
  }

  return <section id="project" aria-labelledby="project-title" className="tour" ref={scene}>
    <div className="tour-pin">
      <div className="tour-heading shell">
        <div><p className="label">The featured residence</p><h2 id="project-title">Inside <em>the home.</em></h2></div>
        <div className="tour-nav" aria-label="Room gallery controls">
          <button onClick={() => step(-1)} disabled={limits.start} aria-label="Previous rooms">←</button>
          <button onClick={() => step(1)} disabled={limits.end} aria-label="Next rooms">→</button>
        </div>
      </div>
      <div className="rail-window" ref={viewport} role="region" aria-label="Five rooms in the residence" tabIndex={0}
        onKeyDown={e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); step(e.key === "ArrowRight" ? 1 : -1); } }}>
        <div className="room-track" ref={track}>{rooms.map((room,i) =>
          <figure className="room" key={room.file}>
            <div className="room-photo"><ProjectImage item={room} sizes="(max-width: 650px) 81vw, 35vw" /></div>
            <figcaption><span className="room-number">{String(i+1).padStart(2,"0")}</span><div><h3>{room.name}</h3><p>{room.palette}</p></div></figcaption>
          </figure>)}
        </div>
      </div>
      <div className="gallery-foot shell"><span className="browse-desktop">Scroll to explore</span><span className="browse-touch">Browse the rooms</span><i aria-hidden="true" /><a href="#details">Design details ↓</a></div>
    </div>
  </section>;
}

export function DesignDetails() {
  const [selected, setSelected] = useState(0);
  const detail = details[selected];
  return <section id="details" className="details-section" aria-labelledby="detail-title">
    <div className="detail-layout shell">
      <div className="detail-copy" data-reveal>
        <p className="label">Material study</p><h2 id="detail-title">The finer<br /><em>details.</em></h2>
        <p className="lead">Follow the light across a display niche, through ribbed glass and into the cabinetry.</p>
        <div className="details-list">{details.map((item,i) =>
          <div className="detail-row" key={item.file}>
            <button aria-expanded={i===selected} aria-controls={`note-${i}`} onClick={()=>setSelected(i)}>{item.name}<span aria-hidden="true">{selected===i?"−":"+"}</span></button>
            <p id={`note-${i}`} hidden={i!==selected}>{item.text}</p>
          </div>)}</div>
      </div>
      <figure className="detail-figure"><div className="detail-photo"><ProjectImage key={detail.file} item={detail} sizes="(max-width: 760px) 90vw, 53vw" /></div>
        <figcaption aria-live="polite"><span>{detail.room}</span><i />{detail.name}</figcaption>
      </figure>
    </div>
  </section>;
}
