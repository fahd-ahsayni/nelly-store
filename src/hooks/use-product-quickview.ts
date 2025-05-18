"use client";

import { useShoppingCart } from "@/context/shopping-cart-context";
import { useWishlistDrawer } from "@/context/wishlist-drawer-context";
import { Color, Product } from "@/types";
import { FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Default product fallback for when no product is provided
const defaultProduct: Product = {
  id: "",
  name: "Sample Product",
  price: 0,
  rating: 0,
  imageSrc: "/placeholder.jpg",
  imageAlt: "Product placeholder",
  colors: [{ name: "Default", hex: "#000000", selectedColor: "" }],
  sizes: ["ONE SIZE"],
  inStock: true,
  slug: "sample-product",
  images: [],
  collection: {
    id: "default-collection",
    name: "Default",
    description: "Default collection",
    imageSrc: "/placeholder.jpg",
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

interface UseProductQuickviewProps {
  product?: Product;
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface UseProductQuickviewReturn {
  selectedColor: Color;
  setSelectedColor: (color: Color) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  addingToCart: boolean;
  addingToWishlist: boolean;
  successMessage: string;
  isInWishlist: boolean;
  handleAddToCart: (e: FormEvent) => Promise<void>;
  handleAddToWishlist: () => Promise<void>;
  carouselImages: Array<{ src: string; alt: string }>;
  displayProduct: Product;
  hasSize: (sizeName: string) => boolean;
}

export function useProductQuickview({ 
  product, 
  open 
}: UseProductQuickviewProps): UseProductQuickviewReturn {
  // Prepare display product (with fallback values)
  const displayProduct: Product = {
    ...defaultProduct,
    ...(product || {}),
  };

  // State management
  const [selectedColor, setSelectedColor] = useState<Color>(
    displayProduct.colors[0] || defaultProduct.colors[0]
  );
  
  const [selectedSize, setSelectedSize] = useState<string>(
    displayProduct.sizes[0] || "ONE SIZE"
  );
  
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Context hooks
  const { addToCart } = useShoppingCart();
  const { addToWishlist, isItemInWishlist } = useWishlistDrawer();
  const isInWishlist = product ? isItemInWishlist(product.id) : false;

  // Update state when product changes
  useEffect(() => {
    if (product) {
      // Set first available size
      setSelectedSize(product.sizes[0] || "ONE SIZE");

      // Set first available color
      if (product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }

      // Reset quantity
      setQuantity(1);
    }
  }, [product, open]);

  // Prepare image array for carousel from string array
  const carouselImages = displayProduct.images?.length
    ? displayProduct.images.map(src => ({ src, alt: displayProduct.imageAlt }))
    : [{ src: displayProduct.imageSrc, alt: displayProduct.imageAlt }];

  // Function to check if a size exists in the product sizes
  const hasSize = (sizeName: string): boolean => {
    return displayProduct.sizes.includes(sizeName);
  };

  // Handle quantity changes
  const increaseQuantity = (): void => setQuantity((prev) => prev + 1);
  const decreaseQuantity = (): void =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Handle form submission
  const handleAddToCart = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (addingToCart || !displayProduct.inStock) return;

    setAddingToCart(true);
    try {
      // Add item to cart
      addToCart({
        id: uuidv4(),
        productId: displayProduct.id,
        name: displayProduct.name,
        price: displayProduct.price,
        quantity: quantity,
        image: displayProduct.imageSrc,
        color: selectedColor.name,
        colorHex: selectedColor.hex,
        size: selectedSize,
      });

      // Show success message
      setSuccessMessage("Added to cart!");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddToWishlist = async (): Promise<void> => {
    if (addingToWishlist || isInWishlist) return;

    setAddingToWishlist(true);
    try {
      // Add to wishlist
      addToWishlist({
        id: uuidv4(),
        productId: displayProduct.id,
        name: displayProduct.name,
        price: displayProduct.price,
        image: displayProduct.imageSrc,
        slug: displayProduct.slug,
        inStock: displayProduct.inStock,
      });

      // Show success message
      setSuccessMessage("Added to wishlist!");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    } finally {
      setAddingToWishlist(false);
    }
  };

  return {
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    increaseQuantity,
    decreaseQuantity,
    addingToCart,
    addingToWishlist,
    successMessage,
    isInWishlist,
    handleAddToCart,
    handleAddToWishlist,
    carouselImages,
    displayProduct,
    hasSize
  };
}
