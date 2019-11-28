//local
import { AssetType } from '../classes/asset_type';
import { Asset } from '../classes/asset';
import { User } from '../classes/user';
import { CFD } from '../classes/cfd';
import { LongCFD } from '../classes/longcfd';

/**
 * 
use esstrade;
INSERT INTO cfd (id,amount,take_profit,stop_loss,start_date,end_date,closed,buy_price,sell_price,cfd_type,assetId,userId) 
VALUES (1, 0.1, 0, 0, NOW(), NOW(), 0, 7500, 0, 'LongCFD', 1, 1);

INSERT INTO cfd (id,amount,take_profit,stop_loss,start_date,end_date,closed,buy_price,sell_price,cfd_type,assetId,userId) 
VALUES (2, 0.1, 0, 0, NOW(), NOW(), 0, 0, 7500, 'ShortCFD', 1, 1)
**/
export async function SeedDatabase() {

    //Dummy User
    var user = new User("test", "1", "test");
    user.SetFirstName('Test');
    user.SetLastName('Maximus');
    user.AddBalance(10000);
    await user.save();

    //AssetTypes
    var asset_type_stock = new AssetType("Stock");
    await asset_type_stock.save();
    var asset_type_commodity = new AssetType("Commodity");
    await asset_type_commodity.save();
    var asset_type_coin = new AssetType("Coin");
    await asset_type_coin.save();

    //Assets
    // - Stocks
    var asset_google = new Asset(
        "GOOG",
        "Alphabet Inc.",
        asset_type_stock, 0, 0, 0, 0.5, 0.5);
    await asset_google.UpdateAsset();
    await asset_google.save();

    var asset_apple = new Asset(
        "AAPL",
        "Apple Inc.",
        asset_type_stock, 0, 0, 0, 0.5, 0.5);
    await asset_apple.UpdateAsset();
    await asset_apple.save();


    var asset_nvidia = new Asset(
        "NVDA",
        "NVIDIA Corporation",
        asset_type_stock, 0, 0, 0, 0.5, 0.5);
    await asset_nvidia.UpdateAsset();
    await asset_nvidia.save();

    var asset_alibaba = new Asset(
        "BABA",
        "Alibaba Group Holding Limited",
        asset_type_stock, 0, 0, 0, 0.5, 0.5);
    await asset_alibaba.UpdateAsset();
    await asset_alibaba.save();

    var asset_ibm = new Asset(
        "IBM",
        "International Business Machines Corporation",
        asset_type_stock, 0, 0, 0, 0.5, 0.5);
    await asset_ibm.UpdateAsset();
    await asset_ibm.save();

    // - Commodities
    var asset_gold = new Asset(
        "GC=F",
        "Gold",
        asset_type_commodity, 0, 0, 0, 0.5, 0.5);
    await asset_gold.UpdateAsset();
    await asset_gold.save();

    var asset_silver = new Asset(
        "SI=F",
        "Silver",
        asset_type_commodity, 0, 0, 0, 0.5, 0.5);
    await asset_silver.UpdateAsset();
    await asset_silver.save();

    var asset_oil = new Asset(
        "CL=F",
        "Crude Oil",
        asset_type_commodity, 0, 0, 0, 0.5, 0.5);
    await asset_oil.UpdateAsset();
    await asset_oil.save();

    // - Coins
    var asset_euro = new Asset(
        "EURUSD=X",
        "EUR/USD",
        asset_type_coin, 0, 0, 0, 0.5, 0.5);
    await asset_euro.UpdateAsset();
    await asset_euro.save();

    var asset_pound = new Asset(
        "GBPUSD=X",
        "GBP/USD",
        asset_type_coin, 0, 0, 0, 0.5, 0.5);
    await asset_pound.UpdateAsset();
    await asset_pound.save();

    var asset_renminbi = new Asset(
        "CNYUSD=X",
        "CNY/USD",
        asset_type_coin, 0, 0, 0, 0.5, 0.5);
    await asset_renminbi.UpdateAsset();
    await asset_renminbi.save();

    var asset_yen = new Asset(
        "JPYUSD=X",
        "JPY/USD",
        asset_type_coin, 0, 0, 0, 0.5, 0.5);
    await asset_yen.UpdateAsset();
    await asset_yen.save();

    console.log('Asset information retrieved...!');
}

