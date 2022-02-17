class config{
    databaseConnection: string;
    paymentAPI: string;
    origins: string[];
    port: number;

    constructor(){
        this.databaseConnection = "mongodb://mongoadmin:secret@database:27017";
        this.origins = ["http://indiskehjørne.dk", "http://13.51.224.204"];
        this.port = 80;
        this.paymentAPI = "https://test.api.dibspayment.eu";
    }
}

export default new config()