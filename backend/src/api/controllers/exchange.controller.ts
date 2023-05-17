import { Request, Response } from "express";

import exchangeService from "@/api/services/exchange.service";

class ExchangeController {
    
    /**
      * GET /exchange?currency={currency}&sortBy={sortBy}
      * 
      * @param {*} _req A request 
      * @param {*} res A response to send
      * @returns An array of IExchangeModel
    */
    getExchangeList(_req: Request, res: Response) {
        res.status(200).json();
    }
}

export default new ExchangeController;
