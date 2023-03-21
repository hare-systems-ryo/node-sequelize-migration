/* eslint-disable */
const { DataTypes, QueryTypes } = require("sequelize");
const ComFunc = require("../com-func");
//--------------------------------------
const tableName = "table_name";
const tableComments = "tableComments";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const columns = {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "ID",
      },
      user_e_mail: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: "ユーザーE-Mail",
      },
      user_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: "ユーザー名",
      },
      obj: {
        type: DataTypes.JSON,
        allowNull: false,
        comment: "obj",
      },
      //------------------
      activate: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
        comment: "ユニーク制御フラグ",
      },
      //------------------
      created_at: {
        type: DataTypes.DATE(3), //ミリ秒
        allowNull: false,
        comment: "ミリ秒まで管理",
      },
      updated_at: {
        type: DataTypes.DATE, //秒
        allowNull: false,
        comment: "秒まで管理",
      },
      date_only: {
        type: DataTypes.DATEONLY, //日付のみ
        allowNull: false,
        comment: "日付のみ",
      },
    };
    await queryInterface.createTable(tableName, columns, {
      comment: tableComments,
      collate: "utf8mb4_general_ci",
    });
    await ComFunc.IndexKey.Add(queryInterface, tableName, [
      //
      ["user_name"],
    ]);

    await ComFunc.UniqueKey.Add(queryInterface, tableName, [
      //
      ["user_e_mail", "activate"],
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  },
};
