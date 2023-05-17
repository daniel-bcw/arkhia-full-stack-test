import axios from 'axios';
import { IExchangeModel, IPairModel } from '@/models/exchange';

const COINSTATS_URL = process.env.COINSTATS_URL || 'https://api.coinstats.app/public/v1';
class ExchangeService {

    /**
     * Get coin information from 'https://api.coinstats.app/public/v1/coins'
     * 
     * @param {*} currency A currency in cash. Can be 'USD', 'HKD', 'KRW', and 'SGD'
     * @returns An array of IExchangeModel
     */
    private async getCoinsFromOrigin(currency: string) {
        const response = await axios.get(`${COINSTATS_URL}/coins?currency=${currency}`)
            .catch(error => {
                // Handle any errors
                console.log(error);
                return null;
            });

        return response.data;
    }

    /**
     * Get coin information from 'https://api.coinstats.app/public/v1/coins'
     * @param {*} coinId A cryptocurrency id being returned by coinstats api. ex:) bitcoin, ethereum
     * @returns An array of IExchangeModel
     */
    private async getPairs(coinId: string) {
        const response = await axios.get(`${COINSTATS_URL}/markets?coinId=${coinId}`)
            .catch(error => {
                // Handle any errors
                console.log(error);
                return null;
            });

        return response.data;
    }

    /**
     * Get a list of trade providers which proivdes minimum price per each crypto
     * 
     * @param {*} currency A currency in cash. Can be 'USD', 'HKD', 'KRW', and 'SGD'
     * @param {*} coinId [Optional] A cryptocurrency id being returned by coinstats api. ex:) bitcoin, ethereum
     * @returns An array of IExchangeModel
     */
    async getAllExchange(currency: string, coinId?: string) {

        if (coinId) {
            return [{
                coinId: coinId,
                exchange: this.getExchange(currency, coinId)
            }];
        }

        let coinData = await this.getCoinsFromOrigin(currency);
        if (!coinData) {
            return [];
        }

        const coins = coinData.coins as unknown as IExchangeModel[];
        const allExchanges = [];
        for (let i = 0; i < coins.length; i++) {
            const exchange = await this.getExchange(currency, coins[i].id);
            allExchanges.push({
                ...coins[i],
                coinId: coins[i].id, 
                exchange: exchange,
            })
        }

        return allExchanges;
    }

    /**
     * Get the name of trade provider which proivdes minimum price
     * 
     * @param {*} currency A currency in cash. Can be 'USD', 'HKD', 'KRW', and 'SGD'
     * @param {*} coinId A cryptocurrency id being returned by coinstats api. ex:) bitcoin, ethereum
     * @returns A name of trade provider
     */
    async getExchange(currency: string, coinId: string): Promise<string> {
        const getMin = <T>(data: T[], field: string): T => {
            if (data.length === 0) {
                return null;
            }

            return data.reduce((min, current) => {
                return current[field] < min[field] ? current : min;
            }, data[0]);
        };

        const pairs = await this.getPairs(coinId) as unknown as IPairModel[];
        if (!pairs) {
            return "";
        }

        const filteredPairs = pairs.filter(pair => pair.pair.toLowerCase().endsWith(`/${currency.toLowerCase()}`));
        if (filteredPairs.length === 0) {
            return "";
        }

        const bestExchange = getMin<IPairModel>(filteredPairs, 'price');
        return bestExchange?.exchange || "";
    }
}

export default new ExchangeService();