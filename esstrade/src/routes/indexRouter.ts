import express, { Request, Response } from 'express';
import { UserController } from '../controllers/userController'

const router = express.Router();
const userController = new UserController();


router.get('/', (_, res: Response) => {
    res.render('index')
});

router.get('/register', (_, res: Response) => {
    res.render('register');
});

router.post('/user', (req: Request, res: Response) => {
    userController.CreateUser(req, res);
});

module.exports = router;

