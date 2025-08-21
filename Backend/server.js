import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Translate Route
app.post("/translate", async (req, res) => {
  const { text, to } = req.body;

  try {
    const response = await axios.post(
      "https://text-translator2.p.rapidapi.com/translate",
      new URLSearchParams({
        source_language: "en",
        target_language: to,
        text: text
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-rapidapi-host": "text-translator2.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
