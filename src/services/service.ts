import { PUBLIC_API_URL } from "@/secrets";
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
            return await fn()
        } catch {
            //toast && alert(error)
            return null
        }
    }
}

export default BaseService