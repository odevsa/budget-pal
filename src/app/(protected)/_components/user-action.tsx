import { auth, signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { ToggleTheme } from "./toggle-theme";
import Link from "next/link";

export default async function UserAction() {
  const session = await auth();

  return (
    <div id="dropdownDefaultButton">
      <DropdownMenu>
        <DropdownMenuTrigger className="block bg-white bg-opacity-20 shadow-md w-10 h-10 rounded-full p-[3px]">
          <img
            className=" rounded-full"
            src={session?.user?.image ?? "/img/avatar.svg"}
            alt="Avatar"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-center">
            {session?.user?.name}
            <div className="text-xs font-thin text-foreground-muted">
              {session?.user?.email}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ToggleTheme />
          </DropdownMenuItem>
          <Link href="/settings" legacyBehavior passHref>
            <DropdownMenuItem>
              <SettingsIcon />
              Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <DropdownMenuItem className="focus:bg-destructive focus:text-destructive-foreground">
              <button
                type="submit"
                className="flex flex-row items-center gap-2 "
              >
                <LogOutIcon />
                Sign out
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
