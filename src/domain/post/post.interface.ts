import { IUser } from "domain/user/user.interface";

export interface IPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    userId: string;
    user?: IUser;
}
