import { StatusCode } from "enums/status-code.enum";
import { NextFunction, Response } from "express";
import { IRequest } from "interfaces/request.interface";
import { validation } from "utils/validation.util";
import { RegisterUserDto } from "./user.dto";
import UserService from "./user.service";

class UserController {
    public service = new UserService();

    public getAll = async (
        req: IRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.service.getAll();

            res.status(StatusCode.Ok).json({
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    public register = async (
        req: IRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const registerData: RegisterUserDto = req.body;
            await validation(RegisterUserDto, registerData);

            const result = await this.service.register(registerData);

            res.status(StatusCode.Created).json({
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default UserController;
