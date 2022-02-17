import env from "dotenv";
env.config();

class config{
    databaseConnection: string;
    paymentAPI: string;
    origins: string[];
    port: number;

    constructor(){
        this.databaseConnection = process.env.CONNECTION_STRING
        this.origins = process.env.ORIGINS.split(" ");
        this.port = parseInt(process.env.PORT);
        this.paymentAPI = process.env.PAYMENT_API;
    }
}

export default new config()