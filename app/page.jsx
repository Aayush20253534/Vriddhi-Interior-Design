import { DesignDetails, RoomGallery } from "./components";
import { services, whatsapp } from "./project";

function Arrow({ diagonal = false }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? "↗︎" : "→"}</span>;
}

function Brand() {
  return <a className="brand" href="#top" aria-label="Vriddhi Interior Designer, home">
    <img src="/images/vriddhi-mark.webp" width="48" height="48" alt="" />
    <span>Vriddhi<small>Interior Designer</small></span>
  </a>;
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <header className="site-header" id="top">
        <div className="header-inner shell">
          <Brand />
          <nav aria-label="Main navigation"><a href="#project">The project</a><a href="#services">Services</a><a href="#studio">Studio</a></nav>
          <a className="header-chat" href={whatsapp()}>WhatsApp <Arrow diagonal /></a>
        </div>
      </header>
      <main id="content">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="rule" />Interior design studio <span className="dot">·</span> Prayagraj</p>
            <h1 id="hero-title">One home.<br /><em>Five moods.</em></h1>
            <p className="hero-intro">Step inside a Prayagraj residence, from the curves of its living room to the quiet blue of its guest bedroom.</p>
            <a className="primary-button" href="#project">Explore the project <span aria-hidden="true">↓</span></a>
            <p className="credit"><span>Designed by</span> Architect Shalini Kushvaha</p>
          </div>
          <RoomGallery />
        </section>
        <section className="project-section" id="project" aria-labelledby="project-title">
          <div className="shell"><DesignDetails /></div>
        </section>
        <section className="services-section shell" id="services" aria-labelledby="services-title">
          <div className="service-intro">
            <p className="eyebrow"><span className="rule" />Our services</p>
            <h2 id="services-title">What can we<br /><em>design for you?</em></h2>
            <p className="body-text">From a single kitchen to an entire home or workspace in Prayagraj.</p>
          </div>
          <div className="service-list">
            {services.map((service) => <details className="service" key={service.name}>
              <summary>{service.name}<span aria-hidden="true" /></summary>
              <div className="service-body"><p>{service.text}</p>
                <a className="inline-link" href={whatsapp(`Hi Vriddhi, I’m interested in ${service.name.toLowerCase()} in Prayagraj. Could we discuss my project?`)}>Enquire on WhatsApp <Arrow diagonal /></a>
              </div>
            </details>)}
          </div>
        </section>
      </main>
      <footer id="studio">
        <div className="shell">
          <div className="contact-layout">
            <div>
              <p className="eyebrow"><span className="rule" />The studio</p>
              <h2>Let’s talk about<br /><em>your space.</em></h2>
              <a className="contact-button" href={whatsapp()}>Chat on WhatsApp <Arrow diagonal /></a>
            </div>
            <address>
              <h3>Visit us in Prayagraj</h3>
              <p>Civil Lines, Hotstar Chauraha,<br />near Shree Radhey Showroom,<br />Prayagraj, Uttar Pradesh</p>
              <a className="phone" href="tel:+919307999738">+91 93079 99738</a>
            </address>
          </div>
          <div className="footer-line"><span>Vriddhi Interior Designer</span><a href="#top">Back to top ↑</a></div>
        </div>
      </footer>
    </>
  );
}
