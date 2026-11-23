import Link from "next/link";
import {FeaturedOpening} from "./featured-opening";
import {Plates,Photo} from "./editorial";
export default function Home(){return <main id="content"><FeaturedOpening/><section className="editorial-block shell" id="project"><div className="section-head"><div><p className="label">Portfolio</p><h2 data-split>Selected <em>work.</em></h2></div><Link className="text-link" href="/portfolio/">View portfolio →</Link></div><Plates/></section>
<section className="home-studio"><div className="shell split-editorial"><div className="tall-photo" data-parallax><Photo name="display-niche" alt="Light grazing a ribbed display niche."/></div><div data-reveal><p className="label">The Prayagraj studio</p><h2>Light, colour<br/>and <em>joinery.</em></h2><p>Explore the decisions behind Vriddhi’s residential and commercial interiors.</p><Link className="text-link" href="/studio/">Visit the studio →</Link></div></div></section></main>;}
