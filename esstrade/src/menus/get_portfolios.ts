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
    var foundAsset = await getRepository(Asset).findOne({ where: { Acronym: "GOOG" } });

    var newLongCFD = new LongCFD(foundAsset, foundUser, 500, 550, 450, new Date(), new Date(), false, 1000)
    await newLongCFD.save();

    var longcfds = await getRepository(LongCFD).find()
    var shortcfds = await getRepository(ShortCFD).find()
    var cfds = await getRepository(CFD).find()

    console.log(longcfds);
    console.log(shortcfds);
    console.log(cfds);

    LoggedMenu(false, user);
}