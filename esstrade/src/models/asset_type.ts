import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from "typeorm"

@Entity("Asset_Type")
export class AssetType extends BaseEntity {

    /**
     * Attributes
     */
    @PrimaryGeneratedColumn({ name: "id" })
    private Id: number;

    @Column({ name: "name", type: "varchar" })
    private Name: string;

    /**
     * 
     * @param Id Id of the AssetType
     * @param Name Name of the type 
     */
    constructor(Id: number, Name: string) {
        super();
        this.Id = Id;
        this.Name = Name;
    }

    public GetName(): String {
        return this.Name;
    }

}