// Dependencies
const {DataTypes} = require("sequelize");

module.exports = sequelize =>
{
    sequelize.define("Comment",
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
        //     // unique: "Liked",
        // },
        // idUser:
        // {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     // unique: "Liked",
        // },
        content:
        {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // likesCounter:
        // {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     defaultValue: 0,
        // },
    },
    {
        timestamps: false,
    });
};