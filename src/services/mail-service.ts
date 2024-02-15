import nodemailer from "nodemailer";

export class MailService {
    transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            logger: true
        });
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: "management.task@yandex.ru",
            to,
            subject: `Активация аккаунта на ${process.env.API_URL}`,
            html: `
                <div>
                    <h1>Для активации аккаунта перейдите по ссылке</h1>
                    <p>
                        <a href="${link}">${link}</a>
                    </p>
                <div>
            `
        });
    }
}

export default new MailService;