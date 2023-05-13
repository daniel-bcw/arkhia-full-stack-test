export async function fetchCoinData(currency: string) {
    try {
      const response = await fetch(
        `https://api.coinstats.app/public/v1/coins?currency=${currency}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching coin data");
    }
  }
  
  export async function fetchMinimizeExchange(coinId: string, currency: string) {
    try {
      const response = await fetch(
        `http://localhost:4000/exchanges?coin=${coinId}&currency=${currency}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching minimize exchange");
    }
  }
  