import Stripe from 'stripe';
import config from '../config';
import { User } from '../models';
import { Types } from 'mongoose';

const apiKey = config.API_KEY;
const stripeInstance = new Stripe(apiKey as string, {
    apiVersion: '2023-08-16',
});

const getClientSecret = async (total_price: number, userId: Types.ObjectId ) => {
    const user = await User.findById(userId);
    const userEmail = user?.email;
    const paymentIntent = await stripeInstance.paymentIntents.create({
        amount: total_price * 100,
        currency: 'usd',
        payment_method_types: ['card'],
        receipt_email: userEmail,
    });

    return paymentIntent;
};

export default getClientSecret;
