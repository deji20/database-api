import nodemailer, { Transporter } from "nodemailer";
import config from "../config";

export default class Mailer{
    transporter: Transporter;
    
    constructor(){
        // create reusable transporter object using the default SMTP transport
    
        // this.transporter = nodemailer.createTransport({
        //     host: config.email.host,
        //     port: 587,
        //     auth: {
        //         user:  config.email.user,
        //         pass: config.email.password, 
        //     },
        // });
    }

    async send(){
        try{
            console.log("before transport")
            let transporter = nodemailer.createTransport({
                host: config.email.host,
                secure:false,
                port: 2525,
                auth: {
                    user: config.email.user,
                    pass: config.email.password, 
                },
            });

            console.log("before verify")
            console.log(await transporter.verify())

            console.log("before send mail")
            let info = await transporter.sendMail({
                from: 'deji <test@tester.com',
                to: "migselv <jovan.v.santosh@gmail.com>",
                subject: "Yo what up", 
                text: "Virker det?",
            });

            console.log("after send")
            console.log(info);
        }catch(exc){
            console.log(exc);
        }
            return true;
    }
}