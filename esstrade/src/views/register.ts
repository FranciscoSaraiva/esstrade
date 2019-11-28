import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen, { BorderStyle } from 'boxen';
import clear from 'clear';
import { getRepository } from 'typeorm';
import { User } from '../classes/user';
import { MainMenu } from './main_menu';
import { Asset } from '../classes/asset';


export function Register(assets: Asset[]): void {
    inquirer.prompt([
        { type: "input", name: "email", message: "Email: " },
        { type: "password", name: "password", mask: "*", message: "Password: " },
        { type: "input", name: "username", message: "Please choose a username: " }])

        .then((answers) => {
            var username = answers.username;
            var email = answers.email.toLowerCase();
            var password = answers.password;

            console.log(boxen(
                'Username: ' + chalk.blue(username) + '\n' +
                'Email: ' + chalk.blue(email) + '\n',
                { padding: 1, borderStyle: BorderStyle.Double, borderColor: "green" }))

            inquirer.prompt({ type: "confirm", name: "confirm", message: "Are these correct?" })
                .then(async answer => {
                    clear();
                    if (answer.confirm) {
                        var user: User;
                        var user = await getRepository(User).findOne({ where: { Email: email } })

                        if (user.CheckIfEmailIsTaken(email)) {
                            console.log(chalk.red('This email is already taken, use a different email for registration.\n'))
                            MainMenu(false, assets);
                        } else {
                            var newUser = new User(username, password, email);
                            newUser.save()
                                .then(user => {
                                    console.log(chalk.red(`User with email ${user.GetEmail()} created!\n`));
                                    MainMenu(false, assets);
                                })
                        }
                    } else {
                        MainMenu(true, assets);
                    }
                })
        });
}