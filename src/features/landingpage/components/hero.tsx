import { ArrowRight, ShoppingBag, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/heroIMG.jpg";
import bag from "@/assets/bag.jpg";
import watch from "@/assets/watch.jpg";
import Image from "next/image";
import { ScrollButton } from "./ScrollButton";

export default function HeroSection() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] items-center px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Main Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Shop the Latest,
                <span className="text-primary">Elevate Your Everyday</span>
              </h1>
              <p className="max-w-[600px] text-zinc-200 md:text-xl">
                Browse our carefully selected range of products. Whether you're
                looking for everyday essentials or special finds, discover items
                that match your lifestyle and needs.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <ScrollButton />
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-white/10 text-white backdrop-blur-sm"
              >
                View Trending
                <TrendingUp className="h-4 w-4" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              <div className="space-y-2">
                <h4 className="text-3xl font-bold text-white">50k+</h4>
                <p className="text-sm text-zinc-200">Happy Customers</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-3xl font-bold text-white">2k+</h4>
                <p className="text-sm text-zinc-200">Premium Products</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-3xl font-bold text-white">24/7</h4>
                <p className="text-sm text-zinc-200">Customer Support</p>
              </div>
            </div>
          </div>

          {/* Right Column - Floating Cards */}
          <div className="hidden lg:block">
            <div className="relative h-full">
              {/* Floating Product Cards */}
              <Card className="absolute right-4 top-1/4 w-64 rotate-6 transform space-y-2 p-4 transition-transform hover:rotate-0">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-zinc-100">
                  <Image
                    src={watch}
                    alt="premium watch"
                    className="h-full w-full object-cover"
                    width={400}
                    height={400}
                  />
                </div>
                <h3 className="font-semibold">Premium Watch Collection</h3>
                <p className="text-sm text-muted-foreground">
                  Starting from $299
                </p>
              </Card>

              <Card className="absolute bottom-1/4 right-20 w-64 -rotate-6 transform space-y-2 p-4 transition-transform hover:rotate-0">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-zinc-100">
                  <Image
                    src={bag}
                    alt="Designer Bag"
                    className="h-full w-full object-cover"
                    width={400}
                    height={400}
                  />
                </div>
                <h3 className="font-semibold">Designer Bags</h3>
                <p className="text-sm text-muted-foreground">
                  Starting from $199
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce text-white">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">Scroll to explore</span>
          <ArrowRight className="h-4 w-4 rotate-90" />
        </div>
      </div>
    </div>
  );
}
