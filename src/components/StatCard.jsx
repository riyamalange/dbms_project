import { ArrowUpRight } from "lucide-react";

function StatCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  iconBg,
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition duration-300">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            {value}
          </h2>
        </div>

        <div className={`p-3 rounded-xl ${iconBg}`}>
          <Icon size={22} />
        </div>

      </div>

      <div className="flex items-center gap-2 mt-5">

        <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
          <ArrowUpRight size={16} />
          {change}
        </div>

        <span className="text-xs text-slate-400">
          {description}
        </span>

      </div>

    </div>
  );
}

export default StatCard;