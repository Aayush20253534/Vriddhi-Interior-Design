import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./globals.css";

export const metadata = {
  title: "Vriddhi Interior Designer | Interiors in Prayagraj",
  description: "Explore a Prayagraj home by Vriddhi Interior Designer. Enquire about full-home interiors, modular kitchens, renovations, commercial spaces and design consultations.",
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
