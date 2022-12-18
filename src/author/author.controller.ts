import { Request, Response, response } from 'express';
import { body, validationResult } from 'express-validator';

import * as AuthorService from "./author.service";

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await AuthorService.listAuthors();
    return res.status(200).json(authors)
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
};

export const getAuthor = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const author = await AuthorService.getAuthor(id);

    if (!author) {
      return res.status(404).json("Author could not be found!")
    }
    return res.status(200).json(author)
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  try {
    const author = req.body;
    const newAuthor = AuthorService.createAuthor(author);
    return res.status(201).json(newAuthor);
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
}

export const updateAuthor = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const id: number = parseInt(req.params.id, 10);
  try {
    const author = req.body;
    const updatedAuthor = AuthorService.updateAuthor(author, id);
    return res.status(201).json(updatedAuthor);
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
}

export const deleteAuthor = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    await AuthorService.deleteAuthor(id);
    return response.status(204).json("Author deleted succesfully!");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
}

