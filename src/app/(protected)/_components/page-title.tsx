export default function PageTitle({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <h1 className="text-lg font-bold py-2">{children}</h1>;
}
