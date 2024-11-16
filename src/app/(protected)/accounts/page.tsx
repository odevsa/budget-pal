import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditIcon, TrashIcon } from "lucide-react";
import PageTitle from "../_components/page-title";

export default async function Accounts() {
  // await fetch()

  return (
    <div className="flex flex-col flex-grow w-full gap-3 px-3 py-2">
      <PageTitle>Accounts</PageTitle>

      <Table>
        <TableCaption>A list of your categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(10)].map((_value, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">Account 1</TableCell>
              <TableCell>10/10/2010 22:10</TableCell>
              <TableCell className="flex flex-row gap-2 justify-end">
                <Button variant={"warning"} size={"sm"}>
                  <EditIcon />
                </Button>
                <Button variant={"destructive"} size={"sm"}>
                  <TrashIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
