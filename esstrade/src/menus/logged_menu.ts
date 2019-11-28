import inquirer from "inquirer";
import chalk from 'chalk';
import clear from 'clear'
import boxen, { BorderStyle } from 'boxen';
//local
import { CheckAssets } from './check_assets';
import { User } from '../models/user';
import { MainMenu } from './main_menu';
import { EditProfile } from './edit_profile';
import { AddBalance } from './add_balance';
import { GetPortfolios } from './get_portfolios';

export async function LoggedMenu(clear_screen: boolean, user: User) {
    if (clear_screen) {
        clear();
    }

    console.log(boxen(
        chalk.blue('Email: ') + user.GetEmail() + '\n' +
        chalk.blue('Username: ') + user.GetUsername() + '\n' +
        chalk.blue('First Name: ') + user.GetFirstName() + '\n' +
        chalk.blue('Last Name: ') + user.GetLastName() + '\n' +
        chalk.blue('Balance: ') + user.GetBalance() + ' $ \n' +
        chalk.blue('Total Allocated: ') + user.GetTotalAllocated() + ' $ \n' +
        chalk.blue('Profit: ') + user.GetProfit() + ' $ \n' +
        chalk.blue('Capital: ') + user.GetCapital() + ' $'
        ,
        { padding: 1, margin: 1, borderStyle: BorderStyle.Double, borderColor: "blue" }))

    //Menu options
    var portfolio = chalk.blue('Check my portfolio');
    var addBalance = chalk.blue('Add balance');
    var assets = chalk.greenBright("Check assets");
    var profile = chalk.green('Edit my profile');
    var logout = chalk.red('Logout');

    inquirer.prompt(
        {
            type: "list",
            name: "option",
            message: "Choose a menu option",
            choices: [portfolio, addBalance, assets, new inquirer.Separator(), profile, new inquirer.Separator(), logout]
        }
    )
        .then(answers => {
            switch (answers.option) {
                case portfolio:
                    GetPortfolios(true, user);
                    break;
                case addBalance:
                    AddBalance(user);
                    break;
                case assets:
                    CheckAssets(user);
                    break;
                case profile:
                    EditProfile(user);
                    break;
                case logout:
                    Logout(user);
                    break;
                default:
                    LoggedMenu(true, user);
            }
        })
}

function Logout(user: User): void {
    console.log(`Logged out from user ${user.GetEmail()}`)
    MainMenu(true);
}