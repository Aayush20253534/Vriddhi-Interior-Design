"use client";

import { useCallback, useRef, useState } from "react";
import { clamp, useScrollSequence } from "../../scroll-sequence";

const chapters = [
  { title: "The frontage", target: 0, text: "Twin arches sit beneath gold lettering. The deep blue frame draws the eye past the glass to the display inside." },
  { title: "Display shelves", target: .53, text: "Warm timber shelves carry the length of the shop. Above them, spotlights and pendants pick out the rows of glass jars." },
  { title: "Cabinet detail", target: .87, text: "At counter height the timber gives way to pale, veined cabinet fronts. A narrow dark trim makes the change in material easy to see." },
];

function Still({ name, alt, priority = false }) {
  return <img src={`/images/bakers/${name}-960.webp`}
    srcSet={`/images/bakers/${name}-540.webp 540w, /images/bakers/${name}-960.webp 960w`}
    sizes="(max-width: 760px) 82vw, 45vw" width="960" height="1200"
    loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" alt={alt} />;
}

// Coalesce fast wheel/touch updates into the next available decoded frame.
function seekFrame(video) {
  if (!video || video.readyState < 2 || video.seeking || !Number.isFinite(video.duration)) return;
  video.dataset.ready = "";
  const time = Number(video.dataset.fraction || 0) * Math.max(0, video.duration - 1 / 24);
  if (Math.abs(time-video.currentTime) > 1 / 30) video.currentTime = time;
}
function updateClip(video, fraction, wanted) {
  if (!video || !wanted) return;
  video.dataset.fraction = String(clamp(fraction));
  if (!video.getAttribute("src")) {
    video.preload = "auto";
    video.src = video.dataset.file;
    video.load();
  }
  seekFrame(video);
}
function Clip({ name, alt, videoRef, visited, active }) {
  return <div className={`study-plane clip-${name}`} aria-hidden={!active}>
    {visited && <Still name={name} alt={alt} />}
    <video ref={videoRef} data-file={`/images/bakers/${name}.mp4`} preload="none" muted playsInline aria-hidden="true"
      onLoadedData={e=>seekFrame(e.currentTarget)} onSeeked={e=>seekFrame(e.currentTarget)}
      onError={e=>e.currentTarget.removeAttribute("data-ready")} />
  </div>;
}

export default function BakersJourney() {
  const shelves = useRef(null), cabinet = useRef(null);
  const [chapter, setChapter] = useState(0);
  const [visited, setVisited] = useState(0);
  const [colour, setColour] = useState(false);
  const apply = useCallback((root,p,moving) => {
    const wipe = clamp((p - .015)/.245);
    root.style.setProperty("--drawing-edge", ((1-wipe)*100).toFixed(2)+"%");
    root.style.setProperty("--shelves", clamp((p-.32)/.075).toFixed(3));
    root.style.setProperty("--cabinet", clamp((p-.66)/.075).toFixed(3));
    root.style.setProperty("--chapter-progress", p.toFixed(4));
    const activeChapter = p < .358 ? 0 : p < .7 ? 1 : 2;
    setChapter(activeChapter);
    setVisited(last => Math.max(last, p > .63 ? 2 : p > .28 ? 1 : 0));
    setColour(wipe > .55);
    updateClip(shelves.current,(p-.375)/.275,moving && p>.295 && p<.745);
    updateClip(cabinet.current,(p-.715)/.285,moving && p>.64);
  }, []);
  const [section,jump] = useScrollSequence(apply);
  return <section className="bakery-journey" ref={section} aria-labelledby="bakery-title">
    <div className="journey-pin"><div className="journey-grid shell">
      <div className="journey-title"><p className="label">Commercial interiors</p>
        <h1 id="bakery-title">Bakers <em>Gallery.</em></h1>
      </div>
      <div className="journey-copy">
        <div className="chapter-note" key={chapter}>
          <h2>{chapters[chapter].title}</h2><p>{chapters[chapter].text}</p>
        </div>
        <div className="chapter-nav" role="group" aria-label="Choose a design chapter">
          {chapters.map((c,i)=><button key={c.title} onClick={()=>jump(c.target)} aria-pressed={chapter===i}>
            <span aria-hidden="true">0{i+1}</span>{c.title}
          </button>)}
        </div>
        <p className="scroll-instruction"><span className="motion-instruction">Scroll through the project, or </span><span>select a chapter.</span></p>
      </div>
      <figure className="study-figure">
        <div className="study-frame">
          <div className="study-plane drawing" aria-hidden={chapter!==0 || colour}><Still name="elevation" alt="Illustrated elevation of the twin-arched Bakers Gallery shopfront." priority /></div>
          <div className="study-plane colour-facade" aria-hidden={chapter!==0 || !colour}><Still name="facade" alt="Storefront study showing the arches and sign in blue and gold." /></div>
          <Clip name="shelves" alt="Display shelves and warm lighting inside Bakers Gallery." videoRef={shelves} visited={visited>=1} active={chapter===1} />
          <Clip name="cabinet" alt="Pale veined cabinet fronts below the dark-edged timber shelves." videoRef={cabinet} visited={visited>=2} active={chapter===2} />
        </div>
        <figcaption><span aria-live="polite">{chapter===0 ? (colour?"Storefront study":"Illustrated elevation") : "From the project footage"}</span>
          {chapter===0 && <button onClick={()=>jump(colour?0:.28)}>{colour?"See the drawing":"Reveal in colour"} <span aria-hidden="true">↔</span></button>}
        </figcaption>
      </figure>
    </div></div>
  </section>;
}
