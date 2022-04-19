import env from "dotenv";
env.config();

class config{
    databaseConnection: string;
    payment: PaymentConfig;
    origins: string[];
    port: number;
    imagePath: string;

    constructor(){
        this.databaseConnection = process.env.CONNECTION_STRING
        this.origins = process.env.ORIGINS.split(" ");
        this.port = parseInt(process.env.PORT);
        this.payment = {
            endpoint: process.env.PAYMENT_API,
            secret: process.env.PAYMENT_SECRET,
            checkoutId: process.env.PAYMENT_CHECKOUT,
            checkoutOptions: {
                url: process.env.PAYMENT_CHECKOUT_URL,
                termsUrl: process.env.PAYMENT_CHECKOUT_TERMS,
            }

        };
        this.imagePath = process.env.IMAGE_PATH;
    }
}

interface PaymentConfig{
    endpoint: string;
    secret: string;
    checkoutId: string;
    checkoutOptions: {
        url: string,
        termsUrl: string,
    };
}

export default new config()