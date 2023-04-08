import User from "domain/user/user.model";
import { CreatePostRepoDto } from "./post.dto";
import Post from "./post.model";

class PostRepo {
    public getAll(): Promise<Post[]> {
        return Post.findAll();
    }

    public getBySlug(slug: string): Promise<Post> {
        return Post.findOne({
            where: {
                slug,
            },
            include: [User],
            raw: true,
        });
    }

    public getById(id: string): Promise<Post> {
        return Post.findOne({
            where: {
                id,
            },
            include: [User],
            raw: true,
        });
    }

    public create(data: CreatePostRepoDto): Promise<Post> {
        return Post.create({
            ...data,
        });
    }
}

export default PostRepo;
