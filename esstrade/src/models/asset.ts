import { AssetType } from "./asset_type";
import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, ManyToOne, JoinColumn, RelationId } from "typeorm";

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
    @JoinColumn()
    private AssetType: AssetType;

    @RelationId((asset: Asset) => asset.AssetType)
    private AssetTypeId: number;

    @Column({ name: "value", type: "double" })
    private Value: number;

    @Column({ name: "buy_price", type: "double" })
    private BuyPrice: number;

    @Column({ name: "sell_price", type: "double" })
    private SellPrice: number;

    @Column({ name: "margin", type: "double" })
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
    constructor(Acronym: string, Name: string, AssetType: AssetType, Value: number, BuyPrice: number, SellPrice: number, Margin: number) {
        super();
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

    public GetMargin(): number {
        return this.Margin;
    }

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