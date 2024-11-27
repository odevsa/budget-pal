import { auth } from "@/auth";
import BackendFacade from "@/backend";
import { Account, validationAccountUpdate } from "@/core/models/Account";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import {
  responseBadRequest,
  responseNoContent,
  responseNotFound,
  responseOk,
  responseUnauthenticated,
} from "../../response";

export const GET = auth(async (request, { params }) => {
  if (!request.auth) return responseUnauthenticated();

  const { id } = (await params) as { id: string };
  if (!id) return responseBadRequest({ message: "ID is required" });

  const item = await BackendFacade.accounts.byId(parseInt(id));

  if (!item) return responseNotFound();

  return responseOk(item);
});

export const PUT = auth(async (request, { params }) => {
  const t = await getTranslations();
  if (!request.auth) return responseUnauthenticated();

  const { id } = (await params) as { id: string };
  if (!id) return responseBadRequest({ message: "ID is required" });

  const data = await request.json();
  const dataToEdit = { ...data, id: parseInt(id) } as Account;

  const validation = z.object(validationAccountUpdate).safeParse(dataToEdit);
  if (!validation.success)
    return responseBadRequest(validation.error.flatten().fieldErrors);

  const saved = await BackendFacade.accounts.save(dataToEdit);
  console.log(saved);

  if (!saved)
    return responseBadRequest({
      message: t("crud.message.saveFailure"),
    });

  return responseOk(saved);
});

export const DELETE = auth(async (request, { params }) => {
  if (!request.auth) return responseUnauthenticated();

  const { id } = (await params) as { id: string };
  if (!id) return responseBadRequest({ message: "ID is required" });

  const deleted = await BackendFacade.accounts.delete(parseInt(id));

  if (!deleted) return responseNotFound();

  return responseNoContent();
});
