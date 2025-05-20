"use client";

import { Button } from "@/components/ui/button";
import { CartItem } from "@/types"; // Import CartItem from global types
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  item: CartItem; // Use the imported CartItem type
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

export default function ProductCard({
  item,
  updateQuantity,
  removeItem,
}: ProductCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    removeItem(item.id);
  };

  return (
    <div className="group relative flex gap-4 p-3 divide-b divide-zinc-200 transition-all duration-200 hover:bg-zinc-50">
      <div className="relative h-20 w-20 overflow-hidden bg-zinc-100 flex-shrink-0">
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
            className="absolute top-2 right-2 p-1 h-auto text-zinc-500 hover:text-zinc-6000 z-10"
            aria-label={`Remove ${item.name} from cart`}
            onClick={handleDelete}
          >
            <Trash className="h-4 w-4" aria-hidden="true" />
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
            {(item.price * item.quantity).toFixed(2)} Dhs
          </div>
        </div>
      </div>
    </div>
  );
}
