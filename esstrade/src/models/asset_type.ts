import { PrimaryGeneratedColumn, Column, Entity } from "typeorm"

@Entity("Asset_Type")
export class AssetType {

    /**
     * Attributes
     */
    @PrimaryGeneratedColumn()
    private Id: number;

    @Column({ name: "name", type: "varchar" })
    private Name: string;

    /**
     * 
     * @param Id Id of the AssetType
     * @param Name Name of the type 
     */
    constructor(Id: number, Name: string) {
        this.Id = Id;
        this.Name = Name;
    }

}