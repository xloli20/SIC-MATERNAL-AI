import { Link, useLocation, Navigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, RotateCcw } from "lucide-react";
import PredictionCard from "../components/PredictionCard";

const Results = () => {
  const location = useLocation();
  const { result, input } = location.state || {};
  // const result = {
  //   risk_level: "low risk",
  //   confidence: 0.87,
  //   probabilities: {
  //     "low risk": 0.87,
  //     "mid risk": 0.1,
  //     "high risk": 0.03,
  //   },
  // };

  // const input = {
  //   age: 28,
  //   systolic_bp: 120,
  //   diastolic_bp: 80,
  //   blood_sugar: 90,
  //   body_temperature: 98.6,
  //   heart_rate: 75,
  // };

  if (!result) {
    return <Navigate to="/prediction" replace />;
  }
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-8">
        <Link
          to="/prediction"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-rose-500"
        >
          <ArrowLeft size={16} /> Back to assessment
        </Link>
        <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
          Your Assessment Result
        </h1>
        <p className="mt-2 text-slate-600">
          Review the model's assessment and the information used to generate it.
        </p>
      </div>
      <PredictionCard result={result} input={input} />
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link
          to="/chatbot"
          state={{ patientData: input, riskLevel: result.risk_level }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-6 py-3.5 font-semibold text-white transition hover:bg-rose-600"
        >
          <MessageCircle size={18} /> Talk to Maternal AI
        </Link>
        <Link
          to="/prediction"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <RotateCcw size={18} /> New Assessment
        </Link>
      </div>
    </div>
  );
};
export default Results;
