import chalk from 'chalk';
import clear from 'clear'
import figlet from 'figlet';
import inquirer from "inquirer";
//local
import { Register } from './register';
import { Login } from './login';
import { CheckAssets } from './check_assets';


export function MainMenu(clear_screen: boolean): void {

    if (clear_screen) {
        clear();
    }

    console.log(
        chalk.yellow(
            figlet.textSync('ESSTrade', { horizontalLayout: 'full' })
        )
    );

    let register = chalk.yellow("Register");
    let login = chalk.yellowBright("Login");
    let assets = chalk.greenBright("Check assets");
    let exit = chalk.red("Exit");

    inquirer.prompt({
        type: "list",
        name: "option",
        message: "Choose a menu option",
        choices: [register, login, new inquirer.Separator(), assets, new inquirer.Separator(), exit, "test yahoo"]
    })
        .then(answers => {
            console.log(answers.option)
            switch (answers.option) {
                case register:
                    Register();
                    break;
                case login:
                    Login();
                    break;
                case assets:
                    CheckAssets(null);
                    break;
                case exit:
                    ExitApp();
                    break;
                case "test yahoo":
                    testYahoo();
                    break;
                default:
                    MainMenu(true);
                    break;
            }
        })
}

function ExitApp(): void {
    clear();
    console.log("Shutting down...")
    return process.exit(0);
}

var si = require('stock-info');
function testYahoo(): void {
    si.getSingleStockInfo('FB')
        .then(stock => {
            console.log(stock)
            console.log({
                "Price": stock.regularMarketPrice,
                "Name": stock.symbol,
                "Buy": stock.ask,
                "Sell": stock.bid,
                "Change": stock.regularMarketChange
            })
            MainMenu(false);
        })
}