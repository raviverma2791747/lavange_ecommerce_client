import { PUBLIC_API_URL } from "@/secrets";
import { normalizeApiResponse, toApiErrorResponse } from "@/lib/api/response";
import { service } from "@/types/service";

class BaseService {
    static BASE_API_URL: string = PUBLIC_API_URL
    // static instance: AxiosInstance = axios.create({
    //     baseURL: BaseService.apiUrl,
    //     timeout: 50000,
    //     withCredentials: true,
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // })

    static async handler(fn: (...args: unknown[]) => Promise<service.IBaseResponse | null>): Promise<service.IBaseResponse | null> {
        try {
            const response = await fn()
            return normalizeApiResponse(response)
        } catch (error) {
            return toApiErrorResponse(error)
        }
    }
}

export default BaseService
