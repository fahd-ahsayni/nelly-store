import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Silk Hijab",
    collection: "Hijab",
    price: 150,
    href: "/products/premium-silk-hijab",
    imageSrc:
      "https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288901.jpg?t=st=1747327341~exp=1747330941~hmac=e7832001cbe32b1ab62e4d5372cbecb4c9f5d7d28f2317c2fe6bf9553ad82fd9&w=1380",
    imageAlt: "Elegant premium silk hijab in soft pastel color.",
    inStock: true,
    colors: [
      { name: "Black", hex: "#000000", selectedColor: "ring-zinc-900" },
      { name: "Blue", hex: "#3B82F6", selectedColor: "ring-blue-500" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
    ],
    rating: 4.8,
    reviewCount: 89,
    description: "Our premium silk hijab offers exceptional comfort and elegance for everyday wear or special occasions.",
    slug: "premium-silk-hijab",
  },
  {
    id: "2",
    name: "Embroidered Khimar",
    collection: "Khimar",
    price: 275,
    href: "/products/embroidered-khimar",
    imageSrc:
      "https://img.freepik.com/free-photo/medium-shot-muslim-woman-posing-with-flowers_23-2150494544.jpg?t=st=1747328213~exp=1747331813~hmac=0d525441f96e8dec8d8f66853ec1e113a5cd769ed77adac55667db388bac1440&w=996",
    imageAlt: "Beautifully embroidered khimar with decorative trim.",
    inStock: true,
    colors: [
      { name: "White", hex: "#FFFFFF", selectedColor: "ring-gray-400" },
      { name: "Beige", hex: "#F5F5DC", selectedColor: "ring-amber-100" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: false },
    ],
    rating: 4.5,
    reviewCount: 120,
    description: "This exquisite khimar features delicate hand embroidery and premium fabric for a luxurious feel.",
    slug: "embroidered-khimar",
  },
  {
    id: "3",
    name: "Luxury Abaya Robe",
    collection: "Robe",
    price: 450,
    href: "/products/luxury-abaya-robe",
    imageSrc:
      "https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288973.jpg?t=st=1747328297~exp=1747331897~hmac=2f6a005c24e04ae1d7a18e2a94231519adba159c4d70b538aadaf23fc0dcab97&w=996",
    imageAlt: "Flowing luxury abaya robe with modern design elements.",
    inStock: false,
    colors: [{ name: "Black", hex: "#000000", selectedColor: "ring-zinc-900" }],
    sizes: [
      { name: "S", inStock: false },
      { name: "M", inStock: false },
      { name: "L", inStock: false },
    ],
    rating: 4.9,
    reviewCount: 65,
    description: "Our luxury abaya robe combines traditional elegance with contemporary design for a sophisticated look.",
    slug: "luxury-abaya-robe",
  },
  {
    id: "4",
    name: "Casual Cotton Hijab",
    collection: "Hijab",
    price: 95,
    href: "/products/casual-cotton-hijab",
    imageSrc:
      "https://img.freepik.com/free-photo/full-shot-woman-wearing-hijab_23-2149226648.jpg?t=st=1747328090~exp=1747331690~hmac=4f1a3195a4dfe05ce99c461c378f51f51e3bef8f4f171f8797ad2ccfa35c91b9&w=1380",
    imageAlt: "Comfortable everyday cotton hijab in versatile color.",
    inStock: true,
    colors: [
      { name: "Gray", hex: "#6B7280", selectedColor: "ring-gray-500" },
      { name: "Olive", hex: "#808000", selectedColor: "ring-olive-500" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
    ],
    rating: 4.3,
    reviewCount: 42,
    description: "Made from 100% organic cotton, this hijab provides all-day comfort with breathable fabric.",
    slug: "casual-cotton-hijab",
  },
  {
    id: "5",
    name: "Casual Cotton Robe",
    collection: "Robe",
    price: 95,
    href: "/products/casual-cotton-robe",
    imageSrc:
      "https://img.freepik.com/free-photo/medium-shot-muslim-woman-posing-with-flowers_23-2150494597.jpg?t=st=1747332570~exp=1747336170~hmac=ed5392dd66fc98039f30febf075624c7b36f6f8c8e7d2f3618e4d5c104ea6d53&w=1380",
    imageAlt: "Stylish casual cotton robe for everyday comfort.",
    inStock: true,
    colors: [
      { name: "Cream", hex: "#FFFDD0", selectedColor: "ring-yellow-50" },
      { name: "Brown", hex: "#964B00", selectedColor: "ring-amber-700" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
    ],
    rating: 4.6,
    reviewCount: 38,
    description: "This casual cotton robe offers a perfect blend of comfort and style for your everyday needs.",
    slug: "casual-cotton-robe",
  },
  {
    id: "6",
    name: "Floral Pattern Robe",
    collection: "Robe",
    price: 95,
    href: "/products/floral-pattern-robe",
    imageSrc:
      "https://img.freepik.com/free-photo/medium-shot-smiley-woman-with-flower_23-2149226620.jpg?t=st=1747333112~exp=1747336712~hmac=ddf49b76f1c2e69c2c326659ba08fe4937608314d59245a728b164c0b893505a&w=996",
    imageAlt: "Elegant floral pattern robe with flowing design.",
    inStock: true,
    colors: [
      { name: "White", hex: "#FFFFFF", selectedColor: "ring-gray-400" },
      { name: "Rose", hex: "#FF007F", selectedColor: "ring-pink-600" },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: false },
    ],
    rating: 4.7,
    reviewCount: 52,
    description: "Our floral pattern robe features a beautiful design that combines elegance with modern comfort.",
    slug: "floral-pattern-robe",
  },
];

// Sample cart items for initial state
export const initialCartItems = [
  {
    id: "cart-item-1",
    productId: "1",
    name: "Premium Silk Hijab",
    price: 150,
    quantity: 1,
    image: "https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288901.jpg?t=st=1747327341~exp=1747330941~hmac=e7832001cbe32b1ab62e4d5372cbecb4c9f5d7d28f2317c2fe6bf9553ad82fd9&w=1380",
    color: "Black",
    colorHex: "#000000",
    size: "M",
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
