/*-------------------------------------------------
マイグレーションで使用する関数群
-------------------------------------------------*/
const ComFunc = {
  /**
   * マイグレーションファイルから下記のようにして使用する
   * const con = ComFunc.GetConnection(queryInterface);
   * const sql = 'select * from m_code';
   * const ret = await con.query(sql, { raw: false });
   */
  GetConnection: function (queryInterface) {
    const Sequelize = require("sequelize");
    const SequelizeConf = {
      host: queryInterface.sequelize.options.host,
      port: queryInterface.sequelize.options.port,
      dialect: "mysql",
      timezone: "+09:00",
      logging: false, // ← 追記
      dialectOptions: {
        timezone: "+09:00",
        dateStrings: true,
        typeCast: function (field, next) {
          if (field.type === "DATETIME") {
            return field.string();
          }
          return next();
        },
      },
    };
    return new Sequelize(
      queryInterface.sequelize.config.database,
      queryInterface.sequelize.options.username,
      queryInterface.sequelize.options.password,
      SequelizeConf
    );
  },
  IndexKey: {
    Add: async function (queryInterface, tableName, setIndexList) {
      const setIndexListCount = setIndexList.length;
      for (let i = 0; i < setIndexListCount; i++) {
        if (setIndexList[i].length === 0) continue;
        const indexName = setIndexList[i][0] + "_index";
        const indexList = [];
        const setIndexListChildCount = setIndexList[i].length;
        for (let j = 0; j < setIndexListChildCount; j++) {
          if (setIndexList[i][j] !== "") {
            indexList.push(setIndexList[i][j]);
          }
        }
        await queryInterface.addIndex(tableName, indexList, {
          name: indexName,
        });
      }
    },
    Remove: async function (queryInterface, tableName, setIndexList) {
      const setIndexListCount = setIndexList.length;
      for (let i = 0; i < setIndexListCount; i++) {
        if (setIndexList[i].length === 0) continue;
        const indexName = setIndexList[i][0] + "_index";
        await queryInterface.removeIndex(tableName, indexName);
      }
    },
  },
  UniqueKey: {
    Add: async function (queryInterface, tableName, setIndexList) {
      const setIndexListCount = setIndexList.length;
      for (let i = 0; i < setIndexListCount; i++) {
        if (setIndexList[i].length === 0) continue;
        const indexName = setIndexList[i][0] + "_uq_index";
        const indexList = [];
        const setIndexListChildCount = setIndexList[i].length;
        for (let j = 0; j < setIndexListChildCount; j++) {
          if (setIndexList[i][j] !== "") {
            indexList.push(setIndexList[i][j]);
          }
        }
        await queryInterface.addIndex(tableName, indexList, {
          name: indexName,
          unique: true,
        });
      }
    },
    Remove: async function (queryInterface, tableName, setIndexList) {
      const setIndexListCount = setIndexList.length;
      for (let i = 0; i < setIndexListCount; i++) {
        if (setIndexList[i].length === 0) continue;
        const indexName = setIndexList[i][0] + "_uq_index";
        await queryInterface.removeIndex(tableName, indexName);
      }
    },
  },
  Column: {
    Change: async function (queryInterface, tableName, scheme) {
      const keys = Object.keys(scheme);
      for (let i = 0; i < keys.length; i++) {
        await queryInterface.changeColumn(tableName, keys[i], scheme[keys[i]]);
      }
    },
    Add: async function (queryInterface, tableName, scheme) {
      const keys = Object.keys(scheme);
      for (let i = 0; i < keys.length; i++) {
        await queryInterface.addColumn(tableName, keys[i], scheme[keys[i]]);
      }
    },
    Remove: async function (queryInterface, tableName, scheme) {
      const keys = Object.keys(scheme);
      for (let i = 0; i < keys.length; i++) {
        await queryInterface.removeColumn(tableName, keys[i]);
      }
    },
  },
};

module.exports = ComFunc;
