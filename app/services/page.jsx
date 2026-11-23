import Link from "next/link";
import {Heading,Photo} from "../editorial";
import {services} from "../project";
export const metadata={title:"Interior design services in Prayagraj | Vriddhi",description:"Full-home interiors, modular kitchens, renovations, commercial interiors and design consultations in Prayagraj."};
const images=[["living","The curved living-room feature wall"],["fluted-glass","Ribbed glass cabinet doors"],["display-niche","A lit timber niche"],["bakers/facade","Bakers Gallery storefront study"],["primary","Joinery in the primary bedroom"]];
export default function Services(){return <main className="folio-page shell" id="content"><Heading label="Services · Prayagraj" first="Design" last="services."/><div className="service-index">{services.map((s,i)=><article key={s.name}><div className="service-thumb" data-parallax><Photo name={images[i][0]} alt={images[i][1]} sizes="(max-width:600px) 30vw, 22vw"/></div><div data-reveal><h2>{s.name}</h2><p>{s.text}</p><Link href={`/contact/?service=${encodeURIComponent(s.name)}`} className="text-link">Discuss this service →</Link></div></article>)}</div></main>;}
