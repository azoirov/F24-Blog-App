import { IPost } from "domain/post/post.interface";

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    posts?: IPost[];
}
