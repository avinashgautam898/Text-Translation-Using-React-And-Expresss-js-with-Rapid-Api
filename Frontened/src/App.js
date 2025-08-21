import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("hi");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/translate", {
        text,
        to: language,
      });
      setTranslatedText(res.data.data.translatedText);
    } catch (err) {
      console.error(err);
      setTranslatedText("Error occurred while translating.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6"> Translator</h1>

      <textarea
        rows={4}
        className="w-96 p-3 rounded-md border border-gray-600 text-black resize-none"
        placeholder="Enter text in English..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <select
        className="mt-4 p-2 rounded-md bg-gray-700 border border-gray-600"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="hi">Hindi</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        <option value="de">German</option>
      </select>

      <button
        onClick={translateText}
        disabled={loading}
        className={`mt-6 px-6 py-2 rounded-md font-semibold ${
          loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      {translatedText && (
        <div className="mt-8 p-4 bg-gray-800 rounded-md w-96 text-center">
          <h2 className="text-xl font-semibold mb-2">Translated Text:</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}
