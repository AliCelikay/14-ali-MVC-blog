const router = require('express').Router();
const { Comment } = require('../../models');

// /api/comments
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const newComment = await Comment.create({
            body:req.body.c_body,
            postId: req.body.postId,
            // body: req.body.body
            userId : req.session.userId,
        });

        res.json(newComment);
    
    }
    catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
