import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, ManyToOne, RelationId } from "typeorm";
var si = require('stock-info');
//local
import { AssetType } from "./asset_type";
import { ApiResponse } from "./api/api_response";
import { Subject } from './subject';
import { Observer } from './observer';

@Entity("Asset")
export class Asset extends BaseEntity implements Subject {

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

    private observers: Observer[] = [];

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
     * Gets
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

    /**
     * Sets
     */

    public SetValue(value: number): void {
        this.Value = value;
    }

    public SetBuyPrice(buy: number) {
        this.BuyPrice = buy;
    }

    public SetSellPrice(sell: number) {
        this.SellPrice = sell;
    }

    public SetChange(change: number): void {
        this.Change = change;
    }

    public SetChangePercentage(percentage: number): void {
        this.ChangePercentage = percentage;
    }



    // Methods

    public async UpdateAsset() {
        var response = await si.getSingleStockInfo(this.GetAcronym());
        var apiResponse = new ApiResponse(response);
        this.Value = apiResponse.Price;
        this.BuyPrice = apiResponse.Buy;
        this.SellPrice = apiResponse.Sell;
        this.Change = apiResponse.Change;
        this.ChangePercentage = apiResponse.ChangePercentage;
        this.notifyObservers();
    }


    // Subject methods

    registerObserver(observer: Observer) {
        console.log('pushed obs')
        this.observers.push(observer);
    }
    removeObserver(observer: Observer) {
        let index = this.observers.indexOf(observer);
        this.observers.splice(index, 1);
    }
    notifyObservers() {
        console.log('\ notifying observers...')
        for (let observer of this.observers) {
            observer.update(this);
        }
        for (let index = 0; index < this.observers.length; index++) {
            const observer = this.observers[index];
            observer.update(this);
        }
    }
}