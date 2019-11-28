import { Observer } from './observer';

export interface Subject {
    registerObserver(observer: Observer);
    removeObserver(observer: Observer);
    notifyObservers();
}