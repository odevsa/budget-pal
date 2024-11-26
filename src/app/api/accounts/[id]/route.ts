import { auth } from "@/auth";
import BackendFacade from "@/backend";
import { NextResponse } from "next/server";

export const GET = auth(async (request, { params }) => {
  if (!request.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const { id } = (await params) as { id: string };
  if (!id)
    return NextResponse.json({ message: "ID is required" }, { status: 400 });

  const item = await BackendFacade.accounts.byId(parseInt(id));

  if (!item)
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

  return new Response(JSON.stringify(item), {
    status: 200,
  });
});
