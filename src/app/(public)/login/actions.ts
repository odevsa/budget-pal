"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function loginAction(_previousState: any, data: FormData) {
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const errors: any = {};

  const regex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
  if (!regex.test(email)) errors.email = "Must be a valid email address";
  if (!email) errors.email = "Required!";

  if (password.length < 6) errors.password = "Must contain at least 6!";
  if (!password) errors.password = "Required!";

  if (Object.keys(errors).length == 0) {
    try {
      return await signIn("credentials", {
        email,
        password,
      });
    } catch (error) {
      if (isRedirectError(error)) throw error;

      errors.message = "Invalid email or password!";
    }
  }

  return {
    success: Object.keys(errors).length == 0,
    errors,
  };
}

export async function loginGoogleAction() {
  await signIn("google", { redirectTo: "/" });
}
