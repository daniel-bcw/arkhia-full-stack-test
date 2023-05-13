import React from "react";
import "./coinlist.css";

interface CoinListProps {
  coins: any[];
  onCoinClick: (coin: any) => void;
}

const CoinList: React.FC<CoinListProps> = ({ coins, onCoinClick }) => {
  return (
    <div className="col-md-12">
      <ul className="list-group">
        {coins.map((coin) => (
          <li
            key={coin.id}
            className="list-group-item d-flex justify-content-between align-items-center cursor-pointer"
            onClick={() => onCoinClick(coin)}
          >
            <img src={coin.icon} alt={coin.name} width="30" height="30" />
            <span>{coin.name}</span>
            <span>{coin.symbol}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoinList;
