import {AppException} from "@/exceptions/AppException";

export class ApiException extends AppException {
  constructor({
    httpCode,
    code,
    message,
    content,
  }) {
    super(message);
    this.httpCode = httpCode;
    this.code = code;
    this.message = message;
    this.content = content;
  }

  static fromResponse(response) {
    return new ApiException({
      httpCode: response?.status ?? null,
      code: response?.data?.data?.code ?? null,
      message: response?.data?.data?.message ?? null,
      content: response?.data?.data?.content ?? null,
    })
  }
}
