import { Request, Response } from "express";
import NodeCache from 'node-cache';

import exchangeService from "@/api/services/exchange.service";

export const cache = new NodeCache();

class ExchangeController {

    /**
      * GET /exchange?currency={currency}&coinId={coinId}
      * 
      * @param {*} req A request 
      * @param {*} res A response to send
      * @returns { exchange: 'Kraken' }
    */
    exchange(req: Request, res: Response) {
        const { currency, coinId } = req.query;

        exchangeService.getExchange(String(currency), String(coinId))
            .then(exchange => {
                cache.set(req.originalUrl, exchange, 3600);

                res.status(200).json(exchange);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })

    }
}

export default new ExchangeController;
