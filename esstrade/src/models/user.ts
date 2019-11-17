import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, BaseEntity } from "typeorm";
import { CFD } from "./cfd";

@Entity("User")
export class User extends BaseEntity {

    /**
     * Attributes
     */
    @PrimaryGeneratedColumn()
    private Id: number;

    @Column({ name: "Username", type: "int" })
    private Username: string;

    @Column({ name: "Password", type: "varchar" })
    private Password: string;

    @Column({ name: "Email", type: "varchar" })
    private Email: string;

    @Column({ name: "Name", type: "varchar" })
    private Name: string;

    @Column({ name: "Gender", type: "varchar" })
    private Gender: string;

    @Column({ name: "Birthdate", type: "datetime" })
    private Birthdate: Date;

    @Column({ name: "Balance", type: "double" })
    private Balance: number;

    @Column({ name: "TotalAllocated", type: "double" })
    private TotalAllocated: number;

    @Column({ name: "Profit", type: "double" })
    private Profit: number;

    @Column({ name: "Capital", type: "double" })
    private Capital: number;

    //@OneToMany(() => CFD, cfd => cfd.GetUser())
    //@JoinTable()
    private CFDs: CFD[];

    /**
     * 
     * @param Id Id of the user 
     * @param Username Username of the user in the platform
     * @param Password password of the user (this is probably not advised)
     * @param Email Email of the user in the platform
     * @param Name Real name of the user 
     * @param Gender Gender of the user
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
        this.Name = "";
        this.Gender = "";
        this.Birthdate = new Date;
        this.Balance = 0.0;
        this.TotalAllocated = 0.0;
        this.Profit = 0.0;
        this.Capital = 0.0;
        this.CFDs = [];
    }

    /**
     * Methods
     */

    public GetUserDetails(): object {
        return {
            Username: this.Username,
            Email: this.Email,
            Name: this.Name,
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