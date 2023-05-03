const { response } = require('express');
const express = require('express');
const router = express.Router();

const Post = require('../models/Post')



// Add post to db
router.post('/addPost', async (req, res) => {
    try {
        const { title, body } = req.body;
        const newPost = new Post({ title, body });
        await newPost.save();
        res.redirect('/post/form');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete post fron db
router.delete('/post/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Post.findByIdAndDelete(id);
        res.send({message: 'Post deleted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
);

// Display the post page
router.get('/posts/form', async(req, res) => {
    try {
        const posts = await Post.find().exec();
        console.log(posts);
        res.render('posts', {posts});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
// Display all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().exec();
        console.log(posts);
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})
// Update post

router.put('/update/:id' , async(req, res) => {
    const {title, body} = req.body;
    await Post.findByIdAndUpdate({
        posts : req.postId, _id: req.params.id
    }, 
    {
        title, body
    })
    .then((result) => response(res, 200, {msg: 'Post updated', posts: result}))
    .catch(err => response(res, 400, err))
})



module.exports = router;