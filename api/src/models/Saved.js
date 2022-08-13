// Dependencies
const {DataTypes} = require("sequelize");

module.exports = sequelize =>
{
    sequelize.define("Saved",
    {
        idPost:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idUser:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    });
};