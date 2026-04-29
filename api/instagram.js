export default async function handler(req, res) {

  // =========================
  // API KEY SYSTEM
  // =========================

  const SECRET_KEY = "abhay123secure";

  const userKey =
    req.query.key ||
    req.headers["x-api-key"];

  // Invalid Key
  if (!userKey || userKey !== SECRET_KEY) {
    return res.status(403).json({
      status: false,
      code: 403,
      message: "Invalid API Key"
    });
  }

  // =========================
  // USER INPUT
  // =========================

  const username = req.query.user;

  if (!username) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "Username Required"
    });
  }

  try {

    // =========================
    // TARGET API
    // =========================

    const api =
      `https://anishexploits.com/api/instagram.php?exploits=${encodeURIComponent(username)}`;

    // =========================
    // FETCH DATA
    // =========================

    const response = await fetch(api, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    // =========================
    // RESPONSE CHECK
    // =========================

    if (!response.ok) {
      return res.status(500).json({
        status: false,
        code: 500,
        message: "Failed To Fetch API"
      });
    }

    // =========================
    // JSON DATA
    // =========================

    const data = await response.json();

    // =========================
    // SUCCESS RESPONSE
    // =========================

    return res.status(200).json({
      status: true,
      code: 200,
      developer: "Your Name",
      api_owner: "Anish Exploits",
      username: username,
      result: data
    });

  } catch (error) {

    // =========================
    // ERROR RESPONSE
    // =========================

    return res.status(500).json({
      status: false,
      code: 500,
      error: error.message
    });

  }
}
