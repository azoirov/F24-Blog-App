import { IUser } from "domain/user/user.interface";
import { Request } from "express";

export interface IRequest extends Request {
    user: IUser;
}
