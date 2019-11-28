import { CFD } from "./cfd";
import { Asset } from "./asset";
import { User } from "./User";
import { ChildEntity, Column, BaseEntity } from "typeorm";
import { Subject } from './subject';

@ChildEntity()
export class LongCFD extends CFD {

    @Column({ name: "buy_price", type: "double" })
    private BuyPrice: number;

    /**
     * 
     * @param Id Id of the user 
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

    public async CloseCFD() {
        // ( amount x price of the asset at the moment of closing ) - ( amount x price of the asset at the time )
        var profit = (this.GetAsset().GetSellPrice() * this.GetAmount()) - (this.BuyPrice * this.GetAmount());
        // ( profit gained ) + ( amount x price of the asset when cfd started)
        var newBalance = profit + (this.BuyPrice * this.GetAmount());

        this.GetUser().AddBalance(newBalance);
        this.GetUser().RemoveTotalAllocated((this.BuyPrice * this.GetAmount()))
        this.GetUser().RemoveProfit(profit);
        this.GetUser().UpdateCapital();
        await this.GetUser().save();
        this.SetClosed(true);
    }

}