import clear from 'clear';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { LongCFD } from '../../entities/longcfd';
import { ShortCFD } from '../../entities/shortcfd';
import { Trader } from '../../platform/trader';
import { CFDMenu } from './cfd_menu';
import { GetPortfolios } from '../user/get_portfolios';

export function CloseCFD(trader: Trader): void {

    inquirer
        .prompt({
            type: "input",
            name: "id",
            message: "Please indicate the ID of the CFD you wish to close: ",
            validate: function (input) { if (input > 0) { return true } else return "Please enter an id greater than 0"; }
        })
        .then(async answer => {

            //get list of open cfds
            var longCFDs: LongCFD[] = trader.getLongCFDs() || [];
            var shortCFDs: ShortCFD[] = trader.getShortCFDs() || [];

            //get their indexes
            var indexLong = longCFDs.findIndex(long => long.GetId() == answer.id);
            var longcfd: LongCFD = longCFDs[indexLong];

            var indexShort = shortCFDs.findIndex(short => short.GetId() == answer.id);
            var shortcfd: ShortCFD = shortCFDs[indexShort];

            if (longcfd == undefined && shortcfd == undefined) {
                clear();
                console.log(chalk.red('There is no CFD with the given id, please enter an existing id\n'));
                CFDMenu(false, trader);
            }
            else {
                if (longcfd != undefined) {
                    clear();
                    await longcfd.CloseCFD();
                    await longcfd.save();

                    var index = trader.getLongCFDs().indexOf(longcfd);
                    trader.getLongCFDs().splice(index, 1);
                    trader.getClosedLongCFDs().push(longcfd);

                    console.log('The CFD has been closed.\n');
                }
                if (shortcfd != undefined) {
                    clear();
                    await shortcfd.CloseCFD();
                    await shortcfd.save();

                    var index = trader.getShortCFDs().indexOf(shortcfd);
                    trader.getShortCFDs().splice(index, 1);
                    trader.getClosedShortCFDs().push(shortcfd);

                    console.log('The CFD has been closed.\n');
                }

                GetPortfolios(false, trader);
            }

        })
}