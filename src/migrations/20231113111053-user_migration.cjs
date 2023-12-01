"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.changeColumn("products", "state", {
            type: Sequelize.ENUM("FOR_SALE", "SOLD_OUT"),
            allowNull: false,
            defaultValue: "FOR_SALE",
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.changeColumn("products", "state", {
            type: Sequelize.STRING(20),
            allowNull: false,
            defaultValue: "FOR_SALE",
        });
    },
};
