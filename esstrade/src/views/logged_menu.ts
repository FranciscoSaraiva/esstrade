import inquirer from "inquirer";
import chalk from 'chalk';
import clear from 'clear'
import boxen, { BorderStyle } from 'boxen';
//local
import { CheckAssets } from './check_assets';
import { User } from '../classes/user';
import { MainMenu } from './main_menu';
import { EditProfile } from './edit_profile';
import { AddBalance } from './add_balance';
import { GetPortfolios } from './get_portfolios';
import { Trader } from '../classes/trader';
import { Asset } from '../classes/asset';
import { ShortCFD } from '../classes/shortcfd';
import { LongCFD } from '../classes/longcfd';

export async function LoggedMenu(clear_screen: boolean, trader: Trader) {
    if (clear_screen) {
        clear();
    }

    //global variables
    var user: User = trader.getUser();
    var assets: Asset[] = trader.getAssets();
    var longCFDs: LongCFD[] = trader.getLongCFDs();
    var shortCFDs: ShortCFD[] = trader.getShortCFDs();
    var closedLongCFDs: LongCFD[] = trader.getClosedLongCFDs();
    var closedShortCFDs: ShortCFD[] = trader.getClosedShortCFDs();


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
    var checkAssets = chalk.greenBright("Check assets");
    var profile = chalk.green('Edit my profile');
    var logout = chalk.red('Logout');

    inquirer.prompt(
        {
            type: "list",
            name: "option",
            message: "Choose a menu option",
            choices: [portfolio, addBalance, checkAssets, new inquirer.Separator(), profile, new inquirer.Separator(), logout]
        }
    )
        .then(answers => {
            switch (answers.option) {
                case portfolio:
                    GetPortfolios(true, trader);
                    break;
                case addBalance:
                    AddBalance(trader);
                    break;
                case checkAssets:
                    CheckAssets(trader);
                    break;
                case profile:
                    EditProfile(trader);
                    break;
                case logout:
                    Logout(trader);
                    break;
                default:
                    LoggedMenu(true, trader);
            }
        })
}

function Logout(trader: Trader): void {
    console.log(`Logged out from user ${trader.getUser().GetEmail()}`)
    MainMenu(true, trader.getAssets());
}