import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./lib/db";
import BackendFacade from "./backend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      await BackendFacade.users.save({
        email: user.email!,
        name: user.name!,
        image: user.image!,
      });
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const databaseUser = await BackendFacade.users.byEmail(user.email!);
        token.userId = databaseUser?.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.userId) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
});
