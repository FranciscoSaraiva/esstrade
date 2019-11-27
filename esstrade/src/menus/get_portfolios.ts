import inquirer = require('inquirer');
import chalk = require('chalk');
import clear = require('clear');
//local
import { User } from '../models/user';
import { LoggedMenu } from './logged_menu';
import { getRepository } from 'typeorm';
import { LongCFD } from '../models/longcfd';
import { ShortCFD } from '../models/shortcfd';
import { CFD } from '../models/cfd';
import { CFDMenu } from './cfd_menu';


export async function GetPortfolios(user: User) {
    var foundUser = await getRepository(User).findOne({ where: { Email: user.GetEmail() } })
    var longCFDs = await getRepository(LongCFD).find({ where: { User: foundUser, Closed: false } })
    var shortCFDs = await getRepository(ShortCFD).find({ where: { User: foundUser, Closed: false } })
    var closedCFDs = await getRepository(CFD).find({ where: { Closed: true } });

    clear();
    //make table now with cfds...
    if (longCFDs.length == 0 && shortCFDs.length == 0) {
        console.log(chalk.blue('You have no CFDs in your portfolio...'))
    }

    CFDMenu(false, user, longCFDs, shortCFDs, closedCFDs);

}