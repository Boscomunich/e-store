import { CollectionConfig } from "payload";

export const ProductReviews: CollectionConfig = {
  slug: "product-reviews",
  admin: {
    useAsTitle: "title",
  },
  access: {
    create: async ({ req, data }) => {
      try {
        const { user, payload } = req;

        // Ensure user is logged in
        if (!user) {
          console.warn("Unauthorized access attempt. User not logged in.");
          return false;
        }

        // Validate that the product field exists in the data
        if (!data?.product) {
          console.warn("No product ID provided in review creation data.");
          return false;
        }

        // Check if the user has purchased the product
        const orders = await payload.find({
          collection: "orders",
          where: {
            and: [
              { user: { equals: user.id } }, // Match the user ID
              { "products.product": { equals: data.product } }, // Match the product ID
            ],
          },
        });

        if (!orders || orders.docs.length === 0) {
          console.warn("User has not purchased this product.");
          return false;
        }

        return true; // Allow creation if the user has purchased the product
      } catch (error) {
        console.error("Error in create access control:", error);
        return false;
      }
    },

    read: () => true, // Allow everyone to read reviews

    update: ({ req }) => {
      const { user } = req;

      if (!user) {
        console.warn("Unauthorized access attempt. User not logged in.");
        return false;
      }

      // Allow admins to update any review
      if (user.collection === "users") {
        if (user.role === "admin") return true;
      }

      // Allow users to update their own reviews
      return {
        user: {
          equals: user.id,
        },
      };
    },

    delete: ({ req }) => {
      const { user } = req;

      if (!user) {
        console.warn("Unauthorized access attempt. User not logged in.");
        return false;
      }

      // Allow admins to delete any review
      if (user.collection === "users") {
        if (user.role === "admin") return true;
      }

      // Allow users to delete their own reviews
      return {
        user: {
          equals: user.id,
        },
      };
    },
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "customers",
      required: true,
      admin: {
        position: "sidebar", // Display in the sidebar
      },
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      required: true,
      label: "Rating (1-5)",
      min: 1,
      max: 5,
    },
    {
      name: "title",
      type: "text",
      required: true,
      label: "Review Title",
    },
    {
      name: "review",
      type: "textarea",
      required: true,
      label: "Review Content",
    },
    {
      name: "createdAt",
      type: "date",
      defaultValue: () => new Date().toISOString(),
      admin: {
        readOnly: true,
      },
    },
  ],
};
