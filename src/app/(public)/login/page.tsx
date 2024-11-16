import { signIn } from "@/auth";
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
import { LogInIcon } from "lucide-react";

export default async function Login() {
  return (
    <div className="flex flex-col flex-grow gap-5 justify-center items-center">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>Choose a sign-in method</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" placeholder="Your e-mail" />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Your password" />
          </div>

          <Button type="submit">
            <div className="w-4 flex justify-center">
              <LogInIcon />
            </div>
            <div className="flex-grow">Sign-in</div>
          </Button>
        </CardContent>
        <CardFooter>
          <form
            className="flex flex-col flex-grow"
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/" });
            }}
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
        </CardFooter>
      </Card>
    </div>
  );
}
