import { SiteHeader } from "../../components";
import { whatsapp } from "../../project";
import BakersJourney from "./journey";
import "./study.css";

export const metadata = {
  title: "Bakers Gallery | Vriddhi Interior Designer",
  description: "Explore the blue storefront, timber display shelves and cabinetry in the Bakers Gallery design study with Vriddhi Interior Designer.",
};

export default function BakersGallery() {
  return <div id="top" className="case-page">
    <a className="skip" href="#content">Skip to content</a>
    <SiteHeader projectPage />
    <main id="content">
      <BakersJourney />
      <noscript><div className="shell static-details">{[["shelves","Display shelves"],["cabinet","Cabinet detail"]].map(([key,title])=>
        <figure key={key}><img src={`/images/bakers/${key}-540.webp`} alt={title} width="540" height="675" /><figcaption>{title}</figcaption></figure>)}</div></noscript>
    </main>
    <footer className="bakery-close"><div className="shell">
      <div><p className="label">Vriddhi Interior Designer · Prayagraj</p><h2>Planning <em>a shop?</em></h2>
        <a className="contact-button" href={whatsapp("Hi Vriddhi, I saw the Bakers Gallery project and would like to discuss a commercial interior in Prayagraj.")}>Discuss your project on WhatsApp <span className="out-arrow" aria-hidden="true" /></a></div>
      <div className="foot-line"><a href="/#project">← Explore the residence</a><a href="#top">Back to top ↑</a></div>
    </div></footer>
  </div>;
}
