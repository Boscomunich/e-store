"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProductsByParentCategory } from "../libs/action";
import { ProductCard } from "@/components/reusable/productCard";
import { ProductSection } from "@/components/reusable/productWrapper";
import { ProductSkeleton } from "@/components/reusable/productSkeleton";

export default function AppliancesProduct() {
  const pendingArray = [1, 2, 3, 4, 5];

  const appliancesProductsParams = {
    parentCategory: "appliances",
    page: 1,
    limit: 5,
  };

  const {
    isLoading,
    isError,
    data: appliancesProducts,
  } = useQuery({
    queryFn: () => fetchProductsByParentCategory(appliancesProductsParams),
    queryKey: ["appliances"],
  });

  console.log(appliancesProducts);

  return (
    <div>
      <ProductSection
        title="Fashion"
        seeAllLink="/products/fashion"
        seeAllText="See All"
        className="sm:rounded-md"
        headerClassName="bg-primary text-white"
      >
        {isLoading
          ? pendingArray.map((_, i) => <ProductSkeleton key={i} />)
          : appliancesProducts?.map((product, index) => (
              <ProductCard
                name="Gordon's Moringa Citrus Blend 750ml"
                price={5910}
                originalPrice={7370}
                discount={27}
                image={
                  process.env.NEXT_PUBLIC_URL + product.images[0]?.image.url
                }
                rating={4.5}
                reviewCount={68}
                isOfficialStore={true}
                isNonReturnable={true}
                isExpressDelivery={false}
                showAddToCartButton={false}
                key={index}
              />
            ))}
      </ProductSection>
    </div>
  );
}
