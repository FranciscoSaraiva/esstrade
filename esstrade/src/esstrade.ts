/****************
 * REQUIRES
 ****************/
//packages
import "reflect-metadata";
import { createConnection, ConnectionOptions } from "typeorm";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import inquirer from "inquirer";

//locals
import { MainMenu } from "./menus/main_menu";


/***************************
 * Database Initialization
 ***************************/

const db_options: ConnectionOptions = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "password",
    "database": "esstrade",
    "dropSchema": true,
    "synchronize": true,
    "logging": false,
    "entities": [
        "src/models/*.ts"
    ]
}

createConnection(db_options)
    .then(connection => {
        //console.log(connection);
        if (connection.isConnected) {
            clear();
            console.log(
                chalk.yellow(
                    figlet.textSync('ESSTrade', { horizontalLayout: 'full' })
                )
            )
            console.log("Database created...");
            let res = inquirer.prompt([
                {name: 'test', type: 'list', message: 'question1?', choices: [{name: 'a', value: 1}, {name: 'b', value: 2}, {name: 'c', value: 3}], default: 1}
              ])
            //MainMenu();
        }
    })
    .catch(error => { console.log(error) });





