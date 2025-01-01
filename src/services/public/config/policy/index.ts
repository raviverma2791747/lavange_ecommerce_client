import BaseService from "@/services/service";
import { service } from "@/types/service";

class PolicyConfigService extends BaseService {
    API_URL: string;

    constructor() {
        super()
        this.API_URL = PolicyConfigService.BASE_API_URL + '/public/config/policy'
    }

    async getAll(): Promise<service.IBaseResponse | null> {
        return BaseService.handler(async () => {
            const response = await fetch(`${this.API_URL}`)
            return await response.json()
        })
    }
}

export default PolicyConfigService