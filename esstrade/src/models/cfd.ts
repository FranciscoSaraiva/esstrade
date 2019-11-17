import { User } from "./user";
import { Asset } from "./asset";

export class CFD {

    /**
    * Attributes
    */
    private Id: number;
    private Asset: Asset;
    private User: User;
    private Amount: number;
    private TakeProfit: number;
    private StopLoss: number;
    private StartDate: Date;
    private EndDate: Date;
    private Closed: boolean;

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
     */
    constructor(Id: number, Asset: Asset, User: User, Amount: number, TakeProfit: number, StopLoss: number, StartDate: Date, EndDate: Date, Closed: boolean) {
        this.Id = Id;
        this.Asset = Asset;
        this.User = User;
        this.Amount = Amount;
        this.TakeProfit = TakeProfit;
        this.StopLoss = StopLoss;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.Closed = Closed;
    }

    /**
     * Methods
     */

    public GetUser(): User {
        return this.User;
    }

}