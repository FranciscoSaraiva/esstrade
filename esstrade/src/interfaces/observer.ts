import { Asset } from '../entities/asset';

export interface Observer {
    update(asset: Asset);
}