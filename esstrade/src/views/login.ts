import inquirer from 'inquirer';
import chalk from 'chalk';
import { getRepository } from 'typeorm';
//local
import { User } from '../classes/user';
import { MainMenu } from './main_menu';
import { LoggedMenu } from './logged_menu';
import clear from 'clear';

export function Login(): void {
    inquirer.prompt([
        { type: "input", name: "email", message: "Email: " },
        { type: "password", name: "password", mask: "*", message: "Password: " }])
        .then(async answers => {
            let email = answers.email;
            let password = answers.password;

            var user: User;
            var user = await getRepository(User).findOne({ where: { Email: email } });
            console.log('GOT THE USER')
            if (user != undefined && user.CheckLoginCredentials(email, password)) {
                console.log(chalk.green('User logged'))
                LoggedMenu(true, user);
            } else {
                clear();
                console.log(chalk.red('Incorrect email/password, please try again'))
                MainMenu(false);
            }
        })
}