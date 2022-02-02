class config{
    databaseConnection: string;
    paymentAPI: string;

    constructor(){
        this.databaseConnection = "mongodb://mongoadmin:secret@database:27017";
        this.paymentAPI = "https://test.api.dibspayment.eu";
    }
}

export default new config()