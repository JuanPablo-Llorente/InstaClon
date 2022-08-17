// Dependencies
const {DataTypes} = require("sequelize");

module.exports = sequelize =>
{
    sequelize.define("Saved",
    {
        // id:
        // {
        //     type: DataTypes.UUID,
        //     defaultValue: DataTypes.UUIDV4,
        //     allowNull: false,
        //     primaryKey: true,
        // },
        // idPost:
        // {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        // idUser:
        // {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
    },
    {
        timestamps: false,
    });
};