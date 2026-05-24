export default async function handler(req, res) {
  // Turvatarkistus: Vain oma sivustosi saa käyttää tätä
  const referer = req.headers.referer;
  if (!referer || !referer.includes("mind-why.com")) {
    return res.status(403).json({ error: "Access denied" });
  }

  if (req.method !== 'POST') return res.status(405).end();
  const { query } = req.body;

  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY,
        query: query,
        search_depth: "basic"
      }),
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Virhe haussa" });
  }
}
