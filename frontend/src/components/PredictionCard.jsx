import { Activity, HeartPulse, ShieldAlert } from "lucide-react";
import RiskBadge from "./RiskBadge";

const formatPercentage = (value) => {
  if (typeof value !== "number") return "—";
  return `${(value * 100).toFixed(1)}%`;
};

const PredictionCard = ({ result, input }) => {
  if (!result) return null;
  const probabilities = result.probabilities || {};
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
            <HeartPulse size={32} />
          </div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-slate-500">
            Assessment Result
          </p>
          <RiskBadge riskLevel={result.risk_level} />
          {typeof result.confidence === "number" && (
            <p className="mt-4 text-sm text-slate-500">
              Model confidence:
              <span className="font-semibold text-slate-700">
                {formatPercentage(result.confidence)}
              </span>
            </p>
          )}
        </div>
      </div>
      {Object.keys(probabilities).length > 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Activity className="text-rose-500" size={22} />
            <h2 className="font-semibold text-slate-900">
              Prediction Probabilities
            </h2>
          </div>
          <div className="space-y-4">
            {Object.entries(probabilities).map(([label, value]) => {
              const percentage = typeof value === "number" ? value * 100 : 0;
              return (
                <div key={label}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="capitalize text-slate-600">{label}</span>
                    <span className="font-semibold text-slate-800">
                      {formatPercentage(value)}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-rose-500 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {input && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 font-semibold text-slate-900">
            Assessment Information
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Info label="Age" value={`${input.age} years`} />
            <Info label="Systolic BP" value={`${input.systolic_bp} mmHg`} />
            <Info label="Diastolic BP" value={`${input.diastolic_bp} mmHg`} />
            <Info label="Blood Sugar" value={input.blood_sugar} />
            <Info label="Temperature" value={`${input.body_temperature} °F`} />
            <Info label="Heart Rate" value={`${input.heart_rate} bpm`} />
          </div>
        </div>
      )}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex gap-3">
          <ShieldAlert className="mt-0.5 shrink-0 text-amber-600" size={20} />
          <p className="text-sm leading-6 text-amber-800">
            This prediction is intended for educational and risk-assessment
            purposes only. It does not provide a medical diagnosis and should
            not replace consultation with a qualified healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="rounded-xl bg-slate-50 p-4">
    <p className="text-xs text-slate-400">{label}</p>
    <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
  </div>
);

export default PredictionCard;
