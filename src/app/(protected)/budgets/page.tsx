import { GaugeIcon } from "lucide-react";
import PageTitle from "../_components/page-title";

export default function budgets() {
  return (
    <div className="flex flex-col flex-grow w-full gap-3 px-3 py-2">
      <PageTitle title="Budgets" icon={<GaugeIcon />} />
    </div>
  );
}
