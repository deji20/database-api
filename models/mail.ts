export default interface Mail{
    subject: string;
    body: string;

    from: MailRecipient;
    to: MailRecipient[];
}

export interface MailRecipient{
    name: string;
    address: string;
}