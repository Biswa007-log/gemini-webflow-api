// export default async function handler(req, res) {
//   // Allow Webflow origin (or all origins for testing)
//   res.setHeader("Access-Control-Allow-Origin", "https://inner-athlete.webflow.io");
//   res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   // Handle preflight OPTIONS request
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { prompt } = req.body;

//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: prompt }] }]
//       })
//     }
//   );

//   const result = await response.json();
//   const reply = result?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply.";
//   res.status(200).json({ response: reply });
// }

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.gemini.com/v1/complete", {
      // Example Gemini endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GEMINI_API_KEY}`, // Your key stored securely
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
