https://sequelize.org/docs/v6/

---

# migration

## migration ファイル生成コマンド テンプレート

```bash
npx sequelize migration:generate --name create_table_name
npx sequelize migration:generate --name reset__table_name
npx sequelize migration:generate --name edit___table_name
```

## migration 実行コマンド config.json => development

```bash
npx sequelize db:migrate --env development
npx sequelize db:migrate:undo --env development
npx sequelize db:migrate:undo:all --env development
```

## migration 実行コマンド config.json => staging

```bash
npx sequelize db:migrate --env staging
npx sequelize db:seed:undo:all --env staging
npx sequelize db:seed:all --env staging

```

# seed

## seed ファイル生成コマンド テンプレート

```bash
npx sequelize seed:generate --name insert_hogehoge
```

## seed 実行コマンド config.json => development

```bash
npx sequelize db:seed:all --env development
```

## seed 実行コマンド config.json => staging

```bash
npx sequelize db:seed:all --env staging
```

# Create Template

```javascript
"use strict";
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
        defaultValue: undefined,
      },
      aaa: {
        type: DataTypes.INTEGER.UNSIGNED, //符号付きInt
        allowNull: false,
        comment: "aaa",
      },
      bbb: { type: DataTypes.TINYINT, allowNull: false, comment: "bbb" },
      ccc: { type: DataTypes.SMALLINT, allowNull: false, comment: "ccc" },
      ddd: { type: DataTypes.STRING(64), allowNull: false, comment: "ddd" },
      eee: { type: DataTypes.DATE, allowNull: false, comment: "eee" },
      fff: { type: DataTypes.DATEONLY, allowNull: false, comment: "fff" },
      ggg: { type: DataTypes.JSON, allowNull: false, comment: "ggg" },
    };
    await queryInterface.createTable(tableName, columns, {
      comment: tableComments,
      collate: "utf8mb4_general_ci",
    });
    await ComFunc.IndexKey.Add(queryInterface, tableName, [
      //
      ["aaa"],
    ]);

    await ComFunc.UniqueKey.Add(queryInterface, tableName, [
      //
      ["ddd"],
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  },
};
```

# Reset Template

```javascript
"use strict";
/* eslint-disable */
const ComFunc = require("../com-func");
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
    const list = [];
    await queryInterface.bulkInsert(tableName, list, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
    const con = ComFunc.GetConnection(queryInterface);
    const sql = "ALTER TABLE `" + tableName + "` auto_increment = 1";
    await con.query(sql, { raw: false });
    const list = [];
    await queryInterface.bulkInsert(tableName, list, {});
  },
};
```

# edit Template

```javascript
"use strict";
/* eslint-disable */
const ComFunc = require("../com-func");
const { DataTypes, QueryTypes } = require("sequelize");
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
```
