import { Observer } from './observer';
import { Asset } from '../entities/asset';

export interface Subject {
    registerObserver(observer: Observer);
    removeObserver(observer: Observer);
    notifyObservers(asset: Asset);
}