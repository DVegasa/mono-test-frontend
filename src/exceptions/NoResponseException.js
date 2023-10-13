import {AppException} from '@/exceptions/AppException';

export class NoResponseException extends AppException {
  constructor(message) {
    super(message);
  }
}
