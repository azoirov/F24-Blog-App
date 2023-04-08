import { ErrorMessage } from "enums/error-message.enum";
import { ConflictError } from "errors/conflict.error";
import slugify from "slugify";
import { CreatePostDto } from "./post.dto";
import Post from "./post.model";
import PostRepo from "./post.repo";

class PostService {
    public repo = new PostRepo();

    public async getAll(): Promise<Post[]> {
        return this.repo.getAll();
    }

    public async getById(id: string): Promise<Post> {
        return this.repo.getById(id);
    }

    public async create(data: CreatePostDto): Promise<Post> {
        const { title } = data;
        const slug = slugify(title);

        const post = await this.repo.getBySlug(slug);
        if (post)
            throw new ConflictError(
                ErrorMessage.PostWithThisTitleAlreadyExists
            );

        return this.repo.create({
            ...data,
            slug,
        });
    }
}

export default PostService;
