import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function GenericWidget({
  title,
  description,
  icon,
  value,
}: Readonly<{
  title: string;
  description?: string;
  icon?: React.ReactElement;
  value: string;
}>) {
  return (
    <Card className="relative grow basis-1">
      <div className="absolute right-5 opacity-10 h-full py-4 flex flex-row justify-end items-center text-9xl">
        {icon}
      </div>
      <CardHeader>
        <CardTitle className="flex flex-row gap-2">
          <span className="h-6">{icon}</span>
          <span>{title}</span>
        </CardTitle>
        <CardDescription className="text-foreground flex flex-col">
          <span className="text-4xl font-bold">{value}</span>
          {description && (
            <span className="text-right font-bold text-muted-foreground">
              {description}
            </span>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
