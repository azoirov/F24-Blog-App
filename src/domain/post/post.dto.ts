import { IsString, IsNotEmpty, IsUUID } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    userId: string;
}

export class CreatePostRepoDto extends CreatePostDto {
    slug: string;
}
