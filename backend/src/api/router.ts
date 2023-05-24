import { Router } from 'express';
import ExchangeController, { cache } from '@/api/controllers/exchange.controller';

const cacheMiddleware = (req, res, next) => {
    const cacheKey = req.originalUrl;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return res.json(cachedData);
    }

    next();
};

const router = Router();
router.get('/exchange', cacheMiddleware, ExchangeController.exchange);

export default router;