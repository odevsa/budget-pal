import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import BackendFacade from "./backend";

export class InvalidCredentialsSignin extends CredentialsSignin {
  constructor() {
    super();
    this.code = "invalid_cedentials";
    this.message = "Invalid cedentials!";
    this.stack = undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        const user: any = await BackendFacade.users.byEmail(email as string);

        if (
          !user ||
          !(await BackendFacade.users.verify(user?.email!, password as string))
        )
          throw new InvalidCredentialsSignin();

        return user;
      },
    }),
    Google,
  ],
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
        (session.user as { id: number }).id = token.userId as number;
      }
      return session;
    },
  },
});
