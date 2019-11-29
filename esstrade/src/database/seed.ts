import si = require('stock-info');
import { AssetType } from '../classes/asset_type';
import { Asset } from '../classes/asset';
import { User } from '../classes/user';
import { ApiResponse } from '../classes/api/api_response';

export async function SeedDatabase(): Promise<Asset[]> {

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


    var assets: Asset[] = [];

    //Assets
    // - Stocks
    var asset_google = await createAsset(
        "GOOG",
        "Alphabet Inc.",
        asset_type_stock);
    await asset_google.save();
    assets.push(asset_google);

    var asset_apple = await createAsset(
        "AAPL",
        "Apple Inc.",
        asset_type_stock);
    await asset_apple.save();
    assets.push(asset_apple);


    var asset_nvidia = await createAsset(
        "NVDA",
        "NVIDIA Corporation",
        asset_type_stock)
    await asset_nvidia.save();
    assets.push(asset_nvidia);

    var asset_alibaba = await createAsset(
        "BABA",
        "Alibaba Group Holding Limited",
        asset_type_stock)
    await asset_alibaba.save();
    assets.push(asset_alibaba);

    var asset_ibm = await createAsset(
        "IBM",
        "International Business Machines Corporation",
        asset_type_stock)
    await asset_ibm.save();
    assets.push(asset_ibm);

    // - Commodities
    var asset_gold = await createAsset(
        "GC=F",
        "Gold",
        asset_type_commodity)
    await asset_gold.save();
    assets.push(asset_gold);

    var asset_silver = await createAsset(
        "SI=F",
        "Silver",
        asset_type_commodity)
    await asset_silver.save();
    assets.push(asset_silver);

    var asset_oil = await createAsset(
        "CL=F",
        "Crude Oil",
        asset_type_commodity)
    await asset_oil.save();
    assets.push(asset_oil);

    // - Coins
    var asset_euro = await createAsset(
        "EURUSD=X",
        "EUR/USD",
        asset_type_coin)
    await asset_euro.save();
    assets.push(asset_euro);

    var asset_pound = await createAsset(
        "GBPUSD=X",
        "GBP/USD",
        asset_type_coin)
    await asset_pound.save();
    assets.push(asset_pound);

    var asset_renminbi = await createAsset(
        "CNYUSD=X",
        "CNY/USD",
        asset_type_coin)
    await asset_renminbi.save();
    assets.push(asset_renminbi);

    var asset_yen = await createAsset(
        "JPYUSD=X",
        "JPY/USD",
        asset_type_coin)
    await asset_yen.save();
    assets.push(asset_yen);

    console.log('Asset information retrieved...!');

    return assets;
}

async function createAsset(acronym: string, name: string, asset_type: AssetType): Promise<Asset> {
    var response: ApiResponse = await getApiResponse(acronym);
    var asset = new Asset(acronym, name, asset_type, response.Price, response.Buy, response.Sell, response.Change, response.ChangePercentage);
    return asset;
}

async function getApiResponse(acronym: string): Promise<ApiResponse> {
    var response = await si.getSingleStockInfo(acronym);
    var apiResponse = new ApiResponse(response);
    return apiResponse;
}
