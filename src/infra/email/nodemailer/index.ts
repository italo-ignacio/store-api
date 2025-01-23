import { env } from '@main/config';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface EmailSender {
  imagesUrl?: string[];
  to: string;
  html: string;
  subject: string;
}

type TransporterConfigOutput = Transporter<SMTPTransport.SentMessageInfo>;

const transportConfig = (): TransporterConfigOutput =>
  createTransport({
    auth: {
      pass: env.NODEMAILER.password,
      user: env.NODEMAILER.from
    },
    host: env.NODEMAILER.host,
    port: 587,
    secure: false,
    service: env.NODEMAILER.service,
    tls: { ciphers: 'SSLv3' }
  });

export const nodemailerSendMail = async ({
  to,
  html,
  subject,
  imagesUrl
}: EmailSender): Promise<void> => {
  const transport = transportConfig();
  const { from, enabled } = env.NODEMAILER;

  if (enabled) {
    const attachments = imagesUrl?.map((image, index) => ({
      filename: image.split('/').pop() ?? `img_${index}`,
      path: image
    }));

    const msg = { attachments, from, html, subject, to };

    await transport.sendMail(msg);
  }
};
