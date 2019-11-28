import chalk from 'chalk';
import clear from 'clear'
import figlet from 'figlet';
import inquirer from "inquirer";
import { Register } from './register';
import { Login } from './login';
import { Asset } from '../../classes/asset';


export function MainMenu(clear_screen: boolean, assets: Asset[]): void {

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
    //let assets = chalk.greenBright("Check assets");
    let exit = chalk.red("Exit");

    inquirer.prompt({
        type: "list",
        name: "option",
        message: "Choose a menu option",
        choices: [register, login, new inquirer.Separator(), exit]
    })
        .then(answers => {
            switch (answers.option) {
                case register:
                    Register(assets);
                    break;
                case login:
                    Login(assets);
                    break;
                case exit:
                    ExitApp();
                    break;
                default:
                    MainMenu(true, assets);
                    break;
            }
        })
}

function ExitApp(): void {
    clear();
    console.log("Shutting down...")
    return process.exit(0);
}

/* var si = require('stock-info');
function testYahoo(): void {
    si.getSingleStockInfo('BTC-USD')
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
}  */