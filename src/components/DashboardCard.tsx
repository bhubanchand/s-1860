
import { cn } from "@/lib/utils";

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DashboardCard({ children, className, ...props }: DashboardCardProps) {
  return (
    <div className={cn("dashboard-card", className)} {...props}>
      {children}
    </div>
  );
}
