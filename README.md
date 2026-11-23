# Vriddhi Interior Designer

A static Next.js portfolio for the interior design studio in Prayagraj.

The site connects Home, Portfolio, Residence, Bakers Gallery, Services, Studio and Contact. GSAP and ScrollTrigger drive the scenes. Lenis shares their animation clock on fine-pointer devices. Touch devices use native scrolling.

## The residence

The opening uses landscape and portrait architectural visualisations based on the studio’s reel. The five room photographs and three material studies are frames from the footage, individually cropped, colour-graded, denoised and sharpened. The desktop gallery advances with page scroll. Smaller screens use a native swipe gallery, and visitors with reduced motion enabled can browse without pinned scrolling or animated transitions.

## Bakers Gallery

The homepage scrolls between the residence and Bakers Gallery. The dedicated project page at `/projects/bakers-gallery/` opens with an illustrated elevation derived from the supplied storefront study. Scrolling reveals the colour study, then scrubs responsive WebP frame sequences sampled from the original interior footage. Chapter buttons work with a keyboard and show stills when reduced motion is enabled. Frame atlases are requested as visitors approach each chapter.

## Run and deploy

Use Node.js 22 or later. Run `npm ci` and `npm run dev` for local development. Run `npm run build` to create the static production export in `out/`.

On Vercel, import the repository and keep the Next.js framework preset and default build settings. All fonts and imagery are served with the site. Service enquiries link directly to WhatsApp.

## Content

Room captions, material descriptions, services and WhatsApp messages live in `app/project.js`. Contact details and the enquiry handoff are in `app/contact/`.
