const router = require('express').Router();
// deconstructing from models
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

// dashboard route
// withAuth will redirect to login/signup if not logged in/signedup 
router.get('/', withAuth, async (req, res) => {
    try {
      const postsData = await Post.findAll({
        where: {
          userId: req.session.userId,
        }
      });
  
      const userPosts = postsData.map((posts) => posts.get({ plain: true }));
  
      res.render('all-post-admin', {
        layout: 'dashboard',
        userPosts,
        loggedIn: req.session.loggedIn
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/new', withAuth, async (req, res) => {
    try {
      res.render('new-post', {
        layout: 'dashboard',
        loggedIn: req.session.loggedIn
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
