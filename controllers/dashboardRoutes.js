const router = require('express').Router();
// deconstructing from models
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

// /api/dashboard

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

// get by single id
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    const post = postData.get({ plain: true });

    res.render('edit-post', {
      layout: 'dashboard',
      post,
      loggedIn: req.session.loggedIn
    })
  }
  catch (err) {
    res.status(500).json(err);
  }
})

// Put edit route
router.put('/edit/:id', async (req, res) => {
  try {
    const updatePost = await Post.update(req.body, {
      where: {
        ...req.params,
      }
    });

    if (!updatePost) {
      console.log('No post found');
      res.status(404).json();
    }
    else {
      res.status(200).json(updatePost);
    }
    
}
  catch (err) {
    res.status(500).json(err);
  }
})


// route to delete a post
router.delete('/edit/:id', async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        ...req.params,
        // id: req.params.id
      }
    });

    if (!deletePost) {
      res.status(404).json()
      console.log('No post found');
    }
    else {
      res.status(200).json(deletePost);
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
