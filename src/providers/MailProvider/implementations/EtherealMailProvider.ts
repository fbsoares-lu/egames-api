import nodemailer, { Transporter } from "nodemailer";
import { IEmailFormData, IEMailProvider } from "../IEmailProvider";

export class EtherealMailProvider implements IEMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.log(err));
  }

  async sendEmail({ to, body, subject }: IEmailFormData): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: "Egames <noreplay@egames.fake.com.br>",
      subject,
      text: body,
      html: body,
    });

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
