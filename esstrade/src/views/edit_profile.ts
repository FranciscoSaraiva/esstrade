import chalk = require('chalk');
import clear = require('clear');
//local
import { User } from '../classes/user';
import inquirer = require('inquirer');
import { LoggedMenu } from './logged_menu';


export function EditProfile(user: User) {
    inquirer.prompt([
        { type: "input", name: "firstName", message: "First Name: (press enter to skip)" },
        { type: "input", name: "lastName", message: "Last Name: (press enter to skip)" },
        { type: "input", name: "password", message: "Password: (press enter to skip)" },
    ]).then(async answers => {
        var firstName = answers.firstName;
        var lastName = answers.lastName;
        var password = answers.password;

        if (firstName != "")
            user.SetFirstName(firstName);

        if (lastName != "")
            user.SetLastName(lastName);

        if (password != "")
            user.SetPassword(password);

        await user.save();

        clear();
        console.log(chalk.blue('User profile updated.'));

        LoggedMenu(false, user);
    })
}