import { CFD } from "./cfd";
import { Asset } from "./asset";
import { User } from "./User";
import { ChildEntity, Column, BaseEntity } from "typeorm";
import { Observer } from './interfaces/observer';

@ChildEntity()
export class LongCFD extends CFD {

    @Column({ name: "buy_price", type: "double" })
    private BuyPrice: number;

    /**
     * 
     * @param Asset Asset the CFD is linked to
     * @param User User the CFD was created by
     * @param Amount Amount of units in the CFD
     * @param TakeProfit Amount set to end the CFD when profitting
     * @param StopLoss Amount set to stop the CFD when losing
     * @param StartDate Date the CFD was created
     * @param EndDate Date the CFD was ended
     * @param Closed Flag that indicates the CFD is closed
     * @param BuyPrice Price that was set per unit of the asset at the start of the CFD
     */
    constructor(Asset: Asset, User: User, Amount: number, TakeProfit: number, StopLoss: number, StartDate: Date, EndDate: Date, Closed: boolean, BuyPrice: number) {
        super(Asset, User, Amount, TakeProfit, StopLoss, StartDate, EndDate, Closed);
        this.BuyPrice = BuyPrice;
    }

    /**
     * Methods
     */

    public GetBuyPrice(): number {
        return this.BuyPrice;
    }

    public GetTrueValueCFD(): number {
        return this.BuyPrice * this.GetAmount();
    }

    public IsTakeProfit(): boolean {
        return (this.GetTrueValueAsset() >= this.GetTakeProfit()) ? true : false;
    }

    public IsStopLoss(): boolean {
        return (this.GetTrueValueAsset() <= this.GetStopLoss()) ? true : false;
    }

    public update(asset: Asset) {
        this.SetAsset(asset);

        if (this.GetTakeProfit() != null) {
            if (this.IsTakeProfit()) {
                this.CloseCFD();
                console.log(`\nThe buy CFD for ${this.GetAsset().GetAcronym()} has been closed because of the take profit clause.`)
            }
        }

        if (this.GetStopLoss() != null) {
            if (this.IsStopLoss()) {
                this.CloseCFD();
                console.log(`\nThe buy CFD for ${this.GetAsset().GetAcronym()} has been closed because of the take profit clause.`)
            }
        }
    }

    public async CloseCFD() {
        var profit = this.GetTrueValueCFD() - this.GetTrueValueAsset();
        var newBalance = profit + this.GetTrueValueAsset();

        this.GetUser().AddBalance(newBalance);
        this.GetUser().RemoveTotalAllocated(this.GetTrueValueCFD())
        this.GetUser().RemoveProfit(profit);
        this.GetUser().UpdateCapital();
        await this.GetUser().save();
        this.SetClosed(true);
        console.log(`\nThe Buy CFD for ${this.GetAsset().GetAcronym()} has been closed.`);
    }

}