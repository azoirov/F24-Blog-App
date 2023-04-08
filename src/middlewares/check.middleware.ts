import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { IPayload } from "interfaces/payload.interface";
import { UnauthorizedError } from "errors/unauthorized.error";
import { ErrorMessage } from "enums/error-message.enum";
import { IRequest } from "interfaces/request.interface";
import { StatusCode } from "enums/status-code.enum";
import User from "domain/user/user.model";

const verifyToken = (token: string) => {
    try {
        return verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        throw new UnauthorizedError(ErrorMessage.Unauthorized);
    }
};

export const checkMiddleware = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers["authorization"]; // string

        const payload: IPayload = verifyToken(token) as IPayload; // payload { id, email, name } id = 1

        const user = await User.findOne({
            where: {
                id: payload.id,
            },
        }); // user

        if (!user) throw new UnauthorizedError(ErrorMessage.Unauthorized);

        req.user = user;

        next();
    } catch (error) {
        res.status(StatusCode.BadRequest).json({
            message: error.message,
        });
    }
};
