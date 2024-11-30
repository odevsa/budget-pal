import { GaugeIcon } from "lucide-react";
import PageTitle from "../_components/page-title";
import { getTranslations } from "next-intl/server";

export default async function budgets() {
  const t = await getTranslations();
  return (
    <div className="flex flex-col flex-grow w-full gap-3 px-3 py-2">
      <PageTitle title={t("menu.budgets")} icon={<GaugeIcon />} />
    </div>
  );
}
