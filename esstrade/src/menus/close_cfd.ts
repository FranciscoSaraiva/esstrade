//local
import { User } from '../models/user';
import inquirer = require('inquirer');
import { getRepository } from 'typeorm';
import { LongCFD } from '../models/longcfd';
import { CFDMenu } from './cfd_menu';
import { ShortCFD } from '../models/shortcfd';
import { CFD } from '../models/cfd';
import clear = require('clear');
import { GetPortfolios } from './get_portfolios';

export function CloseCFD(user: User): void {

    inquirer
        .prompt({
            type: "input",
            name: "id",
            message: "Please indicate the ID of the CFD you wish to close: "
        })
        .then(async answer => {

            var longCFDs: LongCFD[];
            longCFDs = await getRepository(LongCFD).find({ where: { User: user, Closed: false } })
            var shortCFDs: ShortCFD[];
            shortCFDs = await getRepository(ShortCFD).find({ where: { User: user, Closed: false } })

            var longcfd: LongCFD;
            var shortcfd: ShortCFD;
            longcfd = await getRepository(LongCFD).findOne({ where: { Id: answer.id, Closed: false } });
            shortcfd = await getRepository(ShortCFD).findOne({ where: { Id: answer.id, Closed: false } });

            if (longcfd == undefined && shortcfd == undefined) {
                clear();
                console.log('There is no CFD with the given id, please enter an existing id');
                CFDMenu(false, user);
            }
            else {
                if (longcfd != undefined) {
                    clear();
                    await longcfd.CloseCFD();
                    await longcfd.save();
                    user = longcfd.GetUser();
                    console.log('The CFD has been closed.\n');

                }
                if (shortcfd != undefined) {
                    clear();
                    await shortcfd.CloseCFD();
                    await shortcfd.save();
                    user = longcfd.GetUser();
                    console.log('The CFD has been closed.\n');
                }
                GetPortfolios(false, user);
            }

        })
}