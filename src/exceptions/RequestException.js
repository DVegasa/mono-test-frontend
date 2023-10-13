import {AppException} from '@/exceptions/AppException';

export class RequestException extends AppException {
  constructor(message) {
    super(message);
  }
}
