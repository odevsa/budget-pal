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
import { Link } from "@/i18n/routing";
import { EditIcon, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GenericPagination from "./generic-pagination";
import { maskDecimal } from "@/core/mask";

interface GenericListField {
  key: string;
  label?: string;
  process?: string;
}

const process = {
  maskDecimal,
};

export default function GenericList({
  data = [],
  page = 1,
  total,
  lastPage = 1,
  fields = [
    { key: "id", label: "crud.id" },
    { key: "title", label: "crud.title" },
  ],
  editPath,
  actionDelete,
}: Readonly<{
  data: any[];
  page?: number;
  total?: number;
  lastPage?: number;
  fields?: GenericListField[];
  editPath?: string;
  actionDelete?(item: any): Promise<boolean>;
}>) {
  const t = useTranslations();
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
      title: t("crud.delete"),
      description: deleted
        ? t("crud.message.deleteSuccess")
        : t("crud.message.deleteFailure"),
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
              {fields.map((field) => (
                <TableHead key={field.label}>{t(field.label)}</TableHead>
              ))}
              {(editPath || actionDelete) && (
                <TableHead className="text-right">
                  {t("crud.actions")}
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={`item-${item.id}`}>
                {fields.map((field) => (
                  <TableCell key={`item-${item.id}-key-${field.label}`}>
                    {field.process
                      ? process[field.process](item[field.key])
                      : item[field.key]}
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
                        <TooltipContent>{t("crud.edit")}</TooltipContent>
                      </Tooltip>
                    )}
                    {actionDelete && (
                      <Tooltip>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <TooltipTrigger asChild>
                              <Button variant={"destructive"} size={"xs"}>
                                <TrashIcon />
                              </Button>
                            </TooltipTrigger>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {t("crud.deleteConfirmation")}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {t("crud.deleteMessage", { title: item.title })}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                {t("crud.cancel")}
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(item)}
                              >
                                {t("crud.continue")}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <TooltipContent>{t("crud.delete")}</TooltipContent>
                      </Tooltip>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <GenericPagination page={page} total={total} lastPage={lastPage} />
      </Loading>
    </div>
  );
}
