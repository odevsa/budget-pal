import { auth as middleware } from "@/auth";
import { NextResponse } from "next/server";

export default middleware((req: any) => {
  const regex = /^\/api(?!\/auth)/;

  if (!req.auth && regex.test(req.nextUrl.pathname))
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
});
