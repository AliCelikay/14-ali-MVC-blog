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

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    

    const post = postData.get({ plaine: true });
    // console.log(`POST 2 DATA: ${post}`);
    if (!post) {
        res.status(404).json({ message: 'No post found with that ID.' });
        return;
    }

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

// router.put('/edit/:id', withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id);
    

//     const post = postData.get({ plaine: true });
//     // console.log(`POST 2 DATA: ${post}`);
//     if (!post) {
//         res.status(404).json({ message: 'No post found with that ID.' });
//         return;
//     }

//     res.render('edit-post', {
//         layout: 'dashboard',
//         post,
//         loggedIn: req.session.loggedIn
//     })
// }
//   catch (err) {
//     res.status(500).json(err);
//   }
// })

// route to delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
      const deletePost = await Post.destroy({
          where: {
              ...req.params,
              // id: req.params.id
              userId: req.session.userId,
          }
      });

      res.status(200).json(deletePost);
  }
  catch (err) {
      res.status(500).json(err);
  }
})

module.exports = router;
