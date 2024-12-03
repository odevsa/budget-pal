import BackendFacade from "@/backend";
import InvoicesForm from "../../form";
import { redirect } from "@/i18n/routing";

export default async function InvoicesNew({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const item = await BackendFacade.invoices.byId(parseInt(id));
  if (!item) redirect({ href: "/invoices", locale });

  return <InvoicesForm data={item} />;
}
