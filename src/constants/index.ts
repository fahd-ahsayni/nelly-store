import { hero1Image, hero2Image } from "@/assets";
import { Collection, Product } from "@/types";

// Collections data
export const collections: Collection[] = [
  {
    id: "collection-1",
    name: "Hijab",
    description: "Premium quality hijabs for everyday elegance",
    imageSrc: "https://example.com/hijab-collection.jpg",
  },
  {
    id: "collection-2",
    name: "Khimar",
    description: "Beautiful khimars for modest coverage",
    imageSrc: "https://example.com/khimar-collection.jpg",
  },
  {
    id: "collection-3",
    name: "Robe",
    description: "Elegant robes for special occasions",
    imageSrc: "https://example.com/robe-collection.jpg",
  },
];

// Helper function to get collection by name
const getCollectionByName = (name: string): Collection => {
  return collections.find((c) => c.name === name) || collections[0];
};

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Silk Hijab",
    collection: getCollectionByName("Hijab"),
    price: 150,
    imageSrc:
      "https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288901.jpg?t=st=1747327341~exp=1747330941~hmac=e7832001cbe32b1ab62e4d5372cbecb4c9f5d7d28f2317c2fe6bf9553ad82fd9&w=1380",
    imageAlt: "Elegant premium silk hijab in soft pastel color.",
    inStock: true,
    colors: [
      { name: "Black", hex: "#000000", selectedColor: "ring-zinc-900" },
      { name: "Blue", hex: "#3B82F6", selectedColor: "ring-blue-500" },
    ],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    slug: "premium-silk-hijab",
    images: [
      "https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288901.jpg?t=st=1747327341~exp=1747330941~hmac=e7832001cbe32b1ab62e4d5372cbecb4c9f5d7d28f2317c2fe6bf9553ad82fd9&w=1380",
      "https://img.freepik.com/free-photo/medium-shot-woman-wearing-hijab_23-2149226682.jpg?w=996&t=st=1747568328~exp=1747568928~hmac=ac147be95da7a4e484c9a9ea97a8acf1ca52a4872e8e69703c78f095058bc74b",
      "https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288913.jpg?w=996&t=st=1747568385~exp=1747568985~hmac=35096244db183bee67b0fddea8a18ff2cc73e8fcf6c8ae0b7d09774b996d3a55",
    ],
    createdAt: "2023-04-15T12:00:00Z",
    updatedAt: "2023-10-22T09:30:00Z",
  },
  {
    id: "2",
    name: "Embroidered Khimar",
    collection: getCollectionByName("Khimar"),
    price: 275,
    imageSrc:
      "https://img.freepik.com/free-photo/medium-shot-muslim-woman-posing-with-flowers_23-2150494544.jpg?t=st=1747328213~exp=1747331813~hmac=0d525441f96e8dec8d8f66853ec1e113a5cd769ed77adac55667db388bac1440&w=996",
    imageAlt: "Beautifully embroidered khimar with decorative trim.",
    inStock: true,
    colors: [
      { name: "White", hex: "#FFFFFF", selectedColor: "ring-gray-400" },
      { name: "Beige", hex: "#F5F5DC", selectedColor: "ring-amber-100" },
    ],
    sizes: ["S", "M", "L"],
    rating: 4.5,
    slug: "embroidered-khimar",
    images: [
      "https://img.freepik.com/free-photo/medium-shot-muslim-woman-posing-with-flowers_23-2150494544.jpg?t=st=1747328213~exp=1747331813~hmac=0d525441f96e8dec8d8f66853ec1e113a5cd769ed77adac55667db388bac1440&w=996",
      "https://img.freepik.com/free-photo/medium-shot-muslim-woman-posing-with-flowers_23-2150494552.jpg?w=996&t=st=1747568468~exp=1747569068~hmac=a2518481f1c2d9bd097a50cd86d9fd5bd2ab6d2dc2b31d48f0d666fcc3fb3061",
      "https://img.freepik.com/free-photo/medium-shot-muslim-woman-posing-with-flowers_23-2150494551.jpg?w=996&t=st=1747568492~exp=1747569092~hmac=cbabd721e3d62c63b43ac35490e8ddc17c1097c8ead7b37ab6336aa2fb148458",
    ],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  // Additional products with the new structure...
];

// Sample cart items for initial state
export const initialCartItems = [
  {
    id: "cart-item-1",
    productId: "1",
    name: "Premium Silk Hijab",
    price: 150,
    quantity: 1,
    image:
      "https://img.freepik.com/free-photo/beautiful-woman-wearing-hijab_23-2149288901.jpg?t=st=1747327341~exp=1747330941~hmac=e7832001cbe32b1ab62e4d5372cbecb4c9f5d7d28f2317c2fe6bf9553ad82fd9&w=1380",
    color: "Black",
    colorHex: "#000000",
    size: "M",
  },
];

export const carouselImages = [
  {
    src: hero1Image, // Sunset over water
    alt: "Sunset over water with gentle waves",
  },
  {
    src: hero2Image,
    alt: "Placeholder image 1",
  },
];
