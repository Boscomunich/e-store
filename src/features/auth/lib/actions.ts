"use server";

import { cookies } from "next/headers";
import { signInSchema, signUpSchema } from "./schemas";
import { getPayload } from "payload";
import config from "@payload-config";

export async function registerHandler({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const payload = await getPayload({ config });
  try {
    signUpSchema.parse({ email, password });
    const newUser = await payload.create({
      collection: "customers",
      data: {
        email,
        password,
      },
    });
    return newUser;
  } catch (error) {
    return error;
  }
}

export async function loginHandler({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const payload = await getPayload({ config });
  try {
    signInSchema.parse({ email, password });
    const response = await payload.login({
      collection: "customers",
      data: {
        email,
        password,
      },
    });

    if (response.token) {
      let cookieStore = await cookies();
      cookieStore.set({
        name: "payload-token",
        value: response.token,
        httpOnly: true,
        path: "/",
      });
    }

    return { success: true };
  } catch (error) {
    return error;
  }
}
