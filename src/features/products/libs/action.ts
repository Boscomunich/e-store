"use server";

import { getPayload } from "payload";
import config from "@payload-config";

type ProductType = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: {
    id: string;
    name: string;
    slug: string;
    parentCategory: string;
    createdAt: string;
    updatedAt: string;
  };
  discountPercentage: number;
  images: Array<{
    image: {
      id: string;
      alt: string;
      filename: string;
      mimeType: string;
      filesize: number;
      width: number;
      height: number;
      focalX: number;
      focalY: number;
      createdAt: string;
      updatedAt: string;
      url: string;
      thumbnailURL: string | null;
    };
    id: string;
  }>;
  colorVariants: Array<{
    colorName: string;
    hexValue: string;
    quantity: number;
    id: string;
  }>;
  totalQuantity: number;
  inStock: boolean;
  sizes: Array<{
    size: string;
    additionalPrice: number;
    quantity: number;
    id: string;
  }>;
  tags: Array<{
    tag: string;
    id: string;
  }>;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

type FetchProductsArgs = {
  parentCategory: string;
  page?: number;
  limit?: number;
};

export async function fetchProductsByParentCategory({
  parentCategory,
  page = 1, // Default to the first page
  limit = 5, // Default to 5 per call
}: FetchProductsArgs): Promise<ProductType[]> {
  const payload = await getPayload({ config });

  try {
    const result = await payload.find({
      collection: "products",
      depth: 1,
      page,
      limit,
      where: {
        "category.parentCategory": {
          equals: parentCategory,
        },
      },
      showHiddenFields: true,
    });

    // Assert that the result.docs is of type ProductType[]
    return result.docs as ProductType[];
  } catch (error) {
    console.error("Error fetching products by parent category:", error);
    throw new Error("Failed to fetch products by parent category.");
  }
}
