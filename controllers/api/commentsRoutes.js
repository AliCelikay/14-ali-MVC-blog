const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

// /api/comments

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            // body: req.body.body
            userId : req.session.userId,
            postId: req.session.postId,
        })

        res.status(200).json(newComment);
        
    }
    catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
