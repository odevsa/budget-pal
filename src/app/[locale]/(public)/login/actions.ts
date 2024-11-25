"use server";

import { signIn } from "@/auth";
import { getTranslations } from "next-intl/server";
import { isRedirectError } from "next/dist/client/components/redirect";
import { z } from "zod";

export async function loginAction(_previousState: any, formData: FormData) {
  const t = await getTranslations();
  const errors: any = {};
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validated = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
    })
    .safeParse(data);

  if (!validated.success)
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };

  try {
    return await signIn("credentials", data);
  } catch (error) {
    if (isRedirectError(error)) throw error;

    errors.message = t("auth.message.loginFailure");
  }

  return {
    success: Object.keys(errors).length == 0,
    errors,
  };
}

export async function loginGoogleAction() {
  await signIn("google", { redirectTo: "/" });
}
