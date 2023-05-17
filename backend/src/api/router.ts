import { Router } from 'express';
import ExchangeController from '@/api/controllers/exchange.controller';

const router = Router();
router.get('/exchange', ExchangeController.getExchangeList);

export default router;