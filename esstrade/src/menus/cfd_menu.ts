
import inquirer = require('inquirer');
import clear = require('clear');
import chalk = require('chalk');
//local
import { User } from '../models/user';
import { ShortCFD } from '../models/shortcfd';
import { LongCFD } from '../models/longcfd';
import { CFD } from '../models/cfd';
import { LoggedMenu } from './logged_menu';
import { CheckAssets } from './check_assets';



export function CFDMenu(clean_screen: boolean, user: User, longcfds: LongCFD[], shortcfds: ShortCFD[], closedcfds: CFD[]) {

    if (clean_screen)
        clear();

    var manageCFD = chalk.green('Manage open CFDs');
    var openCFD = chalk.green('Open new CFD');
    var exit = chalk.red('Go back');

    inquirer.prompt(
        {
            type: "list",
            name: "option",
            message: "Choose an option: ",
            choices: [manageCFD, openCFD, new inquirer.Separator(), exit]
        }
    )
        .then(answers => {
            switch (answers.option) {
                case manageCFD:
                    break;
                case openCFD:
                    break;
                case exit:
                    LoggedMenu(true, user);
                    break;
            }
        })
}