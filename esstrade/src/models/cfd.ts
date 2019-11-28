import { User } from "./user";
import { Asset } from "./asset";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, TableInheritance, RelationId, JoinColumn, BaseEntity } from "typeorm";

@Entity("CFD")
@TableInheritance({ column: { name: "cfd_type", type: "varchar" } })
export abstract class CFD extends BaseEntity {

    /**
    * Attributes
    */
    @PrimaryGeneratedColumn({ name: "id" })
    private Id: number;

    @ManyToOne(type => Asset, { eager: true })
    @JoinColumn()
    private Asset: Asset;

    @RelationId((cfd: CFD) => cfd.Asset)
    private AssetId: number;

    @ManyToOne(type => User, { eager: true })
    @JoinColumn()
    private User: User;

    @RelationId((cfd: CFD) => cfd.User)
    private UserId: number;

    @Column({ name: "amount", type: "double" })
    private Amount: number;

    @Column({ name: "take_profit", type: "double" })
    private TakeProfit: number;

    @Column({ name: "stop_loss", type: "double" })
    private StopLoss: number;

    @Column({ name: "start_date", type: "datetime" })
    private StartDate: Date;

    @Column({ name: "end_date", type: "datetime" })
    private EndDate: Date;

    @Column({ name: "closed", type: "bool" })
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
    constructor(Asset: Asset, User: User, Amount: number, TakeProfit: number, StopLoss: number, StartDate: Date, EndDate: Date, Closed: boolean) {
        super();
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
    public GetId(): number {
        return this.Id;
    }

    public GetUser(): User {
        return this.User;
    }

    public GetAsset(): Asset {
        return this.Asset;
    }

    public GetAmount(): number {
        return this.Amount;
    }

    public SetClosed(value: boolean): void {
        this.Closed = value;
    }

}