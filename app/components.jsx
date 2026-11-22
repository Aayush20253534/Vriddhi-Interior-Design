"use client";

import { useState } from "react";
import { details, rooms } from "./project";

export function ProjectImage({ item, priority = false, sizes, ...props }) {
  return (
    <img src={`/images/${item.file}-1080.webp`}
      srcSet={`/images/${item.file}-540.webp 540w, /images/${item.file}-1080.webp 1080w`}
      sizes={sizes} alt={item.alt} loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"} decoding="async"
      style={{ objectPosition: item.position }} {...props} />
  );
}

export function RoomGallery() {
  const [index, setIndex] = useState(0);
  const room = rooms[index];
  function move(step) {
    setIndex((current) => (current + step + rooms.length) % rooms.length);
  }
  return (
    <section className="gallery" aria-label="Explore five rooms" aria-roledescription="carousel">
      <div className="hero-image">
        <ProjectImage key={room.file} item={room} priority sizes="(max-width: 760px) 100vw, 58vw" />
      </div>
      <div className="gallery-bar">
        <div aria-live="polite" className="room-caption">
          <span className="index"><b>{String(index + 1).padStart(2, "0")}</b> / 05</span>
          <span className="room-name">{room.name}</span>
          <span className="palette">{room.palette}</span>
        </div>
        <div className="gallery-actions">
          <button type="button" onClick={() => move(-1)} aria-label="Previous room"><span aria-hidden="true">←</span></button>
          <button type="button" onClick={() => move(1)} aria-label="Next room"><span aria-hidden="true">→</span></button>
        </div>
      </div>
    </section>
  );
}

export function DesignDetails() {
  const [selected, setSelected] = useState(0);
  const detail = details[selected];
  return (
    <div className="detail-layout">
      <figure className="detail-photo">
        <div className="detail-frame">
          <ProjectImage key={detail.file} item={detail} sizes="(max-width: 760px) 92vw, 43vw" />
        </div>
        <figcaption aria-live="polite">{detail.room}<span aria-hidden="true">/</span>{detail.name}</figcaption>
      </figure>
      <div className="detail-copy">
        <p className="eyebrow"><span className="rule" />The featured residence</p>
        <h2 id="project-title">Ek Ghar.<br /><em>Paanch Rang.</em></h2>
        <p className="body-text">One home, five colours. Look closer at the lighting, joinery and storage in this Prayagraj residence.</p>
        <div className="details-list">
          {details.map((item, i) => (
            <div className="detail-row" key={item.file}>
              <button type="button" aria-expanded={i === selected} aria-controls={`detail-${i}`} onClick={() => setSelected(i)}>
                {item.name}<span aria-hidden="true">{i === selected ? "−" : "+"}</span>
              </button>
              <p id={`detail-${i}`} hidden={i !== selected}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
