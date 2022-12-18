import express from 'express';
import { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } from "./author.controller";
import { body } from 'express-validator';

export const authorRouter = express.Router();

authorRouter.get('/', getAuthors);

authorRouter.get('/:id', getAuthor);

authorRouter.post('/', 
             body("firstName").isString,
             body("lastName").isString, 
             createAuthor);

authorRouter.put('/',
             body("firstName").isString,
             body("lastName").isString, 
             updateAuthor)

authorRouter.delete('/:id', deleteAuthor);

