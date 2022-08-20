// Dependencies
const {DataTypes} = require("sequelize");

module.exports = sequelize =>
{
    sequelize.define("Post",
    {
        id:
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        content:
        {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description:
        {
            type: DataTypes.TEXT,
        },
        location:
        {
            type: DataTypes.TEXT,
        },
        taggedUsers:
        {
            type: DataTypes.STRING,
        },
    },
    {
        // timestamps: false,
    });
};