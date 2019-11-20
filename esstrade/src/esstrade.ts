/****************
 * REQUIRES
 ****************/
//packages
import "reflect-metadata";
import { createConnection, ConnectionOptions } from "typeorm";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";

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
            MainMenu();
        }
    })
    .catch(error => { console.log(error) });





