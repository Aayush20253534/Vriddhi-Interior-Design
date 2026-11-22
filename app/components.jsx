"use client";

import { useEffect, useRef, useState } from "react";
import { details, rooms, whatsapp } from "./project";

const navigation = [["Residence", "#project"], ["Design details", "#details"], ["Services", "#services"], ["Studio", "#studio"]];

export function SiteHeader() {
  const header = useRef(null);
  const menu = useRef(null);
  const toggle = useRef(null);
  useEffect(() => {
    const hero = document.querySelector(".opening");
    function update() {
      header.current.toggleAttribute("data-solid", hero.getBoundingClientRect().bottom < 90);
    }
    function escape(event) {
      if (event.key === "Escape" && menu.current.open) {
        menu.current.open = false;
        toggle.current.focus();
      }
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("keydown", escape);
    };
  }, []);
  function links() {
    return navigation.map(([label, target]) => <a href={target} key={target} onClick={() => { menu.current.open = false; }}>{label}</a>);
  }
  return <header className="mast" ref={header}>
    <div className="mast-inner shell">
      <a className="brand" href="#top" aria-label="Vriddhi Interior Designer, home">
        <img src="/images/vriddhi-mark.webp" width="48" height="48" alt="" />
        <span>Vriddhi<small>Interior Designer</small></span>
      </a>
      <nav className="desk-nav" aria-label="Main navigation">{links()}</nav>
      <a className="enquire" href={whatsapp()}>Enquire <span className="out-arrow" aria-hidden="true" /></a>
      <details className="mobile-nav" ref={menu}>
        <summary aria-label="Navigation menu" ref={toggle}><i /><i /></summary>
        <nav aria-label="Mobile navigation">{links()}</nav>
      </details>
    </div>
  </header>;
}

// The document stays readable before hydration and when reduced motion is enabled.
export function PageMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const stage = document.querySelector(".opening");
    let frame = 0;
    let observer;
    function paint() {
      frame = 0;
      const distance = -stage.getBoundingClientRect().top;
      if (distance > stage.offsetHeight) return;
      const progress = Math.min(1, Math.max(0, distance / (stage.offsetHeight * .72)));
      stage.style.setProperty("--drift", (progress * 8).toFixed(2) + "%");
      stage.style.setProperty("--zoom", (1 + progress * .1).toFixed(3));
      stage.style.setProperty("--copy-lift", (-progress * 48).toFixed(1) + "px");
    }
    function queue() { if (!frame) frame = requestAnimationFrame(paint); }
    function setup() {
      observer?.disconnect();
      window.removeEventListener("scroll", queue);
      cancelAnimationFrame(frame);
      frame = 0;
      if (!preference.matches) {
        for (const el of document.querySelectorAll("[data-reveal]")) el.removeAttribute("data-pending");
        stage.removeAttribute("style");
        return;
      }
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(entries => {
          for (const entry of entries) if (entry.isIntersecting) {
            entry.target.removeAttribute("data-pending");
            observer.unobserve(entry.target);
          }
        }, { threshold: .08 });
        for (const el of document.querySelectorAll("[data-reveal]")) {
          if (el.getBoundingClientRect().top >= innerHeight) el.setAttribute("data-pending", "");
          observer.observe(el);
        }
      }
      paint();
      window.addEventListener("scroll", queue, { passive: true });
    }
    setup();
    preference.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", setup);
      window.removeEventListener("scroll", queue);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}

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

  useEffect(() => {
    const root = scene.current, view = viewport.current, strip = track.current;
    const cinema = window.matchMedia("(min-width: 980px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)");
    let travel = 0, frame = 0;
    function paint() {
      frame = 0;
      const offset = cinema.matches ? Math.min(travel, Math.max(0, -root.getBoundingClientRect().top)) : view.scrollLeft;
      if (cinema.matches) strip.style.transform = `translate3d(${-offset}px,0,0)`;
      root.style.setProperty("--travel", travel > 0 ? offset / travel : 1);
      const start = offset < 2, end = offset >= travel - 2;
      setLimits(last => last.start === start && last.end === end ? last : {start, end});
    }
    function queue() { if (!frame) frame = requestAnimationFrame(paint); }
    function measure() {
      if (cinema.matches && !root.hasAttribute("data-pinned")) view.scrollLeft = 0;
      root.toggleAttribute("data-pinned", cinema.matches);
      travel = Math.max(0, strip.scrollWidth - view.clientWidth);
      if (cinema.matches) {
        root.style.height = (root.firstElementChild.offsetHeight + travel) + "px";
      } else {
        root.style.height = "";
        strip.style.transform = "";
      }
      paint();
    }
    const resize = new ResizeObserver(measure);
    resize.observe(view);
    resize.observe(root.firstElementChild);
    cinema.addEventListener("change", measure);
    window.addEventListener("scroll", queue, {passive:true});
    view.addEventListener("scroll", queue, {passive:true});
    measure();
    return () => {
      resize.disconnect();
      cinema.removeEventListener("change", measure);
      window.removeEventListener("scroll", queue);
      view.removeEventListener("scroll", queue);
      cancelAnimationFrame(frame);
    };
  }, []);

  function step(direction) {
    const root = scene.current, view = viewport.current, strip = track.current;
    const advance = strip.children[1].offsetLeft - strip.children[0].offsetLeft;
    const options = { behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" };
    if (root.hasAttribute("data-pinned")) {
      const top = window.scrollY + root.getBoundingClientRect().top;
      const travel = Math.min(Math.max(window.scrollY - top + direction * advance, 0), strip.scrollWidth - view.clientWidth);
      window.scrollTo({top:top + travel, ...options});
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
