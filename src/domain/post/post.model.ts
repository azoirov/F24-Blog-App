import User from "domain/user/user.model";
import { UUIDV4 } from "sequelize";
import {
    Table,
    Column,
    Model,
    PrimaryKey,
    IsUUID,
    BelongsTo,
    ForeignKey,
    Default,
} from "sequelize-typescript";

@Table({
    timestamps: true,
})
class Post extends Model {
    @IsUUID(4)
    @Default(UUIDV4)
    @PrimaryKey
    @Column
    id: string;

    @Column
    title: string;

    @Column
    content: string;

    @Column
    slug: string;

    @ForeignKey(() => User)
    @Column
    userId: string;

    @BelongsTo(() => User)
    user: User;
}

export default Post;
