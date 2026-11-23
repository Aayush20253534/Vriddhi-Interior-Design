import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./globals.css";
import "./editorial.css";
import "lenis/dist/lenis.css";
import {Navigation} from "./navigation";
import {ScrollClock} from "./motion";
import {Footer} from "./editorial";

export const metadata = {
  title: "Vriddhi Interior Designer | Interiors in Prayagraj",
  description: "Explore a private residence and the Bakers Gallery storefront with Vriddhi Interior Designer. Enquire about home and commercial interiors in Prayagraj.",
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><a className="skip" href="#content">Skip to content</a><Navigation/><ScrollClock/>{children}<Footer/></body></html>;
}
