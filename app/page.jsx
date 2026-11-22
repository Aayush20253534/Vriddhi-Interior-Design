import { DesignDetails, PageMotion, RoomGallery, SiteHeader } from "./components";
import { FeaturedOpening } from "./featured-opening";
import { services, whatsapp } from "./project";

export default function Home() {
  return <div id="top">
    <a className="skip" href="#content">Skip to content</a>
    <SiteHeader />
    <main id="content">
      <FeaturedOpening />
      <RoomGallery />
      <DesignDetails />
      <section className="services shell" id="services" aria-labelledby="services-title">
        <div className="service-intro" data-reveal>
          <p className="label">Our services</p><h2 id="services-title">What can we<br /><em>design for you?</em></h2>
          <p className="lead">From a single kitchen to an entire home or workspace in Prayagraj.</p>
        </div>
        <div className="service-list">{services.map(service =>
          <details className="service" key={service.name}>
            <summary>{service.name}<span aria-hidden="true">+</span></summary>
            <div><p>{service.text}</p>{service.name === "Commercial interiors" && <a className="bakery-service-link" href="/projects/bakers-gallery/">View Bakers Gallery →</a>}<a href={whatsapp(`Hi Vriddhi, I’m interested in ${service.name.toLowerCase()} in Prayagraj. Could we discuss my project?`)}>Enquire on WhatsApp <span className="out-arrow" aria-hidden="true" /></a></div>
          </details>)}</div>
      </section>
    </main>
    <footer id="studio"><div className="shell">
      <div className="contact">
        <div data-reveal><p className="label">The studio</p><h2>Let’s talk about<br /><em>your space.</em></h2>
          <a className="contact-button" href={whatsapp()}>Chat on WhatsApp <span className="out-arrow" aria-hidden="true" /></a></div>
        <address><h3>Visit us in Prayagraj</h3><p>Civil Lines, Hotstar Chauraha,<br />near Shree Radhey Showroom,<br />Prayagraj, Uttar Pradesh</p><a href="tel:+919307999738">+91 93079 99738</a></address>
      </div>
      <div className="foot-line"><span>Vriddhi Interior Designer</span><a href="#top">Back to top ↑</a></div>
    </div></footer>
    <PageMotion />
  </div>;
}
