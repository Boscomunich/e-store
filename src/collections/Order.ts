import { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "id", // Display the order ID in the admin panel
  },
  access: {
    // Allow customers to read their own orders and admins to read all
    read: ({ req: { user } }) => {
      if (!user) return false;
      if (user.collection === "users") {
        if (user.role === "admin") return true;
      }
      return {
        customer: {
          equals: user.id, // Assuming user ID matches the customer reference
        },
      };
    },
    // Only allow users to create orders (frontend usage)
    create: () => true,
    // Only admins can update or delete orders
    update: ({ req: { user } }) => {
      if (!user) return false;
      if (user.collection === "users") {
        if (user.role === "admin") return true;
      }
      return false;
    },
    delete: ({ req: { user } }) => {
      if (!user) return false;
      if (user.collection === "users") {
        if (user.role === "admin") return true;
      }
      return false;
    },
  },
  fields: [
    {
      name: "customer", // Changed from "user" to "customer"
      type: "relationship",
      relationTo: "customers", // Reference the customer who placed the order
      required: true,
    },
    {
      name: "products",
      type: "array",
      required: true,
      label: "Ordered Products",
      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "products", // Reference the products collection
          required: true,
        },
        {
          name: "quantity",
          type: "number",
          required: true,
          label: "Quantity Ordered",
          defaultValue: 1,
        },
        {
          name: "price",
          type: "number",
          required: true,
          label: "Price Per Unit",
          admin: {
            readOnly: true, // Ensure this is not editable after the order is created
          },
        },
      ],
    },
    {
      name: "totalAmount",
      type: "number",
      required: true,
      label: "Total Amount",
      admin: {
        readOnly: true, // Calculated field, not editable
      },
    },
    {
      name: "paymentMethod",
      type: "select",
      required: true,
      label: "Payment Method",
      options: [
        { label: "Paid", value: "paid" },
        { label: "Payment on Delivery", value: "payment-on-delivery" },
      ],
      defaultValue: "payment-on-delivery",
    },
    {
      name: "isPaid",
      type: "checkbox",
      label: "Payment Status",
      defaultValue: false,
    },
    {
      name: "shippingStatus",
      type: "select",
      required: true,
      label: "Shipping Status",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Shipped", value: "shipped" },
        { label: "Ready for Pickup", value: "ready-for-pickup" },
        { label: "Delivered", value: "delivered" },
      ],
      defaultValue: "pending",
    },
    {
      name: "deliveryAddress",
      type: "relationship",
      relationTo: "profile", // Reference the address from the Profile collection
      required: true,
    },
    {
      name: "createdAt",
      type: "date",
      label: "Order Date",
      defaultValue: () => new Date().toISOString(), // Set the default as the current date
      admin: {
        readOnly: true, // Not editable
      },
    },
  ],
};
