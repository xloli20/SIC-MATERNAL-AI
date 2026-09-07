import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import InputField from "../components/InputField";
import LoadingSpinner from "../components/LoadingSpinner";
import usePrediction from "../hooks/usePrediction";
import { DEFAULT_FORM_VALUES, FORM_FIELDS } from "../utils/constants";

const Prediction = () => {
  const navigate = useNavigate();
  const { loading, error, submitPrediction } = usePrediction();
  const [form, setForm] = useState(DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await submitPrediction(form);
    if (!result.success) {
      if (result.validationErrors) {
        setErrors(result.validationErrors);
      }
      return;
    }
    navigate("/results", {
      state: { result: result.data, input: result.input },
    });
  };
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
          <ClipboardCheck size={28} />
        </div>
        <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
          Maternal Health Assessment
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Enter the required health measurements below to receive an AI-based
          maternal health risk assessment.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {FORM_FIELDS.map((field) => (
            <InputField
              key={field.name}
              {...field}
              value={form[field.name]}
              onChange={handleChange}
              error={errors[field.name]}
            />
          ))}
        </div>
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500 px-6 py-3.5 font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <LoadingSpinner text="Analyzing..." />
            ) : (
              <>
                Analyze Risk <ArrowRight size={18} />
              </>
            )}
          </button>
          <p className="mt-4 text-center text-xs leading-5 text-slate-400">
            Your information is processed to generate an AI-based assessment.
            This tool is not a medical diagnostic system.
          </p>
        </div>
      </form>
    </div>
  );
};
export default Prediction;
