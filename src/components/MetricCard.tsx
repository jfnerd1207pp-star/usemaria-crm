import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

const MetricCard = ({ title, value, change, changeType, icon: Icon }: MetricCardProps) => {
  return (
    <div className="glass-card rounded-xl p-5 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">{value}</p>
          <p className={`mt-1 text-xs font-medium ${
            changeType === "positive" ? "text-emerald-400" :
            changeType === "negative" ? "text-red-400" : "text-muted-foreground"
          }`}>
            {change}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
