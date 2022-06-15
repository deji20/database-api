export default interface Mail{
    subject: string;
    body: string;

    from: MailRecipient;
    to: MailRecipient[];
}

export class MailRecipient{
    name: string;
    address: string;

    constructor(name: string, address: string){
        this.name;
        this.address;
    }
}