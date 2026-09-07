import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Bot, Send, User } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { sendChatMessage } from "../services/api";
import { CHATBOT_GREETING } from "../utils/constants";

const Chatbot = () => {
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const patientData = location.state?.patientData || null;
  const riskLevel = location.state?.riskLevel || null;
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: CHATBOT_GREETING },
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || loading) return;
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
    };
    setMessages((previous) => [...previous, userMessage]);
    setMessage("");
    setLoading(true);
    try {
      const response = await sendChatMessage({
        message: trimmedMessage,
        patient_data: patientData,
        risk_level: riskLevel,
      });
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text:
          response.response ||
          response.message ||
          "I could not generate a response.",
      };
      setMessages((previous) => [...previous, botMessage]);
    } catch (error) {
      const status = error.response?.status;
      const detail = error.response?.data?.detail;

      let errorMessage =
        "I’m unable to connect to the chatbot service right now. Please try again later.";

      if (status === 422) {
        if (Array.isArray(detail)) {
          errorMessage =
            "Some information required for the chatbot is missing or invalid.";
        } else {
          errorMessage = "The information sent to the chatbot is invalid.";
        }
      } else if (status === 500) {
        errorMessage =
          "The chatbot service is currently unavailable. Please try again later.";
      }

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: errorMessage,
      };
      setMessages((previous) => [...previous, botMessage]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-900 px-5 py-5 text-white sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500">
              <Bot size={23} />
            </div>
            <div>
              <h1 className="font-bold">Maternal AI Assistant</h1>
              <p className="text-xs text-slate-300">
                General maternal health education
              </p>
            </div>
          </div>
          {riskLevel && (
            <div className="mt-4 rounded-xl bg-white/10 px-4 py-3 text-sm text-slate-200">
              Current assessment:
              <span className="font-semibold capitalize text-white">
                {riskLevel}
              </span>
            </div>
          )}
        </div>
        <div className="h-[55vh] overflow-y-auto bg-slate-50 p-4 sm:p-6">
          <div className="space-y-5">
            {messages.map((item) => (
              <ChatMessage key={item.id} {...item} />
            ))}
            {loading && (
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                  <Bot size={17} />
                </div>
                <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-sm">
                  <LoadingSpinner text="Thinking..." />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="border-t border-slate-200 bg-white p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask about your assessment..."
              disabled={loading}
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100 disabled:bg-slate-50"
            />
            <button
              type="submit"
              disabled={!message.trim() || loading}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-500 text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
          <p className="mt-3 text-center text-xs text-slate-400">
            This assistant provides general educational information and does not
            diagnose or treat medical conditions.
          </p>
        </div>
      </div>
    </div>
  );
};
const ChatMessage = ({ sender, text }) => {
  const isUser = sender === "user";
  return (
    <div
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isUser ? "bg-rose-100 text-rose-600" : "bg-slate-200 text-slate-600"}`}
      >
        {isUser ? <User size={17} /> : <Bot size={17} />}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${isUser ? "rounded-tr-md bg-rose-500 text-white" : "rounded-tl-md bg-white text-slate-700 shadow-sm"}`}
      >
        {text}
      </div>
    </div>
  );
};
export default Chatbot;
