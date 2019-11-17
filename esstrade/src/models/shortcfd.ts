import { CFD } from "./cfd";
import { Asset } from "./asset";
import { User } from "./user";

export class ShortCFD extends CFD {

    private SellPrice: number;

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
     * @param SellPrice Price that was set per unit of the asset at the start of the CFD
     */
    constructor(Id: number, Asset: Asset, User: User, Amount: number, TakeProfit: number, StopLoss: number, StartDate: Date, EndDate: Date, Closed: boolean, BuyPrice: number) {
        super(Id, Asset, User, Amount, TakeProfit, StopLoss, StartDate, EndDate, Closed);
        this.SellPrice = BuyPrice;
    }

    /**
     * Methods
     */

     

}