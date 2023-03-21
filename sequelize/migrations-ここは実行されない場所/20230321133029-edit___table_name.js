"use strict";
/* eslint-disable */
const { DataTypes, QueryTypes } = require("sequelize");
const ComFunc = require("../com-func");
//--------------------------------------
const tableName = "table_name";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ComFunc.IndexKey.Remove(queryInterface, tableName, [
      //
      ["user_name"],
    ]);

    const columns = {
      note: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: "備考",
      },
    };
    await ComFunc.Column.Add(queryInterface, tableName, columns);

    await ComFunc.IndexKey.Add(queryInterface, tableName, [
      //
      ["user_name", "note"],
    ]);
  },
  async down(queryInterface, Sequelize) {
    await ComFunc.IndexKey.Remove(queryInterface, tableName, [
      //
      ["user_name", "note"],
    ]);

    const columns = {
      note: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: "備考",
      },
    };
    await ComFunc.Column.Remove(queryInterface, tableName, columns);
    await ComFunc.IndexKey.Add(queryInterface, tableName, [
      //
      ["user_name"],
    ]);
  },
};
