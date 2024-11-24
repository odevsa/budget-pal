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
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { loginAction, loginGoogleAction } from "./actions";

export default function Login() {
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
        title: "Login",
        description: state.errors.message,
      });
    }

    if (!state.success) return;

    toast({
      variant: "success",
      title: "Login",
      description: "Redirect to dashboard",
    });
  }, [state]);

  return (
    <div className="flex flex-col flex-grow gap-5 justify-center items-center">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>Choose a sign-in method</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={formAction}>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                placeholder="Your e-mail"
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
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
              <div className="flex-grow">Sign-in</div>
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <form
            className="flex flex-col flex-grow w-full"
            action={loginGoogleAction}
          >
            <Button
              type="submit"
              variant={"destructive"}
              className="flex flex-row"
            >
              <div className="w-4 flex justify-center">G</div>
              <div className="flex-grow">Sign-in with Google</div>
            </Button>
          </form>
          <div className="text-sm">
            Don't have an account?&nbsp;
            <Link href={"/register"}>Register</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
