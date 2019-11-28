import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, ManyToOne, RelationId } from "typeorm";
var si = require('stock-info');
//local
import { AssetType } from "./asset_type";
import { ApiResponse } from "./api/api_response";

@Entity("Asset")
export class Asset extends BaseEntity {

    /**
     * Attributes
     */
    @PrimaryGeneratedColumn({ name: "id" })
    private Id: number;

    @Column({ name: "acronym", type: "varchar" })
    private Acronym: string;

    @Column({ name: "name", type: "varchar" })
    private Name: string;

    @ManyToOne(type => AssetType, { eager: true })
    private AssetType: AssetType;

    @RelationId((asset: Asset) => asset.AssetType)
    private AssetTypeId: number;

    @Column({ name: "value", type: "double" })
    private Value: number;

    @Column({ name: "buy_price", type: "double" })
    private BuyPrice: number;

    @Column({ name: "sell_price", type: "double" })
    private SellPrice: number;

    @Column({ name: "change", type: "double" })
    private Change: number;

    @Column({ name: "change_percentage", type: "double" })
    private ChangePercentage: number;

    /**
     * 
     * @param Id Id of the asset 
     * @param Acronym Acronym identifying the asset
     * @param Name Name of the Asset 
     * @param Value Monetary value of the asset
     * @param BuyPrice Buy price of the asset
     * @param SellPrice Sell price of the asset
     */
    constructor(Acronym: string, Name: string, AssetType: AssetType, Value: number, BuyPrice: number, SellPrice: number, Change: number, ChangePercentage: number) {
        super();
        this.Acronym = Acronym;
        this.Name = Name;
        this.AssetType = AssetType;
        this.Value = Value;
        this.BuyPrice = BuyPrice;
        this.SellPrice = SellPrice;
        this.Change = Change;
        this.ChangePercentage = ChangePercentage;
    }

    /**
     * Methods
     */

    public GetAcronym(): string {
        return this.Acronym;
    }

    public GetName(): string {
        return this.Name;
    }

    public GetAssetType(): AssetType {
        return this.AssetType;
    }

    public GetValue(): number {
        return this.Value;
    }

    public GetBuyPrice(): number {
        return this.BuyPrice;
    }

    public GetSellPrice(): number {
        return this.SellPrice;
    }

    public GetChange(): number {
        return this.Change;
    }

    public GetChangePercent(): number {
        return this.ChangePercentage;
    }

    public async UpdateAsset() {
        var response = await si.getSingleStockInfo(this.GetAcronym());
        var apiResponse = new ApiResponse(response);
        this.Value = apiResponse.Price;
        this.BuyPrice = apiResponse.Buy;
        this.SellPrice = apiResponse.Sell;
        this.Change = apiResponse.Change;
        this.ChangePercentage = apiResponse.ChangePercentage;
    }
}