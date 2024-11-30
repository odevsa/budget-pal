import { ReceiptIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import PageTitle from "../_components/page-title";

export default async function Bills() {
  const t = await getTranslations();
  return (
    <div className="flex flex-col flex-grow w-full gap-3 px-3 py-2">
      <PageTitle title={t("menu.bills")} icon={<ReceiptIcon />} />
    </div>
  );
}
