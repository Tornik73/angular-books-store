import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';
import Controller from './book.controller';
import verifyAdmin from '../../helpers/verifyAdmin';

const book: Router = Router();
const controller = new Controller();

// Retrieve all Users
book.get('/', verifyToken, controller.findAll);

// Retrieve a Specific User
book.get('/:id', verifyToken, controller.findOne);

book.post('/', verifyAdmin, controller.addBook);

// Update a User with Id
book.put('/:id', verifyAdmin, controller.update);

// Delete a User with Id
book.delete('/:id', verifyAdmin, controller.remove);

export default book;
