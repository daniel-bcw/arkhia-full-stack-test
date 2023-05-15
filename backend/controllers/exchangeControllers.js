const axios = require("axios");

const exchange = async (req, res) => {
  const { coin, currency } = req.query;

  try {
    // Fetch the markets for the specified coin
    const response = await axios.get(
      `https://api.coinstats.app/public/v1/markets?coinId=${coin}&currency=${currency}`
    );
    const data = response.data;

    const markets = data;

    if (!markets || markets.length === 0) {
      res
        .status(404)
        .json({ error: "No markets found for the specified coin" });
      return;
    }

    if (markets.length === 0) {
      res
        .status(404)
        .json({ error: "No markets found for the selected currency" });
    } else if (markets.length === 1) {
      // Only one market supports the selected currency
      const exchange = markets[0].exchange;
      res.json({ exchange });
    } else {
      // Multiple markets support the selected currency, find the one with the lowest price
      let minPrice = Number.MAX_VALUE;
      let minPriceExchange = "";

      markets.forEach((market) => {
        if (market.price < minPrice) {
          minPrice = market.price;
          minPriceExchange = market.exchange;
        }
      });

      res.json({ exchange: minPriceExchange });
    }
  } catch (error) {
    console.error("Error fetching markets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  exchange,
};
