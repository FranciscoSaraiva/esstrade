import chalk from 'chalk';
import boxen, { BorderStyle } from 'boxen';
import clear from 'clear'
import figlet from 'figlet';
import inquirer from "inquirer";
//local
import { User } from '../models/user';


export function MainMenu(): void {

    //clear();

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
                    Register();
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

function Register(): void {
    inquirer.prompt([{ type: "input", name: "email" }, { type: "password", name: "password", mask: "*" }, { type: "input", name: "name" }])
        .then((answers) => {
            let username = answers.name;
            let email = answers.email;
            let password = answers.password;

            var user = new User(username, password, email);
            user.save()
                .then(data => {
                    let user = data.GetUserDetails();
                    console.log(chalk.red("User created!"));
                    setTimeout(() => {
                        MainMenu();
                    }, 2000);
                })
        });
}

function ExitApp(): void {
    clear();
    console.log("Shutting down...")
    return process.exit(0);
}