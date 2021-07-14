import createError from 'http-errors';
import atob from 'atob';
import AuthorsModel from '../services/authors/schema.js';

export const basicAuthMiddleware = async (req, res, next) => {
  //   console.log(req.headers);
};
