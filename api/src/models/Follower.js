// Dependencies
const {DataTypes} = require("sequelize");

module.exports = sequelize =>
{
    sequelize.define("Follower",
    {
        // id:
        // {
        //     type: DataTypes.UUID,
        //     defaultValue: DataTypes.UUIDV4,
        //     allowNull: false,
        //     primaryKey: true,
        // },
        name:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        website:
        {
            type: DataTypes.STRING,
        },
        description:
        {
            type: DataTypes.TEXT,
        },
        birthday:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country:
        {
            type: DataTypes.STRING,
        },
        profilePhoto:
        {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "https://instagram.fcgh12-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?efg=eyJybWQiOiJpZ19hbmRyb2lkX21vYmlsZV9uZXR3b3JrX3N0YWNrX3NlY3VyZV90Y3BfdjJfaHR0cDJfb25seTpjb250cm9sIn0&_nc_ht=instagram.fcgh12-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=XNgfEGwv6KQAX_xYjPd&edm=AJ9x6zYBAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AT9JYVLo2KMcCyLaTaY-oSnjlSEkvApNUR2wiOUtlmflpQ&oe=62FE494F&_nc_sid=cff2a4",
        },
        role:
        {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "user",
        },
    },
    {
        // timestamps: false,
    });
};