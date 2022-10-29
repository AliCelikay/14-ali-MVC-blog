const router = require('express').Router();
// deconstructing from models
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

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
    const posts = postsData.map((posts) => posts.get({ plain: true }));

    // Pass serialized data and session flag into template
    // (2) then rendering and checking if logged in
    res.render('all-posts', {
      // render all-posts from html handle bars and pass in posts from the database and make sure user logged in
      posts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
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

// route for 1 post when user clicks on
// This route must be below the login/signup why???
router.get('/post/:id', withAuth, async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
          include: [{
              model: User,
          },
          {
              model: Comment,
          },
          ]
      })

      const post = postData.map((post) => post.get({ plaine: true }))
      const comment = postData.comments.map((comment) => comment.get({ plain: true }))

      if (!post) {
          res.status(404).json({ message: 'No post found with that ID.' });
          return;
      }

      res.render('single-post', {
          post,
          comment,
          loggedIn: req.session.loggedIn
      })
  }
  catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
