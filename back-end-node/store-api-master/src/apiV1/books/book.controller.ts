import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jwt-then";
import config from "../../config/config";
import { Book, books } from "./book.model";
import { bookService } from "../../services/bookService";

export default class BookController {
  public findAll = async (req: Request, res: Response): Promise<any> => {
    
    try {
      const allBooks = await books.findAll({ attributes: ['id', 'title', 'author', 'price', 'img', 'description']});
      
      if (!allBooks) {
        return res.status(404).send({
          success: false,
          message: 'Books not found',
          data: null
        });
      }
      res.status(200).send(allBooks);
      // return res.status(200).send({
      //   success: true,
      //   data: books
      // });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public addBook = async (req: Request, res: Response): Promise<any> => {
    try {
      var book: Book = req.body;
      await new bookService().addBook(book);
      let bookDB = await new bookService().getBookByTitle(book.title);
      res.status(200).send(bookDB);
    } catch (err) {
      res.status(500).send({
        success: false, 
        message: err.toString(),
        data: null
      });
    }
  };

  public findOne = async (req: Request, res: Response): Promise<any> => {
    try {
      const book = await books.findOne({ where: { id: req.params.id }});
      
      if (!book) {
        return res.status(404).send({
          success: false,
          message: 'Book not found',
          data: null
        });
      }
      res.status(200).send(book);
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public update = async (req: Request, res: Response): Promise<any> => {
    const { title, author, price, description, img } = req.body;
    try {
      const userUpdated = await books.findOne({ where: { id: req.params.id } });
      userUpdated.update(
        {
          title, 
          author, 
          price,
          description,
          img, 
        },
        { where: { 
          id: req.params.id  
          }
        });
      if (!userUpdated) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: userUpdated
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public remove = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await books.findOne({ where: { id: req.params.id } });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      // try catch mb
      res.status(200).send({success: true, message: 'User delete'});
      user.destroy();
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };
}
