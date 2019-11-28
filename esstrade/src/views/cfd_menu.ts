
import inquirer from 'inquirer';
import clear from 'clear';
import chalk from 'chalk';
import { LoggedMenu } from './logged_menu';
import { CloseCFD } from './close_cfd';
import { OpenCFD } from './open_cfd';
import { Trader } from '../classes/trader';



export function CFDMenu(clean_screen: boolean, trader: Trader) {

    if (clean_screen)
        clear();

    var openCFD = chalk.green('Open new CFD');
    var closeCFD = chalk.green('Close CFD');
    var exit = chalk.red('Go back');

    inquirer.prompt(
        {
            type: "list",
            name: "option",
            message: "Choose an option: ",
            choices: [openCFD, closeCFD, new inquirer.Separator(), exit]
        }
    )
        .then(answers => {
            switch (answers.option) {
                case openCFD:
                    OpenCFD(trader);
                    break;
                case closeCFD:
                    CloseCFD(trader);
                    break;
                case exit:
                    LoggedMenu(true, trader);
                    break;
            }
        })
}