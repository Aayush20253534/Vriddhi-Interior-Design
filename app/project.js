export const rooms = [
  { file: "living", name: "Living room", palette: "Blush & ivory", alt: "Living room with a curved illuminated ceiling, open timber divider and patterned sofa.", position: "50% 65%" },
  { file: "kitchen", name: "Modular kitchen", palette: "Ivory & charcoal", alt: "A galley kitchen with glossy upper cabinets on either side of a bright window.", position: "50% 55%" },
  { file: "primary", name: "Primary bedroom", palette: "Peach & wood", alt: "Peach-toned joinery and a rose upholstered headboard frame the primary bedroom.", position: "50% 75%" },
  { file: "children", name: "Children’s room", palette: "Lavender & rose", alt: "Lavender cabinetry beside a scalloped rose headboard in the children’s room.", position: "50% 65%" },
  { file: "guest", name: "Guest bedroom", palette: "Navy & white", alt: "Navy headboard and deep blue ceiling trim in a bright white guest bedroom.", position: "50% 72%" },
];

export const details = [
  { file: "display-niche", name: "The display niche", room: "Living room", text: "A slim strip of light washes across the ribbed back panel. Even the smallest objects have a place in the room.", alt: "Warm light catches the vertical grooves of a wood display niche with flowers and a small sculpture.", position: "50% 55%" },
  { file: "fluted-glass", name: "Fluted glass", room: "Modular kitchen", text: "Ribbed glass softens the view into the upper cabinets. Dark frames give the light-coloured kitchen a crisp edge.", alt: "Backlit kitchen cabinet with a dark frame and a fluted glass door beside open shelving.", position: "50% 60%" },
  { file: "pull-out-pantry", name: "The pull-out pantry", room: "Modular kitchen", text: "Open the tall cabinet and the pantry comes into reach. Shallow door racks keep small items visible alongside the deeper shelves.", alt: "The pantry open, showing dark metal door racks and inner shelves for jars and packets.", position: "50% 55%" },
];

export const services = [
  { name: "Full-home interiors", text: "Plan the layout, lighting, finishes and storage across your home, with a distinct character for each room." },
  { name: "Modular kitchens", text: "Shape the kitchen around the way you cook, from work surfaces and cabinet finishes to storage you can reach." },
  { name: "Renovations", text: "Rethink an existing space. Start with what you want to keep and work through changes to layout, finishes and light." },
  { name: "Commercial interiors", text: "Discuss a layout and material palette that suit your business, your team and the people who visit." },
  { name: "Design consultations", text: "Bring your floor plan, photographs or an idea. Talk through priorities and design options for your space." },
];

export function whatsapp(message = "Hi Vriddhi, I’d like to discuss an interior design project in Prayagraj.") {
  return "https://wa.me/919307999738?text=" + encodeURIComponent(message);
}
