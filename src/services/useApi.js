import {ref, watch} from "vue";
import axios from "axios";
import {get, merge} from "lodash";
import {useNotification} from "@/services/useNotifications.js";

export const BackendErrorCodes = {
  REQUEST_FAILED: {
    code: 'REQUEST_FAILED', message: 'Запрос не удался на клиенте',
  },
  NO_RESPONSE: {
    code: 'NO_RESPONSE', message: 'Сервер не ответил на запрос',
  },
  RESPONSE_400: {
    code: 'RESPONSE_400', message: 'Ошибка в запросе',
  },
  RESPONSE_401: {
    code: 'RESPONSE_401', message: 'Вам нужно повторно авторизоваться',
  },
  RESPONSE_403: {
    code: 'RESPONSE_403', message: 'У Вас нет доступа',
  },
  RESPONSE_404: {
    code: 'RESPONSE_404', message: 'Не найдено',
  },
  RESPONSE_500: {
    code: 'RESPONSE_500', message: 'Ошибка на сервере',
  },
  RESPONSE_OTHER: {
    code: 'RESPONSE_OTHER', message: 'Ошибка неизвестного характера',
  },
}

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

export const useApi = (options = {
  showNotificationOnError: true,
}) => {
  const loading = ref(false)
  const get = async (endpoint, query = {}) => {
    return await call('GET', endpoint, {
      params: query,
    });
  }

  const post = async (endpoint, query = {}, payload = {}) => {
    return await call('POST', endpoint, {
      params: query,
      data: payload,
    });
  }

  const call = async (method, endpoint, config) => {
    try {
      loading.value = true;
      return await client(endpoint, {
        method,
        ...config,
      });
    } catch (e) {
      if (e.response) {
        /* The request was made and the server responded with a status code that falls out of the range of 2xx */
        switch (e.response.status) {
          case 400:
            e.appCode = BackendErrorCodes.RESPONSE_400;
            break;
          case 401:
            e.appCode = BackendErrorCodes.RESPONSE_401;
            break;
          case 403:
            e.appCode = BackendErrorCodes.RESPONSE_403;
            break;
          case 404:
            e.appCode = BackendErrorCodes.RESPONSE_404;
            break;
          case 500:
            e.appCode = BackendErrorCodes.RESPONSE_500;
            break;
          default:
            e.appCode = BackendErrorCodes.RESPONSE_OTHER;
            break;
        }
      } else if (e.request) {
        /* The request was made but no response was received. `error.request` is an instance of XMLHttpRequest */
        e.appCode = BackendErrorCodes.NO_RESPONSE
      } else {
        /* Something happened in setting up the request that triggered an Error */
        e.appCode = BackendErrorCodes.REQUEST_FAILED;
      }

      if (options.showNotificationOnError) {
        if (e.response && e.response.status === 422) {
          useNotification().show({
            type: 'error',
            message: e.response.data.error,
            duration: 11000,
          })
        } else {
          useNotification().show({
            type: 'error',
            title: e.appCode.message + ` (${e.appCode.code})`,
            message: endpoint,
          })
        }
      }

      throw e
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    get,
    post,
    call,
  }
}
