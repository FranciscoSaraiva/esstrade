import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { CFD } from "./cfd";

@Entity("User")
export class User extends BaseEntity{

    /**
     * Attributes
     */
    @PrimaryGeneratedColumn()
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

    @Column({ name: "birthdate", type: "date" })
    private Birthdate: Date;

    @Column({ name: "balance", type: "double" })
    private Balance: number;

    @Column({ name: "total_allocated", type: "double" })
    private TotalAllocated: number;

    @Column({ name: "profit", type: "double" })
    private Profit: number;

    @Column({ name: "capital", type: "double" })
    private Capital: number;

    @OneToMany(() => CFD, cfd => cfd.GetUser)
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
        this.Birthdate = new Date;
        this.Balance = 0.0;
        this.TotalAllocated = 0.0;
        this.Profit = 0.0;
        this.Capital = 0.0;
    }

    /**
     * Methods
     */

    public GetUserDetails(): object {
        return {
            Username: this.Username,
            Email: this.Email,
            FirstName: this.FirstName,
            LastName: this.LastName,
            Balance: this.Balance,
            TotalAllocated: this.TotalAllocated,
            Profit: this.Profit,
            Capital: this.Capital,
            CFDs: this.CFDs
        };
    }

    public GetCFDs(): CFD[] {
        return this.CFDs;
    }

}