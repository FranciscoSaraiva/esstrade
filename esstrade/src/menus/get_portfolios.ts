import inquirer = require('inquirer');
//local
import { User } from '../models/user';
import { LoggedMenu } from './logged_menu';
import { getRepository } from 'typeorm';
import { LongCFD } from '../models/longcfd';
import { ShortCFD } from '../models/shortcfd';
import { CFD } from '../models/cfd';
import { Asset } from '../models/asset';

export async function GetPortfolios(user: User) {
    var foundUser = await getRepository(User).findOne({ where: { Email: user.GetEmail() } })
    var cfds = await getRepository(CFD).find({ where: { User: foundUser } })

    //make table now with cfds...

    LoggedMenu(false, user);
}