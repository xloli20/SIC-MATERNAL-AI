export const validatePredictionForm = (values) => {
  const errors = {};
  const ranges = {
    age: [10, 100],
    systolic_bp: [50, 250],
    diastolic_bp: [30, 150],
    blood_sugar: [20, 500],
    body_temperature: [80, 110],
    heart_rate: [30, 220],
  };
  Object.entries(ranges).forEach(([field, [min, max]]) => {
    const value = Number(values[field]);
    if (
      values[field] === "" ||
      values[field] === null ||
      values[field] === undefined
    ) {
      errors[field] = "This field is required.";
      return;
    }
    if (Number.isNaN(value)) {
      errors[field] = "Please enter a valid number.";
      return;
    }
    if (value < min || value > max) {
      errors[field] = `Value must be between ${min} and ${max}.`;
    }
  });
  if (
    values.systolic_bp !== "" &&
    values.diastolic_bp !== "" &&
    Number(values.systolic_bp) <= Number(values.diastolic_bp)
  ) {
    errors.systolic_bp =
      "Systolic blood pressure should be higher than diastolic blood pressure.";
  }
  return errors;
};
export const normalizePredictionData = (values) => ({
  age: Number(values.age),
  systolic_bp: Number(values.systolic_bp),
  diastolic_bp: Number(values.diastolic_bp),
  blood_sugar: Number(values.blood_sugar),
  body_temperature: Number(values.body_temperature),
  heart_rate: Number(values.heart_rate),
});
