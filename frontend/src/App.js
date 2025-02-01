import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");

  const indianLanguages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "bn", name: "Bengali" },
    { code: "te", name: "Telugu" },
    { code: "mr", name: "Marathi" },
    { code: "ta", name: "Tamil" },
    { code: "ur", name: "Urdu" },
    { code: "gu", name: "Gujarati" },
    { code: "kn", name: "Kannada" },
    { code: "or", name: "Odia" },
    { code: "pa", name: "Punjabi" },
    { code: "ml", name: "Malayalam" },
    { code: "as", name: "Assamese" },
    { code: "mai", name: "Maithili" },
    { code: "mni", name: "Manipuri" },
    { code: "sat", name: "Santali" },
    { code: "ks", name: "Kashmiri" },
    { code: "ne", name: "Nepali" },
    { code: "sd", name: "Sindhi" },
    { code: "kok", name: "Konkani" },
    { code: "doi", name: "Dogri" },
    { code: "brx", name: "Bodo" },
  ];

  const handleSummarize = async () => {
    if (!text.trim()) return alert("Please enter text!");
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/summarize", {
        text,
        language,
      });
      setSummary(response.data.summary);
    } catch (error) {
      alert("Error fetching summary!");
    }
    setLoading(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="container">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
      <h2>AI Text Summarizer</h2>
      <div className="language-selector">
        <label htmlFor="language">Select Language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {indianLanguages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <textarea
        rows="6"
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? (
          <>
            <span className="loading-spinner"></span>
            Summarizing...
          </>
        ) : (
          "Summarize"
        )}
      </button>
      <h3>Summary:</h3>
      <p>{summary || "Your summary will appear here..."}</p>
    </div>
  );
}

export default App;