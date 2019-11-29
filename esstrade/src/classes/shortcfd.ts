import { CFD } from "./cfd";
import { Asset } from "./asset";
import { User } from "./User";
import { ChildEntity, Column } from "typeorm";
import { Observer } from './interfaces/observer';

@ChildEntity()
export class ShortCFD extends CFD {

    @Column({ name: "sell_price", type: "double" })
    private SellPrice: number;

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
     * @param SellPrice Price that was set per unit of the asset at the start of the CFD
     */
    constructor(Asset: Asset, User: User, Amount: number, TakeProfit: number, StopLoss: number, StartDate: Date, EndDate: Date, Closed: boolean, SellPrice: number) {
        super(Asset, User, Amount, TakeProfit, StopLoss, StartDate, EndDate, Closed);
        this.SellPrice = SellPrice;
    }

    /**
     * Methods
     */

    public GetSellPrice(): number {
        return this.SellPrice;
    }

    public GetTrueValueCFD(): number {
        return this.SellPrice * this.GetAmount();
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
            if (this.IsTakeProfit())
                this.CloseCFD();
        }

        if (this.GetStopLoss() != null) {
            if (this.IsStopLoss())
                this.CloseCFD();
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
    }
}