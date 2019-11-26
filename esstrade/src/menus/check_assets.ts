import { getRepository } from 'typeorm';
import inquirer from "inquirer";
import clear from 'clear';
//local
import { Asset } from '../models/asset';
import { AssetType } from '../models/asset_type';
import { CreateTable } from '../utilities/table';
import { MainMenu } from './main_menu';
import { LoggedMenu } from './logged_menu';
import { User } from '../models/user';

export async function CheckAssets(user: User) {

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

        let asset_type: AssetType[];
        asset_type = [];
        let assets: Asset[];
        assets = [];

        if (answers.type != "All") {
            asset_type = await getRepository(AssetType).find({ where: { Name: answers.type } });
            assets = await getRepository(Asset).find({ where: { AssetType: { Id: asset_type[0].GetId() } } });
        } else {
            assets = await getRepository(Asset).find();
        }

        let assetRows: any[];
        assetRows = [];
        for (let index = 0; index < assets.length; index++) {
            const asset = assets[index];
            await asset.UpdateAsset();
            assetRows.push([asset.GetAcronym(), asset.GetName(), asset.GetAssetType().GetName(), asset.GetValue(), asset.GetBuyPrice(), asset.GetSellPrice(), asset.GetChange()]);
        }

        let table = CreateTable(
            ["Acronym", "Name", "Type", "Value", "Buy Price", "Sell Price", "Change"],
            assetRows
        );

        clear();
        console.log(table.toString())
        if (user != null)
            LoggedMenu(false, user);
        else
            MainMenu(false);
    })
}