import express, { Request, Response } from 'express';
import { Connection } from 'typeorm';
import { User } from '../models/user';
const router = express.Router();

router.get('/', (_, res: Response) => {
    res.render('index')
});

router.get('/register', (_, res: Response) => {
    res.render('register');
});

router.post('/user', (req: Request, res: Response) => {
    let body = req.body;
    const user = new User(body.username, body.password, body.email);
    console.log(user);
    user.save().then(() => {
        res.redirect('/');
    });
    res.write('<h1>Creating user...</h1>');
});

module.exports = router;

