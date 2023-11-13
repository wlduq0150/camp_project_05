import Sequelize from 'sequelize';
import * as configEX from "../config/config.json" assert { type: 'json' };
import User from "./users.model.js";
import Product from "./products.model.js";

const env = process.env.NODE_ENV || 'development';
const config = configEX.default[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Product = Product;

User.init(sequelize);
Product.init(sequelize);

User.associate(db);
Product.associate(db);

export default db;
