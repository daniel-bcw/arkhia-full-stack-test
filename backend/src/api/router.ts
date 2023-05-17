import { Router } from 'express';
import ExchangeController from '@/api/controllers/exchange.controller';

const router = Router();
router.get('/coins', ExchangeController.all);
router.get('/exchange', ExchangeController.exchange);

export default router;