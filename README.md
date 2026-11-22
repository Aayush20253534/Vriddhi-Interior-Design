# Vriddhi Interior Designer

A static Next.js portfolio for the interior design studio in Prayagraj.

![Desktop opening](docs/homepage.webp)

[Watch the scroll preview](docs/scroll-preview.webp) · [See the phone layout](docs/mobile.webp)

## The residence

The opening uses landscape and portrait architectural visualisations based on the studio’s reel. The five room photographs and three material studies are frames from the footage, individually cropped, colour-graded, denoised and sharpened. The desktop gallery advances with page scroll. Smaller screens use a native swipe gallery, and visitors with reduced motion enabled can browse without pinned scrolling or animated transitions.

## Run and deploy

Use Node.js 22 or later. Run `npm ci` and `npm run dev` for local development. Run `npm run build` to create the static production export in `out/`.

On Vercel, import the repository and keep the Next.js framework preset and default build settings. All fonts and imagery are served with the site. Service enquiries link directly to WhatsApp.

## Content

Room captions, material descriptions, services and WhatsApp messages live in `app/project.js`. The landing page and studio address are in `app/page.jsx`.
