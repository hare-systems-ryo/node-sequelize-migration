"use strict";
/* eslint-disable */
const ComFunc = require("../com-func");
const dayjs = require("dayjs");
//--------------------------------------
const tableName = "table_name";
//--------------------------------------
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
    const con = ComFunc.GetConnection(queryInterface);
    const sql = "ALTER TABLE `" + tableName + "` auto_increment = 1";
    await con.query(sql, { raw: false });
    const list = [
      {
        user_e_mail: "test1@example.com",
        user_name: "test1",
        obj: JSON.stringify({ message: "messsssseageeee" }),
        activate: 1,
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss.SSS"),
        updated_at: dayjs().format("YYYY-MM-DD HH:mm:ss.SSS"),
        date_only: dayjs().format("YYYY-MM-DD HH:mm:ss.SSS"),
      },
    ];
    await queryInterface.bulkInsert(tableName, list, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
    const con = ComFunc.GetConnection(queryInterface);
    const sql = "ALTER TABLE `" + tableName + "` auto_increment = 1";
    await con.query(sql, { raw: false });
    const list = [];
    if (list.length !== 0) {
      await queryInterface.bulkInsert(tableName, list, {});
    }
  },
};
