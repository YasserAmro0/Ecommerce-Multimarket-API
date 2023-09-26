import { NextFunction, Response, Request } from "express";
import * as yup from 'yup';
import mongoose, { Types } from "mongoose";
import { RequestWithUserRole } from "../types";
import { reviewsSchema, templateErrors } from "../helpers";
import { addReviews, deleteReview, getAllReviewsForProduct, updateComment } from "../services";


const addReviewsController = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    const userIdAsObjectId = new Types.ObjectId(userId);
    
    const { productId } = req.params;
    const ObjectIdproductId = new Types.ObjectId(productId);

    const { comment, rating } = req.body;

    try {
        await reviewsSchema.validate({ comment, rating });
        const reviews = await addReviews(userIdAsObjectId, ObjectIdproductId, comment, rating);
        return res.status(201).json({ message: 'add review successfully', data: reviews });
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            return next(templateErrors.BAD_REQUEST(err.message));
        }
        next(err);
    }

}


const getReviewsController = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const ObjectIdproductId = new Types.ObjectId(productId);
    try {
        const reviews = await getAllReviewsForProduct(ObjectIdproductId);
        return res.status(201).json({ message: 'get reviews successfully', data: reviews });
    } catch (error) {
        next(error);
    }
    
} 

const updateCommentController = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    const userIdAsObjectId = new Types.ObjectId(userId);

    const { idReview } = req.params;
    const ObjectIdproductId = new Types.ObjectId(idReview);
    const { newComment } = req.body;
    try {
        const reviewAfterUpdate = await updateComment(userIdAsObjectId.toString(), ObjectIdproductId, newComment);
        return  res.status(201).json({ message:'update comment successfully ',data :reviewAfterUpdate});
        
    } catch (error) {
        next(error);
    }
}

const deleteReviewController = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    const { idReview } = req.params;
    const ObjectIdproductId = new Types.ObjectId(idReview);
    try {
        await deleteReview(ObjectIdproductId);
        return res.status(201).json({ message: 'delete review successfully '});

      
    } catch (error) {
        next(error);
  }
}

export { addReviewsController, getReviewsController, updateCommentController, deleteReviewController };