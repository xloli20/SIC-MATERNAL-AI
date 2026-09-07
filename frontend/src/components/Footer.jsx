import { HeartPulse } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="text-rose-500" size={20} />
            <span className="font-semibold text-slate-800">Maternal AI</span>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-500">
            Maternal AI is an educational AI project and is not a substitute for
            professional medical advice, diagnosis, or treatment.
          </p>
        </div>
        <div className="mt-6 border-t border-slate-100 pt-5 text-xs text-slate-400">
          © {new Date().getFullYear()} Maternal AI. Academic project.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
