import { AssetType } from '../models/asset_type';
import { Asset } from '../models/asset';

export async function SeedDatabase() {

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
            asset_type_stock, 0, 0, 0, 0);
        await asset_google.save();

        var asset_apple = new Asset(
            "AAPL",
            "Apple Inc.",
            asset_type_stock, 0, 0, 0, 0);
        await asset_apple.save();

        var asset_nvidia = new Asset(
            "NVDA",
            "NVIDIA Corporation",
            asset_type_stock, 0, 0, 0, 0);
        await asset_nvidia.save();

        var asset_alibaba = new Asset(
            "BABA",
            "Alibaba Group Holding Limited",
            asset_type_stock, 0, 0, 0, 0);
        await asset_alibaba.save();

        var asset_ibm = new Asset(
            "IBM",
            "International Business Machines Corporation",
            asset_type_stock, 0, 0, 0, 0);
        await asset_ibm.save();

        // - Commodities
        var asset_gold = new Asset(
            "GC=F",
            "Gold",
            asset_type_commodity, 0, 0, 0, 0);
        await asset_gold.save();

        var asset_silver = new Asset(
            "SI=F",
            "Silver",
            asset_type_commodity, 0, 0, 0, 0);
        await asset_silver.save();

        var asset_oil = new Asset(
            "CL=F",
            "Crude Oil",
            asset_type_commodity, 0, 0, 0, 0);
        await asset_oil.save();

        // - Coins
        var asset_euro = new Asset(
            "EURUSD=X",
            "EUR/USD",
            asset_type_coin, 0, 0, 0, 0);
        await asset_euro.save();

        var asset_pound = new Asset(
            "GBPUSD=X",
            "GBP/USD",
            asset_type_coin, 0, 0, 0, 0);
        await asset_pound.save();

        var asset_renminbi = new Asset(
            "CNYUSD=X",
            "CNY/USD",
            asset_type_coin, 0, 0, 0, 0);
        await asset_renminbi.save();

        var asset_yen = new Asset(
            "JPYUSD=X",
            "JPY/USD",
            asset_type_coin, 0, 0, 0, 0);
        await asset_yen.save();

        var asset_bitcoin = new Asset(
            "BTCUSD=X",
            "BTC/USD",
            asset_type_coin, 0, 0, 0, 0);
        await asset_bitcoin.save();

        console.log('Created all asset information...!');
}