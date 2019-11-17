export class AssetType {

    /**
     * Attributes
     */
    private Id: number;
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