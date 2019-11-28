import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, Unique } from "typeorm"

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
    constructor(Name: string) {
        super();
        this.Name = Name;
    }

    public GetId(): number {
        return this.Id;
    }

    public GetName(): string {
        return this.Name;
    }

}