import { auth } from "@/auth";
import {
  ArrowLeftRightIcon,
  GaugeIcon,
  LayoutDashboardIcon,
  ReceiptIcon,
  SettingsIcon,
  TagIcon,
  WalletIcon,
} from "lucide-react";
import { redirect } from "next/navigation";
import Footer from "./_components/footer";
import Header from "./_components/header";
import NavBar from "./_components/navbar";

export default async function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) return redirect("/login");

  const menu = [
    { title: "Dashboard", path: "/", icon: <LayoutDashboardIcon /> },
    {
      title: "Transactions",
      path: "/transactions",
      icon: <ArrowLeftRightIcon />,
    },
    { title: "Budgets", path: "/budgets", icon: <GaugeIcon /> },
    { title: "Bills", path: "/bills", icon: <ReceiptIcon /> },
    { title: "Accounts", path: "/accounts", icon: <WalletIcon /> },
    { title: "Categories", path: "/categories", icon: <TagIcon /> },
    { title: "Settings", path: "/settings", icon: <SettingsIcon /> },
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
