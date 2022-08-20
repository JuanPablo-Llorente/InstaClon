// Dependencies
const {DataTypes} = require("sequelize");

module.exports = sequelize =>
{
    sequelize.define("Follower",
    {
        id:
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        followerId:
        {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    });
};