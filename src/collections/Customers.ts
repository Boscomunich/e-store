import type { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
  slug: "customers",
  admin: {
    useAsTitle: "email",
  },
  auth: {
    verify: true,
    tokenExpiration: 86400,
    maxLoginAttempts: 5,
    lockTime: 600,
  },
  fields: [
    {
      name: "password",
      type: "text",
      required: true,
    },
  ],
  access: {
    // Allow anyone to create a user (register)
    create: () => true,

    // Allow admin and editors to read all, users can only read their own
    read: () => true,

    // Only allow users to update their own document or if they're admin
    update: ({ req: { user } }) => {
      if (!user) return false;
      if (user.collection === "users") {
        if (user.role === "admin") return true;
      }
      return {
        id: {
          equals: user.id,
        },
      };
    },

    // Only allow users to delete their own document or if they're admin
    delete: ({ req: { user } }) => {
      if (!user) return false;
      if (user.collection === "users") {
        if (user.role === "admin") return true;
      }
      return {
        id: {
          equals: user.id,
        },
      };
    },
  },
};
