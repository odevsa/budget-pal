"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "@/i18n/routing";
import { PlusIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { registerAction } from "./actions";
import { useTranslations } from "next-intl";

export default function Login() {
  const t = useTranslations();
  const { toast } = useToast();
  const [state, formAction] = useActionState(registerAction, {} as any);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (state?.errors?.message) {
      toast({
        variant: "destructive",
        title: t("auth.register"),
        description: state.errors.message,
      });
    }

    if (!state.success) return;

    toast({
      variant: "success",
      title: t("auth.register"),
      description: t("auth.message.registerSuccess"),
    });
  }, [state]);

  return (
    <div className="flex flex-col flex-grow gap-5 justify-center items-center">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>{t("auth.register")}</CardTitle>
          <CardDescription>
            {t("auth.message.registerDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={formAction}>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">{t("auth.name")}</Label>
              <Input
                id="name"
                name="name"
                placeholder={t("auth.namePlaceholder")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {state?.errors?.name && (
                <span className="text-destructive font-bold text-xs">
                  {state.errors.name}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                name="email"
                placeholder={t("auth.emailPlaceholder")}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {state?.errors?.email && (
                <span className="text-destructive font-bold text-xs">
                  {state.errors.email}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input
                id="password"
                name="password"
                placeholder={t("auth.passwordPlaceholder")}
                type="password"
              />
              {state?.errors?.password && (
                <span className="text-destructive font-bold text-xs">
                  {state.errors.password}
                </span>
              )}
            </div>
            <Button type="submit">
              <div className="w-4 flex justify-center">
                <PlusIcon />
              </div>
              <div className="flex-grow">{t("auth.register")}</div>
            </Button>
            <div className="text-center">
              <Link href={"/"}>{t("auth.login")}</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
