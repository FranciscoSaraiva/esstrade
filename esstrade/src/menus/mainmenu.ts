import chalk from 'chalk';
import boxen, { BorderStyle } from 'boxen';
import clear from 'clear'
import figlet from 'figlet';
import inquirer from "inquirer";
import Table from "cli-table";
import { getRepository } from 'typeorm';
//local
import { User } from '../models/user';
import { Asset } from '../models/asset';
import { AssetType } from '../models/asset_type';


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
    let assets = chalk.greenBright("Check Assets");
    let exit = chalk.red("Exit");

    inquirer.prompt({
        type: "list",
        name: "option",
        message: "Choose a menu option",
        choices: [register, login, new inquirer.Separator(), assets, new inquirer.Separator(), exit]
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
                    CheckAssets();
                    break;
                case exit:
                    ExitApp();
                    break;
                default:
                    MainMenu(true);
            }
        })
}

function Register(): void {
    inquirer.prompt([{ type: "input", name: "email" }, { type: "password", name: "password", mask: "*" }, { type: "input", name: "username" }])
        .then((answers) => {
            let username = answers.username;
            let email = answers.email;
            let password = answers.password;

            var user = new User(username, password, email);
            user.save()
                .then(data => {
                    let user = data.GetUserDetails();
                    console.log(chalk.red("User created!\n"));
                    MainMenu(false);
                })
        });
}

async function CheckAssets() {

    let asset_types = await getRepository(AssetType).find();
    var types: any[];
    types = [];
    asset_types.forEach(at => {
        types.push(at.GetName());
    });
    types.push(new inquirer.Separator());
    types.push("All")

    inquirer.prompt({
        type: "list",
        name: "type",
        message: "What type of asset?",
        choices: types
    }).then(async answers => {

        let asset_type: AssetType[];
        asset_type = [];
        let assets: Asset[];
        assets = [];

        if (answers.type != "All") {
            asset_type = await getRepository(AssetType).find({ where: { Name: answers.type } });
            assets = await getRepository(Asset).find({ where: { AssetType: { Id: asset_type[0].GetId() } } });
        } else {
            assets = await getRepository(Asset).find();
        }

        let assetRows: any[];
        assetRows = [];
        assets.forEach(asset => {
            assetRows.push([asset.GetAcronym(), asset.GetName(), asset.GetAssetType().GetName(), asset.GetValue(), asset.GetBuyPrice(), asset.GetSellPrice(), asset.GetMargin()]);
        });

        let table = CreateTable(
            ["Acronym", "Name", "Type", "Value", "Buy Price", "Sell Price", "Margin"],
            assetRows
        );

        console.log(table.toString())
        MainMenu(false);
    })
}

function ExitApp(): void {
    clear();
    console.log("Shutting down...")
    return process.exit(0);
}

function CreateTable(head: string[], rows: any[]): Table {
    var table = new Table({
        head: head,

    });
    rows.forEach(row => {
        table.push(row);
    });

    return table;
}