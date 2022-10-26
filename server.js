// 3rd party packages
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
// Custom Packages
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
// For SECRET
require('dotenv').config();

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

//new (sess)ion object for storing data
const sess = {
  secret: process.env.SECRET,
  cookie: {
    // Session will log user out after an hour
    maxAge: 1000 * 60 * 60,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// middleware
// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});
