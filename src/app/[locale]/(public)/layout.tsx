import { auth } from "@/auth";
import { ToggleTheme } from "./_components/toggle-theme";
import Logo from "@/components/Logo";
import { redirect } from "@/i18n/routing";

export default async function PublicLayout({
  params,
  children,
}: Readonly<{
  params: { locale: string };
  children: React.ReactNode;
}>) {
  const locale = (await params).locale;
  const session = await auth();
  if (session?.user) return redirect({ href: "/", locale });

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
