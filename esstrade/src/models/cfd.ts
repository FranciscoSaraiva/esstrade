import { User } from "./user";
import { Asset } from "./asset";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, TableInheritance } from "typeorm";

@Entity("CFD")
@TableInheritance({ column: { name: "type", type: "varchar" } })
export class CFD {

    /**
    * Attributes
    */
    @PrimaryGeneratedColumn()
    private Id: number;

    @Column({ name: "Name", type: "varchar" })
    private Asset: Asset;

    @ManyToOne(() => User, user => user.GetCFDs)
    User: User;

    @Column({ name: "Amount", type: "double" })
    private Amount: number;

    @Column({ name: "TakeProfit", type: "double" })
    private TakeProfit: number;

    @Column({ name: "StopLoss", type: "double" })
    private StopLoss: number;

    @Column({ name: "StartDate", type: "datetime" })
    private StartDate: Date;

    @Column({ name: "EndDate", type: "datetime" })
    private EndDate: Date;

    @Column({ name: "Closed", type: "bool" })
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