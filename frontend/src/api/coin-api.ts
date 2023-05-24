const COINSTATS_API_URL = process.env.REACT_APP_COINSTATS_API_URL || 'https://api.coinstats.app/public/v1/coins';
const BACKEND_API_URL = process.env.REACT_BACKEND_API_URL || 'http://localhost:4000';

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

/**
 * Fetch coin stats
 * 
 * @param {*} currency A currency in cash. Can be 'USD', 'HKD', 'KRW', and 'SGD'
 * @returns An array of ICoinModel
 */
export const getCoins = async (currency: string): Promise<ICoinModel[]> => {
    const url = `${COINSTATS_API_URL}?currency=${currency}`;
    const response = await fetch(url).catch(error => {
        return null;
    });

    const json = await response?.json();
    return json.coins as ICoinModel[];
};

/**
 * Get the best exchange provider from backend
 * 
 * @param {*} currency A currency in cash. Can be 'USD', 'HKD', 'KRW', and 'SGD'
 * @param {*} coinId A cryptocurrency id being returned by coinstats api. ex:) bitcoin, ethereum
 * @returns {exchange: "Provider"}
 */
export const getExchange = async (currency: string, coinId: string): Promise<{ exchange: string }> => {
    const url = `${BACKEND_API_URL}/exchange?currency=${currency}&coinId=${coinId}`;
    try {
        const response = await fetch(url);
        const json = await response?.json();

        return json;
    } catch (error: any) {
        console.log("[Error]", error.toString());
        throw error;
    }
};