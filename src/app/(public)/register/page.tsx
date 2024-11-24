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
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { registerAction } from "./actions";

export default function Login() {
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
        title: "Register",
        description: state.errors.message,
      });
    }

    if (!state.success) return;

    toast({
      variant: "success",
      title: "Register",
      description: "Redirect to dashboard",
    });
  }, [state]);

  return (
    <div className="flex flex-col flex-grow gap-5 justify-center items-center">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Register</CardTitle>
          <CardDescription>Choose a sign-in method</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={formAction}>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your Name"
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
                placeholder="Your password"
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
              <div className="flex-grow">Register</div>
            </Button>
            <div className="text-center">
              <Link href={"/"}>login</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
