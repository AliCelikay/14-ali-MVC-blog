const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// /api/posts

// route to create a new post
router.post('/', withAuth, async (req, res) => {
    try{
        const newPost = await Post.create({
            ...req.body,
            // title: req.body.title,
            // body: req.body.body,
        });
        
        res.status(200).json(newPost);
    }
    catch (err) {
        res.status(400).json(err);
    }
})

// router.get('/userPosts', withAuth, async (req, res) => {
//     const posts = await Post.findAll()
//     const userPosts = await posts.map((post) => post.get({plain:true}));

//     res.render('all-post-admin'), {

//     }

//     const usersSaved = await Character.findAll({where: {
//       user_id: req.session.user_id,
//     }});
//     const savedCharacters = await usersSaved.map(char=>char.get({plain: true}));
//     console.log(savedCharacters);
  
//     res.render('savedFeatures', {
//       logged_in: true,
//       savedCharacters
//     })
//   })
// })

// route to delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try{
        const deletePost = await Post.destroy({
            where: {
                ...req.params,
                // id: req.params.id
            }
        });

        res.status(200).json(deletePost);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
