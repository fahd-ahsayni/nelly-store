import { collection1, collection2, collection3, collection4 } from "@/assets";
import { Testimonial } from "@/components/pages/home/testimonials";
import { StaticImageData } from "next/image";

/**
 * Configuration for ImageKit CDN
 */
const IMAGEKIT_BASE_URL = "https://ik.imagekit.io/r3dmzmb1w" as const;

/**
 * Interface for carousel image items
 */
interface CarouselImage {
  readonly src: string | StaticImageData;
  readonly alt: string;
}

/**
 * Interface for collection items
 */
interface CollectionItem {
  readonly name: string;
  readonly image: string | StaticImageData;
  readonly alt: string;
  readonly translationKey: string; // Add translation key
}

/**
 * Carousel images for the main banner
 */
export const CAROUSEL_IMAGES: CarouselImage[] = [
  {
    src: `${IMAGEKIT_BASE_URL}/2149288964.jpg?updatedAt=1749067294517`,
    alt: "Sunset over water with gentle waves",
  },
  {
    src: `${IMAGEKIT_BASE_URL}/2149288980.jpg?updatedAt=1749067507977`,
    alt: "Fashion collection showcase",
  },
  {
    src: `${IMAGEKIT_BASE_URL}/2149288896.jpg?updatedAt=1749067507371`,
    alt: "Premium clothing display",
  },
];

/**
 * Seasonal collections data
 */
export const COLLECTIONS_SECTION: CollectionItem[] = [
  {
    name: "Summer Collection",
    image: collection1,
    alt: "Summer Collection",
    translationKey: "collection1",
  },
  {
    name: "Winter Collection",
    image: collection2,
    alt: "Winter Collection",
    translationKey: "collection2",
  },
  {
    name: "Spring Collection",
    image: collection3,
    alt: "Spring Collection",
    translationKey: "collection3",
  },
  {
    name: "Autumn Collection",
    image: collection4,
    alt: "Autumn Collection",
    translationKey: "collection4",
  },
];

/**
 * Media assets URLs
 */
export const MEDIA_ASSETS = {
  VIDEO_COVER: `${IMAGEKIT_BASE_URL}/video-one.mp4?updatedAt=1749132811527`,
  TREND_PRODUCT: `${IMAGEKIT_BASE_URL}/2149288974%20(1).webp?updatedAt=1749066696108`,
  LOCAL_STORE: `${IMAGEKIT_BASE_URL}/2151623460.jpg?updatedAt=1749069279348`,
} as const;

/**
 * Customer testimonials data
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: {
      en: "Amina S.",
      ar: "أمينة س.",
      fr: "Amina S.",
    },
    rating: 5,
    comment: {
      en: "The Serenity Hijab is so comfortable and breathable. Perfect for everyday wear!",
      ar: "حجاب السكينة مريح جداً وقابل للتنفس. مثالي للارتداء اليومي!",
      fr: "Le Hijab Serenity est si confortable et respirant. Parfait pour un usage quotidien!",
    },
    image:
      "https://img.freepik.com/free-photo/medium-shot-beautiful-woman-posing_23-2149226589.jpg?t=st=1747400900~exp=1747404500~hmac=e663a83d410d65aba8594c18caa83e87bae7dadb9ab10a70bf737726f047c85a&w=1380",
  },
  {
    id: 2,
    name: {
      en: "Fatima K.",
      ar: "فاطمة ك.",
      fr: "Fatima K.",
    },
    rating: 5,
    comment: {
      en: "I love how elegant the Cascade Collection looks. The fabric drapes beautifully!",
      ar: "أحب كيف تبدو مجموعة الشلال أنيقة. القماش ينسدل بجمال!",
      fr: "J'adore l'élégance de la collection Cascade. Le tissu tombe magnifiquement!",
    },
    image:
      "https://img.freepik.com/free-photo/close-up-hands-holding-beautiful-flowers_23-2149226642.jpg?t=st=1747401195~exp=1747404795~hmac=14c80c6614ce775bf6032ab489a0bdae4a0794dbb2c150edf6fa5382d6d7966a&w=1380",
  },
  {
    id: 3,
    name: {
      en: "Layla H.",
      ar: "ليلى ح.",
      fr: "Layla H.",
    },
    rating: 4,
    comment: {
      en: "The Everyday Essentials hijabs are perfect for my busy lifestyle. So easy to style!",
      ar: "حجابات الأساسيات اليومية مثالية لأسلوب حياتي المزدحم. سهلة التنسيق جداً!",
      fr: "Les hijabs Everyday Essentials sont parfaits pour mon style de vie chargé. Si faciles à coiffer!",
    },
    image:
      "https://img.freepik.com/free-photo/front-view-woman-holding-plant_23-2149642252.jpg?t=st=1747401299~exp=1747404899~hmac=7c25d44ef2b377c6cf947b478544220c4b85f368d22cdc214f7bdf7e20415d43&w=996",
  },
  {
    id: 4,
    name: {
      en: "Noor J.",
      ar: "نور ج.",
      fr: "Noor J.",
    },
    rating: 5,
    comment: {
      en: "The Premium Silk Collection feels luxurious and looks so elegant. Worth every penny!",
      ar: "مجموعة الحرير المميزة تشعر بالفخامة وتبدو أنيقة جداً. تستحق كل قرش!",
      fr: "La collection Premium Silk est luxueuse et si élégante. Vaut chaque centime!",
    },
    image:
      "https://img.freepik.com/free-photo/side-view-muslim-woman-posing-chair_23-2149642295.jpg?t=st=1747401346~exp=1747404946~hmac=084144869b0765a2a9d0b81690b28dae5136f9f023bab9380c391c83d8978cbd&w=996",
  },
];

// Legacy exports for backward compatibility
/** @deprecated Use CAROUSEL_IMAGES instead */
export const carouselImages = CAROUSEL_IMAGES;

/** @deprecated Use COLLECTIONS_SECTION instead */
export const collectionsSection = COLLECTIONS_SECTION;

/** @deprecated Use MEDIA_ASSETS.VIDEO_COVER instead */
export const viedoCoverSection = MEDIA_ASSETS.VIDEO_COVER;

/** @deprecated Use MEDIA_ASSETS.TREND_PRODUCT instead */
export const trendProduct = MEDIA_ASSETS.TREND_PRODUCT;

/** @deprecated Use MEDIA_ASSETS.LOCAL_STORE instead */
export const localeStore = MEDIA_ASSETS.LOCAL_STORE;

/** @deprecated Use TESTIMONIALS instead */
export const testimonials = TESTIMONIALS;
