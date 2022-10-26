const router = require('express').Router();
// deconstructing from models
const { Comment, Post, User } = require('../models');
// const withAuth = require('../utils/auth.js');

router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      // (1)grabbing all data first...
      const postsData = await Post.findAll({
        include: [
          {
            model: User,
          },
        ],
      });
  
      // Serialize data so the template can read it, return data that we only asked for
      const posts = postsData.map((post) => posts.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      // (2) then rendering and checking if logged in
      res.render('homepage', { 
        // render homepage from html handle bars and pass in { boject stuff }...
        projects, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
