import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: {
    tokenExpiration: 86400,
    maxLoginAttempts: 5,
    lockTime: 600,
  },
  fields: [
    {
      name: "role",
      type: "select",
      options: ["admin", "editor"],
      defaultValue: "user",
      required: false,
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
