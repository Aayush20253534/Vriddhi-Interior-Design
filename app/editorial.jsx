import Link from "next/link";

export const projects=[
  {slug:"residence",name:"Ek Ghar. Paanch Rang.",type:"Residential",image:"living",alt:"Blush and ivory living-room wall beneath a curved illuminated ceiling.",line:"Five rooms, each with its own colour."},
  {slug:"bakers-gallery",name:"Bakers Gallery",type:"Commercial",image:"bakers/front-window",alt:"Navy arched bakery windows framed in gold lettering.",line:"A pair of blue arches opens onto warm timber displays."},
];
export function Photo({name,alt,sizes="(max-width: 760px) 92vw, 48vw",priority=false}){
  const large=name.startsWith("bakers/")?960:1080;
  return <img src={`/images/${name}-${large}.webp`} srcSet={`/images/${name}-540.webp 540w, /images/${name}-${large}.webp ${large}w`} sizes={sizes} alt={alt} loading={priority?"eager":"lazy"} decoding="async"/>;
}
export function Plates(){return <div className="plates">{projects.map(p=><Link className="plate" key={p.slug} href={`/projects/${p.slug}/`}>
  <div className="plate-photo" data-parallax><Photo name={p.image} alt={p.alt}/><span aria-hidden="true"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 14 14 4M4 4h10v10"/></svg></span></div>
  <span className="plate-type">{p.type}</span><h3>{p.name}</h3><p>{p.line}</p></Link>)}</div>;}
export function Heading({label,first,last,copy}){return <header className="folio-heading"><p className="label">{label}</p><h1 data-split>{first} <em>{last}</em></h1>{copy&&<p className="lead">{copy}</p>}</header>;}
export function Footer(){return <footer className="global-foot"><div className="shell"><div><span className="footer-brand">Vriddhi</span><p>Interior Designer · Prayagraj</p></div><nav aria-label="Footer"><Link href="/portfolio/">Portfolio</Link><Link href="/services/">Services</Link><Link href="/studio/">Studio</Link><Link href="/contact/">Contact</Link></nav><a href="tel:+919307999738">+91 93079 99738</a></div></footer>;}
export function NextProject({index}){const p=projects[index];return <aside className="next-project"><Link className="shell" href={`/projects/${p.slug}/`}><span className="label">Next project</span><strong>{p.name}</strong><span aria-hidden="true">→</span></Link></aside>;}
