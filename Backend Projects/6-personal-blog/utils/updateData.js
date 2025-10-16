const fsPromises = require('fs').promises;
const path = require('path');
const dayjs = require('dayjs');

const filePath = path.join(__dirname, '..', 'model', 'blogs.json');

const updateData = async (id, heading, description, date) => {
  const data = await fsPromises.readFile(filePath, 'utf-8');
  const blogs = JSON.parse(data);

  if (!blogs) {
    return 'No data found';
  }
  const blog = blogs.find((item) => item.id === Number(id));
  blog.heading = heading;
  blog.description = description;
  blog.date = dayjs(date).format('MMMM D, YYYY');
  await fsPromises.writeFile(filePath, JSON.stringify(blogs, null, 2));
  return console.log('updated successfully');
};

const addData = async (heading, description, date) => {
  const data = await fsPromises.readFile(filePath, 'utf-8');
  const blogs = JSON.parse(data);
  let id = blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 1;
  const newBlog = { id, heading, description, date };
  newBlog.date = dayjs(date).format('MMMM D, YYYY');
  blogs.push(newBlog);
  await fsPromises.writeFile(filePath, JSON.stringify(blogs, null, 2));
  return console.log('added successfully');
};

const deleteData = async (id) => {
  const data = await fsPromises.readFile(filePath, 'utf-8');
  const blogs = JSON.parse(data);

  if (!blogs) {
    return 'No data found';
  }
  const blog = blogs.find((item) => item.id === Number(id));
  if (!blog) {
    return 'Blog not found';
  }
  const updatedBlogs = blogs.filter((item) => item.id !== Number(id));
  await fsPromises.writeFile(filePath, JSON.stringify(updatedBlogs, null, 2));
  return console.log('deleted successfully');
};

module.exports = { updateData, deleteData, addData };
