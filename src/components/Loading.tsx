import { cn } from "@/lib/utils";

export const Loading = ({
  size = 48,
  visible = false,
  children,
  className,
  ...props
}: {
  size?: number;
  visible: boolean;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative")}>
      {visible && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          {...props}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "animate-spin absolute m-auto top-0 bottom-0 left-0 right-0 text-center"
          )}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      )}
      <div className={cn(visible ? "opacity-40" : "", className)}>
        {children}
      </div>
    </div>
  );
};
