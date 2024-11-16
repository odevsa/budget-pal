import Logo from "@/components/Logo";
import UserAction from "./user-action";

export default function Header({ title = "" }: Readonly<{ title?: string }>) {
  return (
    <header className="flex flex-row justify-between items-center bg-header">
      <div className="flex flex-col h-full w-60 justify-center items-center bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-10 py-2">
        <a href="/">
          <Logo size={"default"} />
        </a>
      </div>

      <div className="flex flex-row px-2 py-2">
        <div>{title}</div>
        <div className="ms-auto">
          <UserAction />
        </div>
      </div>
    </header>
  );
}
