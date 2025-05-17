export const products = [
  {
    id: 1,
    name: "Premium Silk Hijab",
    collection: "Hijab",
    price: "150 Dhs",
    href: "#",
    imageSrc:
      "https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288901.jpg?t=st=1747327341~exp=1747330941~hmac=e7832001cbe32b1ab62e4d5372cbecb4c9f5d7d28f2317c2fe6bf9553ad82fd9&w=1380",
    imageAlt: "Elegant premium silk hijab in soft pastel color.",
    inStock: true,
    colors: [
      { name: 'Black', bgColor: 'bg-zinc-900', selectedColor: 'ring-zinc-900' },
      { name: 'Blue', bgColor: 'bg-blue-500', selectedColor: 'ring-blue-500' },
    ],
    sizes: [
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
    ],
    rating: 4.8,
    reviewCount: 89
  },
  {
    id: 2,
    name: "Embroidered Khimar",
    collection: "Khimar",
    price: "275 Dhs",
    href: "#",
    imageSrc:
      "https://img.freepik.com/free-photo/medium-shot-muslim-woman-posing-with-flowers_23-2150494544.jpg?t=st=1747328213~exp=1747331813~hmac=0d525441f96e8dec8d8f66853ec1e113a5cd769ed77adac55667db388bac1440&w=996",
    imageAlt: "Beautifully embroidered khimar with decorative trim.",
    inStock: true,
    colors: [
      { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
      { name: 'Beige', bgColor: 'bg-amber-100', selectedColor: 'ring-amber-100' },
    ],
    sizes: [
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: false },
    ],
    rating: 4.5,
    reviewCount: 120
  },
  {
    id: 3,
    name: "Luxury Abaya Robe",
    collection: "Robe",
    price: "450 Dhs",
    href: "#",
    imageSrc:
      "https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288973.jpg?t=st=1747328297~exp=1747331897~hmac=2f6a005c24e04ae1d7a18e2a94231519adba159c4d70b538aadaf23fc0dcab97&w=996",
    imageAlt: "Flowing luxury abaya robe with modern design elements.",
    inStock: false,
    colors: [
      { name: 'Black', bgColor: 'bg-zinc-900', selectedColor: 'ring-zinc-900' },
    ],
    sizes: [
      { name: 'S', inStock: false },
      { name: 'M', inStock: false },
      { name: 'L', inStock: false },
    ],
    rating: 4.9,
    reviewCount: 65
  },
  {
    id: 4,
    name: "Casual Cotton Hijab",
    collection: "Hijab",
    price: "95 Dhs",
    href: "#",
    imageSrc:
      "https://img.freepik.com/free-photo/full-shot-woman-wearing-hijab_23-2149226648.jpg?t=st=1747328090~exp=1747331690~hmac=4f1a3195a4dfe05ce99c461c378f51f51e3bef8f4f171f8797ad2ccfa35c91b9&w=1380",
    imageAlt: "Comfortable everyday cotton hijab in versatile color.",
    inStock: true,
  },
  {
    id: 5,
    name: "Casual Cotton Robs",
    collection: "Hijab",
    price: "95 Dhs",
    href: "#",
    imageSrc:
      "https://img.freepik.com/free-photo/medium-shot-muslim-woman-posing-with-flowers_23-2150494597.jpg?t=st=1747332570~exp=1747336170~hmac=ed5392dd66fc98039f30febf075624c7b36f6f8c8e7d2f3618e4d5c104ea6d53&w=1380",
    imageAlt: "Comfortable everyday cotton hijab in versatile color.",
    inStock: true,
  },
  {
    id: 6,
    name: "Casual Cotton Robs",
    collection: "Hijab",
    price: "95 Dhs",
    href: "#",
    imageSrc:
      "https://img.freepik.com/free-photo/medium-shot-smiley-woman-with-flower_23-2149226620.jpg?t=st=1747333112~exp=1747336712~hmac=ddf49b76f1c2e69c2c326659ba08fe4937608314d59245a728b164c0b893505a&w=996",
    imageAlt: "Comfortable everyday cotton hijab in versatile color.",
    inStock: true,
  },
];

export const carouselImages = [
  {
    src: "https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288964.jpg?t=st=1747352698~exp=1747356298~hmac=fb438ccbd3b5e8b4173651ee36f90834e70b6bdad1120cdfdd6e3f614e9c4aed&w=1380", // Sunset over water
    alt: "Sunset over water with gentle waves",
  },
  {
    src: "https://img.freepik.com/free-photo/medium-shot-muslim-woman-posing-with-flowers_23-2150494552.jpg?t=st=1747432178~exp=1747435778~hmac=ec434fd4f137056a92d395e5bf13ff0f7107b991ba67fd6984f920c6d9ef8cc9&w=1380",
    alt: "Placeholder image 1",
  },
  {
    src: "https://img.freepik.com/free-photo/medium-shot-muslim-woman-posing-with-flowers_23-2150494553.jpg?t=st=1747432226~exp=1747435826~hmac=94587f80ee4c7411b88a4f03873b82d0aea02a8ddfbd196317fbc2e08cbf63eb&w=996",
    alt: "Placeholder image 2",
  },
];

export const initialCartItems = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    price: 29.99,
    quantity: 2,
    image: "/images/products/tshirt-white.jpg",
    color: "White",
    size: "L",
  },
  {
    id: "2",
    name: "Slim Fit Black Jeans",
    price: 59.99,
    quantity: 1,
    image: "/images/products/jeans-black.jpg",
    color: "Black",
    size: "32",
  },
  {
    id: "3",
    name: "Casual Sneakers",
    price: 79.99,
    quantity: 1,
    image: "/images/products/sneakers.jpg",
    color: "zinc",
    size: "42",
  },
];
