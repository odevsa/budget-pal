import { User } from "@/core/model/User";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
    expires: string?;
  }
}
