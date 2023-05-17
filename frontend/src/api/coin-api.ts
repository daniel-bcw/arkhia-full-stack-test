const COINSTATS_API_URL = process.env.REACT_APP_COINSTATS_API_URL || 'https://api.coinstats.app/public/v1/coins';
const BACKEND_API_URL = process.env.REACT_BACKEND_API_URL || 'http://localhostt:4000';

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
    exchange: string;
};

export const getCoins = async (currency: string): Promise<ICoinModel[]> => {
    const url = `${COINSTATS_API_URL}?currency=${currency}`;
    const response = await fetch(url).catch(error => {
        return null;
    });

    const json =  await response?.json();
    return json.coins as ICoinModel[];
};

export const getCoinExchange = async (currency: string, coinId: string): Promise<ICoinModel[]> => {
    const url = `${BACKEND_API_URL}?currency=${currency}&coinId=${coinId}`;
    const response = await fetch(url).catch(error => {
        return null;
    });

    const json =  await response?.json();
    return json.coins as ICoinModel[];
};

export const getCoinsExchange = async (currency: string, sortBy?: string): Promise<ICoinModel[]> => {
    const url = `${BACKEND_API_URL}?currency=${currency}` + (sortBy ? `&sortBy=${sortBy}` : '');
    const response = await fetch(url).catch(error => {
        return null;
    });

    const json =  await response?.json();
    return json.coins as ICoinModel[];
};