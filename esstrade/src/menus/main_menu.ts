import chalk from "chalk";
import boxen, { BorderStyle } from "boxen";
import clear from "clear";
import figlet from "figlet";
import inquirer from "inquirer";

export function MainMenu(): void {

    let register = chalk.yellow("Register");
    let login = chalk.yellowBright("Login");
    let assets = chalk.greenBright("Check Assets");
    let exit = chalk.red("Exit");

    var boxenOptions = {
        padding: 1,
        margin: 1,
        borderStyle: BorderStyle.DoubleSingle,
        borderColor: "red",
    };

    console.log(boxen("Main Menu", boxenOptions));

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

function RegisterUser(): void {

}

function LoginUser(): void {

}

function CheckAssets(): void {
    
}

function ExitApp(): void {
    clear();
    console.log("Shutting down...")
    console.log('You may close the terminal...')
    return process.exit(0);
}