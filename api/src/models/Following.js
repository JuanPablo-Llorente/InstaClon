// Dependencies
const {DataTypes} = require("sequelize");

module.exports = sequelize =>
{
    sequelize.define("Following",
    {
        id:
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        followingId:
        {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    });
};