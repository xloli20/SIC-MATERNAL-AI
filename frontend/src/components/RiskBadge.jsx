import { AlertTriangle, CheckCircle2, CircleAlert } from "lucide-react";
import { RISK_LEVELS } from "../utils/constants";

const RiskBadge = ({ riskLevel }) => {
  const normalized = String(riskLevel || "").toLowerCase();
  let config = {
    label: "Unknown Risk",
    className: "bg-slate-100 text-slate-700",
    icon: CircleAlert,
  };
  if (normalized.includes("high")) {
    config = {
      label: "High Risk",
      className: "bg-red-100 text-red-700",
      icon: AlertTriangle,
    };
  } else if (normalized.includes("mid") || normalized.includes("medium")) {
    config = {
      label: "Medium Risk",
      className: "bg-amber-100 text-amber-700",
      icon: AlertTriangle,
    };
  } else if (normalized.includes("low")) {
    config = {
      label: "Low Risk",
      className: "bg-emerald-100 text-emerald-700",
      icon: CheckCircle2,
    };
  }
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${config.className}`}
    >
      <Icon size={16} /> {config.label}
    </span>
  );
};
export default RiskBadge;
