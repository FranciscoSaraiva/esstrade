import inquirer, { Question } from 'inquirer';
import clear from 'clear';
import chalk from 'chalk';
import { getRepository } from 'typeorm';
import { CFDMenu } from './cfd_menu';
import { LongCFD } from '../../entities/longcfd';
import { ShortCFD } from '../../entities/shortcfd';
import { Asset } from '../../entities/asset';
import { Trader } from '../../platform/trader';
import { User } from '../../entities/user';
import { GetPortfolios } from '../user/get_portfolios';

export function OpenCFD(trader: Trader) {

    trader.getAssets().forEach(asset => {
        console.log(chalk.blue(`[ ${asset.GetAcronym()} - ${asset.GetName()} ]`))
    });

    var questions: Question[];
    questions = [
        {
            type: "input", name: "asset", message: "Asset(Symbol): ",
            validate: async function (input) {
                var asset: Asset;
                asset = await getRepository(Asset).findOne({ where: { Acronym: input } });
                if (asset != undefined) {
                    return true
                } else {
                    return "The asset does not exist, input an existing asset from the list.";
                }
            }
        },
        {
            type: "input", name: "amount", message: "Amount: ",
            validate: function (input) { if (input > 0) return true; else return "The amount needs to be higher than zero" }
        },
        { type: "input", name: "takeProfit", message: "Take Profit (enter to skip): " },
        { type: "input", name: "stopLoss", message: "Stop Loss (enter to skip): " }
    ];

    var assets: Asset[] = trader.getAssets();
    var user: User = trader.getUser();

    inquirer.prompt(
        {
            type: "list",
            name: "option",
            message: "Buy or Sell?: ",
            choices: ["Buy", "Sell", new inquirer.Separator(), "Exit"]
        }
    )
        .then(answer => {
            switch (answer.option) {
                case "Buy":
                    inquirer.prompt(questions)
                        .then(async answers => {

                            var symbol = answers.asset;
                            var amount = answers.amount;
                            var takeProfit = (answers.takeProfit != "") ? answers.takeProfit : null;
                            var stopLoss = (answers.stopLoss != "") ? answers.stopLoss : null;

                            var asset: Asset = trader.findAsset(symbol);
                            console.log(asset)
                            var cfd = new LongCFD(asset, user, amount, takeProfit, stopLoss, new Date(), null, false, asset.GetBuyPrice());

                            var value = asset.GetBuyPrice() * cfd.GetAmount();
                            var profit = (asset.GetSellPrice() * cfd.GetAmount()) - (cfd.GetBuyPrice() * cfd.GetAmount());
                            user.AddBalance(-value);
                            user.AddTotalAllocated(value);
                            user.AddProfit(profit)
                            user.UpdateCapital();
                            await user.save();
                            await cfd.save();
                            trader.getLongCFDs().push(cfd);
                            trader.setLongCFDs(trader.getLongCFDs());

                            clear();
                            console.log('Buy CFD for ' + asset.GetAcronym() + ' created.\n')
                            GetPortfolios(false, trader);
                            return;
                        })
                    break;
                case "Sell":
                    inquirer.prompt(questions)
                        .then(async answers => {

                            var symbol = answers.asset;
                            var amount = answers.amount;
                            var takeProfit = (answers.takeProfit != "") ? answers.takeProfit : null;
                            var stopLoss = (answers.stopLoss != "") ? answers.stopLoss : null;

                            var asset: Asset = trader.findAsset(symbol);
                            var cfd = new ShortCFD(asset, user, amount, takeProfit, stopLoss, new Date(), null, false, asset.GetSellPrice());

                            var value = asset.GetBuyPrice() * cfd.GetAmount();
                            var profit = (asset.GetBuyPrice() * cfd.GetAmount()) - (cfd.GetSellPrice() * cfd.GetAmount());
                            user.AddBalance(-value);
                            user.AddTotalAllocated(value);
                            user.AddProfit(profit)
                            user.UpdateCapital();
                            await user.save();
                            await cfd.save();
                            trader.getShortCFDs().push(cfd)
                            trader.setShortCFDs(trader.getShortCFDs());

                            clear();
                            console.log('Sell CFD for ' + asset.GetAcronym() + ' created.\n')
                            GetPortfolios(false, trader);
                            return;
                        })
                    break;
                case "Exit":
                    CFDMenu(true, trader);
                    break;
            }
        })
}