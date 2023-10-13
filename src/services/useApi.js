import {ref, watch} from "vue";
import axios from "axios";
import {get, merge} from "lodash";
import {useNotification} from "@/services/useNotifications.js";
import {NoResponseException} from "@/exceptions/NoResponseException";
import {RequestException} from "@/exceptions/RequestException";
import {ApiException} from "@/exceptions/ApiException";


const client = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

export const useApi = () => {
  const isLoading = ref(false)

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
      isLoading.value = true;
      return await client(endpoint, {
        method,
        ...config,
      });

    } catch (e) {
      let throwable;
      if (e.response) {
        /* The request was made and the server responded with a status code that falls out of the range of 2xx */
        throwable = ApiException.fromResponse(e.response);

      } else if (e.request) {
        /* The request was made but no response was received. `error.request` is an instance of XMLHttpRequest */
        throwable = new NoResponseException();

      } else {
        /* Something happened in setting up the request that triggered an Error */
        throwable = new RequestException();
      }

      throw throwable;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    get,
    post,
    call,
  }
}
