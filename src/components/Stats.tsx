
import { BarChart3, MessageSquare, Users } from "lucide-react";
import { DashboardCard } from "./DashboardCard";

const stats = [
  {
    label: "Total Engagements",
    value: "12.5K",
    change: "+14%",
    icon: BarChart3,
  },
  {
    label: "Followers Growth",
    value: "2.4K",
    change: "+7%",
    icon: Users,
  },
  {
    label: "Messages",
    value: "482",
    change: "+24%",
    icon: MessageSquare,
  },
];

export function Stats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <DashboardCard key={stat.label} className="animate-fade-in">
          <div className="flex items-start justify-between">
            <div>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
            <div className="rounded-full bg-primary-light p-2">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
          </div>
          <p className="text-sm font-medium text-green-600">{stat.change} from last month</p>
        </DashboardCard>
      ))}
    </div>
  );
}
