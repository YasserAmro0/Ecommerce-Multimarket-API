import { NextFunction, Response } from 'express';
import { getClientSecret } from '../services';
import { RequestWithUserRole } from '../types';
import { templateErrors } from '../helpers';

const findClientSecret = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    try {
        const { total_price } = req.body;

        if (typeof total_price !== 'number') {
            throw templateErrors.BAD_REQUEST('Invalid price');
        }
        const userId = req.user?.userId;
        const paymentIntent = await getClientSecret(total_price, userId);
        return res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        next(error);
    }
};

export default findClientSecret;
