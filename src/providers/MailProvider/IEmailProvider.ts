export interface IEmailFormData {
  to: string;
  body: string;
  subject: string;
}

export interface IEMailProvider {
  sendEmail({ body, subject, to }: IEmailFormData): Promise<void>;
}
