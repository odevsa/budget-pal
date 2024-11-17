import { PrismaClient } from "@prisma/client";

declare global {
  var db: PrismaClient | undefined;
}

const DB = global.db || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  global.db = DB;
}

export default DB;
