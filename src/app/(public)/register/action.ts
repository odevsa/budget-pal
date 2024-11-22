"use server";

import { signIn } from "@/auth";
import BackendFacade from "@/backend";
import { User } from "@/core/models/User";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function registerAction(_previousState: any, data: FormData) {
  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const errors: any = {};

  if (name.length < 3 || name.length > 30)
    errors.name = "Must contain at least 3 and no more than 30 characters!";
  if (!name) errors.name = "Required!";

  const regex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
  if (!regex.test(email)) errors.email = "Must be a valid email address";
  if (!email) errors.email = "Required!";

  if (password.length < 6) errors.password = "Must contain at least 6!";
  if (!password) errors.password = "Required!";

  if (Object.keys(errors).length == 0) {
    const user = await BackendFacade.users.byEmail(email);

    if (user) errors.message = "User already registered";

    if (Object.keys(errors).length == 0) {
      const saved = await BackendFacade.users.save({
        name,
        email,
        password,
      } as User);
      if (!saved) errors.message = "Wasn't possible to create user!";
    }

    if (Object.keys(errors).length == 0) {
      try {
        return await signIn("credentials", {
          email,
          password,
        });
      } catch (error) {
        if (isRedirectError(error)) throw error;

        errors.message = "Couldn't log you in, try login again!";
      }
    }
  }

  return {
    success: Object.keys(errors).length == 0,
    errors,
  };
}
