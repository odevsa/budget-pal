import PageTitle from "./page-title";

export default function GenericPage({
  icon,
  title,
  children,
  actions,
}: Readonly<{
  icon?: React.ReactElement;
  title?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col flex-grow w-full gap-3 px-3 py-2">
      <PageTitle title={title} icon={icon}>
        {actions}
      </PageTitle>
      {children}
    </div>
  );
}
