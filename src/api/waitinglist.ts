import axios, { AxiosInstance, AxiosError } from "axios";
import type {
  WaitinglistFormData,
  WaitinglistResponse,
  WaitinglistError,
  WaitinglistApiOptions,
  ProjectInfoResponse,
  VerificationResponse,
  UnsubscribeResponse,
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
        let apiErrorMessage = "Request failed";
        let apiMessage: string | undefined;
        let details: Array<{ field: string; message: string }> | undefined;

        // Extract error information from API response
        if (error.response?.data) {
          const errorData = error.response.data as Record<string, unknown>;

          // Use API error message if available
          if (errorData.error && typeof errorData.error === "string") {
            apiErrorMessage = errorData.error;
          }

          // Only use API message if provided, don't fall back to axios message
          if (errorData.message && typeof errorData.message === "string") {
            apiMessage = errorData.message;
          }

          details = errorData.details as Array<{
            field: string;
            message: string;
          }>;
        }

        const waitinglistError: WaitinglistError = {
          success: false,
          error: apiErrorMessage,
          message: apiMessage, // This will be undefined if API doesn't provide a message
          status: error.response?.status,
          details,
        };

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
      // Don't retry on client errors (4xx) - these are permanent failures
      const isClientError =
        error &&
        typeof error === "object" &&
        "status" in error &&
        typeof error.status === "number" &&
        error.status >= 400 &&
        error.status < 500;

      if (attempt < this.retries && !isClientError) {
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

  async getProjectInfo(): Promise<ProjectInfoResponse> {
    return this.retryRequest(async () => {
      const response = await this.client.get<ProjectInfoResponse>(
        "/api/v1/project"
      );
      return response.data;
    });
  }

  async verifyEmail(token: string): Promise<VerificationResponse> {
    return this.retryRequest(async () => {
      const response = await this.client.post<VerificationResponse>(
        "/api/v1/verify",
        { token }
      );
      return response.data;
    });
  }

  async unsubscribe(token: string): Promise<UnsubscribeResponse> {
    return this.retryRequest(async () => {
      const response = await this.client.post<UnsubscribeResponse>(
        "/api/v1/unsubscribe",
        { token }
      );
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

// Standalone function for getting project info
export const getProjectInfo = async (
  apiKey: string,
  options?: WaitinglistApiOptions
): Promise<ProjectInfoResponse> => {
  const api = createWaitinglistApi(apiKey, options);
  return api.getProjectInfo();
};

// Standalone function for email verification
export const verifyEmail = async (
  apiKey: string,
  token: string,
  options?: WaitinglistApiOptions
): Promise<VerificationResponse> => {
  const api = createWaitinglistApi(apiKey, options);
  return api.verifyEmail(token);
};

// Standalone function for unsubscribing
export const unsubscribe = async (
  apiKey: string,
  token: string,
  options?: WaitinglistApiOptions
): Promise<UnsubscribeResponse> => {
  const api = createWaitinglistApi(apiKey, options);
  return api.unsubscribe(token);
};
