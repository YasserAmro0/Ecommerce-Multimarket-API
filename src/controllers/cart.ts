import { NextFunction, Response, Request } from "express";
import { Decode, RequestWithUserRole } from "../types";
import { addToCart, deleteFromCart, getAllCart } from "../services";
import mongoose, { Types } from "mongoose";

const addToCartController = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    const userIdAsObjectId = new Types.ObjectId(userId);

    const { productId } = req.params;
    const ObjectIdproductId = new mongoose.Types.ObjectId(productId);

    const { quantity } = req.body;
    try {
        await addToCart(userIdAsObjectId, ObjectIdproductId , quantity);
     return res.status(201).json({ message: "Item added to cart successfully" });
    } catch (error) { 
        next(error);
    }

}

const getAllProductsInCart = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    const userIdAsObjectId = new Types.ObjectId(userId);
    try {
        const products = await getAllCart(userIdAsObjectId);
        return res.status(201).json({ message: "get all Product in Cart successfully", data: products });

    } catch (error) {
        next(error);
    }
    
}

const deleteFromCartController = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    const userIdAsObjectId = new Types.ObjectId(userId);

    const { productId } = req.params;
    const ObjectIdproductId = new mongoose.Types.ObjectId(productId);
    try {
        const dataAfterDelete = await deleteFromCart(userIdAsObjectId, ObjectIdproductId);
        return res.status(201).json({ message: "delete Product in Cart successfully", data: dataAfterDelete });

    } catch (error) {
        next(error);
    }
    
}

export { addToCartController, getAllProductsInCart, deleteFromCartController };