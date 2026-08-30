import { useState } from "react";
import { predictRisk } from "../services/api";
import {
  normalizePredictionData,
  validatePredictionForm,
} from "../utils/validation";

const usePrediction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitPrediction = async (values) => {
    setLoading(true);
    setError("");
    try {
      const validationErrors = validatePredictionForm(values);
      if (Object.keys(validationErrors).length > 0) {
        return { success: false, validationErrors };
      }
      const payload = normalizePredictionData(values);
      const result = await predictRisk(payload);
      return { success: true, data: result, input: payload };
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        "Unable to connect to the prediction service. Please try again.";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, submitPrediction };
};

export default usePrediction;
