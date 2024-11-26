import { auth } from "@/auth";
import BackendFacade from "@/backend";
import { NextResponse } from "next/server";

export const GET = auth(async (request) => {
  if (!request.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const page = await BackendFacade.accounts.all();

  return new Response(JSON.stringify(page), {
    status: 200,
  });
});
