"use server";

import { signIn } from "@/auth";
import { validationUserLogin } from "@/core/models/User";
import { getTranslations } from "next-intl/server";
import { isRedirectError } from "next/dist/client/components/redirect";
import { z } from "zod";

export async function loginAction(_previousState: any, formData: FormData) {
  const t = await getTranslations();
  const errors: any = {};
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    redirectTo: formData.get("callback") as string,
  };

  const validation = z.object(validationUserLogin).safeParse(data);

  if (!validation.success)
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
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

export async function loginGoogleAction(formData: FormData) {
  const redirectTo = formData.get("callback") as string;
  await signIn("google", { redirectTo });
}
