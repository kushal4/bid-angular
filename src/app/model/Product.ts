import { Bid } from './Bid';

export interface Product{
    id:number,
    name:string,
    bids: Bid[]
}
