import chalk from 'chalk';
import boxen, { BorderStyle } from 'boxen';
import clear from 'clear'
import figlet from 'figlet';
import inquirer from "inquirer";
//local


export function MainMenu(): void {

    clear();

    console.log(
        chalk.yellow(
            figlet.textSync('ESSTrade', { horizontalLayout: 'full' })
        )
    );

    let register = chalk.yellow("Register");
    let login = chalk.yellowBright("Login");
    let assets = chalk.greenBright("Check Assets");
    let exit = chalk.red("Exit");

    inquirer.prompt({
        type: "list",
        name: "option",
        choices: [register, login, assets, exit]
    })
        .then(answers => {
            console.log(answers.option)
            switch (answers.option) {
                case register:
                    break;
                case login:
                    break;
                case assets:
                    break;
                case exit:
                    ExitApp();
                    break;
                default:
                    MainMenu();
            }
        })
}

function ExitApp(): void {
    clear();
    console.log("Shutting down...")
    return process.exit(0);
}