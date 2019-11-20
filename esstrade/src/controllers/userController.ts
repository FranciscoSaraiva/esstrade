import { User } from '../models/user';
import { Request, Response } from 'express';

export class UserController {


    public CreateUser(request: Request, response: Response): void {
        var body = request.body;

        var username = body.username;
        var password = body.password;
        var email = body.email;

        var user = new User(username, password, email)
        user.save()
            .then(() => {
                response.redirect('/');
            })
            .catch(error => {
                response.render('error', { error: error })
            })
    }

}
