import { AssetType } from "./asset_type";

export class Asset {

    /**
     * Attributes
     */
    private Id: number;
    private Acronym: string;
    private Name: string;
    private AssetType: AssetType;
    private Value: number;
    private BuyPrice: number;
    private SellPrice: number;
    private Margin: number;

    /**
     * 
     * @param Id Id of the asset 
     * @param Acronym Acronym identifying the asset
     * @param Name Name of the Asset 
     * @param Value Monetary value of the asset
     * @param BuyPrice Buy price of the asset
     * @param SellPrice Sell price of the asset
     */
    constructor(Id: number, Acronym: string, Name: string, AssetType: AssetType, Value: number, BuyPrice: number, SellPrice: number, Margin: number) {
        this.Id = Id;
        this.Acronym = Acronym;
        this.Name = Name;
        this.AssetType = AssetType;
        this.Value = Value;
        this.BuyPrice = BuyPrice;
        this.SellPrice = SellPrice;
        this.Margin = Margin;
    }

    /**
     * Methods
     */

    public UpdateValue(value: number): void {

    }

    public UpdateBuyPrice(value: number): void {

    }

    public UpdateSellPrice(value: number): void {

    }
}