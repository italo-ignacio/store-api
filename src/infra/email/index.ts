import { RecoverPasswordMailData } from '@application/controller/auth';
import { env } from '@main/config';
import { resolve } from 'path';
import { promisify } from 'util';
import fs from 'fs';
import { directoryPaths, EmailTemplateName } from '@main/config/constants';
import { nodemailerSendMail } from './nodemailer';
import handlebars from 'handlebars';

interface SendMailInput {
  imagesUrl?: string[];
  to: string;
  file: EmailTemplateName;
  subject: string;
  data: RecoverPasswordMailData;
}

type HTMLConfigInput = Pick<SendMailInput, 'data' | 'file'>;

type HTMLConfigOutput = Promise<string>;
type SendMailOutput = Promise<void>;

const HTMLConfig = async ({ file, data }: HTMLConfigInput): HTMLConfigOutput => {
  const viewPath = resolve(directoryPaths.templates, file);
  const readFile = promisify(fs.readFile);
  const html = await readFile(viewPath, 'utf-8');

  return handlebars.compile(html)(data);
};

export const sendMail = async ({
  to,
  file,
  subject,
  data,
  imagesUrl
}: SendMailInput): SendMailOutput => {
  const formattedData = { ...data, ...env.URLConfig };

  const html = await HTMLConfig({ data: formattedData, file });

  await nodemailerSendMail({ html, subject, to, imagesUrl });
};
