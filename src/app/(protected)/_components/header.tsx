import UserAction from "./user-action";

export default function Header({ title = "" }: Readonly<{ title?: string }>) {
  return (
    <header className="flex flex-row justify-between items-center bg-header h-14 px-3">
      <div>{title}</div>
      <div className="ms-auto">
        <UserAction />
      </div>
    </header>
  );
}
