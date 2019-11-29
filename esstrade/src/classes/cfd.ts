import { User } from "./user";
import { Asset } from "./asset";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, TableInheritance, RelationId, JoinColumn, BaseEntity } from "typeorm";
import { Observer } from './interfaces/observer';
import { Subject } from './interfaces/subject';

@Entity("CFD")
@TableInheritance({ column: { name: "cfd_type", type: "varchar" } })
export abstract class CFD extends BaseEntity implements Observer {

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

    @Column({ name: "take_profit", type: "double", nullable: true })
    private TakeProfit: number;

    @Column({ name: "stop_loss", type: "double", nullable: true })
    private StopLoss: number;

    @Column({ name: "start_date", type: "datetime" })
    private StartDate: Date;

    @Column({ name: "end_date", type: "datetime", nullable: true })
    private EndDate: Date;

    @Column({ name: "closed", type: "bool" })
    private Closed: boolean;

    private subject: Subject;

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

        this.subject = Asset;
        if (Asset != undefined)
            Asset.registerObserver(this);
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

    public GetUserId(): number {
        return this.UserId;
    }

    public GetAsset(): Asset {
        return this.Asset;
    }

    public GetAssetId(): number {
        return this.AssetId;
    }

    public GetAmount(): number {
        return this.Amount;
    }

    public GetTakeProfit(): number {
        return this.TakeProfit;
    }

    public GetStopLoss(): number {
        return this.StopLoss;
    }

    public GetTrueValueAsset(): number {
        return this.GetAsset().GetValue() * this.GetAmount();
    }

    public SetAsset(asset: Asset) {
        this.Asset = asset;
    }

    public SetClosed(value: boolean): void {
        this.Closed = value;
    }

    public update(asset: Asset) {
        this.Asset = asset;
    }

}