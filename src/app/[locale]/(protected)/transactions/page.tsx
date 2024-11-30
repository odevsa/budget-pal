import { ArrowLeftRightIcon } from "lucide-react";
import PageTitle from "../_components/page-title";
import { getTranslations } from "next-intl/server";

export default async function Transactions() {
  const t = await getTranslations();
  return (
    <div className="flex flex-col flex-grow w-full gap-3 px-3 py-2">
      <PageTitle title={t("menu.transactions")} icon={<ArrowLeftRightIcon />} />
    </div>
  );
}
