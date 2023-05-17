const API_URL = process.env.REACT_APP_ENDPOINT || 'https://api.coinstats.app/public/v1/coins';

export interface ICoinModel {
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

    coins: Object;
    urls: string[];
};

export const getCoins = async (currency: string): Promise<ICoinModel[]> => {
    const url = `${API_URL}?currency=${currency}`;
    const response = await fetch(url).catch(error => {
        return null;
    });

    const json =  await response?.json();
    return json.coins as ICoinModel[];
};