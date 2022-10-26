const router = require('express').Router();
// deconstructing from models
const { Comment, Post, User } = require('../models');
// const withAuth = require('../utils/auth.js');

// hompage route
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
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
    res.render('all-posts', {
      // render homepage from html handle bars and pass in { stuff }...
      // why is this plural and lowercase?
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// dashboard route
router.get('/dashboard', async (req, res) => {
  try {
    const postsData = await Post.findAll({
      include: [
        {
          model: User,
        },
      ],
      // to specific user dashboard
      where: {
        user_id: req.session.user_id
      }
    });

    const userPosts = postsData.map((posts) => posts.get({ plain: true }));

    res.render('all-posts-admin', {
      layout: 'dashboard',
      userPosts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup')
});

module.exports = router;
