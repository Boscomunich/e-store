import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductSectionProps {
  title: string;
  seeAllLink?: string;
  seeAllText?: string;
  backgroundColor?: string;
  className?: string;
  headerClassName?: string;
  headerBackgroundColor?: string;
  children: React.ReactNode;
}

export function ProductSection({
  title,
  seeAllLink = "#",
  seeAllText = "See All",
  backgroundColor = "bg-white",
  headerBackgroundColor = "bg-white",
  className,
  headerClassName,
  children,
}: ProductSectionProps) {
  return (
    <section
      className={cn(
        "sm:w-[95%] w-full mx-auto border border-primary-foreground overflow-hidden",
        backgroundColor,
        className
      )}
    >
      <div className="container w-full">
        <div
          className={cn(
            "flex items-center justify-between mb-6 py-2 sm:py-4 px-4 sm:px-6",
            headerBackgroundColor,
            headerClassName
          )}
        >
          <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
          <Link href={seeAllLink} className="text-sm hover:underline">
            {seeAllText}
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,300px))] gap-4 overflow-hidden px-4 sm:px-6 mb-6">
          {children}
        </div>
      </div>
    </section>
  );
}
