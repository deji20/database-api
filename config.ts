class config{
    databaseConnection: string;
    paymentAPI: string;

    constructor(){
        this.databaseConnection = process.env.CONNECTION_STRING;
        this.paymentAPI = "https://test.api.dibspayment.eu";
    }
}

export default new config()