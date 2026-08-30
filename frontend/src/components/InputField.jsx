const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  unit,
  placeholder,
  min,
  max,
  step,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type="number"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`w-full rounded-xl border bg-white px-4 py-3 pr-20 text-slate-900 outline-none transition placeholder:text-slate-400 ${error ? "border-red-400 focus:ring-2 focus:ring-red-100" : "border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"}`}
        />
        {unit && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
            {unit}
          </span>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;
