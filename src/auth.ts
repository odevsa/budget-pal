import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  // callbacks: {
  //   session({ session }) {
  //     session.user.id = 1;
  //     return session;
  //   },
  // },
});
