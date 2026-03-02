

export const dateImages = [

  // Arcade / Fun
  "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
  "https://images.pexels.com/photos/1293260/pexels-photo-1293260.jpeg",

  // Outdoor / Nature
  "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg",

  // Dinner
  "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
  "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",

  // Movie Night
  "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg",

  // Adventure
  "https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg",

  // Romantic
  "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg",
  "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg",  // carnival ferris wheel
  "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg",  // bowling alley
  "https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg",   // ice cream date
  "https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg", // arcade vibe
  "https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg", // sunset couple silhouette
  "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg", // candlelight dinner
  "https://images.pexels.com/photos/1831234/pexels-photo-1831234.jpeg", // picnic blanket
  "https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg",   // rooftop city night
  "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg",    // fine dining
  "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg",  // brunch table
  "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",  // sushi night
  "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",  // pasta dinner
];

export function getRandomDateImage() {
  return dateImages[Math.floor(Math.random() * dateImages.length)];
}