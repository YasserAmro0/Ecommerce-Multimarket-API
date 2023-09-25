import { Router } from 'express';
import userRouter from './auth';
import productRouter from './product';
import cartRouter from './cart';
import reviewRouter from './review';
import adminRouter from './admin';
import findClientSecret from '../controllers/payment';
import { checkToken } from '../middlewares';
const router = Router();

router.use('/auth', userRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);
router.use('/review', reviewRouter);
router.use('/admin', adminRouter);
router.post('/payment-intent', checkToken ,findClientSecret);


export default router;
