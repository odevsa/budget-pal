import { User } from "@/core/models/User";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
    expires: string?;
  }
}
