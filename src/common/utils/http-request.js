import axios from 'axios';
import { v4 } from 'uuid';

import { getLocalStorageItem } from './local-storage';
import { ACCESS_TOKEN } from '../constants/local-storage-keys';
import { HttpMethod } from '../constants/http-requests';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const httpRequest = async (
  options,
  isSubscriptionKey = false
) => {
  try {
    const isMethodGet = options.method === HttpMethod.GET;

    // const accessToken = getLocalStorageItem(ACCESS_TOKEN);
    const accessToken = cookies.get('userInformation');

    const authorization = accessToken ? `Bearer ${accessToken}` : '';
    const isOcpApimTrace = false;
    const headers = {
      'x-correlation-id': v4(),
      ...(isOcpApimTrace && { 'Ocp-Apim-Trace': 'True' }),
      Authorization: authorization,
    };
    const response = await axios({
      ...options,
      params: isMethodGet
        ? { ...options.params, timestamp: Date.now() }
        : options.params,
      headers: isSubscriptionKey
        ? {
          ...headers,
          'subscription-key': window?.env?.SUBSCRIPTION_KEY,
        }
        : headers,
    });

    return response.data;
  } catch (error) {
    const { response } = error;

    return Promise.reject(response);
  }
};
