import React, { useEffect, useState } from "react";
import CoinList from "../components/CoinList/CoinList";
import CurrencyDropdown from "../components/CurrencyDropdown/CurrencyDropdown";
import ExchangeField from "../components/ExchangeField/ExchangeField";
import SortButton from "../components/SortButton/SortButton";
import { fetchCoinData, fetchMinimizeExchange } from "../services/api";


const Home: React.FC = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [sortByRank, setSortByRank] = useState(false);
  const [sortByName, setSortByName] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<any | null>(null);
  const [minimizeExchange, setMinimizeExchange] = useState("");

  useEffect(() => {
    fetchCoinData(selectedCurrency)
      .then((data) => {
        let sortedCoins = data.coins;
        if (sortByRank) {
          sortedCoins = sortedCoins.sort((a: any, b: any) => a.rank - b.rank);
        } else if (sortByName) {
          sortedCoins = sortedCoins.sort((a: any, b: any) =>
            a.name.localeCompare(b.name)
          );
        }
        setCoins(sortedCoins);
      })
      .catch((error: any) => {
        console.error("Error fetching coins:", error);
      });
  }, [selectedCurrency, sortByRank, sortByName]);

  useEffect(() => {
    if (selectedCoin) {
      // Fetch the minimize exchange for the selected coin and currency
      fetchMinimizeExchange(selectedCoin.id, selectedCurrency)
        .then((data: any) => {
          setMinimizeExchange(data.exchange);
        })
        .catch((error: any) => {
          console.error("Error fetching minimize exchange:", error);
        });
    }
  }, [selectedCoin, selectedCurrency]);

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  const handleSortByRank = () => {
    setSortByRank(!sortByRank);
    setSortByName(false); // Reset sort by name
  };

  const handleSortByName = () => {
    setSortByName(!sortByName);
    setSortByRank(false); // Reset sort by rank
  };

  const handleCoinClick = (coin: any) => {
    setSelectedCoin(coin);
  };

  return (
    <div className="container">
      <div className="text-center">
        <h1>
          <img src={"assets/logo_bcw.png"} alt="BCW" width="250" />
        </h1>
        <p>Transforming the DLT Ecosystem</p>
      </div>
      <h4>Cryptocurrencies</h4>
      <div className="row">
        <div className="col-md-12 mb-3">
          <CurrencyDropdown
            selectedCurrency={selectedCurrency}
            onCurrencyChange={handleCurrencyChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-12">
          <SortButton
            sortByRank={sortByRank}
            sortByName={sortByName}
            onSortByRank={handleSortByRank}
            onSortByName={handleSortByName}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-12">
          <ExchangeField exchange={minimizeExchange} />
        </div>
      </div>
      <div className="row">
        <CoinList coins={coins} onCoinClick={handleCoinClick} />
      </div>
    </div>
  );
};

export default Home;
