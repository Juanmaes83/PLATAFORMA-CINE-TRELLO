import * as React from "react";
import { cn } from "../lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  isOnline?: boolean;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    { className, src, alt, fallback, size = "md", isOnline = false, ...props },
    ref
  ) => {
    const [error, setError] = React.useState(false);

    const sizeClasses = {
      sm: "h-6 w-6 text-[10px]",
      md: "h-8 w-8 text-xs",
      lg: "h-10 w-10 text-sm",
      xl: "h-12 w-12 text-base",
    };

    const onlineIndicator = {
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-2.5 w-2.5",
      xl: "h-3 w-3",
    };

    const initials = fallback
      ? fallback
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "?";

    return (
      <span
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full bg-muted overflow-hidden ring-2 ring-white",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src && !error ? (
          <img
            src={src}
            alt={alt || fallback || "Avatar"}
            className="h-full w-full object-cover"
            onError={() => setError(true)}
          />
        ) : (
          <span className="font-medium text-muted-foreground select-none">
            {initials}
          </span>
        )}
        {isOnline && (
          <span
            className={cn(
              "absolute -bottom-0.5 -right-0.5 rounded-full bg-green-500 ring-2 ring-white",
              onlineIndicator[size]
            )}
          />
        )}
      </span>
    );
  }
);
Avatar.displayName = "Avatar";

const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { max?: number }
>(({ className, children, max = 4, ...props }, ref) => {
  const childrenArray = React.Children.toArray(children);
  const visible = childrenArray.slice(0, max);
  const remaining = childrenArray.length - max;

  return (
    <div
      ref={ref}
      className={cn("flex items-center -space-x-2", className)}
      {...props}
    >
      {visible}
      {remaining > 0 && (
        <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium ring-2 ring-white">
          +{remaining}
        </span>
      )}
    </div>
  );
});
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup };
