import BackendFacade from "@/backend";
import CategoriesForm from "../../form";
import { redirect } from "@/i18n/routing";

export default async function CategoriesNew({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const item = await BackendFacade.categories.byId(parseInt(id));
  if (!item) redirect({ href: "/categories", locale });

  return <CategoriesForm data={item} />;
}
