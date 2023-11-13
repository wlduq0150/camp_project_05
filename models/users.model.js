import { Model, DataTypes } from "sequelize";

export default class User extends Model {
	static init(sequelize) {
		return super.init({
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false
			},
            sex: {
                type: DataTypes.STRING(10),
                allowNull: true
            },
			email: {
				type: DataTypes.STRING(100),
				allowNull: false,
				unique: true
			},
			password: {
				type: DataTypes.STRING(255),
				allowNull: false
			},
		}, {
			sequelize,
			timestamps: true,
			underscored: false,
			modelName: "User",
			tableName: "users",
			paranoid: true,
			charset: "utf8",
			collate: "utf8_general_ci",
		});
	}
	
	static associate(db) {
		db.User.hasMany(db.Product, { as: 'products', foreignKey: 'id', sourceKey: "id" });
	}
}