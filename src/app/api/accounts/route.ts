import { auth } from "@/auth";
import BackendFacade from "@/backend";
import { Account, validationAccountCreate } from "@/core/models/Account";
import { getTranslations } from "next-intl/server";
import {
  responseBadRequest,
  responseOk,
  responseOkPage,
  responseUnauthenticated,
} from "../response";

export const GET = auth(async (request) => {
  if (!request.auth) return responseUnauthenticated();

  const page = await BackendFacade.accounts.all();

  return responseOkPage(page);
});

export const POST = auth(async (request) => {
  if (!request.auth) return responseUnauthenticated();

  const t = await getTranslations();
  const data = (await request.json()) as Account;
  const validation = validationAccountCreate.safeParse(data);
  if (!validation.success)
    return responseBadRequest(validation.error.flatten().fieldErrors);

  const saved = await BackendFacade.accounts.save(data);

  if (!saved)
    return responseBadRequest({
      message: t("crud.message.saveFailure"),
    });

  return responseOk(saved);
});
