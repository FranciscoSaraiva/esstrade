import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen, { BorderStyle } from 'boxen';
import clear from 'clear';
//local
import { User } from '../models/user';
import { MainMenu } from './main_menu';
import { getRepository } from 'typeorm';


export function Register(): void {
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
                'Email: ' + chalk.blue(email) + '\n' +
                { padding: 1, borderStyle: BorderStyle.Double, borderColor: "green" }))

            inquirer.prompt({ type: "confirm", name: "confirm", message: "Are these correct?" })
                .then(async answer => {
                    clear();
                    if (answer.confirm) {
                        var user: User;
                        var user = await getRepository(User).findOne({ where: { Email: email } })

                        if (user.CheckIfEmailIsTaken(email)) {
                            console.log(chalk.red('This email is already taken, use a different email for registration.\n'))
                            MainMenu(false);
                        } else {
                            var newUser = new User(username, password, email);
                            newUser.save()
                                .then(data => {
                                    let user = data.GetUserDetails();
                                    console.log(chalk.red(`User with email ${user.GetEmail()} created!\n`));
                                    MainMenu(false);
                                })
                        }
                    } else {
                        MainMenu(true);
                    }
                })
        });
}