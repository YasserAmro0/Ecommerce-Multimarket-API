import { NextFunction, Response, Request } from 'express';
import { getClientSecret } from '../services';
import { RequestWithUserRole } from '../types';
import { templateErrors } from '../helpers';
import { Types } from 'mongoose';

const findClientSecret = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    const userIdAsObjectId = new Types.ObjectId(userId);
    try {
        const { total_price } = req.body;

        if (typeof total_price !== 'number') {
            throw templateErrors.BAD_REQUEST('Invalid price');
        }
      
        const paymentIntent = await getClientSecret(total_price, userIdAsObjectId);
        return res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        next(error);
    }
};

export default findClientSecret;
