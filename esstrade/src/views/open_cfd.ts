import { User } from '../classes/user';
import inquirer, { Question } from 'inquirer';
import { LongCFD } from '../classes/longcfd';
import { ShortCFD } from '../classes/shortcfd';
import { Asset } from '../classes/asset';
import { getRepository } from 'typeorm';
import clear from 'clear';
import { CFDMenu } from './cfd_menu';

export function OpenCFD(user: User) {


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
                    return "The asset does not exist, try again";
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

                            var asset = await getRepository(Asset).findOne({ where: { Acronym: symbol } });
                            var cfd = new LongCFD(asset, user, amount, takeProfit, stopLoss, new Date(), null, false, asset.GetBuyPrice());

                            var value = asset.GetBuyPrice() * cfd.GetAmount();
                            var profit = (asset.GetSellPrice() * cfd.GetAmount()) - (cfd.GetBuyPrice() * cfd.GetAmount());
                            user.AddBalance(-value);
                            user.AddTotalAllocated(value);
                            user.AddProfit(profit)
                            user.UpdateCapital();
                            await user.save();
                            await cfd.save();

                            clear();
                            console.log('Buy CFD for ' + asset.GetAcronym() + ' created.\n')
                            CFDMenu(false, user);
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

                            var asset = await getRepository(Asset).findOne({ where: { Acronym: symbol } });
                            var cfd = new ShortCFD(asset, user, amount, takeProfit, stopLoss, new Date(), null, false, asset.GetSellPrice());

                            var value = asset.GetBuyPrice() * cfd.GetAmount();
                            var profit = (asset.GetBuyPrice() * cfd.GetAmount()) - (cfd.GetSellPrice() * cfd.GetAmount());
                            user.AddBalance(-value);
                            user.AddTotalAllocated(value);
                            user.AddProfit(profit)
                            user.UpdateCapital();
                            await user.save();
                            await cfd.save();

                            clear();
                            console.log('Sell CFD for ' + asset.GetAcronym() + ' created.\n')
                            CFDMenu(false, user);
                            return;
                        })
                    break;
                case "Exit":
                    CFDMenu(true, user);
                    break;
            }
        })
}