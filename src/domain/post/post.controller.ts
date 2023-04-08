import { StatusCode } from "enums/status-code.enum";
import { NextFunction, Response } from "express";
import { IRequest } from "interfaces/request.interface";
import { validation } from "utils/validation.util";
import { CreatePostDto } from "./post.dto";
import PostService from "./post.service";

class PostController {
    public service = new PostService();

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

    public getById = async (
        req: IRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id: string = req.params.id;
            const result = await this.service.getById(id);

            res.status(StatusCode.Ok).json({
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    public create = async (
        req: IRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const createData: CreatePostDto = req.body;
            await validation(CreatePostDto, createData);

            const { id: userId } = req.user;

            const result = await this.service.create({
                ...createData,
                userId,
            });

            res.status(StatusCode.Created).json({
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default PostController;
