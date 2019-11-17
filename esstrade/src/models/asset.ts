import { AssetType } from "./asset_type";
import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

export class Asset {

    /**
     * Attributes
     */
    @PrimaryGeneratedColumn()
    private Id: number;

    @Column({ name: "Acronym", type: "varchar" })
    private Acronym: string;

    @Column({ name: "Name", type: "varchar" })
    private Name: string;

    @OneToOne(type => AssetType)
    @JoinColumn()
    private AssetType: AssetType;

    @Column({ name: "Value", type: "double" })
    private Value: number;

    @Column({ name: "BuyPrice", type: "double" })
    private BuyPrice: number;

    @Column({ name: "SellPrice", type: "double" })
    private SellPrice: number;

    @Column({ name: "Margin", type: "double" })
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
        console.log(value)
    }

    public UpdateBuyPrice(value: number): void {
        console.log(value)
    }

    public UpdateSellPrice(value: number): void {
        console.log(value)
    }
}