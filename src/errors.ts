export class RPCError extends Error {}

export class IncompatibleVersionError extends RPCError {}
export class TransportError extends RPCError {}
export class ProtocolError extends RPCError {}
export class ServiceError extends RPCError {
  internalError: any;
  constructor(internalError: any) {
    super('Service Error');
    this.internalError = internalError;
  }
}
