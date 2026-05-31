import { useState } from "react";
import axios from "axios";

function AIChat({ data }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSummary = () => {
    const cityStats = {};

    data.forEach((item) => {
      if (!cityStats[item.tenant]) {
        cityStats[item.tenant] = {
          total: 0,
          approved: 0,
          rejected: 0,
          pending: 0,
          collection: 0,
        };
      }

      cityStats[item.tenant].total++;

      if (item.status === "Approved") {
        cityStats[item.tenant].approved++;
      }

      if (item.status === "Rejected") {
        cityStats[item.tenant].rejected++;
      }

      if (item.status === "Pending") {
        cityStats[item.tenant].pending++;
      }

      cityStats[item.tenant].collection += item.collection_inr;
    });

    return JSON.stringify(cityStats, null, 2);
  };

  const askAI = async () => {
    if (!question.trim()) {
      setAnswer("Please enter a question");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `
You are a Property Tax Analytics Assistant.

Rules:
- Do not use markdown
- Do not use bold text
- Do not use bullet points
- Respond in clean plain English
- Keep answers concise and professional

Dataset Summary:
${generateSummary()}

Question:
${question}
                  `,
                },
              ],
            },
          ],
        }
      );

      const result =
        response.data.candidates[0].content.parts[0].text;

      setAnswer(result);
    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(error.response.data);
      }

      setAnswer("Failed to fetch AI response");
    }

    setLoading(false);
  };

  return (
    <div className="bg-slate-800 text-white p-6 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold tracking-wide mb-4">
        AI Assistant
      </h2>

      <textarea
        rows={4}
        placeholder="Ask about property data..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full border border-slate-600 bg-slate-900 text-white rounded-lg p-4"
      />

      <button
        onClick={askAI}
        className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-105 transition-all text-white px-6 py-3 rounded-lg"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Thinking...
          </div>
        ) : (
          "Ask AI"
        )}
      </button>

      {answer && (
        <div className="mt-6 bg-slate-700 text-white p-4 rounded-lg whitespace-pre-wrap">
          {answer}
        </div>
      )}
    </div>
  );
}

export default AIChat;