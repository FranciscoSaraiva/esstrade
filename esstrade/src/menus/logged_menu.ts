import inquirer from "inquirer";
import chalk from 'chalk';
import clear from 'clear'
import figlet from 'figlet';
import boxen, { BorderStyle } from 'boxen';
//local
import { CheckAssets } from './check_assets';
import { User } from '../models/user';
import { MainMenu } from './main_menu';

export async function LoggedMenu(clear_screen: boolean, user: User) {
    if (clear_screen) {
        clear();
    }

    console.log(
        chalk.yellow(
            figlet.textSync('ESSTrade', { horizontalLayout: 'full' })
        )
    );

    console.log(boxen('Here are your details...', { padding: 1, margin: 1, borderStyle: BorderStyle.Classic, borderColor: "cyan" }))

    //Menu options
    var portfolio = chalk.blue('Check my portfolio');
    var assets = chalk.greenBright("Check assets");
    var profile = chalk.green('Edit my profile');
    var logout = chalk.red('Logout');


    inquirer.prompt(
        {
            type: "list",
            name: "option",
            message: "Choose a menu option",
            choices: [portfolio, assets, new inquirer.Separator(), profile, new inquirer.Separator(), logout]
        }
    )
        .then(answers => {
            switch (answers.option) {
                case portfolio:

                case assets:
                    CheckAssets(user);
                    break;
                case profile:

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