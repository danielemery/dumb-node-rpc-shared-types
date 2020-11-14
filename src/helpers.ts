import Joi from 'joi';

import { RequestContainer, ResponseContainer } from './containers';
import {
  ProtocolError,
  IncompatibleVersionError,
  ServiceError,
} from './errors';

const requestContainerSchema = Joi.object<RequestContainer<any>>({
  contractVersion: Joi.string().required(),
  arg: Joi.object().required(),
});

function checkVersionsCompatible(
  clientVersion: string,
  serverVersion: string,
): void {
  // throw new IncompatibleVersionError(`Requests from client <${clientVersion}> are not compatible with this server <${serverVersion}>`);
}

export function validateRequestContainer<T>(
  requestBody: unknown,
  serverVersion: string,
): RequestContainer<T> {
  const validationResult = requestContainerSchema.validate(requestBody, {
    stripUnknown: true,
  });
  if (validationResult.error) {
    throw new ProtocolError(
      `Request container could not be unpacked, request malformed: ${validationResult.error.message}`,
    );
  }
  const result: RequestContainer<T> = validationResult.value;

  checkVersionsCompatible(result.contractVersion, serverVersion);

  return result;
}

export function packageResponseReturnValue<T>(result: T): ResponseContainer<T> {
  return {
    value: result,
  };
}

export function packageResponseThrownResult(
  thrown: unknown,
): ResponseContainer<any> {
  return {
    error: new ServiceError(thrown),
  };
}

export function packageRequestContainer<T>(
  request: T,
  contractVersion: string,
): RequestContainer<T> {
  return {
    contractVersion,
    arg: request,
  };
}

export function validateResponseContainer<T>(
  response: unknown,
): ResponseContainer<T> {
  return response as ResponseContainer<T>;
}

export function unpackageResponseContainer<T>(
  response: ResponseContainer<T>,
): any {
  if (response.error) {
    throw response.error;
  }
  return response.value;
}
