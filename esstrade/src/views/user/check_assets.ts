import { getRepository } from 'typeorm';
import inquirer from "inquirer";
import clear from 'clear';
import chalk from 'chalk';
import { Asset } from '../../classes/asset';
import { AssetType } from '../../classes/asset_type';
import { CreateTable } from '../../utilities/table';
import { MainMenu } from '../main/main_menu';
import { LoggedMenu } from './logged_menu';
import { User } from '../../classes/user';
import { Trader } from '../../classes/platform/trader';

export async function CheckAssets(trader: Trader) {

    let asset_types = await getRepository(AssetType).find();
    var types: any[];
    types = [];
    asset_types.forEach(at => {
        types.push(at.GetName());
    });
    types.push(new inquirer.Separator());
    types.push("All")

    inquirer.prompt({
        type: "list",
        name: "type",
        message: "What type of asset?",
        choices: types
    }).then(async answers => {

        var assets: Asset[] = trader.getAssets();

        if (answers.type != "All") {
            var asset_type: AssetType = await getRepository(AssetType).findOne({ where: { Name: answers.type } });
            assets = assets.filter((asset: Asset) => {
                if (asset.GetAssetType().GetName() == asset_type.GetName()) {
                    return asset
                }
            })
        } else {
            assets = trader.getAssets();
        }

        let assetRows: any[];
        assetRows = [];
        for (let index = 0; index < assets.length; index++) {
            const asset = assets[index];
            await asset.UpdateAsset();
            await asset.save();
            var acronym = asset.GetAcronym();
            var name = asset.GetName();
            var type = asset.GetAssetType().GetName();
            var value = asset.GetValue() + ' $';
            var buyPrice = asset.GetBuyPrice() + ' $';
            var sellPrice = asset.GetSellPrice() + ' $';
            var change = (asset.GetChange() >= 0) ? chalk.green(asset.GetChange()) : chalk.red(asset.GetChange());
            var changePercentage = (asset.GetChangePercent() >= 0) ? chalk.green(asset.GetChangePercent() + ' %') : chalk.red(asset.GetChangePercent() + ' %');
            assetRows.push([
                acronym,
                name,
                type,
                value,
                buyPrice,
                sellPrice,
                change,
                changePercentage])
        }

        let table = CreateTable(
            ["Acronym", "Name", "Type", "Value", "Buy Price", "Sell Price", "Change", "Change Percentage"],
            assetRows
        );

        clear();
        console.log(table.toString())

        LoggedMenu(false, trader);
    })
}