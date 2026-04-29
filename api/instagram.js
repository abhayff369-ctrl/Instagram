export default async function handler(req, res) {

  // ==================================================
  // API KEY SYSTEM
  // ==================================================

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

  // ==================================================
  // USERNAME INPUT
  // ==================================================

  const username = req.query.user;

  if (!username) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "Username Required"
    });
  }

  try {

    // ==================================================
    // TARGET API
    // ==================================================

    const api =
      `https://anishexploits.com/api/instagram.php?exploits=${encodeURIComponent(username)}`;

    // ==================================================
    // FETCH API
    // ==================================================

    const response = await fetch(api, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    // ==================================================
    // CHECK API
    // ==================================================

    if (!response.ok) {
      return res.status(500).json({
        status: false,
        code: 500,
        message: "Failed To Fetch API"
      });
    }

    // ==================================================
    // GET TEXT RESPONSE
    // ==================================================

    let text = await response.text();

    // ==================================================
    // REMOVE UNWANTED TEXT
    // ==================================================

    text = text.replace(
      /────────────────────────[\s\S]*?━━━━━━━━━━━━━━━━━━━━━━━━━━━/g,
      ""
    );

    text = text.replace(
      /💳 BUY API : @Cyb3rS0ldier/g,
      ""
    );

    text = text.replace(
      /🆘 SUPPORT : @Cyb3rS0ldier/g,
      ""
    );

    // ==================================================
    // AUTO FIXED NUMBER GENERATOR
    // SAME USERNAME = SAME NUMBER
    // ==================================================

    function generateFixedNumber(str) {

      let hash = 0;

      for (let i = 0; i < str.length; i++) {
        hash =
          str.charCodeAt(i) +
          ((hash << 5) - hash);
      }

      hash = Math.abs(hash);

      let number = "9";

      for (let i = 0; i < 9; i++) {
        number += ((hash + i) % 10);
      }

      return number;
    }

    // Generate Number
    const generatedNumber =
      generateFixedNumber(
        username.toLowerCase()
      );

    // ==================================================
    // FINAL RESPONSE
    // ==================================================

    return res.status(200).json({
      status: true,
      code: 200,
      developer: "Abhay Singh",
      username: username,
      generated_number: generatedNumber,
      result: text.trim()
    });

  } catch (error) {

    // ==================================================
    // ERROR RESPONSE
    // ==================================================

    return res.status(500).json({
      status: false,
      code: 500,
      error: error.message
    });

  }

}
