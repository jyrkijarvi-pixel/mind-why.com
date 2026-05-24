export default async function handler(req, res) {
  // Sallitaan vain POST-pyynnöt
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Vain POST-pyynnöt sallittu" });
  }

  const { query } = req.body;

  try {
    // Tavily API -kutsu
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY, // Tämä hakee sen salaisen avaimen Vercelistä
        query: query,
        search_depth: "basic"
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Haku epäonnistui palvelimella" });
  }
}
