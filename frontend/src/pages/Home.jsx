import { Link } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  ClipboardCheck,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const Home = () => {
  return (
    <div>
      <section className="overflow-hidden bg-gradient-to-b from-rose-50 via-white to-slate-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-rose-600 shadow-sm ring-1 ring-rose-100">
              <HeartPulse size={17} /> AI-Powered Health Risk Prediction and
              Support
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Understand maternal health risk with
              <span className="text-rose-500">AI</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Maternal AI analyzes key maternal health measurements and provides
              an AI-based risk assessment designed to support awareness and
              education.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/prediction"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-600"
              >
                Start Assessment <ArrowRight size={18} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-rose-200/50 blur-3xl" />
            <div className="relative w-full max-w-md rounded-3xl border border-white bg-white p-8 shadow-2xl shadow-slate-200">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Maternal AI</p>
                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    Health Assessment
                  </h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                  <HeartPulse />
                </div>
              </div>
              <div className="space-y-4">
                <Metric label="Blood Pressure" value="120 / 80 mmHg" />
                <Metric label="Heart Rate" value="75 bpm" />
                <Metric label="Blood Sugar" value="90 mg/dL" />
              </div>
              <div className="mt-6 rounded-2xl bg-emerald-50 p-5">
                <p className="text-xs font-medium text-emerald-600">
                  Example assessment
                </p>
                <p className="mt-1 text-lg font-bold text-emerald-700">
                  Low Risk
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-rose-500">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Three simple steps
            </h2>
            <p className="mt-4 text-slate-600">
              Enter your measurements, receive an AI-based assessment, and
              explore educational guidance.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Step
              number="01"
              icon={ClipboardCheck}
              title="Enter your information"
              description="Provide the maternal health measurements required by the prediction model."
            />
            <Step
              number="02"
              icon={BrainCircuit}
              title="AI risk assessment"
              description="The trained machine learning model analyzes the submitted measurements."
            />
            <Step
              number="03"
              icon={Stethoscope}
              title="Understand your result"
              description="Review the result and use the chatbot for general educational guidance."
            />
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                <ShieldCheck />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Important medical disclaimer
                </h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Maternal AI is a project developed as part of the Samsung
                  Innovation Campus program for educational and training
                  purposes. Its predictions should not be used as a diagnosis or
                  as a substitute for professional medical advice, examination,
                  or treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const Metric = ({ label, value }) => (
  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
    <span className="text-sm text-slate-500">{label}</span>
    <span className="text-sm font-semibold text-slate-800">{value}</span>
  </div>
);
const Step = ({ number, icon: Icon, title, description }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
    <div className="flex items-center justify-between">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-rose-500 shadow-sm">
        <Icon size={22} />
      </div>
      <span className="text-sm font-bold text-slate-300">{number}</span>
    </div>
    <h3 className="mt-6 text-lg font-bold text-slate-900">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
  </div>
);
export default Home;
