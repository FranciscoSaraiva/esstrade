import chalk = require('chalk');
import clear = require('clear');
//local
import { User } from '../../entities/user';
import inquirer = require('inquirer');
import { LoggedMenu } from './logged_menu';
import { Trader } from '../../platform/trader';


export function EditProfile(trader: Trader) {
    inquirer.prompt([
        { type: "input", name: "firstName", message: "First Name: (press enter to skip)" },
        { type: "input", name: "lastName", message: "Last Name: (press enter to skip)" },
        { type: "input", name: "password", message: "Password: (press enter to skip)" },
    ]).then(async answers => {
        var firstName = answers.firstName;
        var lastName = answers.lastName;
        var password = answers.password;

        if (firstName != "")
            trader.getUser().SetFirstName(firstName);

        if (lastName != "")
            trader.getUser().SetLastName(lastName);

        if (password != "")
            trader.getUser().SetPassword(password);

        await trader.getUser().save();

        clear();
        console.log(chalk.blue('User profile updated.'));

        LoggedMenu(false, trader);
    })
}