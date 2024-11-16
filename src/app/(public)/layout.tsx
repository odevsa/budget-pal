import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ToggleTheme } from "./_components/toggle-theme";
import Logo from "@/components/logo";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user) return redirect("/");

  return (
    <div className="flex flex-col flex-grow">
      <header className="flex flex-row gap-2 justify-between p-4">
        <Logo />
        <ToggleTheme />
      </header>
      <main className="flex flex-col flex-grow m-4">{children}</main>
      <footer className="flex flex-col m-4 mt-auto justify-center text-foreground-muted">
        <span className="text-center">
          Copyright &copy; All rights reserved.
        </span>
      </footer>
    </div>
  );
}
