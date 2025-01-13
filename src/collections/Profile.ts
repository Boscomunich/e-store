import { CollectionConfig } from "payload";

export const Profile: CollectionConfig = {
  slug: "profile",
  admin: {
    useAsTitle: "user", // Display the user's name or email in the admin panel
  },
  access: {
    // Ensure users can only access their own profiles
    read: ({ req: { user } }) => {
      if (!user) return false;
      return {
        user: {
          equals: user.id,
        },
      };
    },
    update: ({ req: { user } }) => {
      if (!user) return false;
      return {
        user: {
          equals: user.id,
        },
      };
    },
    create: ({ req: { user } }) => {
      return !!user; // Only logged-in users can create profiles
    },
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "customers", // Link to the `users` collection
      required: true,
      unique: true, // Ensure one profile per user
    },
    {
      name: "fullName",
      type: "text",
      required: true,
      label: "Full Name",
    },
    {
      name: "phoneNumber",
      type: "text",
      required: true,
      label: "Phone Number",
      admin: {
        description: "Enter a valid phone number, including country code.",
      },
    },
    {
      name: "addresses",
      type: "array",
      label: "Shipping Addresses",
      fields: [
        {
          name: "addressLine1",
          type: "text",
          required: true,
          label: "Address Line 1",
        },
        {
          name: "addressLine2",
          type: "text",
          label: "Address Line 2",
        },
        {
          name: "city",
          type: "text",
          required: true,
          label: "City",
        },
        {
          name: "state",
          type: "text",
          required: true,
          label: "State/Province",
        },
        {
          name: "postalCode",
          type: "text",
          required: true,
          label: "Postal Code",
        },
        {
          name: "country",
          type: "text",
          required: true,
          label: "Country",
        },
        {
          name: "isDefault",
          type: "checkbox",
          label: "Set as Default Address",
          defaultValue: false,
        },
      ],
    },
    {
      name: "paymentMethods",
      type: "array",
      label: "Saved Payment Methods",
      admin: {
        description: "Manage saved payment methods for faster checkout.",
      },
      fields: [
        {
          name: "cardHolderName",
          type: "text",
          required: true,
          label: "Cardholder Name",
        },
        {
          name: "cardLast4",
          type: "text",
          required: true,
          label: "Last 4 Digits of Card",
        },
        {
          name: "expiryDate",
          type: "text",
          required: true,
          label: "Expiry Date",
          admin: {
            placeholder: "MM/YY",
          },
        },
      ],
    },
  ],
};
