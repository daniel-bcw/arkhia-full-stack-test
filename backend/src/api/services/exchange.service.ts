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
    private async getPairs(coinId: string): Promise<IPairModel[]> {
        try {
            const response = await axios.get(`${COINSTATS_URL}/markets?coinId=${coinId}`)
            return response.data as IPairModel[];
        } catch (error) {
            // Handle any errors
            console.log(error);
            throw (error);
        }
    }

    /**
     * Get the name of trade provider which proivdes minimum price
     * 
     * @param {*} currency A currency in cash. Can be 'USD', 'HKD', 'KRW', and 'SGD'
     * @param {*} coinId A cryptocurrency id being returned by coinstats api. ex:) bitcoin, ethereum
     * @returns A name of trade provider
     */
    async getExchange(currency: string, coinId: string): Promise<{ exchange?: string, error?: string }> {
        const getMin = <T>(data: T[], field: string): T => {
            if (data.length === 0) {
                return null;
            }

            return data.reduce((min, current) => {
                return current[field] < min[field] ? current : min;
            }, data[0]);
        };

        try {
            const pairs = await this.getPairs(coinId);

            // Filter out pairs that do not support currency.
            const filteredPairs = pairs.filter(pair => (
                pair.pair.toLowerCase().endsWith(`/${currency.toLowerCase()}`)
            ));

            if (filteredPairs.length <= 0) {
                return { error: 'Not Supported Currency' };
                
            } else if (filteredPairs.length === 1) {
                return { exchange: filteredPairs[0].exchange };
            }

            const bestExchange = getMin<IPairModel>(filteredPairs, 'price');
            return { exchange: bestExchange.exchange };

        } catch (error) {
            throw Error('Internal Server Error');
        }
    }
}

export default new ExchangeService();