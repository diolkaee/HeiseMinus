const { Sequelize, DataTypes } = require('sequelize');

//Initiate a connection to an in-memory sqlite3 database
const sequelize = new Sequelize('sqlite::memory:');

/**
 * This is the Article model.
 * Sequelize adds id, createdAt and updatedAt fields automatically.
 */
const Article = sequelize.define('article', {
    title: {
        type: DataTypes.STRING(128),
        validate: {
            notEmpty: true
        }
    },
    content: {
        type: DataTypes.TEXT,
        validate: {
            notEmpty: true
        }
    }
},
{
    //This defaults to true
    updatedAt: false
});

//Synchronize the database to create the table
sequelize.sync()

module.exports = Article;