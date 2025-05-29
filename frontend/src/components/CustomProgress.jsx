import { Progress } from "@/components/ui/progress";

export function CustomProgress({ startDate, endDate }) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  const total = end.getTime() - start.getTime();
  const current = now.getTime() - start.getTime();
  const percent = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <div className="space-y-1 flex flex-row items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {Math.round(percent)}%
      </span>
      <Progress value={percent} />
    </div>
  );
}
