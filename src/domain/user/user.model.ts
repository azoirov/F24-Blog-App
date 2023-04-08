import Post from "domain/post/post.model";
import { UUIDV4 } from "sequelize";
import {
    Table,
    Column,
    Model,
    PrimaryKey,
    IsUUID,
    HasMany,
    Is,
    Default,
} from "sequelize-typescript";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

@Table({
    timestamps: true,
})
class User extends Model {
    @IsUUID(4)
    @Default(UUIDV4)
    @PrimaryKey
    @Column
    id: string;

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Is(EMAIL_REGEX)
    @Column
    email: string;

    @Column
    password: string;

    @HasMany(() => Post)
    posts: Post[];
}

export default User;
