const Blog = require('../model/Blog');
const { search } = require('../routes/api/blog');

const getAllBlogs = async (req, res) => {
  if (req?.query?.term) {
    try {
      const { term } = req.query;

      let query = {};

      if (term) {
        query = {
          $or: [
            { title: { $regex: term, $options: 'i' } },
            { content: { $regex: term, $options: 'i' } },
            { category: { $regex: term, $options: 'i' } },
            { tags: { $regex: term, $options: 'i' } },
          ],
        };
      }

      const blogs = await Blog.find(query);

      if (blogs.length === 0)
        return res
          .status(404)
          .json({ message: 'No blogs found matching your search term.' });

      res.status(200).json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    const blogs = await Blog.find();
    if (!blogs) return res.status(204).json({ message: 'No blogs found.' });
    res.json(blogs);
  }
};

const createNewBlog = async (req, res) => {
  if (!req?.body?.title || !req?.body?.content) {
    return res.status(400).json({ message: 'Title and body are required.' });
  }

  try {
    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
    });

    res.status(201).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'Blog ID is required.' });
  }

  const blog = await Blog.findOne({ _id: req.body.id }).exec();
  if (!blog) {
    return res
      .status(204)
      .json({ message: `No blog matches ID ${req.body.id}` });
  }
  if (req?.body?.title) blog.title = req.body.title;
  if (req?.body?.content) blog.content = req.body.content;
  if (req?.body?.category) blog.category = req.body.category;
  if (req?.body?.tags) blog.tags = req.body.tags;
  const result = await blog.save();
  res.json(result);
};

const deleteBlog = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'Blog ID is required.' });
  }

  const blog = await Blog.findOne({ _id: req.body.id }).exec();
  if (!blog) {
    return res
      .status(204)
      .json({ message: `No blog matches ID ${req.body.id}` });
  }
  const result = await blog.deleteOne();
  res.json(result);
};

const getBlog = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'Blog ID required.' });

  const blog = await Blog.findOne({ _id: req.params.id }).exec();
  if (!blog) {
    return res
      .status(204)
      .json({ message: `No blog matches ID ${req.params.id}` });
  }
  res.json(blog);
};

const searchBlog = async (res, req) => {};

module.exports = {
  getBlog,
  getAllBlogs,
  createNewBlog,
  updateBlog,
  deleteBlog,
  searchBlog,
};
