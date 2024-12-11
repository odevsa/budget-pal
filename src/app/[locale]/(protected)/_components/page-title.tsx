export default function PageTitle({
  icon,
  title,
  children,
}: Readonly<{
  icon?: React.ReactElement;
  title?: string;
  children?: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row justify-between gap-2 py-2">
      <div className="flex flex-row justify-between items-center gap-2">
        {icon}
        {title && <h1 className="text-lg font-bold">{title}</h1>}
      </div>
      {children && (
        <div className="flex flex-row justify-between items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
}
