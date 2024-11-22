import Logo from "@/components/Logo";
import UserAction from "./user-action";

export default function Header({ title = "" }: Readonly<{ title?: string }>) {
  return (
    <header className="flex flex-row justify-between items-center bg-header">
      <div className="flex flex-col h-full w-14 sm:w-60 justify-center items-center bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-70 py-2">
        <a href="/">
          <Logo size={"default"} variant={"icon"} className="sm:hidden" />
          <Logo size={"default"} className="hidden sm:flex" />
        </a>
      </div>

      <div className="flex flex-row flex-grow items-center gap-2 px-3 py-2">
        <div>{title}</div>
        <div className="ms-auto">
          <UserAction />
        </div>
      </div>
    </header>
  );
}
