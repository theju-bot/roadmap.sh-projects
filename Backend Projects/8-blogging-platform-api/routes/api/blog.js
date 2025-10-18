const express = require('express');
const router = express.Router();
const blogController = require('../../controllers/blogController');

router.route('/')
    .get(blogController.getAllBlogs)
    .post(blogController.createNewBlog)
    .put(blogController.updateBlog)
    .delete(blogController.deleteBlog);

router.route('/:id')
    .get(blogController.getBlog);

module.exports = router;