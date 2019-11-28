import clear = require('clear');
import chalk = require('chalk');
import inquirer = require('inquirer');
//local
import { User } from '../classes/user';
import { LoggedMenu } from './logged_menu';


export function AddBalance(user: User) {
    inquirer.prompt(
        {
            type: "list",
            name: "amount",
            choices: ["50", "100", "250", "500", "1000"]
        }
    )
        .then(async answers => {
            var amount = parseInt(answers.amount);
            user.AddBalance(amount);
            await user.save();
            clear();
            console.log(chalk.green(`${amount} $ were added to your account balance.`))
            LoggedMenu(false, user);
        })
}