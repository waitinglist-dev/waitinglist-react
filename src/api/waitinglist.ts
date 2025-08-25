import axios, { AxiosInstance, AxiosError } from "axios";
import type {
  WaitinglistFormData,
  WaitinglistResponse,
  WaitinglistError,
  WaitinglistApiOptions,
} from "@/types";

export class WaitinglistApi {
  private client: AxiosInstance;
  private apiKey: string;
  private retries: number;

  constructor(apiKey: string, options: WaitinglistApiOptions = {}) {
    this.apiKey = apiKey;
    this.retries = options.retries || 3;

    this.client = axios.create({
      baseURL: options.apiUrl || "https://api.waitinglist.dev",
      timeout: options.timeout || 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add request interceptor to add API key
    this.client.interceptors.request.use((config) => {
      config.params = {
        ...config.params,
        api_key: this.apiKey,
      };
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const waitinglistError: WaitinglistError = {
          success: false,
          error: "Request failed",
          message: error.message,
        };

        if (error.response?.data) {
          const errorData = error.response.data as Record<string, unknown>;
          waitinglistError.error =
            (errorData.error as string) || "Request failed";
          waitinglistError.message =
            (errorData.message as string) || error.message;
          waitinglistError.details = errorData.details as Array<{
            field: string;
            message: string;
          }>;
        }

        throw waitinglistError;
      }
    );
  }

  private async retryRequest<T>(
    requestFn: () => Promise<T>,
    attempt = 1
  ): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      if (attempt < this.retries) {
        // Exponential backoff: wait 2^attempt seconds
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.retryRequest(requestFn, attempt + 1);
      }
      throw error;
    }
  }

  async signup(data: WaitinglistFormData): Promise<WaitinglistResponse> {
    const requestData = {
      email: data.email,
      ...(data.name && { name: data.name }),
      ...(data.phone && { phone: data.phone }),
      ...(data.tags && data.tags.length > 0 && { tags: data.tags }),
      // Add metadata if available
      ...(typeof window !== "undefined" && {
        user_agent: navigator.userAgent,
        referrer: document.referrer || undefined,
      }),
    };

    return this.retryRequest(async () => {
      const response = await this.client.post<WaitinglistResponse>(
        "/api/v1/signup",
        requestData
      );
      return response.data;
    });
  }

  async getProjectInfo(): Promise<unknown> {
    return this.retryRequest(async () => {
      const response = await this.client.get("/api/v1/project");
      return response.data;
    });
  }

  async verifyEmail(token: string): Promise<unknown> {
    return this.retryRequest(async () => {
      const response = await this.client.post("/api/v1/verify", { token });
      return response.data;
    });
  }

  async unsubscribe(token: string): Promise<unknown> {
    return this.retryRequest(async () => {
      const response = await this.client.post("/api/v1/unsubscribe", { token });
      return response.data;
    });
  }
}

// Factory function for creating API instances
export const createWaitinglistApi = (
  apiKey: string,
  options?: WaitinglistApiOptions
) => {
  return new WaitinglistApi(apiKey, options);
};

// Standalone function for quick signup
export const signupToWaitinglist = async (
  apiKey: string,
  data: WaitinglistFormData,
  options?: WaitinglistApiOptions
): Promise<WaitinglistResponse> => {
  const api = createWaitinglistApi(apiKey, options);
  return api.signup(data);
};
