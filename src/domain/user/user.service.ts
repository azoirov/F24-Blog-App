import UserRepo from "./user.repo";
import { Sequelize } from "sequelize-typescript";
import { RegisterUserDto } from "./user.dto";
import { ConflictError } from "errors/conflict.error";
import { ErrorMessage } from "enums/error-message.enum";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { IPayload } from "interfaces/payload.interface";

class UserService {
    public repo = new UserRepo();

    public async getAll() {
        return this.repo.getAll();
    }

    public async register(data: RegisterUserDto): Promise<string> {
        const { email, password } = data;

        let user = await this.repo.getByEmail(email);
        if (user) throw new ConflictError(ErrorMessage.EmailAlreadyTaken);

        const hash = await this.generateHash(password);

        const { dataValues: newUser } = await this.repo.create({
            ...data,
            password: hash,
        });
        delete newUser.password;

        const payload: IPayload = {
            ...newUser,
        };

        return this.generateJWT(payload);
    }

    private async generateHash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    private async compareHash(
        password: string,
        hash: string
    ): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    private generateJWT(payload: IPayload): string {
        return sign(payload, process.env.ACCESS_TOKEN_SECRET);
    }

    private verifyJWT(token: string): boolean {
        try {
            verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            return false;
        }
    }
}

export default UserService;
