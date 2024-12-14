import { auth } from "@/auth";
import BackendFacade from "@/backend";
import { Account, validationAccountCreate } from "@/core/models/Account";
import { getTranslations } from "next-intl/server";
import { NextRequest } from "next/server";
import {
  responseBadRequest,
  responseOk,
  responseOkPage,
  responseUnauthenticated,
} from "../response";

export async function GET(_request: NextRequest) {
  const session = await auth();
  if (!session) return responseUnauthenticated();

  const page = await BackendFacade.accounts.page();

  return responseOkPage(page);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return responseUnauthenticated();

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
}
