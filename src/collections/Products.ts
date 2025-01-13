import { CollectionConfig } from "payload";

type ColorVariant = {
  colorName: string;
  hexValue: string;
  quantity: number;
};

type SizeVariant = {
  size: string;
  additionalPrice: number;
  quantity: number;
};

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
    },
    {
      name: "discountPercentage",
      type: "number",
      label: "Discount Percentage",
      min: 0,
      max: 100,
      defaultValue: 0,
    },
    {
      name: "images",
      type: "array",
      label: "Product Images",
      required: true,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "colorVariants",
      type: "array",
      label: "Color Variants",
      required: true,
      fields: [
        {
          name: "colorName",
          type: "text",
          required: true,
        },
        {
          name: "hexValue",
          type: "text",
          required: true,
          validate: (val: any) => {
            if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val)) {
              return "Please enter a valid hex color code (e.g., #FF0000)";
            }
            return true;
          },
        },
        {
          name: "quantity",
          type: "number",
          required: true,
          min: 0,
          defaultValue: 0,
        },
      ],
      admin: {
        description: "Adjust color variants and quantities",
      },
    },
    {
      name: "totalQuantity",
      type: "number",
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Automatically calculated from color variants",
      },
    },
    {
      name: "inStock",
      type: "checkbox",
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Automatically determined based on total quantity",
      },
    },
    {
      name: "sizes",
      type: "array",
      label: "Sizes",
      fields: [
        {
          name: "size",
          type: "text",
          label: "Size",
        },
        {
          name: "additionalPrice",
          type: "number",
          label: "Price Adjustment for Size",
          min: 0,
          defaultValue: 0,
        },
        {
          name: "quantity",
          type: "number",
          label: "Quantity for Size",
          min: 0,
          defaultValue: 0,
        },
      ],
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        // Set the slug field as read-only in the admin panel
        readOnly: true,
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            return data?.name
              ?.toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "");
          },
        ],
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        const colorVariants =
          data?.colorVariants || originalDoc?.colorVariants || [];
        const sizes = data?.sizes || originalDoc?.sizes || [];

        // Calculate total quantity from color variants
        const totalQuantity = colorVariants.reduce(
          (total: number, variant: ColorVariant) =>
            total + (variant.quantity || 0),
          0
        );

        // Calculate total quantity for sizes
        const totalSizesQuantity = sizes.reduce(
          (sum: number, size: SizeVariant) => sum + (size.quantity || 0),
          0
        );

        // Validate sizes total against total quantity
        if (totalSizesQuantity > totalQuantity) {
          throw new Error(
            "The total quantity for sizes exceeds the total product quantity."
          );
        }

        // Update totalQuantity and inStock
        data.totalQuantity = totalQuantity;
        data.inStock = totalQuantity > 0;

        return data;
      },
    ],
  },
};
