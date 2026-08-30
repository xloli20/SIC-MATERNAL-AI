export const RISK_LEVELS = {
  LOW: "low risk",
  MEDIUM: "mid risk",
  HIGH: "high risk",
};
export const FORM_FIELDS = [
  {
    name: "age",
    label: "Age",
    unit: "years",
    placeholder: "e.g. 28",
    min: 10,
    max: 100,
    step: 1,
  },
  {
    name: "systolic_bp",
    label: "Systolic Blood Pressure",
    unit: "mmHg",
    placeholder: "e.g. 120",
    min: 50,
    max: 250,
    step: 1,
  },
  {
    name: "diastolic_bp",
    label: "Diastolic Blood Pressure",
    unit: "mmHg",
    placeholder: "e.g. 80",
    min: 30,
    max: 150,
    step: 1,
  },
  {
    name: "blood_sugar",
    label: "Blood Sugar",
    unit: "mg/dL",
    placeholder: "e.g. 90",
    min: 20,
    max: 500,
    step: 0.1,
  },
  {
    name: "body_temperature",
    label: "Body Temperature",
    unit: "°F",
    placeholder: "e.g. 98.6",
    min: 80,
    max: 110,
    step: 0.1,
  },
  {
    name: "heart_rate",
    label: "Heart Rate",
    unit: "bpm",
    placeholder: "e.g. 75",
    min: 30,
    max: 220,
    step: 1,
  },
];
export const DEFAULT_FORM_VALUES = {
  age: "",
  systolic_bp: "",
  diastolic_bp: "",
  blood_sugar: "",
  body_temperature: "",
  heart_rate: "",
};
export const CHATBOT_GREETING =
  "Hello. I’m Maternal AI’s health assistant. I can help explain your assessment result and provide general educational guidance based on the information you entered.";
