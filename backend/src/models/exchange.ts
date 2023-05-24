export interface IExchangeModel {
    id: string;
    icon: string;
    name: string;
    symbol: string;
    rank: number;
    price: number;
    priceBtc: number;
    volume: number;
    marketCap: number;
    availableSupply: number;
    totalSupply: number;
    priceChange1h: number;
    priceChange1d: number;
    priceChange1w: number;
    websiteUrl: string;
    twitterUrl: string;
    exp: string[];

    exchange: string;
};

export interface IPairModel {
    price: number;
    exchange: string;
    pair: string;
    pairPrice: number;
    volume: number;
};