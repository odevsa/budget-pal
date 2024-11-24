"use client";

import { Loading } from "@/components/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GenericPagination from "./generic-pagination";

export default function GenericList({
  data = [],
  page = 1,
  total,
  lastPage = 1,
  fields = { id: "#", title: "Title" },
  editPath,
  actionDelete,
}: Readonly<{
  data: any[];
  page?: number;
  total?: number;
  lastPage?: number;
  fields?: object;
  editPath?: string;
  actionDelete?(item: any): Promise<boolean>;
}>) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async (item: any) => {
    if (!actionDelete) return;

    setLoading(true);
    const deleted = await actionDelete(item);
    setLoading(false);

    toast({
      variant: deleted ? "success" : "destructive",
      title: "Delete",
      description: deleted
        ? "Successfully deleted!"
        : "Wasn't possible to delete!",
    });

    if (!deleted) return;

    router.refresh();
  };

  return (
    <div className="flex flex-col gap-4">
      <Loading visible={loading}>
        <Table>
          <TableHeader>
            <TableRow>
              {Object.values(fields).map((title) => (
                <TableHead key={title}>{title}</TableHead>
              ))}
              {(editPath || actionDelete) && (
                <TableHead className="text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={`item-${item.id}`}>
                {Object.keys(fields).map((key) => (
                  <TableCell key={`item-${item.id}-key-${key}`}>
                    {item[key]}
                  </TableCell>
                ))}

                {(editPath || actionDelete) && (
                  <TableCell className="flex flex-row gap-2 justify-end">
                    {editPath && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={editPath.replace("[id]", item.id)}
                            passHref
                          >
                            <Button variant={"warning"} size={"xs"}>
                              <EditIcon />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>Edit item</TooltipContent>
                      </Tooltip>
                    )}
                    {actionDelete && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant={"destructive"} size={"xs"}>
                                <TrashIcon />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete confirmation
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete "{item.title}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(item)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TooltipTrigger>
                        <TooltipContent>Delete item</TooltipContent>
                      </Tooltip>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <GenericPagination page={page} lastPage={lastPage} />
      </Loading>
    </div>
  );
}
