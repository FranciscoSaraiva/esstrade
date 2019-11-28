import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, JoinColumn } from "typeorm";
//local
import { CFD } from "./cfd";

@Entity("User")

export class User extends BaseEntity {

    /**
     * Attributes
     */
    @PrimaryGeneratedColumn({ name: "id" })
    private Id: number;

    @Column({ name: "username", type: "varchar" })
    private Username: string;

    @Column({ name: "password", type: "varchar" })
    private Password: string;

    @Column({ name: "email", type: "varchar" })
    private Email: string;

    @Column({ name: "first_name", type: "varchar" })
    private FirstName: string;

    @Column({ name: "last_name", type: "varchar" })
    private LastName: string;

    @Column({ name: "balance", type: "double" })
    private Balance: number;

    @Column({ name: "total_allocated", type: "double" })
    private TotalAllocated: number;

    @Column({ name: "profit", type: "double" })
    private Profit: number;

    @Column({ name: "capital", type: "double" })
    private Capital: number;

    @OneToMany(type => CFD, cfd => cfd.GetUser)
    @JoinColumn()
    private CFDs: CFD[];

    /**
     * 
     * @param Id Id of the user 
     * @param Username Username of the user in the platform
     * @param Password password of the user (this is probably not advised)
     * @param Email Email of the user in the platform
     * @param FirstName First name of the user
     * @param LastName Last name of the user
     * @param Birthdate Birth date of the user
     * @param Balance Money currently in the account
     * @param TotalAllocated Total money allocated in all CFDs
     * @param Profit Total money made from trading CFDs
     * @param Capital Capital value of the user in the platform
     */
    constructor(Username: string, Password: string, Email: string) {
        super();
        this.Username = Username;
        this.Password = Password;
        this.Email = Email;
        this.FirstName = "";
        this.LastName = "";
        this.Balance = 0.0;
        this.TotalAllocated = 0.0;
        this.Profit = 0.0;
        this.Capital = 0.0;
    }

    /**
     * Methods
     */

    public GetUsername(): string {
        return this.Username;
    }

    public GetEmail(): string {
        return this.Email;
    }

    public GetFirstName(): string {
        return this.FirstName;
    }

    public GetLastName(): string {
        return this.LastName;
    }

    public GetBalance(): number {
        return this.Balance;
    }

    public GetTotalAllocated(): number {
        return this.TotalAllocated;
    }

    public GetProfit(): number {
        return this.Profit;
    }

    public GetCapital(): number {
        return this.Capital;
    }

    public GetCFDs(): CFD[] {
        return this.CFDs;
    }

    public CheckLoginCredentials(email: string, password: string): boolean {
        return (this.Email == email && this.Password == password);
    }

    public CheckIfEmailIsTaken(email: string): boolean {
        return (this.Email == email);
    }

    public SetFirstName(name: string): void {
        this.FirstName = name;
    }

    public SetLastName(name: string): void {
        this.LastName = name;
    }

    public SetPassword(password: string): void {
        this.Password = password;
    }

    public AddTotalAllocated(value: number): void {
        this.TotalAllocated += value;
    }

    public RemoveTotalAllocated(value: number): void {
        this.TotalAllocated -= value;
    }

    public AddProfit(value: number): void {
        this.Profit += value;
    }

    public RemoveProfit(value: number): void {
        this.Profit -= value;
    }

    public AddBalance(amount: number): void {
        this.Balance += amount;
    }

    public UpdateCapital(): void {
        this.Capital = this.Balance + this.TotalAllocated + this.Profit;
    }

}