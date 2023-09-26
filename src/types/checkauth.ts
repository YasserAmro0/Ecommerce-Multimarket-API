import { Types } from 'mongoose';
import { Request } from 'express';


interface Decode {
    userId: Types.ObjectId ;
    isAdmin?: boolean;
   
}

interface IUser {
    id: number | string;
    password: string ;
    username?: string;
    email: string;
}


interface RequestWithUserRole extends Request {
    token?: string;
    user?: Decode;

}


export {
    Decode, IUser, RequestWithUserRole
};