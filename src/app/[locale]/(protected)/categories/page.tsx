import { TagIcon } from "lucide-react";
import PageTitle from "../_components/page-title";

export default function Categories() {
  return (
    <div className="flex flex-col flex-grow w-full gap-3 px-3 py-2">
      <PageTitle title="Categories" icon={<TagIcon />} />
    </div>
  );
}
