
class config{
    databaseConnection: string;
    paymentAPI: string;

    constructor(){
        this.databaseConnection = "mongodb://deji:7wM8EQYmDjl1WR7i@cluster0-shard-00-01.4k6ee.mongodb.net:27017";
        this.paymentAPI = "https://test.api.dibspayment.eu";
    }
}

export default new config()