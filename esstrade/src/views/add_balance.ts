import clear = require('clear');
import chalk = require('chalk');
import inquirer = require('inquirer');
//local
import { User } from '../classes/user';
import { LoggedMenu } from './logged_menu';
import { Trader } from '../classes/trader';


export function AddBalance(trader: Trader) {
    inquirer.prompt(
        {
            type: "list",
            name: "amount",
            choices: ["50", "100", "250", "500", "1000"]
        }
    )
        .then(async answers => {
            var amount = parseInt(answers.amount);
            trader.getUser().AddBalance(amount);
            await trader.getUser().save();
            clear();
            console.log(chalk.green(`${amount} $ were added to your account balance.`))
            LoggedMenu(false, trader);
        })
}