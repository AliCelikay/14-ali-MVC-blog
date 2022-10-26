const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

//connects to jawsdb_url in heroku
if (process.env.JAWSDB_URL) {
  // var seq is assigned a new cunstructor object Seq
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    // from dotenv, dotenv allows information to be secret, when we put the .env file in .gitignore then the .env file will not be uploaded when uploding this project
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      //setting up port info
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
