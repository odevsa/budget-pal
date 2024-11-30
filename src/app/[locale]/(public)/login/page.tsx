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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "@/i18n/routing";
import { LogInIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { loginAction, loginGoogleAction } from "./actions";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");
  const { toast } = useToast();
  const [state, formAction] = useActionState(loginAction, {} as any);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (state?.errors?.message) {
      toast({
        variant: "destructive",
        title: t("auth.login"),
        description: state.errors.message,
      });
    }

    if (!state.success) return;

    toast({
      variant: "success",
      title: t("auth.login"),
      description: t("auth.message.loginSuccess"),
    });
  }, [state]);

  return (
    <div className="flex flex-col flex-grow gap-5 justify-center items-center">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>{t("auth.login")}</CardTitle>
          <CardDescription>
            {t("auth.message.loginDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={formAction}>
            {callback && (
              <input name="callback" type="hidden" value={callback} />
            )}
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
                type="password"
                placeholder={t("auth.passwordPlaceholder")}
              />
              {state?.errors?.password && (
                <span className="text-destructive font-bold text-xs">
                  {state.errors.password}
                </span>
              )}
            </div>

            <Button type="submit">
              <div className="w-4 flex justify-center">
                <LogInIcon />
              </div>
              <div className="flex-grow">{t("auth.signIn")}</div>
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <form
            className="flex flex-col flex-grow w-full"
            action={loginGoogleAction}
          >
            {callback && (
              <input name="callback" type="hidden" value={callback} />
            )}
            <Button
              type="submit"
              variant={"destructive"}
              className="flex flex-row"
            >
              <div className="w-4 flex justify-center">G</div>
              <div className="flex-grow">{t("auth.signInGoogle")}</div>
            </Button>
          </form>
          <div className="text-sm">
            {t("auth.message.noAccount")}&nbsp;
            <Link href={"/register"}>{t("auth.register")}</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
