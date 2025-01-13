import { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
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
            // Auto-generate the slug from the name field
            return data?.name
              ?.toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "");
          },
        ],
      },
    },
    {
      name: "parentCategory",
      type: "select",
      required: true,
      options: [
        { label: "Appliances", value: "appliances" },
        { label: "Phones & Tablets", value: "phones-tablets" },
        { label: "Health & Beauty", value: "health-beauty" },
        { label: "Home & Office", value: "home-office" },
        { label: "Electronics", value: "electronics" },
        { label: "Fashion", value: "fashion" },
        { label: "Supermarket", value: "supermarket" },
        { label: "Computing", value: "computing" },
        { label: "Baby Products", value: "baby-products" },
        { label: "Gaming", value: "gaming" },
        { label: "Musical Instruments", value: "musical-instruments" },
        { label: "Other", value: "other" },
      ],
      admin: {
        condition: ({ parentCategory }) => parentCategory !== "other",
      },
    },
    {
      name: "otherCategoryName",
      type: "text",
      label: "Other Category Name",
      admin: {
        condition: ({ parentCategory }) => parentCategory === "other", // Show this field only if "Other" is selected
      },
    },
  ],
};
