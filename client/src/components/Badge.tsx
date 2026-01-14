interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "outline" | "secondary";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-primary/10 text-primary border-primary/20",
    success: "bg-green-500/10 text-green-700 border-green-500/20",
    warning: "bg-amber-500/10 text-amber-700 border-amber-500/20",
    danger: "bg-red-500/10 text-red-700 border-red-500/20",
    secondary: "bg-secondary text-secondary-foreground border-transparent",
    outline: "bg-transparent border-border text-foreground",
  };

  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border
      ${variants[variant]} ${className}
    `}>
      {children}
    </span>
  );
}
