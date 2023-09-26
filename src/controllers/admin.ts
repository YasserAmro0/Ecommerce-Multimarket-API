import { NextFunction, Response, Request } from "express";
import * as yup from 'yup';
import { deleteProductAdmin, deleteReviewAdmin, getAllReviews, getProductsAdmin, updateProductAdmin } from "../services";
import mongoose, { Types } from "mongoose";
import { productSchema, templateErrors } from "../helpers";


const getAllReviewsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await getAllReviews();
        return res.status(200).json({ massage: "get all reviews done ", data: reviews });
    } catch (error) {
        next(error);
    }
    
}

const deleteReviewAdminController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reviewId } = req.params;
        const ObjectIdReviewId = new mongoose.Types.ObjectId(reviewId);
        const removed = await deleteReviewAdmin(ObjectIdReviewId);
        return res.status(201).json({ message: 'delete review done ✔', data: removed });
    } catch (error) {
        next(error);
    }
}

const getProductAdminController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getProductsAdmin();
        return res.status(201).json({ message: 'get all Products successfully ', data: products });

    } catch (error) {
        next(error);
    }
}

const deleteProductAdminController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;
        const ObjectIdproductId = new mongoose.Types.ObjectId(productId);

        const removed = await deleteProductAdmin(ObjectIdproductId);
        return res.status(201).json({ message: 'delete Product done ✔', data: removed });
        
    } catch (error) {
        next(error);
    }
}

const updateProductAdminController = async (req: Request, res: Response, next: NextFunction) => {
    const {
        title,
        price, category,
        description, shortDescription,
        imageurl } = req.body;
    const { productId } = req.params;
    const ObjectIdproductId = new mongoose.Types.ObjectId(productId);

    try {
        await productSchema.validate({ title, price, category, description, shortDescription, imageurl });
       const afterUpdate= await updateProductAdmin(
           ObjectIdproductId, title,
            price, category,
            description, shortDescription,
            imageurl);
        return res.status(201).json({ message: 'update Product success', data: afterUpdate });
        
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return next(templateErrors.BAD_REQUEST(error.message));
        }
        next(error);
    }
}

export {
    getAllReviewsController,
    deleteReviewAdminController,
    getProductAdminController,
    deleteProductAdminController,
    updateProductAdminController
};