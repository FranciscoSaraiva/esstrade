import { User } from '../entities/user';
import { Asset } from '../entities/asset';
import { LongCFD } from '../entities/longcfd';
import { ShortCFD } from '../entities/shortcfd';

export class Trader {

    private user: User;

    private assets: Asset[];

    private longCFDs: LongCFD[];
    private shortCFDs: ShortCFD[];

    private closedLongCFDs: LongCFD[];
    private closedShortCFDs: ShortCFD[];

    constructor(user: User, assets: Asset[], longCFDs: LongCFD[], shortCFDs: ShortCFD[], closedLongCFDs: LongCFD[], closedShortCFDs: ShortCFD[]) {
        //user logged in
        this.user = user;
        //assets running in the background
        this.assets = assets;
        //open cfds
        this.longCFDs = longCFDs;
        this.shortCFDs = shortCFDs;
        //closed cfds
        this.closedLongCFDs = closedLongCFDs;
        this.closedShortCFDs = closedShortCFDs;
    }


    // Gets

    public getUser(): User {
        return this.user;
    }

    public getAssets(): Asset[] {
        return this.assets;
    }

    public getLongCFDs(): LongCFD[] {
        return this.longCFDs;
    }

    public getShortCFDs(): ShortCFD[] {
        return this.shortCFDs;
    }

    public getClosedLongCFDs(): LongCFD[] {
        return this.closedLongCFDs;
    }

    public getClosedShortCFDs(): ShortCFD[] {
        return this.closedShortCFDs;
    }

    // Sets

    public setUser(user: User): void {
        this.user = user;
    }

    public setAssets(assets: Asset[]): void {
        this.assets = assets;
    }

    public setLongCFDs(longCFDs: LongCFD[]): void {
        this.longCFDs = longCFDs;
    }

    public setShortCFDs(shortCFDs: ShortCFD[]): void {
        this.shortCFDs = shortCFDs;
    }

    public setClosedLongCFDs(closedLongCFDs: LongCFD[]): void {
        this.closedLongCFDs = closedLongCFDs;
    }

    public setClosedShortCFDs(closedShortCFDs: ShortCFD[]): void {
        this.closedShortCFDs = closedShortCFDs;
    }

    // methods

    public findAsset(acronym: string): Asset {
        return this.assets.find(asset => {
            if (asset.GetAcronym() == acronym)
                return asset
            else
                return undefined;
        });
    }

}