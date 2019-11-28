import { Asset } from '../asset';

export interface Observer {
    update(asset: Asset);
}