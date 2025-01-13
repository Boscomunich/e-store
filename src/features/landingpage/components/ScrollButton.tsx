"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export function ScrollButton() {
  const scrollToShop = useCallback(() => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: "smooth",
    });
  }, []);

  return (
    <Button size="lg" className="gap-2" onClick={scrollToShop}>
      Shop Now
      <ShoppingBag className="h-4 w-4" />
    </Button>
  );
}
