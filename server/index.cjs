
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

// Middleware
app.use(cors());

app.use(
  express.json({
    limit: "10mb"
  })
);

// Gemini AI configuration
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// ================================
// TEST ROUTE
// ================================

app.get("/test-gemini", async (req, res) => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: "Reply with exactly: Gemini API is working"
    });

    res.json({
      success: true,
      message: result.text
    });

  } catch (error) {
    console.error("Gemini test error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ================================
// E-WASTE IDENTIFICATION
// ================================

app.post("/identify-ewaste", async (req, res) => {
  try {
    const { image, mimeType } = req.body;

    console.log("Received e-waste identification request");
    console.log("Image received:", !!image);
    console.log("MIME type:", mimeType);

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No image received."
      });
    }

    const base64Image = image.includes(",")
      ? image.split(",")[1]
      : image;

    const prompt = `
You are an e-waste identification system.

Look carefully at the uploaded image and identify the electronic item.

Choose EXACTLY ONE category:

Mobile Phone
Laptop
Computer Parts
TV / Monitor
Battery
Other E-Waste

Rules:
- Clearly visible mobile phone → Mobile Phone
- Clearly visible laptop → Laptop
- Computer hardware/components → Computer Parts
- Television or monitor → TV / Monitor
- Battery or battery pack → Battery
- Any other electronic item → Other E-Waste

Return ONLY the category name.
No explanation.
No confidence score.
No extra words.
`;

    console.log("Sending image to Gemini...");

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: [
        {
          type: "image",
          data: base64Image,
          mime_type: mimeType || "image/jpeg"
        },
        {
          type: "text",
          text: prompt
        }
      ]
    });

    console.log("Gemini interaction completed.");

    const detectedMaterial =
      interaction.output_text?.trim();

    console.log("Gemini detected:", detectedMaterial);

    if (!detectedMaterial) {
      throw new Error("Gemini returned an empty response.");
    }

    const allowedCategories = [
      "Mobile Phone",
      "Laptop",
      "Computer Parts",
      "TV / Monitor",
      "Battery",
      "Other E-Waste"
    ];

    const matchedCategory = allowedCategories.find(
      (category) =>
        detectedMaterial.toLowerCase() === category.toLowerCase()
    );

    const finalCategory = matchedCategory || "Other E-Waste";

    console.log("Final category:", finalCategory);

    res.json({
      success: true,
      material: finalCategory
    });

  } catch (error) {
    console.error("Gemini identification error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "E-waste identification failed."
    });
  }
});

// ================================
// SERVE REACT FRONTEND
// ================================

// Serve Vite build files
app.use(express.static(path.join(__dirname, "../dist")));

// React application fallback
app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// ================================
// START SERVER
// ================================

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`E-Waste Connect server running on port ${PORT}`);
});
