"use client";

import { useCallback, useRef, useState, useEffect } from "react";
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

// One bounded atlas per active chapter. Drawing neighbouring frames avoids decoder
// seeks during a rapid change of scroll direction.
function Clip({name,alt,videoRef,visited,active}) {
  const canvas=useRef(null);
  useEffect(()=>{
    if (!visited || !matchMedia("(prefers-reduced-motion: no-preference) and (min-height: 640px)").matches) return;
    const el=canvas.current;
    const width=el.clientWidth<390?320:480;
    const height=width*1.25;
    el.width=width; el.height=height;
    const ctx=el.getContext("2d");
    const atlas=new Image();
    let last=-1;
    function draw() {
      const f=clamp(videoRef.current.progress)*17;
      if (!ctx || !atlas.naturalWidth || f===last) return;
      const index=Math.floor(f);
      function frame(i){ctx.drawImage(atlas,(i%6)*width,Math.floor(i/6)*height,width,height,0,0,width,height);}
      frame(index);
      if(index<17){ctx.globalAlpha=f-index;frame(index+1);ctx.globalAlpha=1;}
      last=f;el.dataset.frame=String(index);
    }
    videoRef.current.draw=draw;
    atlas.onload=draw;atlas.src=`/images/sequence/${name}-${width}.webp`;
    return ()=>{atlas.onload=null;videoRef.current.draw=null;delete el.dataset.frame;};
  },[visited,name,videoRef]);
  return <div className={`study-plane clip-${name}`} aria-hidden={!active}>
    {visited && <Still name={name} alt={alt}/>}<canvas ref={canvas} aria-hidden="true"/>
  </div>;
}

export default function BakersJourney() {
  const shelves = useRef({progress:0}), cabinet = useRef({progress:0});
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
    shelves.current.progress=(p-.375)/.275;
    cabinet.current.progress=(p-.715)/.285;
    if(moving && activeChapter===1) shelves.current.draw?.();
    if(moving && activeChapter===2) cabinet.current.draw?.();
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
