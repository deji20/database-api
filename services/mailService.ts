import nodemailer, { Transporter } from "nodemailer";
import config from "../config";
import Mail, { MailRecipient } from "../models/mail";

export default class Mailer{
    transporter: Transporter;
    mail: Mail;

    constructor(subject: string, sender: MailRecipient){
        this.mail = {
            subject: subject,
            from: sender,
            to: [],
            body: null
        }

        // create reusable transporter object using the default SMTP transport
        this.transporter = nodemailer.createTransport({
            host: config.email.host,
            port: 587,
            auth: {
                user:  config.email.user,
                pass: config.email.password, 
            },
        });
    }

    addRecipient = (recipient: MailRecipient) => this.mail.to = [...this.mail.to, recipient];
    addBody = (body: string) => this.mail.body = body;

    async send(){
        try{
            console.log(this.mail.to.reduce((prev, mail, index) => prev += `${index && ","} ${mail.name} <${mail.address}>`, ""));
            let info = await this.transporter.sendMail({
                from: `${this.mail.from.name} <${this.mail.from.address}>`,
                to: this.mail.to.reduce((prev, mail, index) => prev += `${index && ","} ${mail.name} <${mail.address}>`, ""),
                subject: this.mail.subject, 
                text: this.mail.body,
            });
            console.log(info);
        }catch(exc){
            console.log(exc);
        }
            return true;
    }
}