import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light"); // Default theme is light

  const handleSummarize = async () => {
    if (!text.trim()) return alert("Please enter text!");
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/summarize", { text });
      setSummary(response.data.summary);
    } catch (error) {
      alert("Error fetching summary!");
    }
    setLoading(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme); // Update the theme
  };

  return (
    <div className="container">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
      <h2>AI Text Summarizer</h2>
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