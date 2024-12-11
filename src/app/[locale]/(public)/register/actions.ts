"use server";

import { signIn } from "@/auth";
import BackendFacade from "@/backend";
import { User, validationUserRegister } from "@/core/models/User";
import { getTranslations } from "next-intl/server";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function registerAction(_previousState: any, formData: FormData) {
  const t = await getTranslations();
  const errors: any = {};
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validation = validationUserRegister.safeParse(data);

  if (!validation.success)
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };

  const user = await BackendFacade.users.byEmail(data.email);

  if (user) errors.message = t("auth.message.registerUserAlreadyRegistered");

  if (Object.keys(errors).length == 0) {
    const saved = await BackendFacade.users.save(data as User);
    if (!saved) errors.message = t("auth.message.registerFailure");
  }

  if (Object.keys(errors).length == 0) {
    try {
      return await signIn("credentials", {
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      if (isRedirectError(error)) throw error;

      errors.message = t("auth.message.registerCanNotLogin");
    }
  }

  return {
    success: Object.keys(errors).length == 0,
    errors,
  };
}
