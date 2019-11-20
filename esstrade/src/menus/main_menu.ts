import chalk from "chalk";
import boxen from "boxen";
import clear from "clear";
import figlet from "figlet";
import inquirer from "inquirer";

export function MainMenu(): void {

    let register = chalk.yellow("\n1. Register");
    let login = chalk.yellowBright("\n2. Login");
    let assets = chalk.greenBright("\n3. Check Assets");

    console.log(boxen(
        register + login + assets,
        { margin: 1, padding: 1 }));
    inquirer.prompt([{name: 'option', type: 'input', message:'Type your option ->'}])
}