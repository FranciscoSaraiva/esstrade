import express, { Request, Response } from 'express';
import { Connection } from 'typeorm';
import { User } from '../models/User';
const router = express.Router();

router.get('/', (_, res: Response) => {
    res.render('index')
});

router.get('/register', (_, res: Response) => {
    res.render('register');
});

router.post('/user', (req: Request, res: Response) => {
    let body = req.body;
    const user = new User("Francisco", "123456789", "chico@email.com");
    console.log(user);
    /*user.save().then(() => {
        res.redirect('/');
    });*/
    res.write('<h1>Creating user...</h1>');
});

module.exports = router;

