"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isOfficialStore?: boolean;
  isNonReturnable?: boolean;
  isExpressDelivery?: boolean;
  onAddToCart?: () => void;
  showAddToCartButton?: boolean; // New prop to control button visibility
}

export function ProductCard({
  name,
  price,
  originalPrice,
  discount,
  image,
  rating,
  reviewCount,
  isOfficialStore = false,
  isNonReturnable = false,
  isExpressDelivery = false,
  onAddToCart,
  showAddToCartButton = true, // Default to true to maintain existing behavior
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span
          key={index}
          className={`text-sm ${index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </span>
      ));
  };

  return (
    <Card className="relative group">
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
      >
        <Heart
          className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`}
        />
      </button>

      <CardContent className="p-4">
        <div className="aspect-square relative overflow-hidden rounded-md">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>

        <div className="space-y-2 mt-4">
          <h3 className="font-medium line-clamp-2">{name}</h3>

          <div className="flex items-center gap-2">
            <span className="font-bold">₦ {price.toLocaleString()}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₦ {originalPrice.toLocaleString()}
              </span>
            )}
            {discount && (
              <Badge variant="destructive" className="text-xs">
                -{discount}%
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(rating)}</div>
            <span className="text-sm text-gray-500">({reviewCount})</span>
          </div>

          {isExpressDelivery && (
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="text-orange-500 border-orange-500"
              >
                EXPRESS
              </Badge>
            </div>
          )}
        </div>
      </CardContent>

      {/* Add to Cart Button - Only render if showAddToCartButton is true */}
      {showAddToCartButton && (
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" onClick={onAddToCart}>
            Add to cart
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
