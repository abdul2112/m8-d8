import express from 'express';
import createError from 'http-errors';
import AuthorsModel from './schema.js';

const authorsRouter = express.Router();

export default authorsRouter;

authorsRouter.post('/', async (req, res, next) => {
  try {
    const newAuthor = new AuthorsModel(req.body); // validate body coming from postman
    console.log(req.body);

    const { _id } = await newAuthor.save();

    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

authorsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await AuthorsModel.find().populate({
      path: 'author',
      select: 'name surname avatar',
    });
    res.send(blogs);
  } catch (error) {
    console.log(error);
    next(createError(500, 'An error occurred while getting blogs'));
  }
});

authorsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const author = await AuthorsModel.findById(id).populate({
      path: 'author',
      select: 'name surname avatar',
    });
    if (author) {
      res.send(author);
    } else {
      next(createError(404, `blog ${req.params.id} not found`));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'An error occurred while getting blog'));
  }
});

authorsRouter.put('/:id', async (req, res, next) => {
  try {
    const modifiedBlog = await AuthorsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (modifiedBlog) {
      res.send(modifiedBlog);
    } else {
      next(createError(404, `blog ${req.params.id} not found`));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'An error occurred while updating blog'));
  }
});

authorsRouter.delete('/:id', async (req, res, next) => {
  try {
    const deleteBlog = await AuthorsModel.findByIdAndDelete(req.params.id);
    if (deleteBlog) {
      res.send('Blog has been DELETED');
    } else {
      next(createError(404, `blog ${req.params.id} not found`));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'An error occurred while deleting blog'));
  }
});
