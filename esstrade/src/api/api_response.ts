export class ApiResponse {
    Price: number;
    Buy: number;
    Sell: number;
    Change: number;

    constructor(response: any) {
        this.Price = response.regularMarketPrice;
        this.Buy = response.bid;
        this.Sell = response.ask;
        this.Change = response.regularMarketChange;
    }
}