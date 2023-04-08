import User from "domain/user/user.model";
import { Sequelize } from "sequelize-typescript";

const psql = async () => {
    const sequelize = new Sequelize(process.env.PG_CONNECTION_STRING, {
        logging: false,
        models: [__dirname + "/../domain/**/*.model.ts"],
    });

    await sequelize.sync({ force: false });

    return sequelize;
};

export default psql;
