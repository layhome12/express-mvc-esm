/*===================================================
 *                   Model Example
 *===================================================
 *  import { DataTypes } from "sequelize";
 *  import db from "../config/database.js";
 *
 * const userModel = db.define(
 *   'table_name',
 *    {
 *      column:{
 *        type: DataTypes.STRING
 *      }
 *    },
 *    {
 *      freezeTableName: true
 *    }
 * );
 * 
 * userModel.sync();
 *
 * export default userModel;
 *==================================================
 */
import { DataTypes } from "sequelize";
import db from "../config/database.js";

const userModel = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    _token: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    user_nama: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default userModel;
