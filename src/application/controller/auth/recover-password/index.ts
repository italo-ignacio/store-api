import { ValidationError } from 'yup';
import { errorLogger, messageErrorResponse, ok, validationErrorResponse } from '@main/utils';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';
import { sendMail } from '@infra/email';
import { EmailTemplateName } from '@main/config/constants';

interface Body {
  email: string;
}

export interface RecoverPasswordMailData {
  userName: string;
  token: string;
  code: string;
}

/**
 * @typedef {object} RecoverPasswordBody
 * @property {string} email.required
 */

/**
 * @typedef {object} RecoverPasswordResponse
 * @property {Messages} message
 * @property {string} status
 */

/**
 * POST /recover-password
 * @summary Recover password
 * @tags A Auth
 * @example request - payload example
 * {
 *   "email": "support@sp.senai.br"
 * }
 * @param {RecoverPasswordBody} request.body.required - application/json
 * @return {RecoverPasswordResponse} 200 - Successful response - application/json
 * @return {BadRequest} 400 - Bad request response - application/json
 */
export const recoverPasswordController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await sendMail({
        data: { code: `23412`, token: `fsdfsafsda`, userName: `Clebin` },
        file: EmailTemplateName.RECOVER_PASSWORD,
        subject: `sasasdahdha`,
        to: `clebin7655@gmail.com`
      });
      return ok({ response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
