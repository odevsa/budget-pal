import { auth } from "@/auth";
import BackendFacade from "@/backend";
import { Account, validationAccountUpdate } from "@/core/models/Account";
import { getTranslations } from "next-intl/server";
import { NextRequest } from "next/server";
import {
  responseBadRequest,
  responseNoContent,
  responseNotFound,
  responseOk,
  responseUnauthenticated,
} from "../../response";

interface RouteDefaultParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteDefaultParams
) {
  const session = await auth();
  if (!session) return responseUnauthenticated();

  const { id } = (await params) as { id: string };
  if (!id) return responseBadRequest({ message: "ID is required" });

  const item = await BackendFacade.accounts.byId(parseInt(id));

  if (!item) return responseNotFound();

  return responseOk(item);
}

export async function PUT(
  request: NextRequest,
  { params }: RouteDefaultParams
) {
  const session = await auth();
  if (!session) return responseUnauthenticated();

  const t = await getTranslations();
  const { id } = (await params) as { id: string };
  if (!id) return responseBadRequest({ message: "ID is required" });

  const data = await request.json();
  const dataToEdit = { ...data, id: parseInt(id) } as Account;

  const validation = validationAccountUpdate.safeParse(dataToEdit);
  if (!validation.success)
    return responseBadRequest(validation.error.flatten().fieldErrors);

  const saved = await BackendFacade.accounts.save(dataToEdit);

  if (!saved)
    return responseBadRequest({
      message: t("crud.message.saveFailure"),
    });

  return responseOk(saved);
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteDefaultParams
) {
  const session = await auth();
  if (!session) return responseUnauthenticated();

  const { id } = (await params) as { id: string };
  if (!id) return responseBadRequest({ message: "ID is required" });

  const deleted = await BackendFacade.accounts.delete(parseInt(id));

  if (!deleted) return responseNotFound();

  return responseNoContent();
}
