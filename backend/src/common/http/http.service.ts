import { Injectable } from '@nestjs/common';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class HttpService {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      timeout: 10000,
      headers: {
        'User-Agent': 'HireScope/1.0',
      },
    });

    axiosRetry(this.client, {
      retries: 3,

      retryDelay: (retryCount) =>
        axiosRetry.exponentialDelay(retryCount, undefined, 500),

      retryCondition: (error: AxiosError) => {
        if (axiosRetry.isNetworkOrIdempotentRequestError(error)) {
          return true;
        }

        const status = error.response?.status;

        return (
          status === 429 ||
          status === 500 ||
          status === 502 ||
          status === 503 ||
          status === 504
        );
      },

      shouldResetTimeout: true,
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.client.get<T>(url, config);
    return data;
  }

  async post<T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const { data } = await this.client.post<T>(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });

    return data;
  }

  async head(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.client.head(url, {
      maxRedirects: 5,
      validateStatus: () => true,
      ...config,
    });
  }
}
