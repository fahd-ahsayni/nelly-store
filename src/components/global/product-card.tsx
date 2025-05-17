"use client";

import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
}

interface ProductCardProps {
  item: CartItem;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

export default function ProductCard({
  item,
  updateQuantity,
  removeItem,
}: ProductCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    removeItem(item.id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };
  
  return (
    <>
      <div
        className="group relative flex gap-4 p-3 rounded-xl transition-all duration-200 hover:bg-zinc-50"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative h-20 w-20 overflow-hidden rounded bg-zinc-100 flex-shrink-0">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover wfull h-full"
          />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>

            <button
              type="button"
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-md"
              aria-label={`Remove ${item.name} from wishlist`}
              onClick={handleDelete}
            >
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
            <span>{item.color}</span>
            {item.size && (
              <>
                <span className="h-1 w-1 rounded-full bg-zinc-300" />
                <span>{item.size}</span>
              </>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease</span>
              </Button>

              <span className="w-8 text-center text-sm">{item.quantity}</span>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>

            <div className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl"
          >
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs w-full">
              <h4 className="font-medium text-sm mb-2">Remove item?</h4>
              <p className="text-zinc-500 text-xs mb-4">
                Are you sure you want to remove this item from your cart?
              </p>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={cancelDelete}
                  className="text-xs h-8"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={confirmDelete}
                  className="text-xs h-8"
                >
                  Remove
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
