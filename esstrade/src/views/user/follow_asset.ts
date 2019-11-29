import inquirer from 'inquirer';
import { Trader } from '../../classes/platform/trader';
import { getRepository } from 'typeorm';
import { Asset } from '../../classes/asset';
import chalk from 'chalk';
import clear from 'clear';
import { LoggedMenu } from './logged_menu';

export function FollowAsset(trader: Trader) {
    clear();
    trader.getAssets().forEach(asset => {
        console.log(chalk.blue(`[ ${asset.GetAcronym()} - ${asset.GetName()} ]`))
    });
    inquirer.prompt(
        {
            type: "input",
            name: "asset",
            message: "Which asset you wish to follow?",
            validate: async function (input) {
                var asset = await getRepository(Asset).findOne({ where: { Acronym: input } })
                if (asset != undefined) {
                    return true;
                } else {
                    return "The written asset is not a valid asset"
                }
            }
        }
    )
        .then(async answers => {
            let asset: Asset = trader.findAsset(answers.asset);
            trader.getUser().FollowAsset(asset);
            await trader.getUser().save().catch(error => { console.log(error) });
            trader.getUser().SetSubject(trader.getUser().GetFollows());

            clear();

            console.log('The asset has been added to your follow list.');
            LoggedMenu(false, trader);
        })
}