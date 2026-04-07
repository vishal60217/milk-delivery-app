type StatsCardProps = {
  title: string;
  value: string | number;
  icon?: string;
};

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-100">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
        </div>
        {icon ? (
          <span className="text-3xl leading-none" aria-hidden="true">
            {icon}
          </span>
        ) : null}
      </div>
    </div>
  );
}
