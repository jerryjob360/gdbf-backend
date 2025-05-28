const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define("Activity", {
        title: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        body : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING, // stores the file path or URL
            allowNull: true,        // allow null if the image is optional
          },
    });

    return Activity;
}