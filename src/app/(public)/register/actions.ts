"use server";

import { signIn } from "@/auth";
import BackendFacade from "@/backend";
import { User } from "@/core/models/User";
import { isRedirectError } from "next/dist/client/components/redirect";
import { z } from "zod";

export async function registerAction(_previousState: any, formData: FormData) {
  const errors: any = {};
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validated = z
    .object({
      name: z.string().min(3).max(50),
      email: z.string().email(),
      password: z.string().min(6),
    })
    .safeParse(data);

  if (!validated.success)
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };

  const user = await BackendFacade.users.byEmail(data.email);

  if (user) errors.message = "User already registered";

  if (Object.keys(errors).length == 0) {
    const saved = await BackendFacade.users.save(data as User);
    if (!saved) errors.message = "Wasn't possible to create user!";
  }

  if (Object.keys(errors).length == 0) {
    try {
      return await signIn("credentials", {
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      if (isRedirectError(error)) throw error;

      errors.message = "Couldn't log you in, try login again!";
    }
  }

  return {
    success: Object.keys(errors).length == 0,
    errors,
  };
}
