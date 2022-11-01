const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// /api/posts

// route to create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            // title: req.body.title,
            // body: req.body.body,
            userId : req.session.userId,
            
        });

        req.session.save(() => {
            req.session.postId = newPost.id;
            req.session.loggedIn = true;

            res.status(200).json(newPost);
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
