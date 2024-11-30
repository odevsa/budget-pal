import { auth } from "@/auth";
import { redirect } from "@/i18n/routing";
import {
  ArrowLeftRightIcon,
  GaugeIcon,
  LayoutDashboardIcon,
  ReceiptIcon,
  SettingsIcon,
  TagIcon,
  WalletIcon,
} from "lucide-react";
import Footer from "./_components/footer";
import Header from "./_components/header";
import NavBar from "./_components/navbar";

export default async function PanelLayout({
  params,
  children,
}: Readonly<{
  params: { locale: string };
  children: React.ReactNode;
}>) {
  const locale = (await params).locale;
  const session = await auth();
  if (!session?.user) return redirect({ href: "/login", locale });

  const menu = [
    { title: "menu.dashboard", path: "/", icon: <LayoutDashboardIcon /> },
    {
      title: "menu.transactions",
      path: "/transactions",
      icon: <ArrowLeftRightIcon />,
    },
    { title: "menu.budgets", path: "/budgets", icon: <GaugeIcon /> },
    { title: "menu.bills", path: "/bills", icon: <ReceiptIcon /> },
    { title: "menu.accounts", path: "/accounts", icon: <WalletIcon /> },
    { title: "menu.categories", path: "/categories", icon: <TagIcon /> },
    { title: "menu.settings", path: "/settings", icon: <SettingsIcon /> },
  ];

  return (
    <div className="flex flex-col flex-grow">
      <Header />
      <section className="flex flex-row flex-grow">
        <NavBar menu={menu} />
        <main className="flex flex-1 flex-col gap-8 items-center">
          {children}
          <Footer />
        </main>
      </section>
    </div>
  );
}
