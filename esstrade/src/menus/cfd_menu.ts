
import inquirer from 'inquirer';
import clear from 'clear';
import chalk from 'chalk';
//local
import { User } from '../models/user';
import { ShortCFD } from '../models/shortcfd';
import { LongCFD } from '../models/longcfd';
import { LoggedMenu } from './logged_menu';
import { CloseCFD } from './close_cfd';
import { OpenCFD } from './open_cfd';



export function CFDMenu(clean_screen: boolean, user: User) {

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
                    OpenCFD(user);
                    break;
                case closeCFD:
                    CloseCFD(user);
                    break;
                case exit:
                    LoggedMenu(true, user);
                    break;
            }
        })
}