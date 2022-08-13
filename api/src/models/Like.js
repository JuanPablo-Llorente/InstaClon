// Dependencies
const {DataTypes} = require("sequelize");

module.exports = sequelize =>
{
    sequelize.define("Like",
    {
        id:
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        idPost:
        {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: "Liked",
        },
        idUser:
        {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: "Liked",
        },
    },
    {
        timestamps: false,
    });
};