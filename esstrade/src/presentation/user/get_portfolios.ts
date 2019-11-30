import chalk from 'chalk';
import clear from 'clear';
import Table from 'cli-table';
import { LongCFD } from '../../entities/longcfd';
import { ShortCFD } from '../../entities/shortcfd';
import { CFDMenu } from '../portfolio/cfd_menu';
import { CreateTable } from '../../utilities/table';
import { Trader } from '../../platform/trader';


export async function GetPortfolios(clear_screen: boolean, trader: Trader) {

    if (clear_screen)
        clear();

    var longCFDs: LongCFD[] = trader.getLongCFDs() || [];
    var shortCFDs: ShortCFD[] = trader.getShortCFDs() || [];
    //var closedCFDs =  @CHANGE

    GenerateCFDTables(longCFDs, shortCFDs);

    CFDMenu(false, trader);
}


//@CHANGE put this in utilities maybe
function GenerateCFDTables(longCFDs: LongCFD[], shortCFDs: ShortCFD[]): void {
    //make table now with cfds...
    if (longCFDs.length == 0 && shortCFDs.length == 0) {
        console.log(chalk.blue('You have no CFDs in your portfolio...'))
    } else {
        var header = ["ID", "Type", "Asset", "Amount", "Invested", "Current", "Change"];

        if (longCFDs.length != 0) {
            console.log(chalk.blue('Buys'))
            console.log(GenerateLongTable(longCFDs, header).toString());
        }

        if (shortCFDs.length != 0) {
            console.log(chalk.blue('Sells'))
            console.log(GenerateShortTable(shortCFDs, header).toString());
        }
    }
    console.log('\n')
}

function GenerateLongTable(longCFDs: LongCFD[], header: string[]): Table {
    var rows = [];
    longCFDs.forEach(cfd => {
        var id = cfd.GetId();
        var type = "Buy";
        var asset = cfd.GetAsset().GetAcronym();
        var amount = cfd.GetAmount();
        var invested = cfd.GetBuyPrice() * cfd.GetAmount() + ' $';
        var current = cfd.GetAsset().GetValue() * cfd.GetAmount() + ' $';
        var change = (cfd.GetAsset().GetChangePercent() >= 0) ? chalk.green(cfd.GetAsset().GetChangePercent() + ' %') : chalk.red(cfd.GetAsset().GetChangePercent() + ' %');
        rows.push([id, type, asset, amount, invested, current, change])
    });
    var table = CreateTable(header, rows);
    return table;
}

function GenerateShortTable(shortCFDs: ShortCFD[], header: string[]): Table {
    var rows = [];
    shortCFDs.forEach(cfd => {
        var id = cfd.GetId();
        var type = "Sell";
        var asset = cfd.GetAsset().GetAcronym();
        var amount = cfd.GetAmount();
        var invested = cfd.GetSellPrice() * cfd.GetAmount() + ' $';
        var current = cfd.GetAsset().GetValue() * cfd.GetAmount() + ' $';
        var change = (cfd.GetAsset().GetChangePercent() >= 0) ? chalk.green(cfd.GetAsset().GetChangePercent() + ' %') : chalk.red(cfd.GetAsset().GetChangePercent() + ' %');
        rows.push([id, type, asset, amount, invested, current, change])
    });
    var table = CreateTable(header, rows);
    return table;
}