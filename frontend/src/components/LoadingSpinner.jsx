const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-rose-500" />
      <span className="text-sm text-slate-500">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
