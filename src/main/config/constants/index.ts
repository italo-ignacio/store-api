import { resolve } from 'path';

export const directoryPaths = {
  templates: resolve(__dirname, '..', '..', '..', 'application', 'templates')
};

export enum EmailTemplateName {
  RECOVER_PASSWORD = 'mail-recover-password.html'
}
