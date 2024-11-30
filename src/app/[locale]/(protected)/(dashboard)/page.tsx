"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  EditIcon,
  InfoIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  SaveIcon,
  TrashIcon,
} from "lucide-react";
import PageTitle from "../_components/page-title";
import { useTranslations } from "next-intl";

export default function Panel() {
  const t = useTranslations();
  const { toast } = useToast();

  return (
    <div className="flex flex-col flex-grow w-full gap-3 px-3 py-2">
      <PageTitle title={t("menu.dashboard")} icon={<LayoutDashboardIcon />} />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>I18N</CardTitle>
            <CardDescription>{t("menu.dashboard")}</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Toast Test</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card with test content</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant={"outline"}
              onClick={() => {
                toast({
                  title: "Title of toast",
                  description: new Date().toUTCString(),
                });
              }}
            >
              <MessageSquareIcon />
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Title of toast",
                  description: new Date().toUTCString(),
                  variant: "success",
                });
              }}
            >
              <SaveIcon />
            </Button>
            <Button
              variant={"info"}
              onClick={() => {
                toast({
                  title: "Title of toast",
                  description: new Date().toUTCString(),
                  variant: "info",
                });
              }}
            >
              <EditIcon />
            </Button>
            <Button
              variant={"warning"}
              onClick={() => {
                toast({
                  title: "Title of toast",
                  description: new Date().toUTCString(),
                  variant: "warning",
                });
              }}
            >
              <InfoIcon />
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => {
                toast({
                  title: "Title of toast",
                  description: new Date().toUTCString(),
                  variant: "destructive",
                });
              }}
            >
              <TrashIcon />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
