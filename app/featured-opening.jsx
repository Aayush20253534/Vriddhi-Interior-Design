"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { clamp, useScrollSequence } from "./scroll-sequence";

export function FeaturedOpening() {
  const [project, setProject] = useState(0);
  const [coverReady, setCoverReady] = useState(false);
  const apply = useCallback((root, p, moving) => {
    if (p > .01) setCoverReady(true);
    const mix = clamp((p - .13) / .68);
    root.style.setProperty("--edge-reveal", ((1 - mix) * 100).toFixed(2) + "%");
    root.style.setProperty("--base-opacity", String(1 - clamp(mix * 1.65)));
    root.style.setProperty("--bakery-opacity", String(clamp((mix - .44) / .43)));
    root.style.setProperty("--copy-lift", (moving ? -mix * 50 : 0) + "px");
    root.style.setProperty("--zoom", (moving ? 1 + .085 * p : 1).toFixed(3));
    setProject(mix > .57 ? 1 : 0);
  }, []);
  const [section,jump] = useScrollSequence(apply);
  return <section className="opening project-opening" ref={section} aria-label="Featured interiors">
    <div className="opening-stage">
      <div className="opening-media"><picture>
        <source media="(max-width: 700px) and (orientation: portrait)" srcSet="/images/residence-portrait.webp" />
        <img src="/images/residence-1672.webp" srcSet="/images/residence-1080.webp 1080w, /images/residence-1672.webp 1672w" sizes="100vw" alt="Visualisation of the living room’s curved ceiling, fluted timber divider and ivory seating." width="1672" height="941" fetchPriority="high" />
      </picture></div>
      <div className="opening-shade" />
      <div className="title-block shell" inert={project!==0}>
        <p className="label">Interior design studio <span>·</span> Prayagraj</p>
        <h1 data-split><span><b>Ek Ghar.</b></span><span><em>Paanch Rang.</em></span></h1>
        <p className="hero-summary">One home, five colours. A private residence by<br className="wide-only" /> architect Shalini Kushvaha.</p>
        <Link className="hero-link" href="/projects/residence/">Explore the residence <span aria-hidden="true">↓</span></Link>
      </div>
      <div className="bakery-opening" inert={project!==1}>
        <div className="bakery-cover">{coverReady && <img src="/images/bakers/front-window-960.webp" srcSet="/images/bakers/front-window-540.webp 540w, /images/bakers/front-window-960.webp 960w" sizes="(max-width: 760px) 80vw, 50vw" loading="lazy" alt="Bakers Gallery storefront study with illuminated gold lettering above two navy arches." />}</div>
        <div className="bakery-title shell">
          <p className="label">Commercial interiors</p><h2>Bakers<br /><em>Gallery.</em></h2>
          <p className="hero-summary">From the blue storefront to the shelves within.</p>
          <Link className="hero-link" href="/projects/bakers-gallery/">Enter the project <span className="out-arrow" aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="opening-rail shell">
        <div className="project-switch" role="group" aria-label="Choose a featured project">
          <button aria-pressed={project===0} onClick={()=>jump(0)}>Residence</button>
          <button onFocus={()=>setCoverReady(true)} onPointerEnter={()=>setCoverReady(true)} aria-pressed={project===1} onClick={()=>jump(.94)}>Bakers Gallery</button>
        </div>
        <span className="hero-caption">{project===0?"Living room · Studio visualisation":"Bakers Gallery · Storefront study"}</span>
      </div>
    </div>
  </section>;
}
