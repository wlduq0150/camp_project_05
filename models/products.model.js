import { Model, DataTypes } from "sequelize";

export default class Product extends Model {
	static init(sequelize) {
		return super.init({
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			title: {
				type: DataTypes.STRING(100),
				allowNull: false
			},
            content: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
			state: {
				type: DataTypes.STRING(20),
				allowNull: false,
                defaultValue: "FOR_SALE"
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			}
		}, {
			sequelize,
			timestamps: true,
			underscored: false,
			modelName: "Product",
			tableName: "products",
			paranoid: true,
			charset: "utf8",
			collate: "utf8_general_ci",
		});
	}
	
	static associate(db) {
		db.Product.belongsTo(db.User, { as: "user", foreignKey: 'userId', targetKey: "id" });
	}
}