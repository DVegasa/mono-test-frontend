import {ApiExceptionCodes} from "@/exceptions/ApiExceptionCodes";

//TODO: Когда будет локализация, заменить на i18n библиотеку
const Fields = {
  plate: 'гос.знак',
  phone: 'телефон',
}

export const useApiExceptionTranslator = (apiException) => {
  return {
    title: () => {
      return apiException?.message;
    },

    description: () => {
      if (!apiException?.content) return null;
      if (apiException?.code === ApiExceptionCodes.uniqueViolation) {
        apiException.content = apiException.content.map((field) => {
          return Fields?.[field] ?? field;
        })

        return apiException?.content.join(', ');
      }
    }
  }
}
